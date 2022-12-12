const db = require('../SQL/db-init');
const express = require('express');
const router = express.Router();

//book title and isbn search bar route
router.get('/book', async(req, res) => {
    console.log(`${req.method} for ${req.url}`);
    const name= req.query;

    //if user did not input a book title or isbn then return all books
    if (name == undefined || name == null || name == "") {
        const books = await db.query(
            `SELECT *
            FROM BOOK
            INNER JOIN publisher
            ON BOOK.publisher_id = PUBLISHER.id`, []
        )
        res.send(books)
        //else if user did input book title then query the book with that title
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
        //else if user input isbn then 
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

//sidebox data for genere
router.get('/genre', async(req, res) => {
    console.log(`${req.method} for ${req.url}`);
    const { key } = req.query

    //querying for distinct genres in book
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


//sidebox author data
router.get('/author', async(req, res) => {
    console.log(`${req.method} for ${req.url}`);
    const { key } = req.query
    //querying for distinct authors in book database
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

//sidebox publisher 
router.get('/publisher', async(req, res) => {
    console.log(`${req.method} for ${req.url}`);
    const { key } = req.query

    //querying distinct publishers
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



//if user decides to select all three genre, author, publisher(or 1 to 2)
router.post('/books', async(req, res) => {
    console.log(`${req.method} for ${req.url}`);
    console.log(req.body);

    let genres = req.body.gen;
    let authors = req.body.auth;
    let publishers = req.body.pub;

    let params = [];

    //if none of checkboxes are selected
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
        //user checked genre
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
        //user checked author
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
        //user checked publishers
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


//posting current owner to server
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

//querying the owner thats logged in info
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