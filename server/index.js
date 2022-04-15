const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get('/api/compliment', (req, res) => {
  const compliments = [
    "Gee, you're a smart cookie!",
    'Cool shirt!',
    'Your Javascript skills are stellar.',
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
});

let fortuneArr = require('./db.json');

app.get('/api/fortune', (req, res) => {
  let randomIndex = Math.floor(Math.random() * fortuneArr.length);
  let randomFortune = `${fortuneArr[randomIndex].text}`;

  res.status(200).send(randomFortune);
});

app.get('/api/fortunelist', (req, res) => {
  res.status(200).send(fortuneArr);
});

app.post('/api/fortunelist', (req, res) => {
  const { text } = req.body;
  let newFortune = {
    id: fortuneArr.length + 1,
    text,
  };
  fortuneArr.push(newFortune);
  res.status(200).send(fortuneArr);
});

app.delete('/api/fortunelist/:id', (req, res) => {
  let index = fortuneArr.findIndex((elem) => elem.id === +req.params.id);
  fortuneArr.splice(index, 1);
  res.status(200).send(fortuneArr);
});

app.put('/api/fortunelist/:id', (req, res) => {
  let index = fortuneArr.findIndex((elem) => elem.id === +req.params.id);
  const { text } = req.body;
  fortuneArr[index].text = text;
  res.status(200).send(fortuneArr);
});

const serverID = 4000;
app.listen(serverID, () => console.log(`Server running on ${serverID}`));
