// Create a new router
const express = require("express")
const router = express.Router()

const { check, validationResult } = require('express-validator');

const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('./login') // redirect to the login page
    } else { 
        next (); // move to the next middleware function
    } 
}

router.get('/search',function(req, res, next){
    res.render("search.ejs")
});

router.get('/search-result', function (req, res, next) {
    //searching in the database
    res.send("You searched for: " + req.query.keyword)
});

router.get('/list', function(req, res, next) {
        let sqlquery = "SELECT * FROM books"; // query database to get all the books
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                next(err)
            }
            res.render("list.ejs", {availableBooks:result})
        });
});

router.get('/addbook',redirectLogin, function(req,res,next){
    res.render("addbook.ejs")
});

router.post('/bookadded',[
    check('name').notEmpty(),
    check('price').notEmpty()], 
    function (req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.render('addbook',{errors:errors.array()})
        }
    // saving data in database
    let sqlquery = "INSERT INTO books (name, price) VALUES (?,?)"
    // execute sql query
    let newrecord = [req.body.name, req.body.price]
    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            next(err)
        }
        else
            res.send(' This book is added to database, name: '+ req.body.name + ' price '+ req.body.price)
    })
})

router.get('/bargainbooks', function(req,res, next){
    let sqlquery = "SELECT * FROM books WHERE price<20 ORDER BY price ASC"
    db.query(sqlquery, (err, result) => {
        if(err) {
            next(err)
        }

        res.render("bargainbooks.ejs",{
        bargainBooks:result, message:result.length === 0? "No bargain books found" : ""
        })
    })
})

// Export the router object so index.js can access it
module.exports = router
