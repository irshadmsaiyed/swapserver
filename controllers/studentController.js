const db = require('../db');
const {
  recordExist,
  totalRecordCount,
  createUser,
} = require('../utils/helpers');

// =============> create new record <=============
const createStudent = async (req, res) => {
  const dateofAddmission = new Date(req?.body?.addmission_date);
  const dateofBirth = new Date(req?.body?.birth_date);
  const dateofLeftSchool = new Date(req?.body?.school_leftdate);
  const dateofFeeDue = new Date(req?.body?.feedue_date);

  const values = [
    req.body.educational_year,
    dateofAddmission,
    Number(req?.body?.school_id),
    // Number(req?.body?.standard),
    req.body.standard,
    req.body.division,
    req.body.section,
    req.body.medium,
    req.body.stream,
    req.body.first_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.middle_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.last_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.mother_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.address.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.village.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.taluka.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.district,
    req.body.state,
    Number(req?.body?.pin),
    req.body.habitation,
    dateofBirth,
    req.body.birth_place.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.gender,
    req.body.religion,
    req.body.caste,
    req.body.parent_mobileno1,
    req.body.live_withguardian,
    req.body.is_orphan,
    req.body.cwsn_status,
    Number(req.body.bus_rootno),
    req.body.is_repeater,
    req.body.livein_hostel,
    req.body.rte_addmission,
    Number(req?.body?.roll_no) || 0,
    Number(req?.body?.gr_no) || 0,
    req.body.aadhar_diseno,
    req.body.aadhar_cardno,
    Number(req?.body?.mentor_id) || 0,
    req.body.birth_taluko.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.birth_district,
    req.body.birth_state,
    req.body.grandfather_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.father_aadharno,
    req.body.mother_aadharno,
    Number(req?.body?.parent_income) || 0,
    req.body.parent_occupation.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.parent_mobileno2,
    req.body.parent_whatsappno,
    req.body.parent_email.replace(/\s+/g, ' ').trim().toLowerCase(),
    req.body.ration_cardno,
    req.body.isbpl_rationcard || null,
    req.body.bank_accountno,
    req.body.bank_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.branch_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.ifsc_code,
    req.body.preschool_name.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.preschool_address.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.preschool_village.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.preschool_taluka.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.preschool_district,
    req.body.preschool_state,
    Number(req?.body?.preschool_result) || 0,
    dateofLeftSchool,
    req.body.school_leftreason.replace(/\s+/g, ' ').trim().toUpperCase(),
    Number(req?.body?.payable_schoolfee) || 0,
    Number(req?.body?.payable_busfee) || 0,
    Number(req?.body?.payable_hostelfee) || 0,
    Number(req?.body?.paid_schoolfee) || 0,
    Number(req?.body?.paid_busfee) || 0,
    Number(req?.body?.paid_hostelfee) || 0,
    Number(req?.body?.unpaid_schoolfee) || 0,
    Number(req?.body?.unpaid_busfee) || 0,
    Number(req?.body?.unpaid_hostelfee) || 0,
    Number(req?.body?.total_payablefee) || 0,
    Number(req?.body?.total_paidfee) || 0,
    Number(req?.body?.total_unpaidfee) || 0,
    dateofFeeDue,
    req.body.guardian_firstname.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.guardian_middlename.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.guardian_lastname.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.guardian_address.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.guardian_village.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.guardian_taluka.replace(/\s+/g, ' ').trim().toUpperCase(),
    req.body.guardian_district,
    req.body.guardian_state,
    Number(req?.body?.guardian_pin) || null,
    req.body.guardian_mobileno1,
    req.body.guardian_mobileno2,
    req.body.guardian_whatsappno,
    req.body.guardian_landlineno,
    req.body.guardian_relationship,
    req?.body?.profile_image,
  ];

  try {
    const sql =
      'INSERT INTO student (educational_year, addmission_date, school_id, standard, division, section, medium, stream, first_name, middle_name, last_name, mother_name, address, village, taluka, district, state, pin, habitation, birth_date, birth_place, gender, religion, caste, parent_mobileno1, live_withguardian, is_orphan, cwsn_status, bus_rootno, is_repeater, livein_hostel, rte_addmission, roll_no, gr_no, aadhar_diseno, aadhar_cardno, mentor_id, birth_taluko, birth_district, birth_state, grandfather_name, father_aadharno, mother_aadharno, parent_income, parent_occupation, parent_mobileno2, parent_whatsappno, parent_email, ration_cardno, isbpl_rationcard, bank_accountno, bank_name, branch_name, ifsc_code, preschool_name, preschool_address, preschool_village, preschool_taluka, preschool_district, preschool_state, preschool_result, school_leftdate, school_leftreason, payable_schoolfee, payable_busfee, payable_hostelfee, paid_schoolfee, paid_busfee, paid_hostelfee, unpaid_schoolfee, unpaid_busfee, unpaid_hostelfee, total_payablefee, total_paidfee, total_unpaidfee, feedue_date, guardian_firstname, guardian_middlename, guardian_lastname, guardian_address, guardian_village, guardian_taluka, guardian_district, guardian_state, guardian_pin, guardian_mobileno1, guardian_mobileno2, guardian_whatsappno, guardian_landlineno, guardian_relationship, profile_image, updated_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40,$41,$42,$43,$44,$45,$46,$47,$48,$49,$50,$51,$52,$53,$54,$55,$56,$57,$58,$59,$60,$61,$62,$63,$64,$65,$66,$67,$68,$69,$70,$71,$72,$73,$74,$75,$76,$77,$78,$79,$80,$81,$82,$83,$84,$85,$86,$87,$88,$89,$90,$91,now()) returning *';
    const { rows } = await db.query(sql, values);
    const { id, first_name, middle_name, last_name, birth_date } = rows[0];
    const user = await createUser(
      'student',
      id,
      first_name,
      middle_name,
      last_name,
      birth_date
    );
    if (user) {
      res.status(201).json({
        status: 'success with user created',
        insertId: rows[0].id,
      });
    } else {
      res.status(201).json({
        status: 'success with user not created',
        insertId: rows[0].id,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'failed',
    });
  }
};

// =============> read or get all records <=============
const getAllStudents = async (req, res) => {
  const { page, limit, searchByName } = req.query;
  const pageNo = page > 0 ? page - 1 : 1;
  const offset = page > 0 ? limit * pageNo : 0;
  const pageLimit = Number(limit) || 5;
  const searchText = searchByName ? `WHERE id=${searchByName}` : '';

  const sql = `SELECT id, educational_year, school_id, standard, division, medium, stream, first_name, middle_name, last_name FROM student ${searchText} ORDER BY id DESC LIMIT $1 OFFSET $2`;
  let values = [];
  values = [...values, pageLimit, offset];
  try {
    const { rows } = await db.query(sql, values);
    const totalRecords = searchByName
      ? Number(rows.length)
      : await totalRecordCount('student');
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
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM student WHERE id=$1';
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
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('student', Number(id));
    if (recordPresent) {
      const dateofAddmission = new Date(req?.body?.addmission_date);
      const dateofBirth = new Date(req?.body?.birth_date);
      const dateofLeftSchool = new Date(req?.body?.school_leftdate);
      const dateofFeeDue = new Date(req?.body?.feedue_date);

      const values = [
        req.body.educational_year,
        dateofAddmission,
        Number(req?.body?.school_id),
        // Number(req?.body?.standard),
        req.body.standard,
        req.body.division,
        req.body.section,
        req.body.medium,
        req.body.stream,
        req.body.first_name.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.middle_name.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.last_name.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.mother_name.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.address.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.village.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.taluka.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.district,
        req.body.state,
        Number(req?.body?.pin),
        req.body.habitation,
        dateofBirth,
        req.body.birth_place.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.gender,
        req.body.religion,
        req.body.caste,
        req.body.parent_mobileno1,
        req.body.live_withguardian,
        req.body.is_orphan,
        req.body.cwsn_status,
        Number(req.body.bus_rootno),
        req.body.is_repeater,
        req.body.livein_hostel,
        req.body.rte_addmission,
        Number(req?.body?.roll_no) || 0,
        Number(req?.body?.gr_no) || 0,
        req.body.aadhar_diseno,
        req.body.aadhar_cardno,
        Number(req?.body?.mentor_id) || 0,
        req.body.birth_taluko.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.birth_district,
        req.body.birth_state,
        req.body.grandfather_name.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.father_aadharno,
        req.body.mother_aadharno,
        Number(req?.body?.parent_income) || 0,
        req.body.parent_occupation.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.parent_mobileno2,
        req.body.parent_whatsappno,
        req.body.parent_email.replace(/\s+/g, ' ').trim().toLowerCase(),
        req.body.ration_cardno,
        req.body.isbpl_rationcard,
        req.body.bank_accountno,
        req.body.bank_name.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.branch_name.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.ifsc_code,
        req.body.preschool_name.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.preschool_address.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.preschool_village.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.preschool_taluka.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.preschool_district,
        req.body.preschool_state,
        Number(req?.body?.preschool_result) || 0,
        dateofLeftSchool,
        req.body.school_leftreason.replace(/\s+/g, ' ').trim().toUpperCase(),
        Number(req?.body?.payable_schoolfee) || 0,
        Number(req?.body?.payable_busfee) || 0,
        Number(req?.body?.payable_hostelfee) || 0,
        Number(req?.body?.paid_schoolfee) || 0,
        Number(req?.body?.paid_busfee) || 0,
        Number(req?.body?.paid_hostelfee) || 0,
        Number(req?.body?.unpaid_schoolfee) || 0,
        Number(req?.body?.unpaid_busfee) || 0,
        Number(req?.body?.unpaid_hostelfee) || 0,
        Number(req?.body?.total_payablefee) || 0,
        Number(req?.body?.total_paidfee) || 0,
        Number(req?.body?.total_unpaidfee) || 0,
        dateofFeeDue,
        req.body.guardian_firstname.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.guardian_middlename.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.guardian_lastname.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.guardian_address.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.guardian_village.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.guardian_taluka.replace(/\s+/g, ' ').trim().toUpperCase(),
        req.body.guardian_district,
        req.body.guardian_state,
        Number(req?.body?.guardian_pin) || null,
        req.body.guardian_mobileno1,
        req.body.guardian_mobileno2,
        req.body.guardian_whatsappno,
        req.body.guardian_landlineno,
        req.body.guardian_relationship,
        req?.body?.profile_image,
        Number(id),
      ];
      const sql =
        'UPDATE student SET educational_year=$1, addmission_date=$2, school_id=$3, standard=$4, division=$5, section=$6, medium=$7, stream=$8, first_name=$9, middle_name=$10, last_name=$11, mother_name=$12, address=$13, village=$14, taluka=$15, district=$16, state=$17, pin=$18, habitation=$19, birth_date=$20, birth_place=$21, gender=$22, religion=$23, caste=$24, parent_mobileno1=$25, live_withguardian=$26, is_orphan=$27, cwsn_status=$28, bus_rootno=$29, is_repeater=$30, livein_hostel=$31, rte_addmission=$32, roll_no=$33, gr_no=$34, aadhar_diseno=$35, aadhar_cardno=$36, mentor_id=$37, birth_taluko=$38, birth_district=$39, birth_state=$40, grandfather_name=$41, father_aadharno=$42, mother_aadharno=$43, parent_income=$44, parent_occupation=$45, parent_mobileno2=$46, parent_whatsappno=$47, parent_email=$48, ration_cardno=$49, isbpl_rationcard=$50, bank_accountno=$51, bank_name=$52, branch_name=$53, ifsc_code=$54, preschool_name=$55, preschool_address=$56, preschool_village=$57, preschool_taluka=$58, preschool_district=$59, preschool_state=$60, preschool_result=$61, school_leftdate=$62, school_leftreason=$63, payable_schoolfee=$64, payable_busfee=$65, payable_hostelfee=$66, paid_schoolfee=$67, paid_busfee=$68, paid_hostelfee=$69, unpaid_schoolfee=$70, unpaid_busfee=$71, unpaid_hostelfee=$72, total_payablefee=$73, total_paidfee=$74, total_unpaidfee=$75, feedue_date=$76, guardian_firstname=$77, guardian_middlename=$78, guardian_lastname=$79, guardian_address=$80, guardian_village=$81, guardian_taluka=$82, guardian_district=$83, guardian_state=$84, guardian_pin=$85, guardian_mobileno1=$86, guardian_mobileno2=$87, guardian_whatsappno=$88, guardian_landlineno=$89, guardian_relationship=$90, profile_image=$91, updated_at=now() WHERE id=$92 returning *';

      const { rows } = await db.query(sql, values);
      const studentId = rows[0].id;
      const { first_name, middle_name, last_name, birth_date } = rows[0];
      const user = await createUser(
        'student',
        studentId,
        first_name,
        middle_name,
        last_name,
        birth_date
      );
      if (user) {
        res.status(200).json({
          status: 'success with user updated',
          rows,
        });
      } else {
        res.status(200).json({
          status: 'success with user not updated',
          rows,
        });
      }
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
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const recordPresent = await recordExist('student', Number(id));
    if (recordPresent) {
      const sql = 'DELETE FROM student WHERE id=$1';
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
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
