const { productMessages, errorMessages } = require("../Utils/constants.js");
const db = require("../Db/index.js");

const CreateProduct = async (req, res) => {
  try {
    const { hsn, name, sale_price, cost_price, tax, quantity, min_qty } =
      req.body;
    const userId = req.userId;
    const result = await db.query(
      `WITH inserted AS (
         INSERT INTO product (hsn, name, sale_price, cost_price, tax, quantity, user_id,min_qty)
         VALUES ($1, $2, $3, $4, $5, $6, $7,$8)
         RETURNING id
       )
       SELECT id AS product_id FROM inserted`,
      [hsn, name, sale_price, cost_price, tax, quantity, userId, min_qty]
    );
    const productId = result.rows[0]?.product_id;

    return res.status(201).json({
      statusCode: 201,
      msg: productMessages.created,
      productId: productId,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      msg: errorMessages.internalServerError,
      error: error.message,
    });
  }
};

const GetAllProducts = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await db.query(
      `SELECT id, name, sale_price, cost_price, quantity
       FROM product
       WHERE user_id = $1 AND deleted = false`,
      [userId]
    );

    return res.status(200).json({
      statusCode: 200,
      data: result.rows,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      msg: errorMessages.internalServerError,
      error: error.message,
    });
  }
};

const GetProductByID = async (req, res) => {
  try {
    const productId = req.params.productId;
    const result = await db.query(
      `SELECT name, hsn, sale_price, cost_price, tax, quantity, min_qty
       FROM product
       WHERE id = $1 AND deleted = false`,
      [productId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        msg: productMessages.noProductForId,
      });
    }
    return res.status(200).json({
      statusCode: 200,
      data: result.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      msg: errorMessages.internalServerError,
      error: error.message,
    });
  }
};

const UpdateProductById = async (req, res) => {
  try {
    const { id, hsn, name, sale_price, cost_price, tax, quantity, min_qty } =
      req.body;
    if (id == null) {
      return res.status(400).json({
        statusCode: 400,
        msg: productMessages.productIdRequired,
      });
    }
    const result = await db.query(
      `UPDATE product
       SET hsn = $1, name = $2, sale_price = $3, cost_price = $4, tax = $5, quantity = $6 ,min_qty = $8
       WHERE id = $7 AND deleted = false`,
      [hsn, name, sale_price, cost_price, tax, quantity, id, min_qty]
    );
    if (result.rowCount > 0) {
      return res.status(200).json({
        statusCode: 200,
        message: productMessages.updated,
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        message: productMessages.noChange,
      });
    }
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: errorMessages.internalServerError,
      error: error.message,
    });
  }
};

const DeleteProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const result = await db.query(
      `UPDATE product
       SET deleted = true
       WHERE id = $1 AND deleted = false`,
      [productId]
    );
    if (result.rowCount > 0) {
      return res.status(200).json({
        statusCode: 200,
        message: productMessages.deleted,
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        message: productMessages.noChange,
      });
    }
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: errorMessages.internalServerError,
      error: error.message,
    });
  }
};

const GetLowStockProducts = async (req, res) => {
  try {
    const userId = parseInt(req.userId);
    const result = await db.query(
      `SELECT name, quantity
       FROM product
       WHERE deleted = false
         AND quantity < min_qty
         AND user_id = $1`,
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

const UpdateProductStock = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { quantityToAdd } = req.body;

    if (!productId) {
      return res.status(400).json({
        statusCode: 400,
        message: productMessages.productIdRequired,
      });
    }
    const checkProduct = await db.query(
      "SELECT quantity FROM product WHERE id = $1 AND deleted = false",
      [productId]
    );
    if (checkProduct.rows.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        message: productMessages.noProductForId,
      });
    }
    const result = await db.query(
      "UPDATE product SET quantity = quantity + $2 WHERE id = $1 AND deleted = false",
      [productId, quantityToAdd]
    );

    if (result.rowCount > 0) {
      return res.status(200).json({
        statusCode: 200,
        msg: productMessages.updated,
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        msg: productMessages.noChange,
      });
    }
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      msg: errorMessages.internalServerError,
      error: error.message,
    });
  }
};
const GetAllProductsList = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await db.query(
      `SELECT id, name
       FROM product
       WHERE user_id = $1 AND deleted = false And quantity > 0`,
      [userId]
    );
    return res.status(200).json({
      statusCode: 200,
      data: result.rows,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      msg: errorMessages.internalServerError,
      error: error.message,
    });
  }
};
module.exports = {
  CreateProduct,
  GetAllProducts,
  GetProductByID,
  UpdateProductById,
  DeleteProductById,
  GetLowStockProducts,
  UpdateProductStock,
  GetAllProductsList,
};
