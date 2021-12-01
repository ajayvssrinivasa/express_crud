const express=require('express');
const app=express();
const request=require('request');
const PORT=5400;
const weatherUrl="https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=7f8ace28a7b2b35f956052b62a0c5186"

app.use(express.static('public'));

app.set('views','./src/views');

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.send("API is Working")
})

function getWeather(url){
    var options={
        url:weatherUrl,
        headers:{
            'User-Agent':'request'
        }
    };
    return new Promise(function(resolve,reject){
        request.get(options,function(err,response,body){
            if(err){
                reject(err);
            }else{
                resolve(body);
            }
        })
    })
}
app.get('/weather',(req,res)=>{
    var dataPromise = getWeather();
    dataPromise.then(JSON.parse)
    .then(function(result){
        res.render('home',{result,title:"***Weather App***"})
    })
})

app.get('/weather',(req,res)=>{
    request(url,(err,response,body)=>{
        if(err){
            console.log(err);
        }else{
            const output=JSON.parse(body);
            res.send(output);
        }
    })
})

app.listen(PORT,(err)=>{
    if(err){
        console.log('error in the API call');
    }else{
        console.log(`App is Running on ${PORT} `);
    }
})