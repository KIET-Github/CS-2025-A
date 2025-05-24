# BillWisePro - Invoice Management System

BillWisePro is a comprehensive invoice management system designed for businesses to manage their sales, purchases, clients, products, and transactions efficiently. The application provides a complete solution for invoice generation, client management, and business analytics.

## 🌐 Live Demo

**Live Application:** [http://billwiseprofrontend.vercel.app/](http://billwiseprofrontend.vercel.app/)

> **Note:** The live demo is deployed on Vercel and showcases the complete functionality of the BillWisePro application.

## 🚀 Technology Stack

### Frontend

- **React 18.3.1** - Modern JavaScript library for building user interfaces
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - State management
- **React Hook Form** - Form handling and validation
- **SASS** - CSS preprocessor for styling
- **React Toastify** - Toast notifications
- **React Icons** - Icon library
- **Date-fns** - Date utility library

### Backend

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **JWT (JSON Web Tokens)** - Authentication
- **Zod** - Schema validation
- **CORS** - Cross-origin resource sharing
- **Swagger** - API documentation
- **Nodemon** - Development server auto-restart

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **PostgreSQL** (v12 or higher) - [Download here](https://www.postgresql.org/download/)
- **Git** - [Download here](https://git-scm.com/)

## 📁 Project Structure

```
Full Implementation Source Code/
├── Backend/                 # Node.js/Express backend
│   ├── Controllers/         # Route controllers
│   ├── Db/                 # Database connection
│   ├── Middlewares/        # Custom middlewares
│   ├── Routes/             # API routes
│   ├── Utils/              # Utility functions
│   ├── config.js           # Configuration file
│   ├── index.js            # Main server file
│   └── package.json        # Backend dependencies
├── Frontend/               # React frontend
│   ├── public/             # Public assets
│   ├── src/                # Source code
│   │   ├── components/     # Reusable components
│   │   ├── containers/     # Page containers
│   │   ├── assets/         # Static assets
│   │   ├── styles/         # SASS stylesheets
│   │   └── utils/          # Utility functions
│   └── package.json        # Frontend dependencies
└── SQL/                    # Database schema
    └── Schema.sql.txt      # Database schema file
```

## 🗄️ Database Setup

### 1. Install PostgreSQL

Download and install PostgreSQL from the official website.

### 2. Create Database

```sql
-- Connect to PostgreSQL as superuser
CREATE DATABASE billwisepro;
CREATE USER billwisepro_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE billwisepro TO billwisepro_user;
```

### 3. Run Schema

Navigate to the SQL folder and execute the schema:

```bash
# Connect to your PostgreSQL database
psql -U billwisepro_user -d billwisepro

# Run the schema file
\i Schema.sql.txt
```

Or copy the contents of `SQL/Schema.sql.txt` and execute it in your PostgreSQL client.

### 4. Insert Default Payment Methods

```sql
INSERT INTO paymentmethod (name) VALUES
('Cash'),
('Credit Card'),
('Debit Card'),
('Bank Transfer'),
('UPI'),
('Cheque');
```

## ⚙️ Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `Backend` directory:

```env
# Database Configuration
DATABASE_URL=postgresql://billwisepro_user:your_password@localhost:5432/billwisepro

# JWT Configuration
JWT_SECRET=billwisepro-backend

# Server Configuration
PORT=5001
NODE_ENV=development
```

### Frontend Environment Variables

Create a `.env` file in the `Frontend` directory:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:5001/api/v1

# Other configurations
REACT_APP_ENV=development
```

## 🛠️ Installation Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "PCS25-04/7th Semester/Full Implementation Source Code"
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Start the development server
npm start
```

The backend server will start on `http://localhost:5001`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd Frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend application will start on `http://localhost:3000`

## 🚀 Running the Application

### Development Mode

1. **Start Backend Server:**

```bash
cd Backend
npm start
```

2. **Start Frontend Application:**

```bash
cd Frontend
npm start
```

3. **Access the Application:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5001/api/v1`

### Production Build

1. **Build Frontend:**

```bash
cd Frontend
npm run build
```

2. **Start Backend:**

```bash
cd Backend
npm start
```

## 📱 Application Features

- **User Authentication** - Secure login/registration system
- **Dashboard** - Business analytics and overview
- **Client Management** - Add, edit, and manage clients
- **Product Management** - Inventory and product catalog
- **Invoice Generation** - Create sales and purchase invoices
- **Transaction Tracking** - Monitor all business transactions
- **User Profile** - Manage user account and company details
- **Responsive Design** - Works on desktop and mobile devices

## 🔗 API Endpoints

The backend provides RESTful APIs for:

- `/api/v1/auth` - Authentication (login/register)
- `/api/v1/user` - User management
- `/api/v1/client` - Client operations
- `/api/v1/product` - Product management
- `/api/v1/invoice` - Invoice operations
- `/api/v1/transactions` - Transaction handling

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error:**

   - Verify PostgreSQL is running
   - Check DATABASE_URL in .env file
   - Ensure database and user exist

2. **Frontend API Calls Failing:**

   - Verify backend server is running on port 5001
   - Check REACT_APP_API_BASE_URL in frontend .env

3. **Port Already in Use:**

   - Change PORT in backend .env file
   - Update REACT_APP_API_BASE_URL accordingly

4. **Module Not Found Errors:**
   - Delete node_modules and package-lock.json
   - Run `npm install` again

### Database Reset

If you need to reset the database:

```sql
DROP DATABASE billwisepro;
CREATE DATABASE billwisepro;
-- Then run the schema again
```

## 📞 Support

For any issues or questions regarding the setup and usage of BillWisePro, please refer to the troubleshooting section above or contact the development team.

---

**Note:** This is a final year project implementation. Ensure all dependencies are properly installed and environment variables are correctly configured before running the application.
