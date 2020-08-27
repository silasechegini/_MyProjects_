class LoanApplication {
    Id = create_userID();
    ApplicantName;
    ApplicantDateOfBirth;
    ApplicantAnnualIncome;
    influencingFactors = [];
    LoanPurpose;
    LoanAmount;
}

var LoanApplicationList = [];

//fires when the page loads
window.onload = function () {

    initializeLoans();

    bindLoansToDropDown();
}

function initializeLoans() {

    var la1 = new LoanApplication();
    la1.ApplicantName = "Mr. John worker";
    la1.ApplicantDateOfBirth = new Date(1983, 2, 1);
    la1.ApplicantAnnualIncome = 48000;
    la1.influencingFactors = [false, true, true, false];
    la1.LoanPurpose = "I want to build a new house with the loan";
    la1.LoanAmount = 150000;

    LoanApplicationList[0] = la1;

    var la2 = new LoanApplication();
    la2.ApplicantName = "Miss Michelle Smartypants M.D. ";
    la2.ApplicantDateOfBirth = new Date(1976, 12, 14);
    la2.ApplicantAnnualIncome = 198050;
    la2.influencingFactors = [true, true, true, false];
    la2.LoanPurpose = "My partner needs the loan to buy new equipment for our medical practice";
    la2.LoanAmount = 4800;

    LoanApplicationList[1] = la2;

    var la3 = new LoanApplication();
    la3.ApplicantName = "Mrs. Debbie Learner";
    la3.ApplicantDateOfBirth = new Date(1952, 6, 20);
    la3.ApplicantAnnualIncome = 21000;
    la3.influencingFactors = [true, true, true, true];
    la3.LoanPurpose = "Go on a cruise holiday";
    la3.LoanAmount = 6000;

    LoanApplicationList[2] = la3;

    var la4 = new LoanApplication();
    la4.ApplicantName = "Dr. Sean McGrath";
    la4.ApplicantDateOfBirth = new Date(1966, 12, 11);
    la4.ApplicantAnnualIncome = 80000;
    la4.influencingFactors = [true, false, false, false];
    la4.LoanPurpose = "I want to start a shipping business";
    la4.LoanAmount = 100000;

    LoanApplicationList[3] = la4;
}

function create_userID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-7xxx-xxxx-xxxxxxxxxxxx'.replace(/x/gi, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return r.toString(16);
    });
    return uuid;
}

function bindLoansToDropDown() {

    var dropDown = document.getElementById("loanApplications");

    dropDown.options.length = 0;

    var el = document.createElement("option");
    el.textContent = "...Select an application...";
    dropDown.appendChild(el);


    for (var i = 0; i < LoanApplicationList.length; i++) {
        var la = LoanApplicationList[i];

        var el = document.createElement("option");
        el.textContent = "Application of " + la.ApplicantName;
        el.value = la.Id.toString();
        dropDown.appendChild(el);
    }
}

function loadApplication() {

    var dropDown = document.getElementById("loanApplications");

    var la = findLoanApplicationByName(dropDown.value);

    if (la != undefined) {

        var [isEmployed, hasKids, hasLoans, hasCreditcards] = la.influencingFactors;

        document.getElementById("inputName").value = la.ApplicantName;
        document.getElementById("inputDoBMonth").value = la.ApplicantDateOfBirth.getMonth() + 1;
        document.getElementById("inputDoBDay").value = la.ApplicantDateOfBirth.getDate();
        document.getElementById("inputDoBYear").value = la.ApplicantDateOfBirth.getFullYear();
        document.getElementById("inputAnnualIncome").value = la.ApplicantAnnualIncome;
        document.getElementById("inputAnnualIncome").value = la.ApplicantAnnualIncome;
        document.getElementById("IsEmployed").checked = isEmployed;
        document.getElementById("HasKids").checked = hasKids;
        document.getElementById("HasLoans").checked = hasLoans;
        document.getElementById("HasCreditcards").checked = hasCreditcards;
        document.getElementById("inputLoanPurpose").value = la.LoanPurpose;
        document.getElementById("inputLoanAmount").value = la.LoanAmount;

        var riskLabel = document.getElementById("riskSummary");
        riskLabel.style.display = "block";
        riskLabel.innerHTML = generateRiskProfile(la); 

    }
}

