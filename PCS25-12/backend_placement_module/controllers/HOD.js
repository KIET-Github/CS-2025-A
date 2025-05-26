const db = require("../config/db");


const getHodDetails = async (req, res) => {
    try {
        // Fetch the HOD details from the database
        const hodDetails = await db.query("SELECT * FROM hod");

        // Send the HOD details as a response
        res.status(200).json(hodDetails);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: "Failed to fetch HOD details" });
    }
};

module.exports = {
    getHodDetails
};