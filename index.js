const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

///end points
app.get('/calculate-returns', (req, res) => {
  const boughtAt = parseFloat(req.query.boughtAt);
  const marketPrice = parseFloat(req.query.marketPrice);
  const quantity = parseInt(req.query.quantity);


  if (isNaN(boughtAt) || isNaN(marketPrice) || isNaN(quantity)) {
      return res.status(400).send('Invalid input. Please provide valid numbers for boughtAt, marketPrice, and quantity.');
  }

  const returnValue =(marketPrice - boughtAt) * quantity;
  console.log(returnValue)

  res.send(returnValue.toString());
});


app.get('/total-returns', (req, res) => {
  
  const stock1 = parseFloat(req.query.stock1);
  const stock2 = parseFloat(req.query.stock2);
  const stock3 = parseFloat(req.query.stock3);
  const stock4 = parseFloat(req.query.stock4);

  // Check for valid inputs
  if (isNaN(stock1) || isNaN(stock2) || isNaN(stock3) || isNaN(stock4)) {
      return res.status(400).send('Invalid input. Please provide valid numbers for stock1, stock2, stock3, and stock4.');
  }

  
  const totalReturnValue = stock1 + stock2 + stock3 + stock4;

  
  res.send(totalReturnValue.toString());
});


app.get('/calculate-return-percentage', (req, res) => {
  
  const boughtAt = parseFloat(req.query.boughtAt);
  const returns = parseFloat(req.query.returns);

  
  if (isNaN(boughtAt) || isNaN(returns)) {
      return res.status(400).send('Invalid input. Please provide valid numbers for boughtAt and returns.');
  }

 
  if (boughtAt === 0) {
      return res.status(400).send('boughtAt cannot be zero.');
  }


  const returnPercentage = (returns / boughtAt) * 100;

  
  res.send(returnPercentage.toString());
});


app.get('/total-return-percentage', (req, res) => {
 
  const stock1 = parseFloat(req.query.stock1);
  const stock2 = parseFloat(req.query.stock2);
  const stock3 = parseFloat(req.query.stock3);
  const stock4 = parseFloat(req.query.stock4);

  
  if (isNaN(stock1) || isNaN(stock2) || isNaN(stock3) || isNaN(stock4)) {
      return res.status(400).send('Invalid input. Please provide valid numbers for stock1, stock2, stock3, and stock4.');
  }

 
  const totalReturnPercentage = stock1 + stock2 + stock3 + stock4;

 
  res.send(totalReturnPercentage.toString());
});

app.get('/status', (req, res) => {
 
  const returnPercentage = parseFloat(req.query.returnPercentage);

  
  if (isNaN(returnPercentage)) {
      return res.status(400).send('Invalid input. Please provide a valid number for returnPercentage.');
  }

  
  let status = returnPercentage > 0 ? 'Profit' : 'Loss';

  
  res.send(status);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
