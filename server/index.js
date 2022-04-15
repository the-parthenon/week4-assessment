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

const {
  readFortune,
  getFortunes,
  createFortunes,
  deleteFortunes,
  changeFortunes,
} = require('./controller');

app.get('/api/fortune', readFortune);
app.get('/api/fortunelist', getFortunes);
app.post(`/api/fortunelist`, createFortunes);
app.delete(`/api/fortunelist/:id`, deleteFortunes);
app.put(`/api/fortunelist/:id`, changeFortunes);

const serverID = 4000;
app.listen(serverID, () => console.log(`Server running on ${serverID}`));
