const generateRandomGradient = require("./index");

it("should return gradient value as string type", () => {
  const gradient = generateRandomGradient();
  expect(typeof gradient).toBe("string");
});

it("should return degree value in between 0 and 360", () => {
  const gradient = generateRandomGradient();
  const degree = gradient
    .match(/(?<=\().+?(?=\))/g)[0] //matching for everything enclosed in parenthesis e.g. (29deg, #a2075c, #a0e60e)
    .split(",")[0] //getting the first value of the 3 e.g. 29deg
    .match(/[0-9]+/g)[0]; //getting only digits, e.g. 29
  expect(degree > 0 && degree < 360).toBe(true);
});

it("should return valid hex color value 1 of 2", () => {
  const hexValues = "0123456789abcdef";
  const gradient = generateRandomGradient();
  const hex = gradient
    .match(/(?<=\().+?(?=\))/g)[0] //matching for everything enclosed in parenthesis e.g. (29deg, #a2075c, #a0e60e)
    .split(",")[1] //getting the second value of the 3 e.g. #a2075c
    .replace(/#/g, "") //removing the # to compare the hex code, e.g.a2075c
    .split("")
    .filter((item) => item !== " "); //filtering out empty/space values

  expect(hex.every((item) => hexValues.includes(item))).toBe(true);
});

it("should return valid hex color value 2 of 2", () => {
  const hexValues = "0123456789abcdef";
  const gradient = generateRandomGradient();
  const hex = gradient
    .match(/(?<=\().+?(?=\))/g)[0] //matching for everything enclosed in parenthesis e.g. (29deg, #a2075c, #a0e60e)
    .split(",")[2] //getting the second value of the 3 e.g. #a0e60e
    .replace(/#/g, "") //removing the # to compare the hex code, e.g.a0e60e
    .split("")
    .filter((item) => item !== " "); //filtering out empty/space values

  expect(hex.every((item) => hexValues.includes(item))).toBe(true);
});
