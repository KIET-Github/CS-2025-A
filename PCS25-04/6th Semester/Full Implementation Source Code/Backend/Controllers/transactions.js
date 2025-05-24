const db = require("../Db/index.js");
const errorMessages = require("../Utils/constants.js");

const GetAllTransactionsByClientId = async (req, res) => {
  try {
    const clientId = parseInt(req.params.clientId);
    const result = await db.query(
      `SELECT t.*
       FROM transaction t
       JOIN saleandpurchaserecord sp ON t.sale_and_purchase_id = sp.id
       WHERE sp.client_id = $1 AND sp.Deleted = false
       ORDER BY sp.date DESC;`,
      [clientId]
    );
    return res.status(200).json({
      statusCode: 200,
      data: result.rows,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: errorMessages.internalServerError,
      error: error.message,
    });
  }
};

const GetUnpaidDueTransactions = async (req, res) => {
  try {
    const userId = parseInt(req.userId);
    const result = await db.query(
      `SELECT t.total_amount, 
              t.amount_received, 
              c.name AS client_name, 
              c.phone_number, 
              (i.due_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') AS due_date
       FROM transaction t
       JOIN saleandpurchaserecord sp ON t.sale_and_purchase_id = sp.id
       JOIN client c ON sp.client_id = c.id
       JOIN invoice i ON sp.id = i.sale_and_purchase_id 
       WHERE sp.user_id = $1
         AND (i.due_date AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') < NOW()
         AND t.amount_received < t.total_amount
         AND sp.deleted = false
       ORDER BY due_date ASC;`,
      [userId]
    );

    return res.status(200).json({
      statusCode: 200,
      data: result.rows,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: errorMessages.internalServerError,
      error: error.message,
    });
  }
};
const GetTransactionSummary = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await db.query(
      `SELECT 
          COALESCE(SUM(CASE WHEN sp.type = 'SALE' THEN t.total_amount ELSE 0 END), 0) AS total_sales,
          COALESCE(SUM(CASE WHEN sp.type = 'PURCHASE' THEN t.total_amount ELSE 0 END), 0) AS total_purchases
       FROM saleandpurchaserecord sp
       LEFT JOIN transaction t ON sp.id = t.sale_and_purchase_id
       WHERE sp.user_id = $1 AND sp.deleted = false;`,
      [userId]
    );

    const totalToGet = await db.query(
      `SELECT COALESCE(SUM(c.to_get), 0) AS total_to_get
      FROM client c WHERE c.user_id = $1 AND c.deleted = false;`,
      [userId]
    );

    const totalToPay = await db.query(
      `SELECT COALESCE(SUM(c.to_pay), 0) AS total_to_pay
       FROM  client c WHERE c.user_id = $1 AND c.deleted = false;`,
      [userId]
    );

    // Combine the results into a final response
    const summary = {
      total_sales: result.rows[0].total_sales,
      total_purchases: result.rows[0].total_purchases,
      total_to_get: totalToGet.rows[0].total_to_get,
      total_to_pay: totalToPay.rows[0].total_to_pay,
    };

    return res.status(200).json({
      statusCode: 200,
      data: summary,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: errorMessages.internalServerError,
      error: error.message,
    });
  }
};

const GetMonthlyTransactionSummary = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await db.query(
      `SELECT 
          COALESCE(SUM(CASE WHEN sp.type = 'SALE' THEN t.total_amount ELSE 0 END), 0) AS total_sales,
          COALESCE(SUM(CASE WHEN sp.type = 'PURCHASE' THEN t.total_amount ELSE 0 END), 0) AS total_purchases
       FROM saleandpurchaserecord sp
       LEFT JOIN transaction t ON sp.id = t.sale_and_purchase_id
       WHERE sp.user_id = $1 AND sp.deleted = false
         AND EXTRACT(MONTH FROM sp.date) = EXTRACT(MONTH FROM CURRENT_DATE) 
         AND EXTRACT(YEAR FROM sp.date) = EXTRACT(YEAR FROM CURRENT_DATE)`,
      [userId]
    );
    return res.status(200).json({
      statusCode: 200,
      data: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: errorMessages.internalServerError,
      error: error.message,
    });
  }
};

module.exports = {
  GetAllTransactionsByClientId,
  GetUnpaidDueTransactions,
  GetTransactionSummary,
  GetMonthlyTransactionSummary,
};
