//As the page loads, it gets the previous calculation or numbers form the local storage.
let calculation = JSON.parse(localStorage.getItem('calculationData')) || '';
displayCalc();

function clearCalc(){ //Clear the 'display'(where calculations appear).
  calculation = ""; //reset the calculation.
  displayCalc();
  localStorage.setItem('calculationData', JSON.stringify(calculation)) //Save
}

//Function that adds the number or operator in the calculation.
function addCalculation(value){
  calculation += value;
  displayCalc();
  localStorage.setItem('calculationData', JSON.stringify(calculation))
}

//Function that shows the calculation on display.
function displayCalc(calculationInput = calculation) {
  const displayElement = document.querySelector('.js-display');
  displayElement.innerHTML = calculationInput
}
 //Function that deletes last number or operator.
function backSpace(){
  let lastString = calculation.slice(-1); //Gets the last string.
  if(' ' === lastString) { //If the last string is blank(' '),
    calculation = calculation.slice(0,-3); //Delete 3 string from it's back.
    //Becouse only operators has blank on their back. Like this ' + '.
    localStorage.setItem('calculationData', JSON.stringify(calculation))
    displayCalc();
  } else { //Delete 1 string. Becouse rest of strings are not an operator for sure.
  calculation = calculation.slice(0,-1);
  localStorage.setItem('calculationData', JSON.stringify(calculation))
  displayCalc();
  }
}

//Function that shows the result of calculation.
function result(){
  let resultInFunc = '';
  try {
    resultInFunc = new Function('return ' + calculation)(); //new Function runs code form the string inside. for example, it runs code like this 'return 1 + 3 + 2'. As I entered 'return', it returns the result of it's back. And saves it in the 'resultInFunc'.
    calculation = resultInFunc.toString();
    displayCalc();
  } catch(error) { //Display error message and reset the calculation.
    resultInFunc = 'Error!';
    displayCalc(resultInFunc);
    calculation = '';
  }
  localStorage.setItem('calculationData', JSON.stringify(calculation));
}
