/**
 * @description
 * This function validates a given string to check if it matches the format of a sale ID.
 * The expected format is a string that consists of 10 hexadecimal characters, followed by a hyphen,
 * and then 16 hexadecimal characters. The validation is case-insensitive.
 * @param input - The sale ID string to validate.
 * @example
 * // Valid sale ID
 * const isValidId = isValid("1234567890-abcdef1234567890");
 * console.log(isValidId); // true
 * @returns {boolean} - Returns true if the input string is a valid sale ID, false otherwise.
 */
export const isValid = (input: string): boolean => {
  const pattern = /^[a-f0-9]{10}-[a-f0-9]{16}$/i;
  return pattern.test(input);
};
