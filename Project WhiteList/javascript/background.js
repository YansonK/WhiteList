//a line of code that saves me space and reading
let storage = chrome.storage;

storage.local.get(["whiteList"], function(items){
  if(items.whiteList === undefined){
    
  }
});

//the initializationg function that sets/declares important chrome storage varriables
function initialize(){
  //only sets default vals if never initialzed before
  storage.get("initialized", function(extension){
    if(extension.initialized===undefined)
    //'on' determines if the extensions is active
    storage.sync.set({ on: false });
    //'added' var that determines if a website is added in whitelist
    storage.sync.set({ added: false });
    //'whitelist' the array of websites thats stored in the extension
    storage.sync.set({ whiteList: [] });
    //this func is called in initial to set our current tab
    getCurrentTab();
    //vals have been initialized
    storage.sync.set({initialized: true});
  })
  
}

//this async func that stores the current tab and sets 
//'current' a var that stores active tabs url
async function getCurrentTab() {
  //obtains the active websites information
  //this action is not instintaneous so a promise is delivered
  let queryOptions = { active: true, currentWindow: true };
  //'tab' will wait until the promise is fullfilled
  let [tab] = await chrome.tabs.query(queryOptions);
  console.log("🚀 ~ file: background.js ~ line 26 ~ getCurrentTab ~ tab", tab)
  //once 'tab' is ready with the info 'current' will be set to the tabs url
  storage.sync.set({ current: tab.url }
  );
}

//this func compares the active tab to the whitelist
//if a match is found determines the tab is added
function checkAdded() { 
  let itExists = false;// temp var assumes that it dosent exist
  storage.sync.get("whiteList", function (websites) {
    console.log("🚀 ~ file: background.js ~ line 32 ~ websites", websites)
    storage.sync.get("current", function (result) {
      console.log("🚀 ~ file: background.js ~ line 33 ~ result", result)
      //linear search algorithm
      for (let i = 0; i < websites.whiteList.length; i++) {
        if (websites.whiteList[i] == result.current) {
        
          itExists = true; //changes temp to true if match is found
        }
      }
      storage.sync.set({ added: itExists });//changes actual added var to its correct status
    });
  });
}

//this function calls for previous functions to ensure the state of the extension is accurate
function runningCheck() {
  getCurrentTab();
  checkAdded();
}

//the meat and potatos of our background script
initialize();
//listens for if a tab is clicked and becomes the "Active" tab
chrome.tabs.onActivated.addListener(runningCheck);
//listens for if we load a webpage
chrome.webNavigation.onCommitted.addListener(runningCheck);
//mainly used for debugging
storage.onChanged.addListener(function (obj, areaName) {
  console.log(
    "🚀 ~ file: background.js ~ line 33 ~ chrome.storage.onChanged.addListener ~ obj, areaName",
    obj,
    areaName
  );
});
