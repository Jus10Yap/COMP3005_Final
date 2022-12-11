const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./SQL/bookstore.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.log(err.message)
    console.log('Connected to Sqlite3 Database')
})

async function query(sql, params) {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) {
                console.log(err.message)
                reject(err);
            }
            resolve(rows);
        })
    })
}

module.exports = { query }