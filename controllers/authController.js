const jwt = require('jsonwebtoken');
const db = require('../db');

// =============> LOGIN <=============
const login = async (req, res) => {
  try {
    const { username, password: userPassword, usertype } = req.body;

    let fields = 'id, first_name, last_name, password, active';
    if (usertype === 'employee') {
      fields = 'id, first_name, last_name, password, active, admin';
    }

    const sql = `SELECT ${fields} FROM ${usertype} WHERE username=$1`;
    const { rows } = await db.query(sql, [username]);

    if (!rows[0]?.id) {
      return res.status(400).json({ success: false, message: 'Not found' });
    }

    if (!rows[0]?.active) {
      return res.status(400).json({ success: false, message: 'Unauthorised' });
    }

    const matchPassword = Boolean(rows[0]?.password === userPassword);
    if (!matchPassword) {
      return res
        .status(400)
        .json({ success: false, message: 'Wrong credential' });
    }

    const token = jwt.sign(
      { id: rows[0]?.id, username, usertype },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res
      .cookie('access_token', token)
      .status(200)
      .json({
        success: true,
        firstName: rows[0]?.first_name,
        lastName: rows[0]?.last_name,
        isAdmin: rows[0]?.admin || false,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: 'Error & failed',
    });
  }
};

module.exports = {
  login,
};
