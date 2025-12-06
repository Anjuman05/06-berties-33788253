// Create a new router
const express = require("express")
const request = require("request")
const router = express.Router();

router.get("/weather/now", (req,res) => {
    res.render("weather.ejs", {
        weather:null, 
        error: null})
})

router.post("/weather/now", (req, res, next) => {

        let apiKey = 'cd54ef41999092bd7fbf167a135c4c2a'
        let city = req.body.city
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
                     
        request(url, function (err, response, body) {
          if(err){
            next(err)
          } else {
            // res.send(body)
            var weather = JSON.parse(body)
            var wmsg = `It is ${weather.main.temp}*C in ${weather.name}. <br>` +
                `The humidity now is ${weather.main.humidity}` 
            res.send (wmsg);
          } 
        })
})
// Export the router object so index.js can access it
module.exports = router