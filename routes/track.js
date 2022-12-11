const db = require('../SQL/db-init');
const express = require('express');
const router = express.Router();

router.get('/order', async(req, res) => {
    console.log(`${req.method} for ${req.url}`);
    const name= req.query.id;
    console.log(req.query.id);
    if (name == undefined || name == null || name == "") {
        const orders = await db.query(
            `SELECT ORDER_INFO.id, ORDER_INFO.expected_ship_date,
            ORDER_INFO.date_of_receipt, ADDRESS_INFO.address_line, 
            ORDER_INFO.placed_by
            FROM ORDER_INFO INNER JOIN ADDRESS_INFO 
            ON ORDER_INFO.ship_to = ADDRESS_INFO.id`, []
        )
        res.send(orders)
    } else {
        const orders = await db.query(
            `SELECT ORDER_INFO.id, ORDER_INFO.expected_ship_date,
            ORDER_INFO.date_of_receipt, ADDRESS_INFO.address_line, 
            ORDER_INFO.placed_by
            FROM ORDER_INFO INNER JOIN ADDRESS_INFO 
            ON ORDER_INFO.ship_to = ADDRESS_INFO.id
            WHERE ORDER_INFO.id LIKE (?)`, [req.query.id]
        )
       
        res.send(orders)
    }
});


module.exports = router;