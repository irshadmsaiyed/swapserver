const db = require('../db');
const { recordExist, totalRecordCount } = require('../utils/helpers');

// =============> create new record <=============
const createFeeTransaction = async (req, res) => {
  const feePaymentDate = new Date(req?.body?.fee_paiddate);
  const feeCheckDate = new Date(req?.body?.check_date);
  const values = [
    req.body.educational_year,
    Number(req.body.school_id),
    Number(req.body.student_id),
    req.body.fee_type,
    Number(req.body.fee_amount),
    feePaymentDate,
    Number(req.body.employee_id),
    req.body.payment_mode,
    req.body.upi_refno.replace(/\s+/g, ' ').trim(),
    req.body.check_no.replace(/\s+/g, ' ').trim(),
    feeCheckDate,
    req.body.bank_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.branch_name.replace(/\s+/g, ' ').trim().toUpperCase(),
  ];
  try {
    const sql =
      'INSERT INTO fee_transaction (educational_year, school_id, student_id, fee_type, fee_amount, fee_paiddate, employee_id, payment_mode, upi_refno, check_no, check_date, bank_name, branch_name, updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,now()) returning *';
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
const getAllFeeTransactions = async (req, res) => {
  const { page, limit, searchByName } = req.query;
  const pageNo = page > 0 ? page - 1 : 1;
  const offset = page > 0 ? limit * pageNo : 0;
  const pageLimit = Number(limit) || 5;
  const searchText = searchByName ? `%${searchByName}%` : '%%';

  const sql =
    'SELECT ft.id, ft.educational_year, ft.student_id, ft.fee_type, ft.fee_amount, ft.fee_paiddate, ft.payment_mode, s.id AS student_id, s.standard, s.division, s.medium, s.school_id, s.first_name, s.middle_name, s.last_name FROM fee_transaction ft LEFT JOIN student s ON s.id = ft.student_id WHERE ft.id LIKE $1 ORDER BY ft.id DESC LIMIT $2 OFFSET $3';
  let values = [];
  values = [...values, searchText, pageLimit, offset];
  try {
    const { rows } = await db.query(sql, values);
    const totalRecords = searchByName
      ? Number(rows.length)
      : await totalRecordCount('fee_transaction');
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
const getFeeTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM fee_transaction WHERE id=$1';
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
const updateFeeTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('fee_transaction', Number(id));
    if (recordPresent) {
      const feePaymentDate = new Date(req?.body?.fee_paiddate);
      const feeCheckDate = new Date(req?.body?.check_date);
      const values = [
        req.body.educational_year,
        Number(req.body.school_id),
        Number(req.body.student_id),
        req.body.fee_type,
        Number(req.body.fee_amount),
        feePaymentDate,
        Number(req.body.employee_id),
        req.body.payment_mode,
        req.body.upi_refno.replace(/\s+/g, ' ').trim(),
        req.body.check_no.replace(/\s+/g, ' ').trim(),
        feeCheckDate,
        req.body.bank_name.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.branch_name.replace(/\s+/g, ' ').trim().toUpperCase(),
        Number(id),
      ];
      const sql =
        'UPDATE fee_transaction SET educational_year=$1, school_id=$2, student_id=$3, fee_type=$4, fee_amount=$5, fee_paiddate=$6, employee_id=$7, payment_mode=$8, upi_refno=$9, check_no=$10, check_date=$11, bank_name=$12, branch_name=$13, updatedAt=now() WHERE id=$14 returning *';
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
const deleteFeeTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('fee_transaction', Number(id));
    if (recordPresent) {
      const sql = 'DELETE FROM fee_transaction WHERE id=$1';
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
  createFeeTransaction,
  getAllFeeTransactions,
  getFeeTransactionById,
  updateFeeTransaction,
  deleteFeeTransaction,
};
