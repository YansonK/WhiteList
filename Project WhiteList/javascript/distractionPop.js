//This is the javascript that will be injected into the user's browser as soon as the tab is loaded
//it is the main functionality of the extension
/*it includes: 
--overlay creation preventing user interaction with webpage
--popup telling the user that this website is not in their whitelist
--logic determining if the user is being distracted
*/

//an asyncronous function that checks the state of the extension to see if the user is being distracted
async function checkDisState() {
  //this asyn function grabs the values 'on' and 'added' but is not instantaneous
  //instead of using a call back I am using a promise await statement
  //I am promising syncStorage that it will get the values it is asking for
  let syncStorage = await chrome.storage.sync.get([`on`, `added`]);
  console.log("🚀 ~ file: distractionPop.js ~ line 3 ~ checkDisState ~ syncStorage", syncStorage);

  //if the extension is active and the websites not added
  //returns ur distracted
  if (syncStorage.on && !syncStorage.added) {
    return true;
  }
  return false;
}
//logic determining if the popups should be added or removed
async function popupLogic() {
  //promises cant be in if statments so I am promising a boolean statment to the distracted var
  const distracted = await checkDisState();

  // will wait until the varr is fullfilled to perform popupLogic
  if (distracted) {
    //if elements haven't already been created it will create the popup/overlay
    if(document.getElementsByClassName("overlayDistraction").length == 0)
      createElements();
  } 
  //if not distracted && popup/overlay is present it will remove the elements
  else if (document.getElementsByClassName("overlayDistraction").length > 0) {
    document.body.removeChild(document.getElementsByClassName("overlayDistraction")[0]);
    document.body.removeChild(document.getElementsByClassName("popupDistraction")[0]);
    console.log("removed elements")
  }
}

//creates popup/overlay elements
function createElements(){
  let overlay = document.createElement("div");
  overlay.classList.add("overlayDistraction");
  
  let popup = document.createElement("div");
  popup.classList.add("popupDistraction");
  popup.innerHTML = "This site is not on your white list";


  document.body.appendChild(overlay);
  document.body.appendChild(popup);
  console.log("added elements")
}

//when website is just loaded it will not hear that 'current' changed
//the injection takes longer than a  storage varriable change so 
//I must run a popup logic check when just run
popupLogic();

//listens for if any chrome storage varriable changes to check if the popup should  appear/disapear
//so almost any meanigful action in the browser will trigger the logic check
/* elements that would trigger this when changed are:
                                                    'added'
                                                    'on'
                                                    'current'
                                                    'whitelist'
*/
chrome.storage.onChanged.addListener(popupLogic);
