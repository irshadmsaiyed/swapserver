const multer = require('multer');
const db = require('../db');
const {
  totalRecordCount,
  recordExist,
  createUser,
} = require('../utils/helpers');

// =============> UPLOAD IMAGE <=============
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './images/employee/profile');
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}.jpg`);
    },
  }),
}).single('profile_image');

// =============> CREATE NEW EMPLOYEE <=============
const createEmployee = async (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    address,
    city,
    taluka,
    district,
    pin,
    state,
    birth_date,
    gender,
    caste,
    religion,
    mobile_no1,
    mobile_no2,
    whatsapp_no,
    email,
    appointment_nature,
    experience_years,
    joining_date,
    educational_qualification,
    professional_qualification,
    driving_licence,
    appointed_section,
    designation,
    medium,
    appointed_subject,
    main_subject1,
    main_subject2,
    subsidiary_subject1,
    subsidiary_subject2,
    subsidiary_subject3,
    monthly_salary,
    sanctioned_leave,
    aadhar_no,
    pan_no,
    bank_account,
    bank_name,
    branch_name,
    ifsc_code,
    recruited_by,
    profile_image,
  } = req.body;

  const bornDate = new Date(birth_date);
  const joinDate = new Date(joining_date);
  const values = [
    first_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    middle_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    last_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    address.replace(/\s+/g, ' ').trim().toUpperCase(),
    city.replace(/\s+/g, ' ').trim().toUpperCase(),
    taluka.replace(/\s+/g, ' ').trim().toUpperCase(),
    district,
    Number(pin),
    state,
    bornDate,
    gender,
    caste,
    religion,
    mobile_no1,
    mobile_no2,
    whatsapp_no,
    email.replace(/\s+/g, ' ').trim().toLowerCase(),
    appointment_nature,
    Number(experience_years),
    joinDate,
    educational_qualification,
    professional_qualification,
    driving_licence.replace(/\s+/g, ' ').trim(),
    appointed_section,
    designation,
    medium,
    appointed_subject,
    main_subject1,
    main_subject2,
    subsidiary_subject1,
    subsidiary_subject2,
    subsidiary_subject3,
    Number(monthly_salary),
    Number(sanctioned_leave),
    aadhar_no.replace(/\s+/g, ' ').trim(),
    pan_no.replace(/\s+/g, ' ').trim(),
    bank_account.replace(/\s+/g, ' ').trim(),
    bank_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    branch_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    ifsc_code.replace(/\s+/g, ' ').trim().toUpperCase(),
    recruited_by.replace(/\s+/g, ' ').trim().toUpperCase(),
    profile_image,
  ];

  try {
    const sql =
      'INSERT INTO employee (first_name, middle_name, last_name, address, city, taluka, district, pin, state, birth_date, gender, caste, religion, mobile_no1, mobile_no2, whatsapp_no, email, appointment_nature, experience_years, joining_date, educational_qualification, professional_qualification, driving_licence, appointed_section, designation, medium, appointed_subject, main_subject1, main_subject2, subsidiary_subject1, subsidiary_subject2, subsidiary_subject3, monthly_salary, sanctioned_leave, aadhar_no, pan_no, bank_account, bank_name, branch_name, ifsc_code, recruited_by, profile_image, updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,now()) returning *';
    const { rows } = await db.query(sql, values);
    const employeeId = rows[0].id;
    const {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      birth_date: birthDate,
    } = rows[0];
    const user = await createUser(
      'employee',
      employeeId,
      firstName,
      middleName,
      lastName,
      birthDate
    );
    if (user) {
      res.status(200).json({
        status: 'success with user updated',
        rows,
      });
    } else {
      res.status(200).json({
        status: 'success with user not updated',
        rows,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
};

// =============> READ OR GET ALL EMPLOYEES <=============
const getAllEmployees = async (req, res) => {
  const { page, limit, searchByName } = req.query;
  const pageNo = page > 0 ? page - 1 : 1;
  const offset = page > 0 ? limit * pageNo : 0;
  const pageLimit = Number(limit) || 5;
  const searchText = searchByName ? `%${searchByName}%` : '%%';

  const sql = `SELECT id, first_name, last_name, designation, appointed_section, medium, appointed_subject, educational_qualification,professional_qualification, mobile_no1, mobile_no2, profile_image FROM employee WHERE first_name LIKE $1 ORDER BY id DESC LIMIT $2 OFFSET $3`;
  let values = [];
  values = [...values, searchText, pageLimit, offset];
  try {
    const { rows } = await db.query(sql, values);

    const totalRecords = searchByName
      ? Number(rows.length)
      : await totalRecordCount('employee');

    const totalPages = Math.ceil(totalRecords / pageLimit);

    res.status(200).json({
      success: true,
      totalPages,
      rows,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
};

// =============> READ OR GET EMPLOYEE BY ID <=============
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM employee WHERE id=$1';
    const { rows } = await db.query(sql, [id]);
    const { length } = rows;
    if (length > 0) {
      res.status(200).json({
        success: true,
        rows,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Record not found.',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
};

// =============> UPDATE EXISTING EMPLOYEE <=============
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const {
    first_name,
    middle_name,
    last_name,
    address,
    city,
    taluka,
    district,
    pin,
    state,
    birth_date,
    gender,
    caste,
    religion,
    mobile_no1,
    mobile_no2,
    whatsapp_no,
    email,
    appointment_nature,
    experience_years,
    joining_date,
    educational_qualification,
    professional_qualification,
    driving_licence,
    appointed_section,
    designation,
    medium,
    appointed_subject,
    main_subject1,
    main_subject2,
    subsidiary_subject1,
    subsidiary_subject2,
    subsidiary_subject3,
    monthly_salary,
    sanctioned_leave,
    aadhar_no,
    pan_no,
    bank_account,
    bank_name,
    branch_name,
    ifsc_code,
    recruited_by,
  } = req.body;

  const bornDate = new Date(birth_date);
  const joinDate = new Date(joining_date);

  const values = [
    first_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    middle_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    last_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    address.replace(/\s+/g, ' ').trim().toUpperCase(),
    city.replace(/\s+/g, ' ').trim().toUpperCase(),
    taluka.replace(/\s+/g, ' ').trim().toUpperCase(),
    district,
    Number(pin),
    state,
    bornDate,
    gender,
    caste,
    religion,
    mobile_no1,
    mobile_no2,
    whatsapp_no,
    email.replace(/\s+/g, ' ').trim().toLowerCase(),
    appointment_nature,
    Number(experience_years),
    joinDate,
    educational_qualification,
    professional_qualification,
    driving_licence.replace(/\s+/g, ' ').trim(),
    appointed_section,
    designation,
    medium,
    appointed_subject,
    main_subject1,
    main_subject2,
    subsidiary_subject1,
    subsidiary_subject2,
    subsidiary_subject3,
    Number(monthly_salary),
    Number(sanctioned_leave),
    aadhar_no.replace(/\s+/g, ' ').trim(),
    pan_no.replace(/\s+/g, ' ').trim(),
    bank_account.replace(/\s+/g, ' ').trim(),
    bank_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    branch_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    ifsc_code.replace(/\s+/g, ' ').trim().toUpperCase(),
    recruited_by.replace(/\s+/g, ' ').trim().toUpperCase(),
  ];

  try {
    let sql =
      'UPDATE employee SET first_name=$1, middle_name=$2, last_name=$3, address=$4, city=$5, taluka=$6, district=$7, pin=$8, state=$9, birth_date=$10, gender=$11, caste=$12, religion=$13, mobile_no1=$14, mobile_no2=$15, whatsapp_no=$16, email=$17, appointment_nature=$18, experience_years=$19, joining_date=$20, educational_qualification=$21, professional_qualification=$22, driving_licence=$23, appointed_section=$24, designation=$25, medium=$26, appointed_subject=$27, main_subject1=$28, main_subject2=$29, subsidiary_subject1=$30, subsidiary_subject2=$31, subsidiary_subject3=$32, monthly_salary=$33, sanctioned_leave=$34, aadhar_no=$35, pan_no=$36, bank_account=$37, bank_name=$38, branch_name=$39, ifsc_code=$40, recruited_by=$41, updated_at=now() ';
    const recordPresent = await recordExist('employee', Number(id));
    if (recordPresent) {
      if (req.file) {
        sql += 'profile_image=$42 WHERE id=$43 returning *';
        let filePath = req.file.path.replace(/\\/g, '/').split('images/')[1];
        const proxyHost = req.headers['x-forwarded-host'];
        const host = proxyHost || req.headers.host;
        filePath = `http://${host}/static/${filePath}`;
        values.push(filePath);
        values.push(Number(id));
      } else {
        sql += 'WHERE id=$42 returning *';
        values.push(Number(id));
      }
      const { rows } = await db.query(sql, values);
      const employeeId = rows[0].id;
      const {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        birth_date: birthDate,
      } = rows[0];
      const user = await createUser(
        'employee',
        employeeId,
        firstName,
        middleName,
        lastName,
        birthDate
      );
      if (user) {
        res.status(200).json({
          status: 'success with user updated',
          rows,
        });
      } else {
        res.status(200).json({
          status: 'success with user not updated',
          rows,
        });
      }
    } else {
      res.status(404).json({
        status: 'not found',
        message: 'Record not found.',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
};

// =============> DELETE EXISTING EMPLOYEE <=============
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('employee', Number(id));
    if (recordPresent) {
      const sql = 'DELETE FROM employee WHERE id=$1';
      await db.query(sql, [id]);
      res.status(200).json({
        success: true,
        message: 'Record deleted successfully.',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Record not found.',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
};

// =============> read or get teachers <=============
const getTeachers = async (req, res) => {
  const sql =
    "SELECT id AS teacher_id, CONCAT(first_name,' ',last_name) AS teacher_name FROM employee WHERE designation='PRINCIPAL' or designation='SUPERVISOR TEACHER' or designation='ASSISTANT TEACHER' ORDER BY teacher_name";
  try {
    const { rows } = await db.query(sql);
    res.status(200).json({
      success: true,
      rows,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
};

// =============> read or get drivers <=============
const getDrivers = async (req, res) => {
  const sql =
    "SELECT id AS driver_id, CONCAT(first_name,' ',last_name) AS driver_name FROM employee WHERE designation='DRIVER' ORDER BY driver_name";
  try {
    const { rows } = await db.query(sql);
    res.status(200).json({
      success: true,
      rows,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
};

// =============> read or get all employee <=============
const getEmployees = async (req, res) => {
  const sql =
    "SELECT id AS employee_id, CONCAT(first_name,' ',last_name) AS employee_name FROM employee ORDER BY employee_name";
  try {
    const { rows } = await db.query(sql);
    res.status(200).json({
      success: true,
      rows,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
};

// =============> read or get all user employees <=============
const getUserEmployees = async (req, res) => {
  const { page, limit, searchByName } = req.query;
  const pageNo = page > 0 ? page - 1 : 1;
  const offset = page > 0 ? limit * pageNo : 0;
  const pageLimit = Number(limit) || 5;
  const searchText = searchByName ? `WHERE id=${searchByName}` : '';

  const sql = `SELECT id, first_name, last_name, designation, username, password FROM employee ${searchText} ORDER BY id DESC LIMIT $1 OFFSET $2`;
  let values = [];
  values = [...values, pageLimit, offset];
  try {
    const { rows } = await db.query(sql, values);

    const totalRecords = searchByName
      ? Number(rows.length)
      : await totalRecordCount('employee');

    const totalPages = Math.ceil(totalRecords / pageLimit);

    res.status(200).json({
      success: true,
      totalPages,
      rows,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  upload,
  getTeachers,
  getDrivers,
  getEmployees,
  getUserEmployees,
};
