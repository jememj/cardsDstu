import generateRandomId from './generateRandomId';

export default function generateEmptyCard(deckId, pos) {
  return {
    id: generateRandomId('card-'),
    question: '',
    answer: '',
    deckId,
    pos,
    author: 1,
  };
}
