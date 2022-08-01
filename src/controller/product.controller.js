const totalRating = require("../helperFunctions/getTotalRating");
const Product = require("../model/product.Model");
const Review = require("../model/review.Model");

const gSheetApiConfig = require("../utils/gSheet");

const getOptions = (page, sort) => {
  const options = {
    page: page,
    limit: 20,
    sort: sort,
    lean: true,
  };
  return options;
};

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
    console.log(readData.data.values.length);
    //maping data to json as it comes in text array
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
          element[10],//get image 
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
    const { page, search } = req.query;
    let searchClause = {};
    let sort = {
      createdAt: -1,
    };

    if (search) {
      sort = {
        score: { $meta: "textScore" },
      };
      searchClause = {
        $text: { $search: search },
        score: { $meta: "textScore" },
      };
    }
    const options = getOptions(page, sort);

    const allProductData = await Product.paginate(searchClause, options);

    allProductData.docs = await Promise.all(
      allProductData.docs.map(async (product) => {
        const review = await Review.find({ productId: product._id });
        const rating = totalRating(review);
        return { ...product, rating };
      })
    );

    return res.send(allProductData);
  } catch (e) {
    return res.status(504).send(e);
  }
};

const getProductById = async (req, res) => {
  try {
    const getProduct = await Product.findById(req.params);
    if (!getProduct) {
      throw { message: "product id not found" };
    }
    return res.send(getProduct);
  } catch (e) {
    return res.status(504).send(e);
  }
}

const rateProduct = async (req, res) => {
  try {
    // console.log(req.body)
    const { role_Id, _id } = req.user;
    console.log(_id);
    if (role_Id != '1') {
      throw { message: "client id not found" };
    } //check roleid
    const checkProduct = await Product.findById(req.params);
    if (!checkProduct) {
      throw { message: "productId not found" }
    }
    const checkProductUser = await Review.findOne({ productId: req.params, user: _id });
    if (checkProductUser) {
      throw { message: "already reviewed" };
    }
    const saveReview = new Review({
      productId: req.params,
      user: _id,
      rating: req.body.rating,
      review: req.body.review
    });
    return res.send(await saveReview.save());
  } catch (e) {
    return res.status(504).send(e);
  }
}


module.exports = { refreshProductList, getProducts, getProductById, rateProduct };
