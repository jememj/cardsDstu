import axios from 'axios';

class Api {
  _url = 'http://localhost:5000';

  getDecks() {
    return axios.get(`${this._url}/decks`);
  }

  postNewDeck(newDeck) {
    return axios.post(`${this._url}/decks`, newDeck);
  }

  getCurrentDeck(deckId) {
    return axios.get(`${this._url}/currentDecks/${deckId}`);
  }

  // deleteCard(deletedCards) {
  //   // console.log(deletedCards);
  //   return axios.delete(`${this._url}/cards/:`);
  // }

  // updateCards(newCards) {
  //   return axios.patch(`${this._url}/cards/:id"`);
  // }

  // getCardsByDeck(id) {
  //   return axios.get(`${this._url}/cards/byDeckId/${id}`);
  // }
}

const decksApi = new Api();
export default decksApi;
