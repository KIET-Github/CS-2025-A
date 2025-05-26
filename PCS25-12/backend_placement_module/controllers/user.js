
const bcrypt = require("bcrypt");
const JwtService = require("../services/JwtService");
const db = require("../config/db");

const LoginController = async ({ body: { email, password } }, res) => {
  try {
    const studentResult = await db.query("SELECT * FROM student WHERE email = ?", [email]);

    if (studentResult[0].length > 0) {
      const student = studentResult[0][0];

      const isMatch = await bcrypt.compare(password, student.password);
      if (!isMatch) {
        return res.status(401).send("Invalid email or password");
      }

      // Generate JWT token and include studentId (s_id) in the token
      const token = JwtService.sign({ email, studentId: student.s_id }); // Include studentId in token
      const { password: _, ...studentWithoutPassword } = student;

      return res.json({ token, user: { ...studentWithoutPassword, role: "student" } });
    }

    // Check authority table if not found in student table
    const authorityResult = await db.query("SELECT * FROM authority_table WHERE email = ?", [email]);
    if (authorityResult[0].length === 0) {
      return res.status(401).send("Invalid email or password");
    }

    const authority = authorityResult[0][0];
    const isMatch = await bcrypt.compare(password, authority.password);
    if (!isMatch) {
      return res.status(401).send("Invalid email or password");
    }

    const token = JwtService.sign({ email });
    const { password: _, role, ...authorityWithoutPassword } = authority;

    return res.json({ token, user: { ...authorityWithoutPassword, role } });
    
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  LoginController,
};
