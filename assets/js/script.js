var body = document.querySelector("body");

//Preventing site from going back to login page
function preventBack() {
  window.history.forward();
}
setTimeout(preventBack(), 0);
window.onunload = function () {
  null;
};

//condition for selecting which page js should work
if (body.classList.contains("index-page")) {
  loginPageJS();
} else if (body.classList.contains("home-page")) {
  homePageJS();
} else if (body.classList.contains("club-list-page")) {
  clubListPageJS();
} else if (body.classList.contains("match-details-page")) {
  matchDetailsPageJS();
}

// hamburger
function hamburger() {
    var ham = document.querySelector(".hamburger"),
      nav = document.querySelector(".navigation"),
      log = document.querySelector(".logout");
  
    ham.addEventListener("click", function () {
      document.children[0].classList.toggle("removeScroll");
      ham.classList.toggle("ac");
      nav.classList.toggle("fe");
      log.classList.toggle("lg");
    });
  }

  //function for login page js
function loginPageJS() {
    //for sign in form validation
    var signInForm = document.querySelector(".sign-in-form"),
      email = document.getElementById("email"),
      pswd = document.getElementById("pswd");
    //Saving default user details
    var userEmail = "axioneduser15@gmail.com";
    var userPswd = "User@15";
  
    //for keeping banner image of full height
    var html = document.querySelector("html"),
      body = document.querySelector("body"),
      container = document.querySelector(".container"),
      main = document.querySelector("main"),
      loginContent = document.querySelector(".login-content");
  
    html.classList.add("full-height");
    body.classList.add("full-height");
    container.classList.add("full-height");
    main.classList.add("full-height");
    loginContent.classList.add("full-height");
  
    //For alert messages
    var close = document.querySelector(".closebtn"),
      alertBox = document.querySelector(".alert"),
      alertMsg = document.querySelector(".alert h3");
  
    close.addEventListener("click", function () {
      var parentAlert = close.parentElement;
      parentAlert.classList.remove("show");
    });
  
    pswd.maxLength = 8;
  
    //for keeping user log in if he alerady logged in
    var checkUser = localStorage.getItem("isLoggedIN")
      ? localStorage.getItem("isLoggedIN")
      : "";
    if (checkUser != "") {
      location.href = "index.html";
    }
  
    //function for checking input
    function checkInput(input, regEx, emptyErr, validErr) {
      var value = input.value.trim(),
        errSpan = input.nextElementSibling;
      errSpan.classList.add("visible");
      if (value == null || value == "") {
        errSpan.textContent = emptyErr;
      } else if (!regEx.test(input.value)) {
        errSpan.textContent = validErr;
      } else {
        errSpan.textContent = "error";
        errSpan.classList.remove("visible");
        return (valid = true);
      }
      return (valid = false);
    }
  
    //function to validate sign in
    function validateSignIn() {
      var valid;
      valid = checkInput(
        email,
        /^([_\-\.0-9a-zA-Z]+)@([_\-\.a-zA-Z]+)\.([a-zA-Z]){2,7}$/,
        "Please enter your email id",
        "Please enter valid email id"
      );
  
      valid = checkInput(
        pswd,
        /^(?=.{6,8}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/,
        "Please enter your password",
        "A password must contain atleast 1 Uppercase, 1 Lowercase, 1 number and it's length must be between 6 to 8 charaters"
      );
      return valid;
    }
  
    //function for checking user details
    function checkUserDetails() {
      email = email.value;
      pswd = pswd.value;
  
      if (email == userEmail && pswd == userPswd) {
        localStorage.setItem("isLoggedIN", "true");
        location.href = "index.html";
      } else {
        alertMsg.textContent =
          "Sign in Failed! Please check details and try again";
        alertBox.classList.add("show");
      }
    }
  
    //function to sign in
    function signIn(e) {
      //preventing from load
      e.preventDefault();
  
      if (validateSignIn()) {
        checkUserDetails();
        signInForm.reset();
      }
    }
  
    //eventlistener when click on submit button
    signInForm.addEventListener("submit", signIn);
  
    //eventlistners to check validation runtime
    email.addEventListener("blur", function () {
      checkInput(
        email,
        /^([_\-\.0-9a-zA-Z]+)@([_\-\.a-zA-Z]+)\.([a-zA-Z]){2,7}$/,
        "Please enter your email id",
        "Please enter valid email id"
      );
    });
  
    pswd.addEventListener("blur", function () {
      checkInput(
        pswd,
        /^(?=.{6,8}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/,
        "Please enter your password",
        "A password must contain atleast 1 Uppercase, 1 Lowercase, 1 number and it's length must be between 6 to 8 charaters"
      );
    });
  }

  //function for index page js
function homePageJS() {
    hamburger();
    var logOutBtn = document.querySelector(".logout a"),
      isLoggedIN = localStorage.getItem("isLoggedIN")
        ? localStorage.getItem("isLoggedIN")
        : "";
  
    //for checking user is logged in or not
    if (isLoggedIN != "true") {
      location.href = "login.html";
    }
  
    //logout event listener
    logOutBtn.addEventListener("click", Logout);
  
    //function to logout
    function Logout() {
      localStorage.removeItem("isLoggedIN");
      location.href = "index.html";
    }
  
  }

//function for club page js
function clubListPageJS() {
    hamburger();
    var logOutBtn = document.querySelector(".logout a"),
      isLoggedIN = localStorage.getItem("isLoggedIN")
        ? localStorage.getItem("isLoggedIN")
        : "";
  
    //for checking user is logged in or not
    if (isLoggedIN != "true") {
      location.href = "login.html";
    }
  
    //logout event listener
    logOutBtn.addEventListener("click", Logout);
  
    //function to logout
    function Logout() {
      localStorage.removeItem("isLoggedIN");
      location.href = "login.html";
    }
  
    //for getiing data from api
    var clublist = document.querySelector(".clubs-list"),
      clubsBtn = document.querySelector(".clubs-btn button"),
      clubsBtnSpan = document.querySelector(".clubs-btn span"),
      clubListURL =
        "https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.clubs.json",
      clubInfoURL =
        "https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",
      clubData,
      listCount,
      clubDataLi,
      showCount,
      displayInfo = document.querySelector(".display-info"),
      clubName = document.querySelector(".club-name"),
      infoContainer = document.querySelector(".club-info-container"),
      showMore = document.querySelector(".show-more a");
  
    //Using fetch function to get club data from api
    fetch(clubListURL)
      .then(function (response) {
        //getting data from api
        return response.json();
      })
      .then(function (data) {
        //displaying output
        data.clubs.forEach(function (item) {
          var li = document.createElement("li");
          li.innerHTML =
            "<a href='#displayContainer' id='" +
            item.name +
            "'>" +
            item.name +
            "</a>";
          clublist.appendChild(li);
        });
      });
  
    //Using fetch function to get club info from api
    fetch(clubInfoURL)
      .then(function (response) {
        //getting data from api
        return response.json();
      })
      .then(function (data) {
        clubData = data;
        //calling function for displaying club selected in match details page
        if (localStorage.getItem("clubName") != null) {
          club();
        }
      });
  
    //function for displaying club selected in match details page
    function club() {
      var club = localStorage.getItem("clubName");
      localStorage.removeItem("clubName");
      selectedClub(club);
    }
  
    //showing club list onclick of clubs btn
    clubsBtn.addEventListener("click", function () {
      clublist.classList.toggle("show-list");
      //for ratating dropdown icon on click
      clubsBtnSpan.classList.toggle("rotate");
    });
  
    //eventlistner for club list
    clublist.addEventListener("click", function (e) {
      clublist.classList.remove("show-list");
      clubsBtnSpan.classList.remove("rotate");
      selectedClub(e.target.id);
    });
  
    //Function for selected club
    function selectedClub(selectedClubName) {
      infoContainer.classList.add("show");
      displayInfo.innerHTML = "";
      clubName.textContent = "";
      var checkRecord = 0;
      clubData.matches.forEach(function (item) {
        if (item.team1 == selectedClubName || item.team2 == selectedClubName) {
          checkRecord++;
          clubName.textContent = selectedClubName;
          showMore.classList.add("show");
          var li = document.createElement("li");
          li.innerHTML =
            "<div class='cd-heading'><h4>Round : " +
            item.round +
            "</h4><h4>Date : " +
            item.date +
            "</h4></div>" +
            "<div class='cd-score'><span>" +
            item.team1 +
            "</span><span>VS</span><span>" +
            item.team2 +
            "</span></div>";
          displayInfo.appendChild(li);
        }
        if (displayInfo.childNodes.length > 1) {
          clubDataLi = displayInfo.childNodes;
          listCount = displayInfo.childNodes.length;
        }
      });
  
      if (checkRecord == 0) {
        clubName.textContent =
          "No data available for " + selectedClubName + " :(";
        showMore.classList.remove("show");
      }
      if (displayInfo.childNodes.length > 1) {
        showCount = 5;
        showFive(showCount);
      }
    }
  
    //function to show five
    function showFive(count) {
      for (var i = 0; i < count; i++) {
        clubDataLi[i].classList.add("show");
        if (i == listCount - 1) {
          showMore.parentElement.classList.add("hide");
        } else {
          showMore.parentElement.classList.remove("hide");
        }
      }
    }
  
    //function to show more five
    showMore.addEventListener("click", function () {
      showCount += 5;
      showFive(showCount);
    });
  }

//function for match page js
function matchDetailsPageJS() {
    hamburger();
    var logOutBtn = document.querySelector(".logout a"),
        isLoggedIN = localStorage.getItem("isLoggedIN")
      ? localStorage.getItem("isLoggedIN")
      : "";
  
    //for checking user is logged in or not
    if (isLoggedIN != "true") {
      location.href = "login.html";
    }
  
    //logout event listener
    logOutBtn.addEventListener("click", Logout);
  
    //function to logout
    function Logout() {
      localStorage.removeItem("isLoggedIN");
      location.href = "login.html";
    }
  
    //for getiing data from api
    var matcheslist = document.querySelector(".matches-list"),
        matchesBtn = document.querySelector(".matches-btn button"),
        matchesBtnSpan = document.querySelector(".matches-btn span"),
        matchesInfoURL =
      "https://raw.githubusercontent.com/openfootball/football.json/master/2019-20/en.1.json",
        matchesData, listCount, showCount;
        displayMatchesInfo = document.querySelector(".display-matches-info"),
        matchDay = document.querySelector(".matches-day"),
        infoContainer = document.querySelector(".matches-info-container");
  
    //Using fetch function to get matches data from api
    fetch(matchesInfoURL)
      .then(function (response) {
        //getting data from api
        return response.json();
      })
      .then(function (data) {
        matchesData = data;
        //displaying output
        data.matches.forEach(function (item) {
          var li = document.createElement("li");
          li.innerHTML =
            "<a href='#displayContainer' id='" +
            item.round +
            "'>" +
            item.round +
            "</a>";
          matcheslist.appendChild(li);
        });
        //for remove duplicate data
        var elements = matcheslist.childNodes;
        textArr = [];
        elements.forEach(function (d, i) {
          if (textArr.indexOf(d.innerText) > -1) {
            d.remove();
          } else {
            textArr.push(d.innerText);
          }
        });
        matcheslist.innerHTML = "";
        textArr.forEach(function (item) {
          var li = document.createElement("li");
          li.innerHTML =
            "<a href='#displayContainer' id='" + item + "'>" + item + "</a>";
          matcheslist.appendChild(li);
        });
      });
  
    //showing matches list onclick of matches btn
    matchesBtn.addEventListener("click", function () {
      matcheslist.classList.toggle("show-list");
      //for ratating dropdown icon on click
      matchesBtnSpan.classList.toggle("rotate");
    });
  
    var elements = matcheslist.childNodes;
    textArr = [];
    elements.forEach(function (d, i) {
      if (textArr.indexOf(d.innerText) > -1) {
        d.remove();
      } else {
        textArr.push(d.innerText);
      }
    });
  
    //eventlistner for matches list
    matcheslist.addEventListener("click", function (e) {
      matcheslist.classList.remove("show-list");
      matchesBtnSpan.classList.remove("rotate");
      selectedMatchDay(e.target.id);
    });
  
    //Function for selected match day
    function selectedMatchDay(selectedMatchDay) {
      infoContainer.classList.add("show");
      displayMatchesInfo.innerHTML = "";
      matchDay.textContent = "";
      var checkRecord = 0;
      matchesData.matches.forEach(function (item) {
        if (item.round == selectedMatchDay) {
          checkRecord++;
          matchDay.textContent = selectedMatchDay;
          var li = document.createElement("li");
          li.innerHTML =
            "<div class='cd-heading'><h4>Round : " +
            item.round +
            "</h4><h4>Date : " +
            item.date +
            "</h4></div>" +
            "<div class='cd-score'><a href='EPLLeague/../club.html#displayContainer' id='" +
            item.team1 +
            "'>" +
            item.team1 +
            "</a><span>VS</span><a href='EPLLeague/../club.html#displayContainer' id='" +
            item.team2 +
            "'>" +
            item.team2 +
            "</a></div>";
          displayMatchesInfo.appendChild(li);
          li.classList.add("show");
        }
      });
  
      if (checkRecord == 0) {
        matchDay.textContent =
          "No data available for " + selectedMatchDay + " :(";
      }
    }
  
    //Adding club name to local storage to show it's info on club page
    displayMatchesInfo.addEventListener("click", function (e) {
      localStorage.setItem("clubName", e.target.id);
    });
  
    var modal = document.getElementById("simpleModal"),
      modalBtn = document.querySelectorAll(".modal-btn"),
      closeBtn = document.getElementsByClassName("close-button")[0];
  
    closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", outsideClick);
  
    modalBtn.forEach(function (e) {
      e.addEventListener("click", openModal);
    });
  
    //modal
    function openModal() {
      modal.style.display = "block";
      document.children[0].classList.add("removeScroll");
    }
  
    function closeModal() {
      modal.style.display = "none";
      document.children[0].classList.remove("removeScroll");
    }
  
    function outsideClick(e) {
      if (e.target == modal) {
        modal.style.display = "none";
        document.children[0].classList.remove("removeScroll");
      }
    }
  }
  
















