//varriables referencing DOM elements in popup.html
const studyButton = document.getElementById("studyButton");
const addOrDeleteButton = document.getElementById("addOrDeleteButton");
const manageButton = document.getElementById("manageButton");
//ease of access and edits of the current whitelist
let websites = [];
//saves me some writing
var storage = chrome.storage;

//loads chrome storage of saved whiteListed sites into the temp list and then updates all buttons
storage.sync.get(`whiteList`, function (results) {
  websites = results.whiteList;
  updateStudyButton();
  updateAddOrDeleteButton();
});

//function that updates the OFF/STUDYING! buttons visual state
function updateStudyButton() {
  storage.sync.get(`on`, function (button) {
    if (button.on == true) {
      studyButton.innerText = "Studying!";
      studyButton.backgroundColor = "#ff8b4d";
      console.log(`im on now`);
    } else {
      studyButton.innerText = "OFF";
    }
  });
}

//updates the add/delete website buttons visual state
function updateAddOrDeleteButton() {
  storage.sync.get(`added`, function (button) {
    if (button.added == true) {
      addOrDeleteButton.innerText = "Remove This Website?";
    } else {
      addOrDeleteButton.innerText = "Add This Website?";
    }
  });
}

//function that runs when the OFF/STUDYING! button is clicked
function studyButtonClick() {
  //call back flips 'on' like a lightswitch
  storage.sync.get(`on`, function (result) {
    var on = false;

    if (result.on == false) {
      on = true;
    }

    //sets the on/off varriable
    storage.sync.set({ on: on });

    updateStudyButton();
  });
}
//function that runs when the add/delete button is clicked
function addOrDeleteButtonClick() {
  storage.sync.get(`current`, function (result) {
    let itExists = false;
    let index = 0;
    for (let i = 0; i < websites.length; i++) {
      if (websites[i] == result.current) {
        itExists = true; //changes added status to true
        index = i;
      }
    }

    if (!itExists) {
      websites.push(result.current); //adds the current website to the whitelist
      itExists = true;
    } else {
      websites.splice(index, 1); //removes 1 element at index location
      itExists = false;
    }

    storage.sync.set({ whiteList: websites, added: itExists  }, function () {
      updateAddOrDeleteButton();
    });
  });
}

//takes you to diff html that shows what websites are in your whitelist
function manageButtonClick() {
  window.location = "whiteList.html";
}

/*on click functions*/
studyButton.addEventListener("click", studyButtonClick);
addOrDeleteButton.addEventListener("click", addOrDeleteButtonClick);
manageButton.addEventListener("click", manageButtonClick);
