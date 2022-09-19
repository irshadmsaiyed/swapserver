const db = require('../db');
const { recordExist, totalRecordCount } = require('../utils/helpers');

// =============> create new record <=============
const createClassroom = async (req, res) => {
  const values = [
    req.body.educational_year,
    req.body.standard,
    req.body.division,
    req.body.medium,
    req.body.section,
    req.body.stream,
    Number(req.body.teacher_id),
  ];

  try {
    const sql =
      'INSERT INTO classroom (educational_year, standard, division, medium, section, stream, teacher_id, updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,now()) returning *';
    const { rows } = await db.query(sql, values);
    res.status(201).json({
      success: true,
      insertId: rows[0].id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
    });
  }
};

// =============> read or get all records <=============
const getAllClassrooms = async (req, res) => {
  const { page, limit, searchByName } = req.query;
  const pageNo = page > 0 ? page - 1 : 1;
  const offset = page > 0 ? limit * pageNo : 0;
  const pageLimit = Number(limit) || 5;
  const searchText = searchByName ? `WHERE c.standard=${searchByName}` : '';

  const sql = `SELECT c.id, c.educational_year, c.standard, c.division, c.medium, c.section, c.stream, c.teacher_id, e.first_name, e.last_name FROM classroom c INNER JOIN employee e ON c.teacher_id = e.id ${searchText} ORDER BY id DESC LIMIT $1 OFFSET $2`;
  let values = [];
  values = [...values, pageLimit, offset];
  try {
    const { rows } = await db.query(sql, values);
    const totalRecords = searchByName
      ? Number(rows.length)
      : await totalRecordCount('classroom');
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

// =============> read or get record by id <=============
const getClassroomById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM classroom WHERE id=$1';
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

// =============> update existing record <=============
const updateClassroom = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('classroom', Number(id));
    if (recordPresent) {
      const values = [
        req.body.educational_year,
        req.body.standard,
        req.body.division,
        req.body.medium,
        req.body.section,
        req.body.stream,
        Number(req.body.teacher_id),
        Number(id),
      ];
      const sql =
        'UPDATE classroom SET educational_year=$1, standard=$2, division=$3, medium=$4, section=$5, stream=$6, teacher_id=$7, updated_at=now() WHERE id=$8';
      const { rows } = await db.query(sql, values);
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

// =============> delete existing record <=============
const deleteClassroom = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('classroom', Number(id));
    if (recordPresent) {
      const sql = 'DELETE FROM classroom WHERE id=$1';
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

// =============> read or get classes <=============
const getClasses = async (req, res) => {
  const sql =
    "SELECT id AS classroom_id, standard, division, medium, section, stream, CONCAT(standard,'-',division,' (',medium,' Medium)') AS class FROM classroom ORDER BY class";
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

module.exports = {
  createClassroom,
  getAllClassrooms,
  getClassroomById,
  updateClassroom,
  deleteClassroom,
  getClasses,
};
