const express = require('express');
const path = require('path');
const bycrypt = require('bcrypt');

const app = express();

// use ejs as the view engine
app.set('view engine', 'ejs');


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});