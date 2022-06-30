const { Person } = require("../model/person.Model");

const addPerson = async (req, res, next) => {
	try {
		const { UID, firstName, lastName, phone, image } = req.body;

		const addDetail = await new Person({
			UID,
			firstName,
			lastName,
			phone,
			image: req.file.filename,
			state: true,
		});

		const Data = await addDetail.save();

		return res.status(200).json({
			success: true,
			message: " Data Successfully Uploaded",
			data: [Data],
		});
	} catch (error) {
		return res.status(504).json({ error: "Server is not responding " });
	}
};

const getPerson = async (req, res, next) => {
	try {
		const fetchedData = await Person.person.find({});

		return res.status(200).json({
			success: true,
			message: "Data Fetched SuccessFully ",
			data: [
				{
					_id: fetchedData._id,
					UID: fetchedData.UID,
					firstName: fetchedData.firstName,
					lastName: fetchedData.lastName,
					phone: fetchedData.phone,
					image: fetchedData.image,
					state: fetchedData.state,
				},
			],
		});
	} catch (error) {
		return res.status(504).json({ errro: "Server is not responding " });
	}
};

module.exports = { addPerson, getPerson };
