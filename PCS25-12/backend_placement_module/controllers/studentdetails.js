
const db = require("../config/db");

// Assuming you have a database connection setup

// API endpoint to get student details
const getStudentDetails = async (req, res) => {
    try {
        // Fetch the student details from the database
        const studentDetails = await db.query("SELECT * FROM student");

        // Send the student details as a response
        res.status(200).json(studentDetails[0]);
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ error: "Failed to fetch student details" });
    }
};

// API endpoint to count the number of students
const numberOfStudents = async (req, res) => {

    const query = 'SELECT COUNT(*) AS count FROM student';

    db.query(query, (err, results) => {
        if (err) {
            // Handle the error
            console.error(err);
            res.status(500).json({ error: 'Failed to count students' });
        } else {
            // Return the count as JSON response
            res.json({ count: results[0].count });
        }
    });
};

module.exports = {  getStudentDetails, numberOfStudents };