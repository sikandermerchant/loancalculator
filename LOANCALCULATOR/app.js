///Listen to Submit Button
document.getElementById('loan-form').addEventListener('submit',function(e){
//Show Loader
  document.getElementById('loading').style.display = 'block';
///Hide the loader for 2 seconds
  setTimeout(calculateResults,2000);

//Hide Results - we want to add this as we want to have results hidden as default unless its correctly calculated
  document.getElementById('results').style.display = 'none';
  e.preventDefault();
});

//Calculate Result Function
function calculateResults(){
  

  ///UI variables - Look up the input and output elements in the document

  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const yearsToRepay = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');


//  // Get the user's input from the input elements.
// // Convert interest from a percentage to a decimal, and convert from
// // an annual rate to a monthly rate. Convert payment period in years
// // to the number of monthly payments.

  const principal = parseFloat(amount.value); ////value of the amount in float
  const calculatedInterestPerMonth = parseFloat(interest.value) / 100 / 12; ////calculated interest per month in float
  const totalMonthstoRepay = parseFloat(yearsToRepay.value) * 12;///total months to repay

  ///Calculate monthly payment
const x = Math.pow(1 + calculatedInterestPerMonth, totalMonthstoRepay); //Math.pow computes powers
const monthly = (principal * x * calculatedInterestPerMonth)/(x-1);

if (isFinite(monthly)){
  // Fill in the output fields, rounding to 2 decimal places
  monthlyPayment.value = monthly.toFixed(2);
  totalPayment.value = (monthly * totalMonthstoRepay).toFixed(2); 
  totalInterest.value = ((monthly * totalMonthstoRepay)-principal).toFixed(2);
  ///Display the results after the loader
  document.getElementById('results').style.display = 'block';
  //Hide Loader
  document.getElementById('loading').style.display = 'none';

}else{
  showError('Please check your numbers');
}

  
}

//There are various ways to show error but we will do it as below with pure JS by creating a bootstrap div

//Show error function 
function showError(error){

  //create a div
  const errorDiv = document.createElement('div');

  ///Add class to the created div
  errorDiv.className = 'alert alert-danger'

  ///Create a textnode for errorDiv
  var errorDivTextNode = document.createTextNode(error);
  
  ///Append textnode to errorDiv
  errorDiv.appendChild(errorDivTextNode);

  //Get Elements to place the errorDiv in the card and above the heading
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  //Insert error above heading in the card using insertBefore method
  card.insertBefore(errorDiv, heading);

  ////Remove the error after 3 seconds = 3000ms by using setTimeout method
//   setTimeout(function(){
// document.querySelector('.alert').remove();
//   },3000);

  ///The above can also be written with a seperate function as follow:
  setTimeout(clearError,3000);

  function clearError (){
    document.querySelector('.alert').remove();
      }

//Hide Loader
  document.getElementById('loading').style.display = 'none';
}
