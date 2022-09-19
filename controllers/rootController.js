const db = require('../db');
const { recordExist, totalRecordCount } = require('../utils/helpers');

// =============> create new record <=============
const createRoot = async (req, res) => {
  const values = [
    req.body.root_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    Number(req.body.root_rent),
    req.body.pickup_point.replace(/\s+/g, ' ').trim().toUpperCase(),
    Number(req.body.vehicle_id),
  ];

  try {
    const sql =
      'INSERT INTO root (root_name, root_rent, pickup_point, vehicle_id, updated_at) VALUES($1,$2,$3,$4,now()) returning *';
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
const getAllRoots = async (req, res) => {
  const { page, limit, searchByName } = req.query;
  const pageNo = page > 0 ? page - 1 : 1;
  const offset = page > 0 ? limit * pageNo : 0;
  const pageLimit = Number(limit) || 5;
  const searchText = searchByName ? `%${searchByName}%` : '%%';

  const sql =
    'SELECT r.id, r.root_name, r.root_rent, r.pickup_point, r.vehicle_id, v.registration_no, v.driver_id, e.first_name, e.last_name FROM root r LEFT JOIN vehicle v ON v.id = r.vehicle_id LEFT JOIN employee e ON e.id = v.driver_id WHERE r.root_name LIKE $1 ORDER BY id DESC LIMIT $2 OFFSET $3';
  let values = [];
  values = [...values, searchText, pageLimit, offset];
  try {
    const { rows } = await db.query(sql, values);
    const totalRecords = searchByName
      ? Number(rows.length)
      : await totalRecordCount('root');
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
const getRootById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM root WHERE id=$1';
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
const updateRoot = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('root', Number(id));
    if (recordPresent) {
      const values = [
        req.body.root_name,
        Number(req.body.root_rent),
        req.body.pickup_point,
        Number(req.body.vehicle_id),
        Number(id),
      ];
      const sql =
        'UPDATE root SET root_name=$1, root_rent=$2, pickup_point=$3, vehicle_id=$4, updated_at=now() WHERE id=$5 returning *';
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
const deleteRoot = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('root', Number(id));
    if (recordPresent) {
      const sql = 'DELETE FROM root WHERE id=$1';
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

// =============> read or get bus roots <=============
const getBusRoots = async (req, res) => {
  const sql =
    'SELECT id AS busroot_id, root_name, root_rent, pickup_point, vehicle_id FROM root ORDER BY id';
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
  createRoot,
  getAllRoots,
  getRootById,
  updateRoot,
  deleteRoot,
  getBusRoots,
};
