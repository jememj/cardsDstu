import axios from 'axios';

class Api {
  _url = 'http://localhost:5000';

  getCards() {
    return axios.get(`${this._url}/cards`);
  }

  postNewCard(newCards) {
    // console.log(newCards);
    return axios.post(`${this._url}/cards`, newCards);
  }

  deleteCard(deletedCards) {
    // console.log(deletedCards);
    return axios.delete(`${this._url}/cards/:`);
  }

  updateCards(newCards) {
    return axios.patch(`${this._url}/cards/:id"`);
  }

  getCardsByDeck(id) {
    return axios.get(`${this._url}/cards/byDeckId/${id}`);
  }
}

const cardsApi = new Api();
export default cardsApi;
