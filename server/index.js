const express = require('express');
const app = express();
const path = require('path');

const port = 3333;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.static(path.join(__dirname, '..')));
//app.use(express.static(path.join(__dirname, '..')));
app.use(express.static('public'));

// app.get('/', (req, res) => {
//   // res.render('index.html')
//   res.end();
// });

app.listen(port, () => {
  console.log(`Server listening at localhost:${port}!`);
});