const db = require('../db');
const { recordExist, totalRecordCount } = require('../utils/helpers');

// =============> create new session <=============
const createSession = async (req, res) => {
  try {
    const session1StartDate = new Date(req?.body?.session1_start);
    const session1EndDate = new Date(req?.body?.session1_end);
    const session2StartDate = new Date(req?.body?.session2_start);
    const session2EndDate = new Date(req?.body?.session2_end);
    const diwaliStartDate = new Date(req?.body?.diwali_start);
    const diwaliEndDate = new Date(req?.body?.diwali_end);
    const summerStartDate = new Date(req?.body?.summer_start);
    const summerEndDate = new Date(req?.body?.summer_end);
    const otherStartDate = req?.body?.other_start
      ? new Date(req.body.other_start)
      : null;
    const otherEndDate = req?.body?.other_end
      ? new Date(req.body.other_end)
      : null;

    const values = [
      req.body.educational_year.replace(/\s+/g, ' ').trim(),
      session1StartDate,
      session1EndDate,
      session2StartDate,
      session2EndDate,
      diwaliStartDate,
      diwaliEndDate,
      summerStartDate,
      summerEndDate,
      otherStartDate,
      otherEndDate,
      req.body.other_details.replace(/\s+/g, ' ').trim().toUpperCase() || '',
    ];

    const sql =
      'INSERT INTO session (educational_year, session1_start, session1_end, session2_start, session2_end, diwali_start, diwali_end, summer_start, summer_end, other_start, other_end, other_details, updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,now()) returning *';
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

// =============> read or get all sessions <=============
const getAllSessions = async (req, res) => {
  const { page, limit, searchByName } = req.query;
  const pageNo = page > 0 ? page - 1 : 1;
  const offset = page > 0 ? limit * pageNo : 0;
  const pageLimit = Number(limit) || 5;
  const searchText = searchByName ? `%${searchByName}%` : '%%';

  // const sql =
  //   'SELECT id, CONCAT(DATE_FORMAT(session1Start,"%d-%m-%Y")," to ",DATE_FORMAT(session1End,"%d-%m-%Y")) AS "Session-1 Period", CONCAT(DATE_FORMAT(session2Start,"%d-%m-%Y")," to ",DATE_FORMAT(session2End,"%d-%m-%Y")) AS "Session-2 Period", CONCAT(DATE_FORMAT(diwaliStart,"%d-%m-%Y")," to ",DATE_FORMAT(diwaliEnd,"%d-%m-%Y")) AS "Diwali Vacation", CONCAT(DATE_FORMAT(summerStart,"%d-%m-%Y")," to ",DATE_FORMAT(summerEnd,"%d-%m-%Y")) AS "Summer Vacation"FROM session';

  const sql =
    'SELECT id, educational_year, session1_start, session1_end, session2_start, session2_end, diwali_start, diwali_end, summer_start, summer_end, other_start, other_end, other_details FROM session WHERE educational_year LIKE $1 ORDER BY id DESC LIMIT $2 OFFSET $3';
  let values = [];
  values = [...values, searchText, pageLimit, offset];
  try {
    const { rows } = await db.query(sql, values);
    const totalRecords = searchByName
      ? Number(rows.length)
      : await totalRecordCount('session');
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

// =============> read or get session by id <=============
const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM session WHERE id=$1';
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

// =============> update existing session <=============
const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('session', Number(id));
    if (recordPresent) {
      const session1StartDate = new Date(req?.body?.session1_start);
      const session1EndDate = new Date(req?.body?.session1_end);
      const session2StartDate = new Date(req?.body?.session2_start);
      const session2EndDate = new Date(req?.body?.session2_end);
      const diwaliStartDate = new Date(req?.body?.diwali_start);
      const diwaliEndDate = new Date(req?.body?.diwali_end);
      const summerStartDate = new Date(req?.body?.summer_start);
      const summerEndDate = new Date(req?.body?.summer_end);
      const otherStartDate = req?.body?.other_start
        ? new Date(req.body.other_start)
        : null;
      const otherEndDate = req?.body?.other_end
        ? new Date(req.body.other_end)
        : null;

      const values = [
        req.body.educational_year.replace(/\s+/g, ' ').trim(),
        session1StartDate,
        session1EndDate,
        session2StartDate,
        session2EndDate,
        diwaliStartDate,
        diwaliEndDate,
        summerStartDate,
        summerEndDate,
        otherStartDate,
        otherEndDate,
        req.body.other_details.replace(/\s+/g, ' ').trim().toUpperCase() || '',
        id,
      ];
      const sql =
        'UPDATE session SET educational_year=$1, session1_start=$2, session1_end=$3, session2_start=$4, session2_end=$5, diwali_start=$6, diwali_end=$7, summer_start=$8, summer_end=$9, other_start=$10, other_end=$11, other_details=$12, updated_at=now() WHERE id=$13 returning *';
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

// =============> delete existing session <=============
const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('session', Number(id));
    if (recordPresent) {
      const sql = 'DELETE FROM session WHERE id=$1';
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

// =============> read or get distinct educational years <=============
const getEducationalYears = async (req, res) => {
  const sql =
    'SELECT educational_year FROM session ORDER BY educational_year DESC';
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
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
  getEducationalYears,
};
