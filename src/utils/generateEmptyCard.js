import generateRandomId from './generateRandomId';

export default function generateEmptyCard(pos) {
  return {
    id: generateRandomId(),
    question: '',
    answer: '',
    pos,
    author: 1,
  };
}
