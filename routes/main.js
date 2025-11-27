// Create a new router
const express = require("express")
const router = express.Router()

// Handle our routes
router.get('/',function(req, res, next){
    res.render('index.ejs')
});

router.get('/about',function(req, res, next){
    res.render('about.ejs')
});

 router.get('/logout', redirectLogin, (req,res) => {
    req.session.destroy(err => {
    if (err) {
        return res.redirect('./')
    }
    res.send('you are now logged out. <a href='+'./'+'>Home</a>');
    })
})

router.get('/search', function(req, res, next){
    res.render("search.ejs");
});

router.get('/search-result', function (req, res, next){
    const searchKeyword = req.query.search_text;

    let sqlquery = "SELECT * FROM books WHERE name LIKE ?";
    let searchValue = '%' + searchKeyword + '%';

    db.query(sqlquery, [searchValue], (err, result) => {
        if(err){
            next(err);
        }
        res.render("search-result.ejs", {
            books: result,
            keyword: searchKeyword
        });
    });
});

// Export the router object so index.js can access it
module.exports = router