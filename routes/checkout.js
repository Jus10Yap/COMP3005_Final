const db = require('../SQL/db-init');
const express = require('express');
const router = express.Router();

//when user access their cart based on their username
router.get('/user', async(req, res) => {
    console.log(`${req.method} for ${req.url}`);
    const name= req.query.id;
    console.log(req.query.id);

    //user did not input any username do nothing
    if (name == undefined || name == null || name == "") {
        console.log("pain");
        
    } else {
        //if user did input their username get all the cart items corresponding to the user_id and if the cart_item is not finished
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