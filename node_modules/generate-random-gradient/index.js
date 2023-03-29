function createRandomHex() {
  let hexCode = "";
  const hexValues = "0123456789abcdef";

  for (let i = 0; i < 6; i++) {
    hexCode += hexValues.charAt(Math.floor(Math.random() * hexValues.length));
  }
  return hexCode;
}

function generateRandomGradient() {
  const degree = Math.floor(Math.random() * 360);

  const gradient =
    "linear-gradient(" +
    degree +
    "deg, " +
    "#" +
    createRandomHex() +
    ", " +
    "#" +
    createRandomHex() +
    ")";

  return gradient;
}

module.exports = generateRandomGradient;
