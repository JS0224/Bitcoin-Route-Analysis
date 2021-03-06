const mariadb = require('mariadb');
const vals = require('./const.js');

const pool = mariadb.createPool({
    host: vals.DBHost,
    port:vals.DBPort,
    user: vals.DBUser,
    password: vals.DBPass,
    database :vals.DBName,
    connectionLimit: 3
});

/*
async function getConnection(sql){
    let conn = null;
    let rows = null;
    try{
        conn = await pool.getConnection();
        console.log("DB connected success!!!!");
    }
    catch(err){
        console.log("DB connection error:", err);
    }
    finally{
      return conn;
    }
}*/

async function getDataFromDB(sql){
  //console.log("conn, sql : ", sql)
  let rows, conn;
  try {
      conn = await pool.getConnection();
      rows = await conn.query(sql);
  }
  catch(err){
    console.log("data error while getting from db:",err);
  }
  finally{
    //console.log("rows ", rows);
    conn.end();
    return rows
  }
}

function getSql(DB){
  switch (DB) {
    case 'Blocks':
      return "SELECT * from Blocks WHERE id = ";
    case 'Transactions':
      return "SELECT * from Transactions WHERE transaction_hash = ";
    case 'Addresses':
      return "SELECT * from Addresses WHERE addr = ";
    default:
      return null;
  }
}

module.exports = {
    //getConnection: getConnection,
    getDataFromDB: getDataFromDB,
    getSql : getSql
}
