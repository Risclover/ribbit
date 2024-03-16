import { adjectives } from "../data/adjectivesList";
import { nouns } from "../data/nounsList";

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}

export function generateUsername() {
  const adjective = capitalize(getRandomElement(adjectives));
  const noun = capitalize(getRandomElement(nouns));
  const num = getRandomNumber(1, 9999);

  const formats = [
    `${adjective}-${noun}-${num}`,
    `${adjective}_${noun}_${num}`,
    `${adjective}_${noun}${num}`,
    `${adjective}-${noun}${num}`,
    `${adjective}${noun}${num}`,
  ];

  return getRandomElement(formats);
}
