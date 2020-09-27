const express = require('express');

const port = 8080;

const app = new express();

app.use("/src", express.static('./src/'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})