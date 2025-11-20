// Create a new router
const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const saltRounds = 10

router.get('/register', function (req, res, next) {
    res.render('register.ejs')
})

router.post('/registered', function (req, res, next) {
    const plainPassword = req.body.password
    const {username, first, last, email} = req.body;
    
    bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
    // Store hashed password in your database.
    let sqlquery = "INSERT INTO users( username, first_name, last_name, email, hashedPassword) Values (? ,? ,? ,? ,?)";
    let newrecord = [username, first, last, email, hashedPassword]; 
    
        db.query(sqlquery, newrecord, (err, result) => { 
            let resultMessage = 'Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email;
            resultMessage += 'Your password is: '+ req.body.password +' and your hashed password is: '+ hashedPassword;
            res.send(resultMessage);
        });
    });                                                                  
}); 

router.get('/list', function(req, res, next) {
        let sqlquery = "SELECT id, username, first_name, last_name, email FROM users"; 
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) throw err;
            res.render("userlist.ejs", {users:result})
        });
});

// Export the router object so index.js can access it
module.exports = router