function findLoanApplicationByName(name) {
    for (var i = 0; i < LoanApplicationList.length; i += 1) {
        if (LoanApplicationList[i]["Id"] === name) {
            return LoanApplicationList[i];
        }
    }
    return undefined;
}

function saveApplication() {

    if (validateApplication()) {

        var newLa = getLoanApplicationDataFromInputs();

        var riskLabel = document.getElementById("riskSummary");
        riskLabel.style.display = "block";
        riskLabel.innerHTML = generateRiskProfile(newLa);    

        LoanApplicationList.push(newLa);

        bindLoansToDropDown();

    }else {
        document.getElementById("riskSummary").style.display = "none";
    }
}

function clearApplication() {
    document.getElementById("inputName").value = "";
    document.getElementById("inputDoBMonth").value = "";
    document.getElementById("inputDoBDay").value = "";
    document.getElementById("inputDoBYear").value = "";
    document.getElementById("inputAnnualIncome").value = "";
    document.getElementById("IsEmployed").checked = false;
    document.getElementById("HasKids").checked = false;
    document.getElementById("HasLoans").checked = false;
    document.getElementById("HasCreditcards").checked = false;    
    document.getElementById("inputLoanPurpose").value = "";
    document.getElementById("inputLoanAmount").value = "";

    hideValidators();
}

function hideValidators() {
    document.getElementById("inputNameValidation").style.display = "none";
    document.getElementById("inputDoBValidation").style.display = "none";
    document.getElementById("inputAnnualIncomeValidation").style.display = "none";
    document.getElementById("inputLoanPurposeValidation").style.display = "none";
    document.getElementById("inputLoanAmountValidation").style.display = "none";
    document.getElementById("riskSummary").style.display = "none";
}

function getLoanApplicationDataFromInputs() {

    var la = new LoanApplication();

    la.ApplicantName = document.getElementById("inputName").value;

    var month = document.getElementById("inputDoBMonth").value;
    var day = document.getElementById("inputDoBDay").value;
    var year = document.getElementById("inputDoBYear").value;

    var isEmployed = document.getElementById("IsEmployed").checked;
    var hasKids =  document.getElementById("HasKids").checked;
    var hasLoans = document.getElementById("HasLoans").checked;
    var hasCreditcards = document.getElementById("HasCreditcards").checked;   
    
    
    la.influencingFactors = [isEmployed, hasKids, hasLoans, hasCreditcards];    

    if (month != "" && day != "" && year != "") {
        la.ApplicantDateOfBirth = new Date(year, month, day);
    }

    la.ApplicantAnnualIncome = document.getElementById("inputAnnualIncome").value;
    la.LoanPurpose = document.getElementById("inputLoanPurpose").value;
    la.LoanAmount = document.getElementById("inputLoanAmount").value;

    return la;
}

function validateApplication() {

    var valid = true;

    var la = getLoanApplicationDataFromInputs();

    if (la.ApplicantName == "") {
        document.getElementById("inputNameValidation")
        .style.display = "block";

        valid = false;
    } else {
        document.getElementById("inputNameValidation")
        .style.display = "none";
    }

    if (la.ApplicantDateOfBirth == undefined) {
        document.getElementById("inputDoBValidation")
        .style.display = "block";

        valid = false;
    } else {
        document.getElementById("inputDoBValidation")
        .style.display = "none";
    }

    if (la.ApplicantAnnualIncome == "") {
        document.getElementById("inputAnnualIncomeValidation")
        .style.display = "block";

        valid = false;
    } else {
        document.getElementById("inputAnnualIncomeValidation")
        .style.display = "none";
    }

    if (la.LoanPurpose == "") {
        document.getElementById("inputLoanPurposeValidation")
        .style.display = "block";

        valid = false;
    } else {
        document.getElementById("inputLoanPurposeValidation")
        .style.display = "none";
    }

    if (la.LoanAmount == "") {
        document.getElementById("inputLoanAmountValidation")
        .style.display = "block";

        valid = false;
    } else {
        document.getElementById("inputLoanAmountValidation")
        .style.display = "none";
    }

    return valid;
}

