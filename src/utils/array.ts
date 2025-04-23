/**
 * lastError return the last element of non-empty array.
 * If the array is empty, the function throws error, otherwise
 * it returns the last element in the array.
 * @param nonEmptyArray
 * @returns
 */
export function lastError<T>(nonEmptyArray: T[]): T {
  if (nonEmptyArray.length === 0) {
    throw Error("unable to take last from an empty array");
  }
  return nonEmptyArray[nonEmptyArray.length - 1];
}

/**
 * first returns the first element that fulfills the applied predicate.
 * @param arr Array of type T to test against
 * @param pred predicate of the form T => boolean.
 * @returns first element that fulfills the applied predicate else undefined.
 */
export function first<T>(arr: T[], pred: (v: T) => boolean): T | undefined {
  for (var i = 0; i < arr.length; i++) {
    if (pred(arr[i])) {
      return arr[i];
    }
  }
}
