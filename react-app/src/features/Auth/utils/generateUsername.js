import { adjectives } from "../data/adjectivesList";
import { nouns } from "../data/nounsList";

export function generateUsername() {
  let adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  let noun = nouns[Math.floor(Math.random() * nouns.length)];
  let num = Math.ceil(Math.random() * (9999 - 1 + 1));

  let capitalizedAdj = adjective.charAt(0).toUpperCase() + adjective.slice(1);
  let capitalizedNoun = noun.charAt(0).toUpperCase() + noun.slice(1);

  const format1 = capitalizedAdj + "-" + capitalizedNoun + "-" + num.toString();
  const format2 = capitalizedAdj + "_" + capitalizedNoun + "_" + num.toString();
  const format3 = capitalizedAdj + "_" + capitalizedNoun + num.toString();
  const format4 = capitalizedAdj + "-" + capitalizedNoun + num.toString();
  const format5 = capitalizedAdj + capitalizedNoun + num.toString();

  let formats = [format1, format2, format3, format4, format5];
  return formats[Math.floor(Math.random() * formats.length)];
}
