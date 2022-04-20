import generateRandomId from './generateRandomId';

export default function generateEmptyCard(deckId, pos) {
  return {
    id: generateRandomId(),
    question: '',
    answer: '',
    pos,
    deckId,
    author: 1,
  };
}
