const db = require("../config/db");


const addCompany = async (req, res) => {
    try {const { company_name, address, email, phone, website, description } = req.body;
     
      const item = await db.query("INSERT INTO company ( company_name, address, email, phone, website, description) VALUES (?,?,?,?,?,?)",[ company_name, address, email, phone, website, description ]);
      console.log(item);

  
      res.json({ item: item[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
      return;
    }
  };

// fecthing data from database for company details and job opening 
 
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO company (c_id, company_name, address, email, phone, website, description) VALUES ('2','TCS','model town', 'tcs@gmail.com','556658586565', 'tcs.com', 'Tata Consultancy Services Limited (TCS) is an Indian multinational information technology (IT) services and consulting company headquartered in Mumbai, Maharashtra, India. It is a subsidiary of the Tata Group and operates in 149 locations across 46 countries.')";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });
module.exports={
    addCompany
   
  }