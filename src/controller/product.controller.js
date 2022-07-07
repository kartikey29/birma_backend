// const Product = require("../model/product.Model");

const gSheetApiConfig = require("../utils/gSheet");

const getProducts = async (req, res) => {
  try {
    const { googleSheetsInstance, auth } = await gSheetApiConfig();
    const readData = await googleSheetsInstance.spreadsheets.values.get({
      auth, //auth object
      spreadsheetId: process.env.spreadsheetId, // spreadsheet id
      range: "products", //range of cells to read from.
    });
    const arrayOfObject = readData.data.values.map((element) => {
      const object = {
        Category: element[0],
        BrandName: element[1],
        ItemName: element[2],
        TITLE: element[3],
        ProductDescription: element[4],
        TechnicalSpecifications: element[5],
        MaximumRetailPrice: element[6],
        OurPrice: element[7],
        ProductLink: element[8],
        IMG1: element[9],
        IMG2: element[10],
        IMG3: element[11],
        IMG4: element[12],
        IMG5: element[13],
      };
      return object;
    });

    arrayOfObject.splice(0, 1);

    res.send(arrayOfObject);
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

module.exports = { getProducts };
