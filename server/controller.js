let fortuneArr = require('./db.json');

module.exports = {
  readFortune: (req, res) => {
    let randomIndex = Math.floor(Math.random() * fortuneArr.length);
    let randomFortune = `${fortuneArr[randomIndex].text}`;

    res.status(200).send(randomFortune);
  },

  getFortunes: (req, res) => {
    res.status(200).send(fortuneArr);
  },

  createFortunes: (req, res) => {
    const { text } = req.body;
    let newFortune = {
      id: fortuneArr.length + 1,
      text,
    };
    fortuneArr.push(newFortune);
    res.status(200).send(fortuneArr);
  },

  deleteFortunes: (req, res) => {
    let index = fortuneArr.findIndex((elem) => elem.id === +req.params.id);
    fortuneArr.splice(index, 1);
    res.status(200).send(fortuneArr);
  },

  changeFortunes: (req, res) => {
    let index = fortuneArr.findIndex((elem) => elem.id === +req.params.id);
    const { text } = req.body;
    fortuneArr[index].text = text;
    res.status(200).send(fortuneArr);
  },
};
