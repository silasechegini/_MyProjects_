var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  captionText.innerHTML = dots[slideIndex - 1].alt;
}

// When the user clicks on div, open the popup
function pop_up() {
  var id = document.getElementById("myPopup");
  id.classList.toggle("show");
}

function hide() {
  var id = document.getElementById("myPopup");
  id.classList.toggle("hide");
}

function aboutMe() {
  var id = document.getElementById("aboutMe");
  id.classList.toggle("show");
}

function myFunction() {
  var mytext = "";

  //*********************** METHOD 1 (crude method) ************************
  /*
  for (var i = 0; i < mytext.length; i++) {
      if (mytext.slice(i, i + 10) === "provides 3") {
          text = mytext.slice(0, i) + "does not provide " + mytext.slice(i + 10);
      }
  }
  */

  //*********************** METHOD 2 (advanced - handles only one instance is the text occurence) ***********************
  /*
  var firstChar = mytext.indexOf("provides 3");
  if (firstChar !== -1) {
      text = mytext.slice(0, firstChar) + "does not provide " + mytext.slice(firstChar + 10);
  }

  do {
      var firstChar = mytext.indexOf("provides 3");

      if (firstChar !== -1) {
          text = mytext.slice(0, firstChar) + "does not provide " + mytext.slice(firstChar + 10);
      }

  } while (firstChar !== -1);
  */

  /* ********************** METHOD 3 (More advanced - one liner that replaces over a global scope ) */

  var text = mytext.replace(/provides 3/g, "xxxxxxxxxx");
  var number = prompt("enter your figure: ");
  number = Number(number) + 50;
  // document.getElementById("display").innerHTML = number;

  document.getElementById("button").innerHTML = text + number;
}

function mouseOver() {
  document.getElementById("backCol").style.backgroundColor = "lightgray";
  // this.style.backgroundColor = "skyblue";
}

// onfocus="this.style.backgroundColor = 'grey';"
function onFocus() {
  document.getElementById("comm").style.backgroundColor = "lightgray";
}

function onBlur() {
  document.getElementById("comm").style.backgroundColor = "White";
}

//checks text field for empty string
function checkTxt(comm) {
  if (document.getElementById(comm).value === "") {
    alert("text required.");
  }
}

function fillCity() {
  var zipEntered = document.getElementById("zipcode").value;
  var zip = zipEntered.slice(0, 3);
  var ottawa = ["K1R", "K2P", "K2C", "K2B", "K2A", "K1Z", "K1V", "K1S", "K1P", "K1N", "K1M", "K1L", "K1K", "K1H", "K1G"];
  // var cityName;

  // switch (zip) {
  //     case ottawa[0]:
  //     case ottawa[7]:
  //     case ottawa[5]:
  //         cityName = "Ottawa";
  //         break;

  //     default:
  //         cityName = "Invalid Zip";
  //         break;
  // }

  // document.getElementById("cityName").value = cityName;

  for (let i = 0; i < ottawa.length; i++) {
    if (ottawa[i] === zip) {
      document.getElementById("cityName").value = "Ottawa";
      break;
    }
  }
}

function fillCity2() {
  var zipEntered = document.getElementById("zipcode").value;
  var zip = zipEntered.slice(0, 3).toUpperCase();
  var ottawa = ["K1R", "K2P", "K2C", "K2B", "K2A", "K1Z", "K1V", "K1S", "K1P", "K1N", "K1M", "K1L", "K1K", "K1H", "K1G", "K2G", "K2H", "K2J", "K2R", "K2E", "K1B", "K1C", "K1J", "K1T", "K1W", "K1X", "K2K", "K2L", "K2M", "K2T", "K2V", "K2W"];
  var kingston = ["K7K", "K7L", "K7M", "K7P"];
  var peterborough = ["K9K", "K9L", "K9H", "K9J"];

  if (document.querySelector('#country').value === 'Canada') {
    if (ottawa.indexOf(zip) >= 0) {
      document.getElementById("cityName").value = "Ottawa";
      // document.querySelector('#country').options[4].selected = true;
    }
    else if (kingston.indexOf(zip) >= 0) {
      document.getElementById("cityName").value = "Kingston";
      // document.querySelector('#country').options[4].selected = true;
    }
    else if (peterborough.indexOf(zip) >= 0) {
      document.getElementById("cityName").value = "Peterborough";
      // document.querySelector('#country').options[4].selected = true;
    }
    else {
      document.getElementById("cityName").value = "";
      document.getElementById("zipcode").placeholder = "xxx xxx";
      document.getElementById("cityName").placeholder = "enter city name";
      // document.querySelector('#country').options[0].selected = true;
    }
  }else{
    document.getElementById("zipcode").placeholder = "xxx xxx";
  }
}

function checkIfEmpty() {
  var firstName = document.getElementById("firstname").value;
  var lastName = document.getElementById("lastname").value;
  var phoneNum = document.getElementById("phonenum").value;

  var x = document.getElementsByTagName("p");
  alert("number of paragraphs is: " + x.length)
  nodetoadd

  // var values = [firstName, lastName, phoneNum];

  if (firstName === "") {
    document.getElementById("firstname").style.backgroundColor = "red";
  }
  if (lastName === "") {
    document.getElementById("lastname").style.backgroundColor = "red";
  }
  if (phoneNum === "") {
    document.getElementById("phonenum").style.backgroundColor = "red";
  }
}

function fixPostCode() {
  var zip = document.getElementById("zipcode").value;
  if (zip.length >= 6 && (document.querySelector('#country').value === 'Canada')) {
    var head = zip.slice(0, 3);
    var tail = zip.slice((zip.length-3), zip.length);
    document.getElementById("zipcode").value = head.toUpperCase() + " " + tail.toUpperCase();
  }
}

function setZip() {
  // var country = document.getElementById("country").value;
  if (document.querySelector('#country').value === 'Canada') {
    document.getElementById("zipcode").value = "";
    document.getElementById("cityName").value = "";
    document.getElementById("zipcode").placeholder = "xxx xxx";
    document.getElementById("cityName").placeholder = "enter city name";
    document.getElementById("zipcode").maxLength = 7
  }else{
    document.getElementById("zipcode").maxLength = 10
    document.getElementById("cityName").value = "";
    document.getElementById("zipcode").value = "";
    document.getElementById("zipcode").placeholder = "xxx xxx";
    document.getElementById("cityName").placeholder = "enter city name";
  }
}