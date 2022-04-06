//get html elements from manage.html
const popupWebList = document.getElementById("webList");
const goBackButton = document.getElementById("goBackButton");

var storage = chrome.storage;

//prints out elements of  'whitelist'
function constructOptions() {
    chrome.storage.sync.get(['whiteList'], function(data){
        for(let website of data.whiteList){
            let list = document.createElement("div");
            list.innerText = website;
            popupWebList.appendChild(list);
        }
    });
}
//when u press go back takes you to default extension popup
function goBackButtonClick(){
    window.location = 'popup.html';
}

/*on click functions*/
goBackButton.addEventListener("click", goBackButtonClick);
constructOptions();
