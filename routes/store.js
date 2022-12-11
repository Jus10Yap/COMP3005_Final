const db = require('../SQL/db-init');
const express = require('express');
const router = express.Router();

router.get('/:isbn', async (req, res) => {
    console.log(`${req.method} for ${req.url}`);
    console.log("WHAT THE FUCKL");
    const { name } = req.params

    const book = await db.query(
        `SELECT * 
        FROM BOOK
        NATURAL JOIN publisher
        WHERE ISBN LIKE 23452`,
        [name]
    )
    res.send(book)
})

router.post('/upload', async (req, res) => {
    console.log(req.body)
    
    const IBSN = req.body.values.IBSN;
    const title = req.body.values.title;
    const author = req.body.values.author;
    const publisher_id = req.body.values.publisher_id;
    const genre = req.body.values.genre;
    const stockQuantity = req.body.values.stockQuantity;
    const num_pages = req.body.values.num_pages;
    const price = req.body.values.price;
    const publisher_percentage = req.body.values.publisher_percentage;

    const newData = await db.query(
        `INSERT INTO BOOK VALUES (?,?,?,?,?)`,
        [IBSN,title,author, publisher_id,genre,stockQuantity, num_pages, price,publisher_percentage]
    )

    // const newData2 = await db.query(
    //     `INSERT INTO publisher VALUES (?,?,?,?)`,
    //     [switchID,storeID,1,price]
    // )
   
    res.send({success: true});
    
})
module.exports = router;