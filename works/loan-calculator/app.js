document.getElementById('loan-form').addEventListener('submit', function (e) {

    //hide results
    document.getElementById('results').style.display = 'none';

    //show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults,1500);

    e.preventDefault();
});

function calculateResults(e) {


    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        
        
        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    
        showNotification('success', 'Calculated');
    }
    else {
        document.getElementById('loading').style.display = 'none';
        showNotification('danger', 'Check Numbers');
    }
    e.preventDefault();

}

function showNotification(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;

    const errView = document.querySelector('.error');
    errView.appendChild(alertDiv);

    setTimeout(clearAlert, 5000);
}
function clearAlert() {
    document.querySelector('.alert').remove();
}
