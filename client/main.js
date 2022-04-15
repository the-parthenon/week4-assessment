const baseURL = `http://localhost:4000/api/fortunelist`;

const errCallback = (err) => console.log(err.response.data);
const fortuneCallback = ({ data: fortuneArr }) => displayFortunes(fortuneArr);

document.getElementById('complimentButton').onclick = function () {
  axios
    .get(`http://localhost:4000/api/compliment`)
    .then(function (response) {
      const data = response.data;
      alert(data);
    })
    .catch(errCallback);
};

document.getElementById('fortuneButton').onclick = () => {
  axios
    .get(`http://localhost:4000/api/fortune`)
    .then(function (res) {
      const data = res.data;
      alert(data);
    })
    .catch(errCallback);
};

document.getElementById('addFortune').onsubmit = (evt) => {
  evt.preventDefault();

  let newFortune = document.querySelector('#newFortune');

  let body = {
    text: newFortune.value,
  };

  axios.post(baseURL, body).then(fortuneCallback).catch(errCallback);

  newFortune.value = '';
};

document.getElementById('allFortunes').onclick = () => {
  axios.get(baseURL).then(fortuneCallback).catch(errCallback);
};

const fortuneContainer = document.getElementById('fortuneContainer');

const displayFortunes = (fortuneArr) => {
  fortuneContainer.innerText = '';
  for (let i = 0; i < fortuneArr.length; i++) {
    const fortuneText = document.createElement('div');
    fortuneText.innerHTML = `${fortuneArr[i].id}. ${fortuneArr[i].text}`;
    fortuneContainer.appendChild(fortuneText);
  }
};

document.getElementById('removeFortune').onsubmit = (evt) => {
  evt.preventDefault();
  let deadFortune = document.querySelector('#deadFortune').value;
  axios.delete(`${baseURL}/${deadFortune}`).then(fortuneCallback).catch(errCallback);
  document.querySelector('#deadFortune').value = '';
};

document.getElementById('replaceFortune').onsubmit = (evt) => {
  evt.preventDefault();

  let newFortune = document.querySelector('#changeFortuneText');

  let body = {
    text: newFortune.value,
  };

  let param = document.querySelector('#changeFortuneID').value;
  axios.put(`${baseURL}/${param}`, body).then(fortuneCallback).catch(errCallback);

  newFortune.value = '';
  document.body.querySelector('#changeFortuneID').value = '';
};
