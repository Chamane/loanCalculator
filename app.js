// listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    // hide results
    document.querySelector('#results').style.display = 'none';
    // show loader
    document.querySelector('#loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// calculate results
function calculateResults(e){
    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayement = document.getElementById('monthly-payement');
    const totalPayement = document.getElementById('total-payement');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayement = parseFloat(years.value)*12;

    // compute the monthly payement
    const x = Math.pow(1+calculatedInterest, calculatedPayement);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    console.log("calculatedInterest:"+calculatedInterest);

    if(isFinite(monthly)){
        monthlyPayement.value = monthly.toFixed(2);
        totalPayement.value = (monthly*calculatedPayement).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayement)-principal).toFixed(2);

        // show results
        document.getElementById('results').style.display = 'block';
        // hide loader
        document.getElementById('loading').style.display = 'none';
    }else{
        showError('Please check your numbers');
    }

    e.preventDefault();
} 

function showError(error){

    // hide results
    document.querySelector('#results').style.display = 'none';
    // show loader
    document.querySelector('#loading').style.display = 'none';

    // create error div
    errorDiv = document.createElement('div');

    errorDiv.className = 'alert alert-danger';

    // get elements
    card = document.querySelector('.card');
    heading = document.querySelector('.heading');

    errorDiv.appendChild(document.createTextNode(error));

    card.insertBefore(errorDiv, heading);

    // erase div after 3 ms
    setTimeout(clearError, 3000);
}

function clearError(){
    document.querySelector('.alert').remove();
}