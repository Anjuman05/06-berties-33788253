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

router.get('/login', function (req, res, next){
    res.render('login.ejs')
});

router.post('/loggedin', function (req, res, next){
    const {username,password} = req.body;

    let sqlquery = "SELECT * FROM users WHERE username = ?"

    db.query(sqlquery, [username], (err, results) =>{
        
        if (results.length === 0) {
            return res.send("Login failed: Username not found.");
        }
        const hashedPassword = results[0].hashedPassword;

        bcrypt.compare(password, hashedPassword, function (err, result){
            if(result === true){
                res.send(`
                    <h1>Login successful!</h1>
                    <p>Welcome back, ${results[0].first_name} ${results[0].last_name}.</p>
                    <p>Your username is: ${results[0].username}</p>
                    <p>Your email is: ${results[0].email}</p>
                `)
            }else {
                res.send("Login failed: Incorrect password.");
            }

        })
    })
})

// Export the router object so index.js can access it
module.exports = router
