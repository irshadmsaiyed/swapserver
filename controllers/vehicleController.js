const db = require('../db');
const { recordExist, totalRecordCount } = require('../utils/helpers');

// =============> create new record <=============
const createVehicle = async (req, res) => {
  const registrationValidityDate = new Date(req?.body?.registration_validity);
  const insuranceValidityDate = new Date(req?.body?.insurance_validity);
  const pucValidityDate = new Date(req?.body?.puc_validity);

  const values = [
    req.body.registration_no,
    registrationValidityDate,
    req.body.insurance_policyno,
    insuranceValidityDate,
    req.body.puc_certino,
    pucValidityDate,
    Number(req.body.driver_id),
    req.body.vehicle_image,
  ];

  try {
    const sql =
      'INSERT INTO vehicle (registration_no, registration_validity, insurance_policyno, insurance_validity, puc_certino, puc_validity, driver_id, vehicle_image, updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,now()) returning *';
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
const getAllVehicles = async (req, res) => {
  const { page, limit, searchByName } = req.query;
  const pageNo = page > 0 ? page - 1 : 1;
  const offset = page > 0 ? limit * pageNo : 0;
  const pageLimit = Number(limit) || 5;
  const searchText = searchByName ? `%${searchByName}%` : '%%';

  const sql =
    'SELECT v.id, v.registration_no, v.insurance_validity, v.puc_validity, v.vehicle_image, v.driver_id, v.insurance_policyno, v.puc_certino, v.registration_validity, e.first_name, e.middle_name, e.last_name, e.driving_licence FROM vehicle v LEFT JOIN employee e ON e.id = v.driver_id AND v.driver_id = e.id WHERE v.registration_no LIKE $1 ORDER BY id DESC LIMIT $2 OFFSET $3';
  let values = [];
  values = [...values, searchText, pageLimit, offset];
  try {
    const { rows } = await db.query(sql, values);
    const totalRecords = searchByName
      ? Number(rows.length)
      : await totalRecordCount('vehicle');
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
const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM vehicle WHERE id=$1';
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
const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('vehicle', Number(id));
    if (recordPresent) {
      const registrationValidityDate = new Date(
        req?.body?.registration_validity
      );
      const insuranceValidityDate = new Date(req?.body?.insurance_validity);
      const pucValidityDate = new Date(req?.body?.puc_validity);

      const values = [
        req.body.registration_no,
        registrationValidityDate,
        req.body.insurance_policyno,
        insuranceValidityDate,
        req.body.puc_certino,
        pucValidityDate,
        Number(req.body.driver_id),
        req.body.vehicle_image,
        Number(id),
      ];
      const sql =
        'UPDATE vehicle SET registration_no=$1, registration_validity=$2, insurance_policyno=$3, insurance_validity=$4, puc_certino=$5, puc_validity=$6, driver_id=$7, vehicle_image=$8, updated_at=now() WHERE id=$9 returning *';
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
const deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('vehicle', Number(id));
    if (recordPresent) {
      const sql = 'DELETE FROM vehicle WHERE id=$1';
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

// =============> read or get vehicles <=============
const getAllBuses = async (req, res) => {
  const sql =
    'SELECT id AS vehicle_id, registration_no FROM vehicle ORDER BY registration_no';
  try {
    const { rows } = await db.query(sql);
    res.status(200).json({
      status: 'success',
      rows,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'failed',
    });
  }
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  getAllBuses,
};
