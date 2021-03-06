//Listen to submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  //hide results
  document.querySelector("#results").style.display = "none";

  //show loader
  document.querySelector("#loading").style.display = "block";
  setTimeout(calculateResults, 1500);

  e.preventDefault();
});

//Calculate Results
function calculateResults() {
  console.log("calculating...");

  //UI var initialize
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    //hide results
    document.querySelector("#results").style.display = "block";

    //show loader
    document.querySelector("#loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

//Show error
function showError(error) {
  //hide results
  document.querySelector("#results").style.display = "none";

  //show loader
  document.querySelector("#loading").style.display = "none";

  //get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  //creating new elem to show error
  const errorDiv = document.createElement("div");

  errorDiv.className = "alert alert-danger";

  //append text to errorDiv
  errorDiv.appendChild(document.createTextNode(error));

  //insert before heading
  card.insertBefore(errorDiv, heading);

  //clear error after 3 sec
  setTimeout(clearError, 3000);
}

//Clear error
function clearError() {
  document.querySelector(".alert").remove();
}
