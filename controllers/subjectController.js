const db = require('../db');
const { recordExist, totalRecordCount } = require('../utils/helpers');

// =============> CREATE NEW SUBJECT <=============
const createSubject = async (req, res) => {
  try {
    const { subject_name } = req.body;
    const sql =
      'INSERT INTO subject(subject_name,updated_at) VALUES($1,now()) returning *';
    const { rows } = await db.query(sql, [
      subject_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    ]);
    res.status(201).json({
      success: true,
      insertId: rows[0].id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'failed',
    });
  }
};

// =============> READ OR GET ALL SUBJECTS <=============
const getAllSubjects = async (req, res) => {
  const { page, limit, searchByName } = req.query;
  const pageNo = page > 0 ? page - 1 : 1;
  const offset = page > 0 ? limit * pageNo : 0;
  const pageLimit = Number(limit) || 5;
  const searchText = searchByName ? `%${searchByName}%` : '%%';
  const sql =
    'SELECT id, subject_name, created_at, updated_at FROM subject WHERE subject_name LIKE $1 ORDER BY id DESC LIMIT $2 OFFSET $3';
  let values = [];
  values = [...values, searchText, pageLimit, offset];
  try {
    const { rows } = await db.query(sql, values);
    const totalRecords = searchByName
      ? Number(rows.length)
      : await totalRecordCount('subject');

    const totalPages = Math.ceil(totalRecords / pageLimit);

    res.status(200).json({
      success: true,
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

// =============> READ OR GET SUBJECT BY ID <=============
const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM subject WHERE id=$1';
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

// =============> UPDATE EXISTING SUBJECT <=============
const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('subject', Number(id));
    if (recordPresent) {
      const { subject_name } = req.body;
      const sql =
        'UPDATE subject SET subject_name=$1,updated_at=now() WHERE id=$2 returning *';
      const { rows } = await db.query(sql, [
        subject_name.replace(/\s+/g, ' ').trim().toUpperCase(),
        id,
      ]);
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

// =============> DELETE EXISTING SUBJECT <=============
const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('subject', Number(id));
    if (recordPresent) {
      const sql = 'DELETE FROM subject WHERE id=$1';
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

// =============> READ OR GET DISTINCT SUBJECTS <=============
const getDistinctSubjects = async (req, res) => {
  const sql =
    'SELECT DISTINCT(subject_name) AS subject_name,id AS subject_id FROM subject ORDER BY subject_name';
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

// =============> test api <=============
const getTesting = async (req, res) => {
  // db.query('SELECT NOW()', (err, response) => {
  //   console.log(err, response);
  // });
  const sql = 'SELECT NOW()';
  try {
    const { rows } = await db.query(sql);
    res.status(200).json({
      status: 'success on 16-09-2022',
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
  createSubject,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
  getDistinctSubjects,
  getTesting,
};
