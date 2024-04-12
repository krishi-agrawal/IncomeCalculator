const submitBtn = document.querySelector(".submit-button");
const modal = document.querySelector(".modal-overlay");
const closeBtn = document.querySelector(".close-button");

submitBtn.addEventListener("click", function (event) {

    let isFormValid = true;
    const incomeField = document.getElementById("income");
    const extraIncomeField = document.getElementById("extra-income");
    const ageField = document.getElementById("age");
    const deductionField = document.getElementById("deductions");

    function isValidNumber(value) {
        return /^\d+(\.\d+)?$/.test(value); 
    }

    document.querySelectorAll('.error-icon').forEach(icon => {
        icon.style.visibility = 'hidden';
        icon.title = '';
    });

    [incomeField, extraIncomeField, deductionField].forEach(field => {
        if (!field.value) {
            const errorIcon = field.parentElement.querySelector('.error-icon');
            errorIcon.style.visibility = 'visible';
            errorIcon.title = 'This field is mandatory';
            isFormValid = false;
        } else if (!isValidNumber(field.value)) {
            const errorIcon = field.parentElement.querySelector('.error-icon');
            errorIcon.style.visibility = 'visible';
            errorIcon.title = 'Enter number only';
            isFormValid = false;
        }
    });

    if (!isFormValid) return; 

    let income = parseFloat(incomeField.value);
    let extraIncome = parseFloat(extraIncomeField.value);
    let deductions = parseFloat(deductionField.value);
    let incomeAfterDeductions = income + extraIncome - deductions;

    var tax = 0;
    if (incomeAfterDeductions > 800000) {
        switch (ageField.value) {
            case '<40':
                tax = 0.3 * (incomeAfterDeductions - 800000);
                break;
            case '>=40 & <60':
                tax = 0.4 * (incomeAfterDeductions - 800000);
                break;
            case '>=60':
                tax = 0.1 * (incomeAfterDeductions - 800000);
                break;
        }
    }
    incomeAfterDeductions -= tax;

    modal.classList.add("open-modal");
    document.querySelector(".modal-text").textContent =  incomeAfterDeductions;
});

closeBtn.addEventListener("click", function () {
    modal.classList.remove("open-modal");
});
