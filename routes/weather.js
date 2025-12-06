// Create a new router
const express = require("express")
const request = require("request")
const router = express.Router();

router.get("/weather/now", (req, res) => {
        let apiKey = 'cd54ef41999092bd7fbf167a135c4c2a'
        let city = 'london'
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
                     
        request(url, function (err, response, body) {
          if(err){
            next(err)
          } else {
            res.send(body)
          } 
        })
})
// Export the router object so index.js can access it
module.exports = router