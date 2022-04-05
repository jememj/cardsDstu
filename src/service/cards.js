import axios from 'axios';

class Api {
  _url = 'http://localhost:5000';

  getCards() {
    return axios.get(`${this._url}/cards`);
  }

  postNewCard(newCards) {
    return axios.post(`${this._url}/cards`, newCards);
  }

  deleteCard(deletedCards) {
    return axios.delete(`${this._url}/cards/:id"`, deletedCards);
  }

  updateCards(newCards) {
    return axios.patch(`${this._url}/cards/:id"`, newCards);
  }
}

const cardsApi = new Api();
export default cardsApi;
