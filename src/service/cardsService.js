import axios from 'axios';

class Api {
  _url = 'http://localhost:5000';

  getCards() {
    return axios.get(`${this._url}/cards`);
  }

  postNewCards(newCards) {
    return axios.post(`${this._url}/cards`, newCards);
  }

  deleteCard(id) {
    return axios.delete(`${this._url}/cards/${id}`);
  }

  updateCards(newCards, ids) {
    console.log('service', ids);
    return axios.patch(`${this._url}/cards/${ids}`, newCards);
  }

  cardsByDeckId(id) {
    return axios.get(`${this._url}/cards/byDeckId/${id}`);
  }

  getCardByCardId(id) {
    return axios.get(`${this._url}/cards/${id}`);
  }
}

const cardsApi = new Api();
export default cardsApi;
