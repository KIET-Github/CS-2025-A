const db = require("../Db/index.js");
const { errorMessages, invoiceMessages } = require("../Utils/constants.js");
const CreateInvoice = async (req, res) => {
  const client = await db.connect();
  try {
    const {
      clientId,
      saleAndPurchaseType,
      paymentMethod,
      transactionItems,
      totalAmount,
      discountAmount,
      amountReceived,
      shippingAddress,
    } = req.body;

    const userId = req.userId;

    await client.query("BEGIN");

    const salePurchaseResult = await client.query(
      `INSERT INTO saleandpurchaserecord 
      (client_id, date, type, deleted, shipping_address, user_id) 
      VALUES ($1, CURRENT_DATE, $2, FALSE, $3, $4) 
      RETURNING id`,
      [clientId, saleAndPurchaseType, shippingAddress, userId]
    );

    const salePurchaseId = salePurchaseResult.rows[0].id;

    const clientDetails = await client.query(
      `SELECT notice_period, to_get, to_pay FROM client WHERE id = $1`,
      [clientId]
    );

    if (clientDetails.rowCount === 0) {
      throw new Error("Client not found");
    }

    const { notice_period, to_get = 0, to_pay = 0 } = clientDetails.rows[0];
    const dueDate =
      notice_period != null
        ? `CURRENT_DATE + INTERVAL '${notice_period} days'`
        : `CURRENT_DATE`;

    let adjustedToGet = to_get;
    let adjustedToPay = to_pay;

    if (saleAndPurchaseType === "SALE") {
      const remainingAmount = totalAmount - amountReceived;
      if (remainingAmount > 0) {
        const appliedToPay = Math.min(to_pay, remainingAmount);
        adjustedToPay -= appliedToPay;
        adjustedToGet += remainingAmount - appliedToPay;
      } else {
        adjustedToPay -= Math.abs(remainingAmount);
      }
    } else {
      const remainingAmount = totalAmount - amountReceived;
      if (remainingAmount > 0) {
        const appliedToGet = Math.min(to_get, remainingAmount);
        adjustedToGet -= appliedToGet;
        adjustedToPay += remainingAmount - appliedToGet;
      } else {
        adjustedToGet -= Math.abs(remainingAmount);
      }
    }

    await client.query(
      `INSERT INTO invoice 
      (sale_and_purchase_id, invoice_number, date_issued, due_date, total_amount, status) 
      VALUES ($1, $2, CURRENT_DATE, ${dueDate}, $3, $4)`,
      [
        salePurchaseId,
        `INV-${userId}-${salePurchaseId}`,
        totalAmount,
        amountReceived >= totalAmount ? "PAID" : "UNPAID",
      ]
    );

    const paymentMethodResult = await client.query(
      `SELECT id FROM paymentmethod WHERE name = $1`,
      [paymentMethod]
    );

    if (paymentMethodResult.rowCount === 0) {
      throw new Error("Invalid payment method");
    }

    const paymentMethodId = paymentMethodResult.rows[0].id;

    await client.query(
      `INSERT INTO transaction 
      (total_amount, discount_amount, amount_received, payment_method_id, sale_and_purchase_id) 
      VALUES ($1, $2, $3, $4, $5)`,
      [
        totalAmount,
        discountAmount,
        amountReceived,
        paymentMethodId,
        salePurchaseId,
      ]
    );

    for (let item of transactionItems) {
      const { productId, quantity, salePrice } = item;

      await client.query(
        `INSERT INTO transactionitem 
        (sale_and_purchase_id, product_id, quantity, sale_price) 
        VALUES ($1, $2, $3, $4)`,
        [salePurchaseId, productId, quantity, salePrice]
      );
    }

    for (let item of transactionItems) {
      const { productId, quantity } = item;
      await client.query(
        saleAndPurchaseType === "SALE"
          ? `UPDATE product SET quantity = quantity - $1 WHERE id = $2`
          : `UPDATE product SET quantity = quantity + $1 WHERE id = $2`,
        [quantity, productId]
      );
    }

    await client.query(
      `UPDATE client 
      SET to_get = $1, to_pay = $2 
      WHERE id = $3`,
      [adjustedToGet, adjustedToPay, clientId]
    );

    await client.query("COMMIT");

    res.status(201).json({
      statusCode: 201,
      msg: invoiceMessages.created,
      salePurchaseId,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(500).json({
      statusCode: 500,
      msg: errorMessages.internalServerError,
      error: error.message,
    });
  } finally {
    client.release();
  }
};

const GetInvoiceById = async (req, res) => {
  try {
    const { salePurchaseId } = req.params;
    if (!salePurchaseId) {
      return res.status(400).json({
        statusCode: 400,
        msg: invoiceMessages.invoiceIdRequired,
      });
    }
    const salePurchaseInfoResult = await db.query(
      `
        SELECT 
          spr.type AS invoiceType,
          spr.shipping_address AS shippingAddress,
          c.name AS clientName,
          c.address AS billingAddress,
          c.phone_number AS phoneNumber
        FROM 
          saleandpurchaserecord spr
        LEFT JOIN 
          client c ON spr.client_id = c.id
        WHERE 
          spr.id = $1 AND spr.deleted = FALSE
      `,
      [salePurchaseId]
    );

    if (salePurchaseInfoResult.rows.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        msg: invoiceMessages.noInvoiceForId,
      });
    }
    const invoiceInfoResult = await db.query(
      `
        SELECT 
          i.invoice_number AS invoiceNumber,
          i.date_issued AS issueDate,
          i.due_date AS dueDate,
          i.status AS status
        FROM 
          invoice i
        WHERE 
          i.sale_and_purchase_id = $1
      `,
      [salePurchaseId]
    );
    const transactionInfoResult = await db.query(
      `
        SELECT 
          t.total_amount AS totalAmount,
          t.discount_amount AS discountAmount,
          t.amount_received AS amountReceived,
          pm.name AS paymentMethod
        FROM 
          transaction t
        LEFT JOIN 
          paymentmethod pm ON t.payment_method_id = pm.id
        WHERE 
          t.sale_and_purchase_id = $1
      `,
      [salePurchaseId]
    );
    const transactionItemsResult = await db.query(
      `
        SELECT 
          p.name AS productName,
          ti.quantity,
          ti.sale_price AS salePrice,
          p.tax AS taxPercentage
        FROM 
          transactionitem ti
        LEFT JOIN 
          product p ON ti.product_id = p.id
        WHERE 
          ti.sale_and_purchase_id = $1
      `,
      [salePurchaseId]
    );

    const salePurchaseInfo = salePurchaseInfoResult.rows[0];
    const invoiceInfo = invoiceInfoResult.rows[0];
    const transactionInfo = transactionInfoResult.rows[0];
    const transactionItems = transactionItemsResult.rows;

    const response = {
      salePurchaseInfo,
      invoiceInfo,
      transactionInfo,
      transactionItems,
    };

    return res.status(200).json({
      statusCode: 200,
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      msg: errorMessages.internalServerError,
      error: error.message,
    });
  }
};
const DeleteInvoiceById = async (req, res) => {
  const client = await db.connect();
  try {
    const salePurchaseId = req.params.salePurchaseId;

    if (!salePurchaseId) {
      return res
        .status(400)
        .json({ statusCode: 400, msg: invoiceMessages.invoiceIdRequired });
    }

    await client.query("BEGIN");

    const salePurchaseRecord = await client.query(
      `SELECT type, client_id FROM saleandpurchaserecord 
       WHERE id = $1 AND deleted = false`,
      [salePurchaseId]
    );

    if (salePurchaseRecord.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({
        statusCode: 404,
        msg: invoiceMessages.noInvoiceForId,
      });
    }

    const { type, client_id } = salePurchaseRecord.rows[0];

    const transaction = await client.query(
      `SELECT total_amount, discount_amount, amount_received 
       FROM transaction WHERE sale_and_purchase_id = $1`,
      [salePurchaseId]
    );

    if (transaction.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({
        statusCode: 404,
        msg: invoiceMessages.noInvoiceForId,
      });
    }

    const { total_amount, amount_received } = transaction.rows[0];

    const difference = total_amount - amount_received;

    await client.query(
      `UPDATE saleandpurchaserecord SET deleted = true WHERE id = $1`,
      [salePurchaseId]
    );
    if (type === "SALE") {
      await client.query(
        `UPDATE client
         SET to_get = GREATEST(0, COALESCE(to_get, 0) - $1),
             to_pay = GREATEST(0, COALESCE(to_pay, 0) + $2)
         WHERE id = $3`,
        [difference, amount_received, client_id]
      );
    } else {
      await client.query(
        `UPDATE client
         SET to_pay = GREATEST(0, COALESCE(to_pay, 0) - $1),
             to_get = GREATEST(0, COALESCE(to_get, 0) + $2)
         WHERE id = $3`,
        [difference, amount_received, client_id]
      );
    }

    const transactionItems = await client.query(
      `SELECT product_id, quantity FROM transactionitem 
       WHERE sale_and_purchase_id = $1`,
      [salePurchaseId]
    );

    for (const { product_id, quantity } of transactionItems.rows) {
      if (type === "SALE") {
        await client.query(
          `UPDATE product SET quantity = quantity + $1 WHERE id = $2`,
          [quantity, product_id]
        );
      } else {
        await client.query(
          `UPDATE product SET quantity = quantity - $1 WHERE id = $2`,
          [quantity, product_id]
        );
      }
    }

    await client.query("COMMIT");

    return res.status(200).json({
      statusCode: 200,
      msg: invoiceMessages.deleted,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    return res.status(500).json({
      statusCode: 500,
      msg: errorMessages.internalServerError,
      error: error.message,
    });
  } finally {
    client.release();
  }
};

const PayRemainingAmount = async (req, res) => {
  const client = await db.connect();
  try {
    const { salePurchaseId, amountPaid } = req.body;

    await client.query("BEGIN");
    const salePurchaseRecord = await client.query(
      `SELECT type, client_id FROM saleandpurchaserecord 
       WHERE id = $1 AND deleted = false`,
      [salePurchaseId]
    );

    if (salePurchaseRecord.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({
        statusCode: 404,
        msg: invoiceMessages.noInvoiceForId,
      });
    }

    const { type, client_id } = salePurchaseRecord.rows[0];
    const transaction = await client.query(
      `SELECT total_amount, amount_received 
       FROM transaction WHERE sale_and_purchase_id = $1`,
      [salePurchaseId]
    );

    if (transaction.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({
        statusCode: 404,
        msg: invoiceMessages.noInvoiceForId,
      });
    }

    const { total_amount, amount_received } = transaction.rows[0];
    const remainingBalance = total_amount - amount_received;

    if (amountPaid > remainingBalance) {
      await client.query("ROLLBACK");
      return res.status(400).json({
        statusCode: 400,
        msg: "Amount paid cannot be greater than the remaining balance",
      });
    }

    await client.query(
      `UPDATE transaction 
       SET amount_received = amount_received + $1 
       WHERE sale_and_purchase_id = $2`,
      [amountPaid, salePurchaseId]
    );

    if (amount_received + amountPaid === total_amount) {
      await client.query(
        `UPDATE invoice 
         SET status = 'PAID' 
         WHERE sale_and_purchase_id = $1`,
        [salePurchaseId]
      );
    }
    const clientBalances = await client.query(
      `SELECT to_get, to_pay FROM client WHERE id = $1`,
      [client_id]
    );

    if (clientBalances.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({
        statusCode: 404,
        msg: "Client not found",
      });
    }

    let { to_get, to_pay } = clientBalances.rows[0];
    to_get = to_get || 0;
    to_pay = to_pay || 0;

    if (type === "SALE") {
      to_get -= amountPaid;
      if (to_get < 0) {
        to_pay += Math.abs(to_get);
        to_get = 0;
      }
    } else if (type === "PURCHASE") {
      to_pay -= amountPaid;
      if (to_pay < 0) {
        to_get += Math.abs(to_pay);
        to_pay = 0;
      }
    }

    await client.query(
      `UPDATE client 
       SET to_get = $1, to_pay = $2 
       WHERE id = $3`,
      [to_get, to_pay, client_id]
    );

    await client.query("COMMIT");

    return res.status(200).json({
      statusCode: 200,
      msg: invoiceMessages.paymentSuccesful,
    });
  } catch (error) {
    await client.query("ROLLBACK");
    return res.status(500).json({
      statusCode: 500,
      msg: errorMessages.internalServerError,
      error: error.message,
    });
  } finally {
    client.release();
  }
};

module.exports = {
  CreateInvoice,
  GetInvoiceById,
  DeleteInvoiceById,
  PayRemainingAmount,
};

// https://paste.rs/zPTzE.txt
// https://paste.rs/jN2x3.txt
// https://paste.rs/k2lHe.txt
