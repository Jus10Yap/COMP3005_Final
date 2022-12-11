const db = require('../SQL/db-init');
const express = require('express');
const router = express.Router();

router.get('/user', async(req, res) => {
    console.log(`${req.method} for ${req.url}`);
    const name= req.query.id;
    console.log(req.query.id);
    if (name == undefined || name == null || name == "") {
        console.log("pain");
        
    } else {
        const orders = await db.query(
            `SELECT *
            FROM CART_ITEM 
            LEFT JOIN BOOK
            ON CART_ITEM.book_isbn = BOOK.isbn
            WHERE user_id LIKE (?) AND finished = 0`, [req.query.id]
        )
        console.log(orders);
        res.send(orders)
    }
});


module.exports = router;