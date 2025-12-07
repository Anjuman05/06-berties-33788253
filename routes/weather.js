// Create a new router
const express = require("express")
const request = require("request")
const router = express.Router();

router.get("/weather", (req,res) => {
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
            var wmsg = `It is ${weather.main.temp}*C in ${weather.name}. <br> 
                Humidity: ${weather.main.humidity}% <br> 
                Feels Like: ${weather.main.feels_like}*C <br> 
                Wind Speed: ${weather.wind.speed}`
            // res.send (wmsg);
            res.render("weatherresult.ejs", {
                weather:wmsg,
                error: null,
                city: weather.name
            })
          } 
        })
})
// Export the router object so index.js can access it
module.exports = router