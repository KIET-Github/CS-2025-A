// const db = require("../config/db");
// const { QueryTypes } = require("sequelize");

// const getEducationDetailsByStudentId = async (req, res) => {
//   try {
//     // Get the studentId from the request params
//     const { id } = req.params;
//     console.log("Student ID:", id); // Log student ID for debugging

//     // Query to fetch education details and degree info by student ID
//     const educationDetails = await db.query(
//       `
//       SELECT 
//         e.id AS education_id,
//         e.degree_id,
//         d.degree_name,
//         e.field,
//         e.school,
//         e.year,
//         e.percentage,
//         e.institute,
//         e.is_institute,
//         s.student_name,
//         s.email,
//         s.branch
//       FROM 
//         education_details e
//       LEFT JOIN 
//         degree d ON e.degree_id = d.degree_id
//       INNER JOIN 
//         student s ON e.s_id = s.s_id
//       WHERE 
//         e.s_id = ?;
//       `,
//       [id]
//     );

//     // Check if data was returned
//     if (educationDetails.length > 0) {
//       res.json({ item: educationDetails[0] });
//     } else {
//       res.status(404).json({ message: "No education details found for this student." });
//     }
//   } catch (error) {
//     console.error("Error fetching education details:", error); // More descriptive logging
//     res.status(500).json({ message: "Internal Server Error", error: error.message });
//   }
// };

// // const updateEducationDetails = async (req, res) => {
// //   const id = req.params.id;
// //   const {
// //     degree_id,
// //     field,
// //     school,
// //     year,
// //     percentage,
// //     institute,
// //     is_institute,
// //   } = req.body;

// //   const updateQuery = `
// //     UPDATE education_details
// //     SET degree_id = ?, field = ?, school = ?, year = ?, percentage = ?, institute = ?, is_institute = ?
// //     WHERE id = ?
// //   `;

// //   // Execute the update query
// //   db.query(
// //     updateQuery,
// //     [
// //       degree_id,
// //       field,
// //       school,
// //       year,
// //       percentage,
// //       institute,
// //       is_institute,
// //       id,
// //     ],
// //     (err, result) => {
// //       if (err) {
// //         console.error("Failed to update education details:", err);
// //         return res.status(500).json({ message: "Failed to update education details." });
// //       }
// //       return res.status(200).json({ message: "Education details updated successfully." });
// //     }
// //   );
// // }

// const updateEducationDetails = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       school,
//       year,
//       percentage,
//       field,
//       institute,
//     } = req.body;

//     // Build dynamic query based on provided fields
//     let updateFields = [];
//     let values = [];

//     if (school !== undefined) {
//       updateFields.push("school = ?");
//       values.push(school);
//     }

//     if (field !== undefined) {
//       updateFields.push("field = ?");
//       values.push(field);
//     }

//     if (institute !== undefined) {
//       updateFields.push("institute = ?");
//       values.push(institute);
//     }

//     if (year !== undefined) {
//       updateFields.push("year = ?");
//       values.push(year);
//     }

//     if (percentage !== undefined) {
//       updateFields.push("percentage = ?");
//       values.push(percentage);
//     }

//     if (updateFields.length === 0) {
//       return res.status(400).json({ message: "No valid fields provided for update" });
//     }

//     const updateQuery = `
//       UPDATE education_details
//       SET ${updateFields.join(", ")}
//       WHERE id = ?
//     `;

//     values.push(id);

//     const [result] = await db.query(updateQuery, values);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Education record not found" });
//     }

//     return res.status(200).json({ message: "Education details updated successfully." });

//   } catch (error) {
//     console.error("Failed to update education details:", error);
//     return res.status(500).json({ message: "Failed to update education details." });
//   }
// };



// module.exports = {
//   getEducationDetailsByStudentId, updateEducationDetails
// };








const db = require("../config/db");

const getEducationDetailsByStudentId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Student ID:", id);

  const educationDetails = await db.query(
  `
  SELECT 
    e.id AS education_id,
    e.degree_id,
    d.degree_name,
    e.field,
    e.school,
    e.s_id,
    e.year,
    e.percentage,
    s.student_name,
    s.email,
    s.branch
  FROM 
    education_details e
  LEFT JOIN 
    degree d ON e.degree_id = d.degree_id
  INNER JOIN 
    student s ON e.s_id = s.s_id
  WHERE 
    e.s_id = ?;
  `,
  [id]
);


    if (educationDetails.length > 0) {
      res.json({ item: educationDetails[0] });
    } else {
      res.status(404).json({ message: "No education details found for this student." });
    }
  } catch (error) {
    console.error("Error fetching education details:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


const updateEducationDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      school,
      year,
      percentage,
      field,
    } = req.body;

    let updateFields = [];
    let values = [];

    if (school !== undefined) {
      updateFields.push("school = ?");
      values.push(school);
    }

    if (field !== undefined) {
      updateFields.push("field = ?");
      values.push(field);
    }

    if (year !== undefined) {
      updateFields.push("year = ?");
      values.push(year);
    }

    if (percentage !== undefined) {
      updateFields.push("percentage = ?");
      values.push(percentage);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: "No valid fields provided for update" });
    }

    const updateQuery = `
      UPDATE education_details
      SET ${updateFields.join(", ")}
      WHERE id = ?
    `;

    values.push(id);

    const [result] = await db.query(updateQuery, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Education record not found" });
    }

    return res.status(200).json({ message: "Education details updated successfully." });

  } catch (error) {
    console.error("Failed to update education details:", error);
    return res.status(500).json({ message: "Failed to update education details." });
  }
};


const addEducationDetails = async (req, res) => {
  try {
    const { id } = req.params; // student ID from URL param
    const {
      degree_id,
      field,
      school,
      year,
      percentage,
    } = req.body;

    // Validate required fields
    if (!degree_id || !school || !year || !percentage) {
      return res.status(400).json({ message: "Missing required fields (degree_id, school, year, percentage)" });
    }

    // Insert query
    const insertQuery = `
      INSERT INTO education_details (s_id, degree_id, field, school, year, percentage)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [id, degree_id, field || '', school, year, percentage];

    const [result] = await db.query(insertQuery, values);

    return res.status(201).json({ message: "Education details added successfully", educationId: result.insertId });

  } catch (error) {
    console.error("Failed to add education details:", error);
    return res.status(500).json({ message: "Failed to add education details." });
  }
};


module.exports = {
  getEducationDetailsByStudentId,
  updateEducationDetails,
  addEducationDetails
};
