const db = require('../db');
const { recordExist, totalRecordCount } = require('../utils/helpers');

// =============> create new record <=============
const createFee = async (req, res) => {
  const feeAdmission = Number(req.body.addmission_fee) || 0;
  const feeEnrollment = Number(req.body.enrollment_fee) || 0;
  const feeSemester1 = Number(req.body.semester1_fee) || 0;
  const feeSemester2 = Number(req.body.semester2_fee) || 0;
  const feeSemester3 = Number(req.body.semester3_fee) || 0;
  const feeSemester4 = Number(req.body.semester4_fee) || 0;
  const feeTution = Number(req.body.tution_fee) || 0;
  const feeLaboratory = Number(req.body.laboratory_fee) || 0;
  const feeLibrary = Number(req.body.library_fee) || 0;
  const feeComputer = Number(req.body.computer_fee) || 0;
  const feeCraft = Number(req.body.craft_fee) || 0;
  const feeAmenity = Number(req.body.amenity_fee) || 0;
  const feeDiary = Number(req.body.diary_fee) || 0;
  const annualFee =
    feeAdmission +
    feeEnrollment +
    feeSemester1 +
    feeSemester2 +
    feeSemester3 +
    feeSemester4 +
    feeTution +
    feeLaboratory +
    feeLibrary +
    feeComputer +
    feeCraft +
    feeAmenity +
    feeDiary;

  const values = [
    req.body.educational_year,
    // Number(req.body.standard),
    req.body.standard,
    req.body.medium,
    req.body.stream,
    feeAdmission,
    feeEnrollment,
    feeSemester1,
    feeSemester2,
    feeSemester3,
    feeSemester4,
    feeTution,
    feeLaboratory,
    feeLibrary,
    feeComputer,
    feeCraft,
    feeAmenity,
    feeDiary,
    Number(req.body.hostel_fee),
    annualFee,
  ];
  try {
    const sql =
      'INSERT INTO fee (educational_year, standard, medium, stream, addmission_fee, enrollment_fee, semester1_fee, semester2_fee, semester3_fee, semester4_fee, tution_fee, laboratory_fee, library_fee, computer_fee, craft_fee, amenity_fee, diary_fee, hostel_fee, annual_fee, updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,now()) returning *';
    const { rows } = await db.query(sql, values);
    res.status(201).json({
      status: 'success',
      insertId: rows[0].id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'failed',
    });
  }
};

// =============> read or get all records <=============
const getAllFees = async (req, res) => {
  const { page, limit, searchByName } = req.query;
  const pageNo = page > 0 ? page - 1 : 1;
  const offset = page > 0 ? limit * pageNo : 0;
  const pageLimit = Number(limit) || 5;
  const searchText = searchByName ? `WHERE standard=${searchByName} ` : '';

  const sql = `SELECT id, educational_year, standard, medium, stream, addmission_fee, enrollment_fee, semester1_fee, semester2_fee, semester3_fee, semester4_fee, tution_fee, laboratory_fee, library_fee, computer_fee, craft_fee, amenity_fee, diary_fee, hostel_fee, annual_fee FROM fee ${searchText} ORDER BY id DESC LIMIT $1 OFFSET $2`;
  let values = [];
  values = [...values, pageLimit, offset];
  try {
    const { rows } = await db.query(sql, values);
    const totalRecords = searchByName
      ? Number(rows.length)
      : await totalRecordCount('fee');
    const totalPages = Math.ceil(totalRecords / pageLimit);
    res.status(200).json({
      status: 'success',
      totalPages,
      rows,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'failed',
    });
  }
};

// =============> read or get record by id <=============
const getFeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM fee WHERE id=$1';
    const { rows } = await db.query(sql, [id]);
    const { length } = rows;
    if (length > 0) {
      res.status(200).json({
        status: 'success',
        rows,
      });
    } else {
      res.status(404).json({
        status: 'not found',
        message: 'Record not found.',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'failed',
    });
  }
};

// =============> update existing record <=============
const updateFee = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('fee', Number(id));
    if (recordPresent) {
      const feeAdmission = Number(req?.body?.addmission_fee) || 0;
      const feeEnrollment = Number(req?.body?.enrollment_fee) || 0;
      const feeSemester1 = Number(req?.body?.semester1_fee) || 0;
      const feeSemester2 = Number(req?.body?.semester2_fee) || 0;
      const feeSemester3 = Number(req?.body?.semester3_fee) || 0;
      const feeSemester4 = Number(req?.body?.semester4_fee) || 0;
      const feeTution = Number(req?.body?.tution_fee) || 0;
      const feeLaboratory = Number(req?.body?.laboratory_fee) || 0;
      const feeLibrary = Number(req?.body?.library_fee) || 0;
      const feeComputer = Number(req?.body?.computer_fee) || 0;
      const feeCraft = Number(req?.body?.craft_fee) || 0;
      const feeAmenity = Number(req?.body?.amenity_fee) || 0;
      const feeDiary = Number(req?.body?.diary_fee) || 0;
      const annualFee =
        feeAdmission +
        feeEnrollment +
        feeSemester1 +
        feeSemester2 +
        feeSemester3 +
        feeSemester4 +
        feeTution +
        feeLaboratory +
        feeLibrary +
        feeComputer +
        feeCraft +
        feeAmenity +
        feeDiary;

      const values = [
        req.body.educational_year,
        // Number(req.body.standard),
        req.body.standard,
        req.body.medium,
        req.body.stream,
        feeAdmission,
        feeEnrollment,
        feeSemester1,
        feeSemester2,
        feeSemester3,
        feeSemester4,
        feeTution,
        feeLaboratory,
        feeLibrary,
        feeComputer,
        feeCraft,
        feeAmenity,
        feeDiary,
        Number(req.body.hostel_fee),
        annualFee,
        Number(id),
      ];
      const sql =
        'UPDATE fee SET educational_year=$1, standard=$2, medium=$3, stream=$4, addmission_fee=$5, enrollment_fee=$6, semester1_fee=$7, semester2_fee=$8, semester3_fee=$9, semester4_fee=$10, tution_fee=$11, laboratory_fee=$12, library_fee=$13, computer_fee=$14, craft_fee=$15, amenity_fee=$16, diary_fee=$17, hostel_fee=$18, annual_fee=$19, updated_at=now() WHERE id=$20';
      const { rows } = await db.query(sql, values);
      res.status(200).json({
        status: 'success',
        rows,
      });
    } else {
      res.status(404).json({
        status: 'not found',
        message: 'Record not found.',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'failed',
    });
  }
};

// =============> delete existing record <=============
const deleteFee = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('fee', Number(id));
    if (recordPresent) {
      const sql = 'DELETE FROM fee WHERE id=$1';
      await db.query(sql, [id]);
      res.status(200).json({
        status: 'success',
        message: 'Record deleted successfully.',
      });
    } else {
      res.status(404).json({
        status: 'not found',
        message: 'Record not found.',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
    });
  }
};

module.exports = {
  createFee,
  getAllFees,
  getFeeById,
  updateFee,
  deleteFee,
};
