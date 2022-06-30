const personRoute = require("express").Router();
const upload = require("../utils/personImage");

const { addPerson, getPerson } = require("../controller/person.controller");

personRoute.get("/person", getPerson);

personRoute.post("/insert-person", upload.single("logo"), addPerson);

module.exports = personRoute;
