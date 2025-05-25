const statuses = ["Application Submitted", "Under Review", "Interview Process", "Hired"];

const companies = [
  {
    id: 1,
    name: "TCS",
    package: "120,000",
    registrationDate: "2024-08-20",
    image: "https://s7ap1.scene7.com/is/image/TCSCOMprod/tcs-dark-logo-1?wid=1000&hei=563&dpr=off",
    description:
      "Tata Consultancy Services (TCS) (BSE: 532540, NSE: TCS) is a digital transformation and technology partner of choice for industry-leading organizations worldwide. Since its inception in 1968, TCS has upheld the highest standards of innovation, engineering excellence and customer service.",
    eligibilityCriteria: ["Minimum G.P.A 7", "Zero Backlogs", "10/12th 75+%"],
    jobRole: "Software Engineer",
    jobResponsibilities: [
      "Design and develop scalable and efficient software solutions",
      "Collaborate with cross-functional teams to deliver high-quality products",
      "Participate in code reviews and provide feedback to improve codebase",
      "Stay up-to-date with the latest technologies and industry trends",
    ],
    jobRequirements: [
      "Bachelor's degree in Computer Science or a related field",
      "3+ years of experience in software development",
      "Proficient in JavaScript, React, and Node.js",
      "Strong problem-solving and analytical skills",
      "Excellent communication and collaboration skills",
    ],
    contact: {
      website: "https://www.techcorp.com",
      phone: "+1 (555) 987-6543",
    },
    appliedStudents: [
      { name: "Alice Johnson", dateApplied: "2024-08-15" },
      { name: "Bob Smith", dateApplied: "2024-08-16" },
    ],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  },
  {
    id: 2,
    name: "Accenture",
    package: "95,000",
    registrationDate: "2024-08-22",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU1VNTqHAGDcx3h7PgqvSxKZzDP7VoZsY9cQ&s",
    description:
      "Accenture plc is a global multinational professional services company originating in the United States and headquartered in Dublin, Ireland, that specializes in information technology services and management consulting. It was founded in 1989",
    eligibilityCriteria: ["Minimum G.P.A 6.5", "No more than 1 Backlog", "10/12th 70+%"],
    jobRole: "Product Manager",
    jobResponsibilities: [
      "Define product vision and strategy",
      "Work with engineering and design teams to develop product requirements",
      "Manage product lifecycle from conception to launch",
      "Analyze market trends and customer needs to drive product innovation",
    ],
    jobRequirements: [
      "Bachelor's degree in Business or a related field",
      "5+ years of experience in product management",
      "Strong understanding of product lifecycle management",
      "Excellent leadership and organizational skills",
    ],
    contact: {
      website: "https://www.innovatex.com",
      phone: "+1 (555) 654-3210",
    },
    appliedStudents: [
      { name: "Charlie Brown", dateApplied: "2024-08-18" },
      { name: "David Wilson", dateApplied: "2024-08-19" },
    ],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  },  {
    id: 3,
    name: "Infosys",
    package: "120,000",
    registrationDate: "2024-08-20",
    image: "https://brandlogos.net/wp-content/uploads/2022/02/infosys-logo-brandlogos.net_.png",
    description:
      "Infosys Limited is an Indian multinational technology company that offers business consulting, information technology, and outsourcing services. ",
    eligibilityCriteria: ["Minimum G.P.A 7", "Zero Backlogs", "10/12th 75+%"],
    jobRole: "Software Engineer",
    jobResponsibilities: [
      "Design and develop scalable and efficient software solutions",
      "Collaborate with cross-functional teams to deliver high-quality products",
      "Participate in code reviews and provide feedback to improve codebase",
      "Stay up-to-date with the latest technologies and industry trends",
    ],
    jobRequirements: [
      "Bachelor's degree in Computer Science or a related field",
      "3+ years of experience in software development",
      "Proficient in JavaScript, React, and Node.js",
      "Strong problem-solving and analytical skills",
      "Excellent communication and collaboration skills",
    ],
    contact: {
      website: "https://www.techcorp.com",
      phone: "+1 (555) 987-6543",
    },
    appliedStudents: [
      { name: "Alice Johnson", dateApplied: "2024-08-15" },
      { name: "Bob Smith", dateApplied: "2024-08-16" },
    ],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  },
];

export default companies;
