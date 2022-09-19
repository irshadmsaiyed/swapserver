const db = require('../db');
const { recordExist, totalRecordCount } = require('../utils/helpers');

// =============> create new record <=============
const createSchool = async (req, res) => {
  const dateofEstablish = new Date(req?.body?.establish_date);
  const dateofPriRecognition =
    new Date(req?.body?.primary_recognitiondate) || null;
  const dateofUPriRecognition =
    new Date(req?.body?.upprimary_recognitiondate) || null;
  const dateofSecRecognition =
    new Date(req?.body?.secondary_recognitiondate) || null;
  const dateofHsecRecognition =
    new Date(req?.body?.hsecondary_recognitiondate) || null;

  const values = [
    req.body.name,
    // Number(req.body.lowest_class),
    // Number(req.body.highest_class),
    req.body.lowest_class,
    req.body.highest_class,
    req.body.medium,
    req.body.category,
    req.body.management,
    req.body.address,
    req.body.village,
    req.body.taluka,
    req.body.district,
    req.body.state,
    Number(req.body.pin),
    req.body.habitation,
    req.body.latitude,
    req.body.longitude,
    req.body.email,
    req.body.landline_no,
    req.body.principal_name,
    req.body.principal_contactno,
    req.body.admin_name,
    req.body.admin_contactno,
    dateofEstablish,
    dateofPriRecognition,
    dateofUPriRecognition,
    dateofSecRecognition,
    dateofHsecRecognition,
    req.body.affiliation_board,
    req.body.ssc_indexno,
    req.body.hsc_indexno,
    req.body.udise_code,
    req.body.bank_accountno,
    req.body.account_holdername,
    req.body.bank_name,
    req.body.branch_name,
    req.body.ifsc_code,
    req.body.crc_name,
    req.body.qdc_name,
    req.body.svs_name,
    req.body.panchayat_name,
    req.body.assemblyarea_name,
    req.body.parliamentarea_name,
  ];

  try {
    const sql =
      'INSERT INTO school(name, lowest_class, highest_class, medium, category, management, address, village, taluka, district, state, pin, habitation, latitude, longitude, email, landline_no, principal_name, principal_contactno, admin_name, admin_contactno, establish_date, primary_recognitiondate, upprimary_recognitiondate, secondary_recognitiondate, hsecondary_recognitiondate, affiliation_board, ssc_indexno, hsc_indexno, udise_code, bank_accountno, account_holdername, bank_name, branch_name, ifsc_code, crc_name, qdc_name, svs_name, panchayat_name, assemblyarea_name, parliamentarea_name, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,now()) returning *';
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
const getAllSchools = async (req, res) => {
  const { page, limit, searchByName } = req.query;
  const pageNo = page > 0 ? page - 1 : 1;
  const offset = page > 0 ? limit * pageNo : 0;
  const pageLimit = Number(limit) || 5;
  const searchText = searchByName ? `%${searchByName}%` : '%%';

  const sql =
    'SELECT id, name, lowest_class, highest_class, medium, principal_name, admin_name FROM school WHERE name LIKE $1 ORDER BY id DESC LIMIT $2 OFFSET $3';
  let values = [];
  values = [...values, searchText, pageLimit, offset];
  try {
    const { rows } = await db.query(sql, values);
    const totalRecords = searchByName
      ? Number(rows.length)
      : await totalRecordCount('school');
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
const getSchoolById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM school WHERE id=$1';
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
const updateSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('school', Number(id));
    if (recordPresent) {
      const dateofEstablish = new Date(req?.body?.establish_date);
      const dateofPriRecognition =
        new Date(req?.body?.primary_recognitiondate) || null;
      const dateofUPriRecognition =
        new Date(req?.body?.upprimary_recognitiondate) || null;
      const dateofSecRecognition =
        new Date(req?.body?.secondary_recognitiondate) || null;
      const dateofHsecRecognition =
        new Date(req?.body?.hsecondary_recognitiondate) || null;

      const values = [
        req.body.name,
        // Number(req.body.lowest_class),
        // Number(req.body.highest_class),
        req.body.lowest_class,
        req.body.highest_class,
        req.body.medium,
        req.body.category,
        req.body.management,
        req.body.address,
        req.body.village,
        req.body.taluka,
        req.body.district,
        req.body.state,
        Number(req.body.pin),
        req.body.habitation,
        req.body.latitude,
        req.body.longitude,
        req.body.email,
        req.body.landline_no,
        req.body.principal_name,
        req.body.principal_contactno,
        req.body.admin_name,
        req.body.admin_contactno,
        dateofEstablish,
        dateofPriRecognition,
        dateofUPriRecognition,
        dateofSecRecognition,
        dateofHsecRecognition,
        req.body.affiliation_board,
        req.body.ssc_indexno,
        req.body.hsc_indexno,
        req.body.udise_code,
        req.body.bank_accountno,
        req.body.account_holdername,
        req.body.bank_name,
        req.body.branch_name,
        req.body.ifsc_code,
        req.body.crc_name,
        req.body.qdc_name,
        req.body.svs_name,
        req.body.panchayat_name,
        req.body.assemblyarea_name,
        req.body.parliamentarea_name,
        Number(id),
      ];
      const sql =
        'UPDATE school SET name=$1, lowest_class=$2, highest_class=$3, medium=$4, category=$5, management=$6, address=$7, village=$8, taluka=$9, district=$10, state=$11, pin=$12, habitation=$13, latitude=$14, longitude=$15, email=$16, landline_no=$17, principal_name=$18, principal_contactno=$19, admin_name=$20, admin_contactno=$21, establish_date=$22, primary_recognitiondate=$23, upprimary_recognitiondate=$24, secondary_recognitiondate=$25, hsecondary_recognitiondate=$26, affiliation_board=$27, ssc_indexno=$28, hsc_indexno=$29, udise_code=$30, bank_accountno=$31, account_holdername=$32, bank_name=$33, branch_name=$34, ifsc_code=$35, crc_name=$36, qdc_name=$37, svs_name=$38, panchayat_name=$39, assemblyarea_name=$40, parliamentarea_name=$41, updated_at=now() WHERE id=$42 returning *';
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
const deleteSchool = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('school', Number(id));
    if (recordPresent) {
      const sql = 'DELETE FROM school WHERE id=$1';
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
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
};
