const bcrypt = require("bcrypt");
const db = require("./config/db");

// Function to check if password is already hashed
const isHashed = (password) => password.startsWith("$2");

const hashExistingPasswords = async () => {
  try {
    // Step 1: Hash passwords for the student table
    const students = await db.query("SELECT * FROM student");

    for (const student of students[0]) {
      if (isHashed(student.password)) {
        console.log(`Password for student ${student.email} is already hashed, skipping...`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(student.password, 10);
      await db.query(
        "UPDATE student SET password = ? WHERE s_id = ?",
        [hashedPassword, student.s_id]
      );
      console.log(`Password for student ${student.email} hashed and updated`);
    }

    // Step 2: Hash passwords for the authority table
    const authorities = await db.query("SELECT * FROM authority_table");

    for (const authority of authorities[0]) {
      if (isHashed(authority.password)) {
        console.log(`Password for authority ${authority.email} is already hashed, skipping...`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(authority.password, 10);
      await db.query(
        "UPDATE authority_table SET password = ? WHERE authority_id = ?",
        [hashedPassword, authority.authority_id]
      );
      console.log(`Password for authority ${authority.email} hashed and updated`);
    }

    console.log("Password hashing completed.");
  } catch (error) {
    console.error("Error hashing and updating passwords:", error);
  }
};

module.exports = hashExistingPasswords;
