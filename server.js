const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3005;
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'images')));

// routes
app.use('/api/v1/subject', require('./routes/subjectRoutes'));
app.use('/api/v1/employee', require('./routes/employeeRoutes'));
app.use('/api/v1/session', require('./routes/sessionRoutes'));
app.use('/api/v1/workingdays', require('./routes/workingDaysRoutes'));
app.use('/api/v1/classroom', require('./routes/classroomRoutes'));
app.use('/api/v1/subjectteacher', require('./routes/subjectTeacherRoutes'));
app.use('/api/v1/vehicle', require('./routes/vehicleRoutes'));
app.use('/api/v1/root', require('./routes/rootRoutes'));
app.use('/api/v1/fee', require('./routes/feeRoutes'));
app.use('/api/v1/transaction', require('./routes/feeTransactionRoutes'));
app.use('/api/v1/student', require('./routes/studentRoutes'));
app.use('/api/v1/school', require('./routes/schoolRoutes'));
app.use('/api/v1/demo', require('./routes/demoRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));

// server
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
