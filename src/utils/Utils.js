/**
 * Rounds a number to a specified number of decimal places and returns it as a floating-point number.
 *
 * @param {number|string} n - The number to round. If provided as a string, it will be converted to a number.
 * @param {number} place - The number of decimal places to round to.
 * @returns {number} The rounded number as a floating-point number, or NaN if the input is not a valid number.
 */
export function roundTo(n, place) {
  const num = Number.parseFloat(n);

  if (isNaN(num)) return num;

  return Number.parseFloat(num.toFixed(place));
}
export function generateRandomColor() {
  let maxVal = 0xffffff; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`;
}

/**
 * Capitalizes the first letter of a string and converts the rest of the string to lowercase.
 *
 * @param {string} str - The input string to capitalize.
 * @returns {string} The capitalized string.
 */
export function capitalize(str) {
  return str.toLowerCase().charAt(0).toUpperCase() + str.toLowerCase().slice(1);
}

/**
 * Truncates a string by limiting the number of words and appends additional text.
 *
 * @param {string} str - The input string to process.
 * @param {number} max - The maximum number of words to include in the result.
 * @param {string} append - The text to append at the end (default is an empty string).
 * @param {string} separator - The word separator (default is a space).
 * @param {boolean} cap - Whether to capitalize the words (default is false).
 * @returns {string} The processed string with truncated words and appended text.
 * @throws {Error} Throws an error if 'max' is not a valid integer.
 */
export function maxWords(str, max, append = "", separator = " ", cap = false) {
  if (isNaN(Number.parseInt(max))) {
    throw new Error("'max' must be a valid integer.");
  }

  const splitStr = str.toString().split(separator);

  const wordsToInclude = [];

  for (let i = 0; i < splitStr.length && i < Number.parseInt(max); i++) {
    wordsToInclude.push(cap ? capitalize(splitStr[i]) : splitStr[i]);
  }

  return wordsToInclude.join(" ") + append;
}

/**
 * Formats a number as a string with comma-separated thousands and optional decimal places.
 *
 * @param {number|string} num - The input number to format. If provided as a string, it will be parsed as a number.
 * @returns {string} The formatted number as a string.
 */
export function formatNumberWithCommas(num) {
  // Parse 'num' as a number, or return the original input if it's not a valid number.
  const number = Number(num);

  if (isNaN(number)) {
    return num;
  }

  // Split the number into integer and decimal parts.
  const [integerPart, decimalPart] = number.toFixed(2).split(".");

  // Format the integer part by inserting commas for thousands separation.
  const formattedInteger = integerPart
    .split("")
    .reverse()
    .reduce((acc, digit, index) => {
      const separator = index > 0 && index % 3 === 0 ? "." : "";
      return digit + separator + acc;
    }, "");

  // Combine the formatted integer part with the decimal part (if it exists).
  const formattedNumber = decimalPart
    ? `${formattedInteger},${decimalPart}`
    : formattedInteger;

  return formattedNumber;
}

/**
 * Calculates the percentage difference between two numbers.
 *
 * @param {number} number1 - The first number.
 * @param {number} n2 - The second number.
 * @param {number} [round=2] - The number of decimal places to round the result (default is 2).
 * @returns {number|string} - The percentage difference as a number (rounded) or an error message as a string.
 */

export const handlePrice = (i) => {
  const descuento = document.getElementById(`${i}-des`);
  const precio = document.getElementById(`${i}-precio`);
  const pcoste = document.getElementById(`${i}-coste`);
  const margen = document.getElementById(`${i}-marg`);
  const pventa = document.getElementById(`${i}-P.V.A`);

  pcoste.value = roundTo(
    (parseFloat(!precio.value ? 0 : precio.value) / 100) *
      (100 - parseFloat(!descuento.value ? 0 : descuento.value)),
    8
  );

  pventa.value = roundTo(
    parseFloat(pcoste.value) +
      pcoste.value * (parseFloat(!margen.value ? 0 : margen.value) / 100),
    8
  );
};

function percentage(n1, n2, round = 2) {
  try {
    // Check if the input values are numbers
    if (isNaN(parseFloat(n1)) || isNaN(parseFloat(n2))) {
      throw new Error("Both input values must be numbers");
    }
    return roundTo(Math.abs((n1 - n2) / n1) * 100);
  } catch (error) {
    return error.message;
  }
}
