const Product = require("../model/product.Model");

const addProduct = async (req, res) => {
  try {
    const { productName, description, price, status, CategoryId } = req.body;
    const media = req.file;
    console.log(req.body);
    if (!productName && !media && !description && !price && !status) {
      return res.status(400).json({
        success: false,
        error: "Please Fill All the Fields",
        data: [],
      });
    } else {
      const insertData = await Product({
        productName,
        description,
        price,
        status,
        media,
        CategoryId,
      });
      await insertData.save();
      return res.status(201).json({
        success: true,
        message: "Product Data inserted Successfully",
        data: [insertData],
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server is Not Responding",
      data: [error.message],
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const _id = req.query.id; // id for particular product get it from frontend
    const getSingleProduct = await Product.find({ _id }).lean();
    if (getSingleProduct) {
      return res.status(200).json({
        success: true,
        message: "Data Fetched Successfully ",
        data: [getSingleProduct],
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Something went wrong",
        data: [],
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server is Not Responding",
      data: [error.message],
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const Products = await Product.find({}).lean();
    if (Products) {
      return res.status(200).json({
        success: true,
        message: "Data Fetched Successfully ",
        data: [Products],
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Something went wrong",
        data: [],
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server is Not Responding",
      data: [error.message],
    });
  }
};

// will Add Later when Code category
const getProductByCategory = async (req, res) => {
  const data = await Product.findOne({});
};
module.exports = { addProduct, getProduct, getAllProduct };
