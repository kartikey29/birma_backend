const Product = require("../model/product.Model");

const gSheetApiConfig = require("../utils/gSheet");

const refreshProductList = async (req, res) => {
  try {
    const deletedCount = await Product.deleteMany({});
    console.log(deletedCount);
    const { googleSheetsInstance, auth } = await gSheetApiConfig();
    const readData = await googleSheetsInstance.spreadsheets.values.get({
      auth, //auth object
      spreadsheetId: process.env.spreadsheetId, // spreadsheet id
      range: "products", //range of cells to read from.
    });
    readData.data.values.splice(0, 1);
    readData.data.values.map(async (element) => {
      const object = new Product({
        Category: element[0],
        BrandName: element[1],
        ItemName: element[2],
        TITLE: element[3],
        ProductDescription: element[4],
        TechnicalSpecifications: element[5],
        MaximumRetailPrice: element[6],
        OurPrice: element[7],
        ProductLink: element[8],
        Images: [
          element[9],
          element[10],
          element[11],
          element[12],
          element[13],
        ],
      });
      await object.save();
    });
    return res.send({ message: "Product list refreshed" });
  } catch (e) {
    return res.status(504).send(e);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { page } = req.query;
    const options = {
      page: page,
      limit: 20,
    };
    const allProductData = await Product.paginate({}, options);
    return res.send(allProductData);
  } catch (e) {
    return res.status(504).send(e);
  }
};

// const addProduct = async (req, res) => {
//   try {
//     const { productName, description, price, status, CategoryId } = req.body;
//     const media = req.file;
//     console.log(req.body);
//     if (!productName && !media && !description && !price && !status) {
//       return res.status(400).json({
//         success: false,
//         error: "Please Fill All the Fields",
//         data: [],
//       });
//     } else {
//       const insertData = await Product({
//         productName,
//         description,
//         price,
//         status,
//         media,
//         CategoryId,
//       });
//       await insertData.save();
//       return res.status(201).json({
//         success: true,
//         message: "Product Data inserted Successfully",
//         data: [insertData],
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: "Server is Not Responding",
//       data: [error.message],
//     });
//   }
// };

// const getProduct = async (req, res) => {
//   try {
//     const _id = req.query.id; // id for particular product get it from frontend
//     const getSingleProduct = await Product.find({ _id }).lean();
//     if (getSingleProduct) {
//       return res.status(200).json({
//         success: true,
//         message: "Data Fetched Successfully ",
//         data: [getSingleProduct],
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         error: "Something went wrong",
//         data: [],
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: "Server is Not Responding",
//       data: [error.message],
//     });
//   }
// };

// const getAllProduct = async (req, res) => {
//   try {
//     const Products = await Product.find({}).lean();
//     if (Products) {
//       return res.status(200).json({
//         success: true,
//         message: "Data Fetched Successfully ",
//         data: [Products],
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         error: "Something went wrong",
//         data: [],
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: "Server is Not Responding",
//       data: [error.message],
//     });
//   }
// };

// // will Add Later when Code category
// const getProductByCategory = async (req, res) => {
//   const data = await Product.findOne({});
// };

module.exports = { getAllProducts, refreshProductList };
