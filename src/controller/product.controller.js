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

const getProducts = async (req, res) => {
  try {
    const { page } = req.query;
  } catch (e) {
    return res.status(504).send(e);
  }
};

module.exports = { getProducts, refreshProductList };
