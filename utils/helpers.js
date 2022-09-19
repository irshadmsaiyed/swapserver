const db = require('../db');

const totalRecordCount = async (tableName) => {
  try {
    const sql = `SELECT count(id) AS count FROM ${tableName}`;
    const { rows } = await db.query(sql);
    const { count } = rows[0];
    if (count <= 0) {
      return 0;
    }
    return count;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const recordExist = async (tableName, id) => {
  try {
    const sql = `SELECT id FROM ${tableName} WHERE id=$1`;
    const { rows } = await db.query(sql, [id]);
    const { length } = rows;
    if (length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const createUser = async (
  userType,
  id,
  first_name,
  middle_name,
  last_name,
  birth_date
) => {
  try {
    const userName = first_name.toLowerCase();
    const firstName = first_name.charAt(0);
    const middleName = middle_name.charAt(0).toLowerCase();
    const lastName = last_name.charAt(0).toLowerCase();
    const day = new Date(birth_date).toLocaleDateString('in', {
      day: '2-digit',
    });
    const month = new Date(birth_date).toLocaleDateString('in', {
      month: '2-digit',
    });
    const year = new Date(birth_date).toLocaleDateString('in', {
      year: '2-digit',
    });
    const username = `${userName}${id}`;
    const password = `${firstName}${middleName}${lastName}@${day}${month}${year}`;
    const sql = `UPDATE ${userType} set username=$1, password=$2 WHERE id=$3`;
    const { rows } = await db.query(sql, [username, password, id]);
    const { length } = rows;
    if (length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { totalRecordCount, recordExist, createUser };