function generateRiskProfile(la) {
    var risk = 3;

    var nameAndTitle = la.ApplicantName.trim().toLowerCase();

    var MD = nameAndTitle.endsWith("md") || nameAndTitle.endsWith("m.d") || nameAndTitle.endsWith("m.d.");
    var PhD = nameAndTitle.startsWith("phd") || nameAndTitle.startsWith("ph.d");
    var Dr = nameAndTitle.startsWith("dr.") || nameAndTitle.startsWith("dr.");

    if (MD || PhD || Dr) {
        risk = risk - 1;
        console.log('MD || PhD || Dr: true');
    }

    var age = new Date().getFullYear() - 
        la.ApplicantDateOfBirth.getFullYear();

    if (age > 60) {
        risk = risk + 2;
    }

    var loanRatio = la.ApplicantAnnualIncome / la.LoanAmount;
    if (loanRatio < 1) {
        risk = risk + 3;
    }
    else if (loanRatio > 20) {
        risk = risk - 2;
    }
    else if (loanRatio > 10) {
        risk = risk - 1;
    }

    if (la.influencingFactors[2] == true || la.influencingFactors[3] == true) {
        //risk increases when the applicant has other 
        //loans or credit cards
        risk = risk + 1;
    }

    var purpose = la.LoanPurpose.trim().toLowerCase();

    var House = purpose.includes("House");
    var Holiday = purpose.includes("holiday");
    var Vacation = purpose.includes("vacation");
    var Business = purpose.includes("business");

    if (House) {
        //the loan will be used for a house or building project
        risk = risk + 2;
    }

    if (Holiday || Vacation) {
        //the loan will be used for a holiday
        risk = risk + 3;
    }

    if (Business) {
        //the loan will be used for a business
        risk = risk + 1;
    }

    
    var reviewText = "";

    if (age < 18) {
        reviewText = "will not be reviewed, because you have to be 18 years or older";
    } else {
        reviewText = "will be reviewed";
    }

    var riskProfile = "";

    // switch (risk) {
    //     case 0: case 1:
    //         riskProfile = "very low";
    //         break;
    //     case 2: case 3: case 4:
    //         riskProfile = "low";
    //         break;
    //     case 5: case 6: case 7:
    //         riskProfile = "medium";
    //         break;
    //     case 8: case 9: case 10: case 11:
    //         riskProfile = "high";
    //         break;
    //     default:
    //         riskProfile = 'undefined';
    //         break;
    // }

    if (risk < 2) {
        riskProfile = "very low";
    } else if (risk < 5) {
        riskProfile = "low";
    }else if (risk < 8) {
        riskProfile = "medium";
    }else if (risk < 12) {
        riskProfile = "high";
    }

    var applicationId = String.raw `\t${createApplicationId()}`

    var summaryText = makeBold `Dear ${la.ApplicantName}, <br>
    your application for ${'$' + la.LoanAmount}, ${reviewText}.<br>
    Your risk profile is ${riskProfile}.<br>
    Your unique application code is ${applicationId}`;

    function makeBold(strings, ...values){
        let str = "";
        for(var i=0; i<strings.raw.length ; i++){
            if(i>0){
                str += `<b>${values[i-1]}</b>`
            }
            str += strings.raw[i];
        }
        return str;
    }


    function createApplicationId(){
        var result = '';
        var characters = 'ABCDEFGHTEWAQHabcdefjkhtsxopiu103456/\\#*&^!)(_+=';
        for (let i = 0; i < 8; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }


    return summaryText;
}