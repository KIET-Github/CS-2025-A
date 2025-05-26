import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';

// Student Pages
import StudentDashboard from './Pages/Student/StudentSidebar/StudentSidebar';
import StudentHome from './Pages/Student/StudentHome/StudentHome';
import StudentSidebar from './Pages/Student/StudentSidebar/StudentSidebar';
import CompanyDetails from './Components/CompanyDetails/CompanyDetails';
import AppliedCompanies from './Pages/Student/AppliedCompanies/AppliedCompanies';
import EducationDetails from './Pages/Student/Education Details/EducationDetails';

// Admin Pages
import AdminHome from './Pages/Admin/AdminHome/AdminHome';
import AdminSidebar from './Pages/Admin/AdminSidebar/AdminSidebar';
import AllStudents from './Pages/Admin/AllStudents/AllStudents';
import AllHod from './Pages/Admin/AllHod/AllHod';
import CompanyCardList from './Pages/Admin/CompaniesList/CompaniesList';
import StudentDetails from './Components/StudentDetails/StudentDetails';

// Company Pages
import CompanySidebar from './Pages/Company/CompanySidebar/CompanySidebar';
import CompanyDashboard from './Pages/Company/CompanyDashboard/CompanyDashboard';
import AddJobRole from './Pages/Company/AddJobRole/AddJobRole';
import CompanyJobListings from './Pages/Company/CompanyJobListing/CompanyJobListing';
import CompanyApplications from './Pages/Company/CompanyApplications/CompanyApplications';

// Test Components
import StudentFilter from './Components/Test/Test';
import SignIn from './Pages/Auth/SignIn/Signin';
import ChangePassword from './Pages/Auth/ChangePassword/ChangePassword';

// Auth Wrapper Component
function AuthWrapper({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token and role exist in local storage
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
      // If token or role is missing, navigate to signin
      navigate('/signin');
    } else {
      // Only redirect to the dashboard when the path is '/'
      if (window.location.pathname === '/') {
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "hod") {
          navigate("/hod-dashboard");
        } else if (role === "company") {
          navigate("/company");
        } else if (role === "student") {
          navigate("/student");
        }
      }
    }
  }, [navigate]);

  return children;
}

function App() {
  return (
    <div className="min-h-screen bg-[#172554]">
      <Router>
        <AuthWrapper>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Auth */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/changepassword" element={<ChangePassword />} />

            {/* Student Routes */}
            <Route path="/student" element={<div><StudentDashboard /><StudentHome /></div>} />
            <Route path="/student/company/:id" element={<div><StudentSidebar /><CompanyDetails /></div>} />
            <Route path="/student/appliedcompanies" element={<div><StudentSidebar /><AppliedCompanies /></div>} />
            <Route path="/student/educationdetails" element={<div><StudentSidebar /><EducationDetails /></div>} />
            <Route path="/student/profile" element={<div><StudentSidebar /><StudentDetails /></div>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<div><AdminSidebar /><AdminHome /></div>} />
            <Route path="/admin/hods" element={<div><AdminSidebar /><AllHod /></div>} />
            <Route path="/admin/companies" element={<div><AdminSidebar /><CompanyCardList /></div>} />
            <Route path="/admin/students" element={<div><AdminSidebar /><AllStudents /></div>} />
            <Route path="/admin/companies/company/:id" element={<div><AdminSidebar /><CompanyDetails /></div>} />
            <Route path="/admin/students/:rollNo" element={<div><AdminSidebar /><StudentDetails /></div>} />

            {/* Company Routes */}
            <Route path="/company" element={<div><CompanySidebar /><CompanyDashboard studentsCount={150} companiesCount={50} batch="2024" /></div>} />
            <Route path="/company/addjobrole" element={<div><CompanySidebar /><AddJobRole /></div>} />
            <Route path="/company/listedroles" element={<div><CompanySidebar /><CompanyJobListings /></div>} />
            <Route path="/company/applications" element={<div><CompanySidebar /><CompanyApplications /></div>} />

            {/* Test Route */}
            <Route path="/test" element={<StudentFilter />} />
          </Routes>
        </AuthWrapper>
      </Router>
    </div>
  );
}

export default App;
