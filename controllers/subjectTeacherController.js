const db = require('../db');
const { recordExist, totalRecordCount } = require('../utils/helpers');

// =============> create new record <=============
const createSubjectTeacher = async (req, res) => {
  const values = [
    req.body.educational_year,
    Number(req.body.classroom_id),
    Number(req.body.subject_id),
    Number(req.body.teacher_id),
  ];

  try {
    const sql =
      'INSERT INTO subject_teacher (educational_year, classroom_id, subject_id, teacher_id, updated_at) VALUES($1,$2,$3,$4,now()) returning *';
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
const getAllSubjectTeachers = async (req, res) => {
  const { page, limit, searchByName } = req.query;
  const pageNo = page > 0 ? page - 1 : 1;
  const offset = page > 0 ? limit * pageNo : 0;
  const pageLimit = Number(limit) || 5;
  const searchText = searchByName ? `WHERE c.standard=${searchByName}` : '';

  const sql = `SELECT st.id, st.educational_year, st.classroom_id, st.subject_id, st.teacher_id, c.standard, c.division, c.medium, c.section, c.stream, e.first_name, e.last_name, e.main_subject1, e.main_subject2, s.subject_name FROM subject_teacher st LEFT JOIN classroom c ON c.id=st.classroom_id LEFT JOIN subject s ON s.id=st.subject_id LEFT JOIN employee e ON e.id=st.teacher_id AND st.classroom_id = c.id AND st.subject_id=s.id AND st.teacher_id=e.id ${searchText} ORDER BY id DESC LIMIT $1 OFFSET $2`;
  let values = [];
  values = [...values, pageLimit, offset];
  try {
    const { rows } = await db.query(sql, values);
    const totalRecords = searchByName
      ? Number(rows.length)
      : await totalRecordCount('subject_teacher');
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
const getSubjectTeacherById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM subject_teacher WHERE id=$1';
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
const updateSubjectTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('subject_teacher', Number(id));
    if (recordPresent) {
      const values = [
        req.body.educational_year,
        Number(req.body.classroom_id),
        Number(req.body.subject_id),
        Number(req.body.teacher_id),
        Number(id),
      ];
      const sql =
        'UPDATE subject_teacher SET educational_year=$1, classroom_id=$2, subject_id=$3, teacher_id=$4, updated_at=now() WHERE id=$5 returning *';
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
const deleteSubjectTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('subject_teacher', Number(id));
    if (recordPresent) {
      const sql = 'DELETE FROM subject_teacher WHERE id=$1';
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
  createSubjectTeacher,
  getAllSubjectTeachers,
  getSubjectTeacherById,
  updateSubjectTeacher,
  deleteSubjectTeacher,
};
