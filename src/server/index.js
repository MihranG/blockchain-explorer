const express = require('express');
const axios = require('axios');
const { decimalToHexStringDigit } = require('./utils');
const app = express();

const API_URL = 'https://cloudflare-eth.com';

app.use(express.static('dist'));
app.get('/api/block/:id', (req, res) => {
  const id = req.params.id;
  const idPrepared = id === 'latest' ? id : decimalToHexStringDigit(id);
  const options = {
    jsonrpc: '2.0',
    method: 'eth_getBlockByNumber',
    params: [idPrepared, true],
    id: 1,
  };
  axios
    .post(API_URL, options, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((r) => {
      if (r.status === 200) {
        res.send({ data: r.data });
      } else {
        res.send({ error: true, errorMessage: 'UNKNOWN_ERROR' });
      }
    })
    .catch((e) => {
      res.send({ error: true, errorMessage: e });
    });
});

app.listen(process.env.PORT || 8080, () =>
  console.log(`Listening on port ${process.env.PORT || 8080}!`)
);
