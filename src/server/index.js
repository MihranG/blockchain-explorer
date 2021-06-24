const express = require('express');
const fetch = require('node-fetch');
const {decimalToHexStringDigit} = require('./utils')

// const os = require('os');

const app = express();

const API_URL = 'https://cloudflare-eth.com'

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: "os.userInfo().username" }));
app.get('/api/block/:id', (req, res) => {
    const id = req.params.id;
    console.log('id', id, parseInt(id),parseInt(id).toString(16) )
    const idPrepared = id === 'latest' ? id : decimalToHexStringDigit(id);
    const options = {"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":[idPrepared, true],"id":1}
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(options)
        }).then((r)=>{
            if(r.status === 200){
                return r.json()
            }else {
                res.send({ error: true, errorMessage: 'UNKNOWN_ERROR' })
            }
        }).then(jsonRes=>{
            res.send({data: jsonRes})
        }).catch(e=>{
            res.send({ error: true, errorMessage: e })
        })

});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
