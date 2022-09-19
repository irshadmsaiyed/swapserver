const db = require('../db');
const { recordExist, totalRecordCount } = require('../utils/helpers');

// =============> create new record <=============
const createWorkingDays = async (req, res) => {
  const values = [
    req.body.educational_year,
    Number(req.body.month),
    Number(req.body.educational_days),
    Number(req.body.teaching_days),
    Number(req.body.nonteaching_days),
    Number(req.body.service_days),
  ];

  try {
    const sql =
      'INSERT INTO working_days (educational_year, month, educational_days, teaching_days, nonteaching_days, service_days, updated_at) VALUES($1,$2,$3,$4,$5,$6,now()) returning *';
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
const getAllWorkingDays = async (req, res) => {
  const { page, limit, searchByName } = req.query;
  const pageNo = page > 0 ? page - 1 : 1;
  const offset = page > 0 ? limit * pageNo : 0;
  const pageLimit = Number(limit) || 5;
  const searchText = searchByName ? `WHERE month=${searchByName}` : ''; // FIXME:

  const sql = `SELECT id, educational_year, month, educational_days, teaching_days, nonteaching_days, service_days FROM working_days ${searchText} ORDER BY id DESC LIMIT $1 OFFSET $2`; // FIXME:
  let values = [];
  values = [...values, pageLimit, offset];
  try {
    const { rows } = await db.query(sql, values);
    const totalRecords = searchByName
      ? Number(rows.length)
      : await totalRecordCount('working_days');
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
const getWorkingDaysById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM working_days WHERE id=$1';
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
const updateWorkingDays = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('working_days', Number(id));
    if (recordPresent) {
      const values = [
        req.body.educational_year,
        Number(req.body.month),
        Number(req.body.educational_days),
        Number(req.body.teaching_days),
        Number(req.body.nonteaching_days),
        Number(req.body.service_days),
        Number(id),
      ];
      const sql =
        'UPDATE working_days SET educational_year=$1, month=$2, educational_days=$3, teaching_days=$4, nonteaching_days=$5, service_days=$6, updated_at=now() WHERE id=$7 returning *';
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
const deleteWorkingDays = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('working_days', Number(id));
    if (recordPresent) {
      const sql = 'DELETE FROM working_days WHERE id=$1';
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
  createWorkingDays,
  getAllWorkingDays,
  getWorkingDaysById,
  updateWorkingDays,
  deleteWorkingDays,
};
