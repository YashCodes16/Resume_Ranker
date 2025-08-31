import axios from "axios";

const nlpInstances = [
  "http://localhost:5000",
  "http://localhost:5001",
  "http://localhost:5002",
  "http://localhost:5003",
  "http://localhost:5004",
  "http://localhost:5005",
  "http://localhost:5006",
  "http://localhost:5007",
];

let currentIndex = 0;

function getNextInstance() {
  const instance = nlpInstances[currentIndex];
  currentIndex = (currentIndex + 1) % nlpInstances.length;
  return instance;
}

export default async function loadBalancer(reqData,fileName) {
  const tried = new Set();

  while (tried.size < nlpInstances.length) {
    const target = getNextInstance();

    if (tried.has(target)) continue;
    tried.add(target);

    try {
      // console.time(`${fileName}: `)
      const response = await axios.post(`${target}/analyze`, reqData);
      // console.timeEnd(`${fileName}: `)

      return response.data;
    } catch (err) {
      console.error(`[⚠️] Failed to analyze at ${target}: ${err.message}`);
    }
  }

  throw new Error("All NLP instances are unreachable");
}
