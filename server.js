const express = require('express');
const path = require('path');
const search = require('./routes/search.js');
const store = require('./routes/store.js');
const track = require('./routes/track.js');
const checkout = require('./routes/checkout.js');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8080;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, './frontend/build')));
app.use(express.static("public"));

app.use('/search', search);
app.use('/book', store);
app.use('/track', track);
app.use('/checkout', checkout);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './frontend/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});