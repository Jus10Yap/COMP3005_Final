const db = require('../SQL/db-init');
const express = require('express');
const router = express.Router();

router.get('/book', async(req, res) => {
    console.log(`${req.method} for ${req.url}`);
    const name= req.query;
    if (name == undefined || name == null || name == "") {
        const books = await db.query(
            `SELECT *
            FROM BOOK
            INNER JOIN publisher
            ON BOOK.publisher_id = PUBLISHER.id`, []
        )
        res.send(books)
    } else if (req.query.title != undefined) {
        const books = await db.query(
            `SELECT * 
            FROM BOOK
            INNER JOIN publisher
            ON BOOK.publisher_id = PUBLISHER.id
            WHERE UPPER(title) LIKE (?)`, [("%".concat(req.query.title).concat("%")).toUpperCase()]
        )
        
        res.send(books)
    } else {
        const books = await db.query(
            `SELECT * 
            FROM BOOK
            INNER JOIN publisher
            ON BOOK.publisher_id = PUBLISHER.id
            WHERE ISBN LIKE (?)`, [req.query.isbn]
        )
        
        res.send(books)
    }
});


router.get('/genre', async(req, res) => {
    console.log(`${req.method} for ${req.url}`);
    const { key } = req.query

    if (key === undefined || key == null || key == "") {
        const genre = await db.query(
            `SELECT DISTINCT genre
            FROM BOOK
            INNER JOIN publisher
            ON BOOK.publisher_id = PUBLISHER.id`, []
        )
        res.send(genre)
    } else {
        const genre = await db.query(
            `SELECT DISTINCT genre 
            FROM BOOK
            INNER JOIN publisher
            ON BOOK.publisher_id = PUBLISHER.id
            WHERE genre LIKE (?)`, [key]
        )
        res.send(genre)
    }
});

router.get('/author', async(req, res) => {
    console.log(`${req.method} for ${req.url}`);
    const { key } = req.query

    if (key === undefined || key == null || key == "") {
        const author = await db.query(
            `SELECT DISTINCT author 
            FROM BOOK
            INNER JOIN publisher
            ON BOOK.publisher_id = PUBLISHER.id`, []
        )
        res.send(author)
    } else {
        const author = await db.query(
            `SELECT DISTINCT author 
            FROM BOOK
            INNER JOIN publisher
            ON BOOK.publisher_id = PUBLISHER.id
            WHERE author LIKE (?);`, [key]
        )
        res.send(author)
    }
});


router.get('/publisher', async(req, res) => {
    console.log(`${req.method} for ${req.url}`);
    const { key } = req.query


    if (key === undefined || key == null || key == "") {
        const publisher = await db.query(
            `SELECT DISTINCT publisher_name
            FROM publisher`, []
        )
        res.send(publisher)
    } else {
        const publisher = await db.query(
            `SELECT publisher_name
            FROM publisher
            WHERE publisher_name LIKE (?)`, [key]
        )
        res.send(publisher)
    }
});




router.post('/books', async(req, res) => {
    console.log(`${req.method} for ${req.url}`);
    console.log(req.body);

    let genres = req.body.gen;
    let authors = req.body.auth;
    let publishers = req.body.pub;

    let params = [];

    if (genres.length == 0 && authors.length == 0 && publishers.length == 0) {
        const books = await db.query(
            `SELECT * 
            FROM BOOK
            INNER JOIN publisher
            ON BOOK.publisher_id = PUBLISHER.id`, []
        )
        
        res.send(books)
    } else {
        let sqlQuery = `SELECT * FROM book INNER JOIN publisher
        ON BOOK.publisher_id = PUBLISHER.id WHERE`;

        if (genres.length != 0) {
            sqlQuery = sqlQuery + `(`;
            for (let i = 0; i < genres.length; i++) {
                if (i == 0) {
                    sqlQuery = sqlQuery + ` genre LIKE (?)`;
                } else {
                    sqlQuery = sqlQuery + ` OR genre LIKE (?)`;
                }
                params.push(genres[i]);
            }
            sqlQuery = sqlQuery + `)`;
        }

        if (genres.length > 0 && authors.length > 0) {
            sqlQuery = sqlQuery + ` AND `;
        }

        if (authors.length != 0) {
            sqlQuery = sqlQuery + `(`;
            for (let i = 0; i < authors.length; i++) {
                if (i == 0) {
                    sqlQuery = sqlQuery + ` author LIKE (?)`;
                } else {
                    sqlQuery = sqlQuery + ` OR author LIKE (?)`;
                }
                params.push(authors[i]);
            }
            sqlQuery = sqlQuery + `)`;
        }

        if (genres.length > 0 && publishers.length > 0 || authors.length > 0 && publishers.length > 0) {
            sqlQuery = sqlQuery + ` AND`;
        }

        if (publishers && publishers.length != 0) {
            sqlQuery = sqlQuery + `(`;
            for (let i = 0; i < publishers.length; i++) {
                if (i == 0) {
                    sqlQuery = sqlQuery + ` publisher_name LIKE (?)`;
                } else {
                    sqlQuery = sqlQuery + ` OR publisher_name LIKE (?)`;
                }
                params.push(publishers[i]);
            }
            sqlQuery = sqlQuery + `)`;
        }

        console.log(sqlQuery);
        console.log(params);

        const books = await db.query(sqlQuery, params);
        res.send(books);
    }

});



router.post('/login', async(req, res) => {

    const { username, password } = req.body

    if (username === undefined || username === "" || password === undefined || password === "") {
        res.send({ success: false, message: "Please enter a valid username or password" });
    } else {
        const owner = await db.query(
            `SELECT * 
            FROM OWNERS            
            WHERE username LIKE (?)`, [username]
        )

        if (owner.length === 0) {
            res.send({ success: false, message: "Please enter a valid username" });
        }
        console.log(owner[0].password, password)
        if (owner[0].password === password) {
            res.send({ success: true, message: "Login successful", owner });
        } else {
            res.send({ success: false, message: "Please enter a valid password" });
        }
    }

});

router.get('/owner', async(req, res) => {

    const { username } = req.query

    const owner = await db.query(
        `SELECT * 
        FROM OWNERS            
        WHERE username LIKE (?)`, [username]
    )

    if (owner.length === 0) {
        res.send({ success: false })
    } else {
        res.send({ success: true, owner })
    }

})

module.exports = router;