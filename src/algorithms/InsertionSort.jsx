export default function InsertionSort(array, index, arraySteps, colorSteps) {
  if (!Array.isArray(array)) {
    console.error("insertionSort: input is not an array", array);
    return;
  }

  let length = array.length;
  for (let i = 1; i < length; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j = j - 1;
    }
    array[j + 1] = key;

    // Clone the array to avoid mutating the original one
    let tempArray = array.slice();
    arraySteps.push(tempArray); // Save the state after each insertion
    // You might want to clone color steps depending on how you're managing colors
    let tempColorSteps = colorSteps.slice();
    tempColorSteps.push([...colorSteps[index]]); // Adjust as necessary based on how you're coloring
    colorSteps.push(tempColorSteps);
  }
}
