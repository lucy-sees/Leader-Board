import './index.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import { createData, getData } from './modules/api.js';

const refreshBtn = document.getElementById('refresh');
const submitBtn = document.getElementById('submit');

const render = async () => {
  const data = await getData();
  const recentScore = document.getElementById('list-ul');
  recentScore.innerHTML = '';
  const sortedData = _.sortBy(data, 'score');
  sortedData.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-item');
    listItem.innerText = `${item.user}: ${item.score}`;
    recentScore.appendChild(listItem);
  });
};

refreshBtn.addEventListener('click', render);

submitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const nameInput = document.getElementById('name-input');
  const scoreInput = document.getElementById('score-input');
  const data = {
    user: nameInput.value,
    score: Number(scoreInput.value),
  };
  await createData(data);
  nameInput.value = '';
  scoreInput.value = '';
});