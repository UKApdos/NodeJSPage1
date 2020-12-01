const { request, response } = require('express');
const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/about', (request, response)=>{
    response.send('Uku says NO U');
});

app.get('/contact', (request, response)=>{
    response.send('Phone: 3725778455');
});

app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html');
});

app.post('/', (request, response)=>{
    let userChoice = request.body.currency;
    console.log(userChoice);

    axios.get('https://api.coindesk.com/v1/bpi/currentprice/eur.json')
.then(res =>{

    let eur = res.data.bpi.EUR.rate;
    let usd = res.data.bpi.USD.rate;
    console.log('EUR', eur);
    console.log('USD', usd);
    let message = '';

    if(userChoice === 'EUR'){
        message ='EUR'+ eur;
    } else {
        message = 'USD'+ usd;
    }
    response.send(message);
    });
});

app.listen(3000, ()=>{
    console.log('Server is running port 3000');
});