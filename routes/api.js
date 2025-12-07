const express = require('express')
const router = express.Router()
const db = global.db

router.get('/books', function (req, res, next) {

    // Query database to get all the books
    let sqlquery = "SELECT * FROM books"
    let search = req.query.search;

    if(search){
        sqlquery = "SELECT * FROM books WHERE name LIKE ?";
        search = '%' + search +'%'
    }
    else{
        sqlquery = "SELECT * FROM books"
    }

    // Execute the sql query
    db.query(sqlquery, [search] (err, result) => {
        // Return results as a JSON object
        if (err) {
            res.json(err)
            next(err)
        }
        else {
            res.json(result)
        }
    })
})
module.exports = router