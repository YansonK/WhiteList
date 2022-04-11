# About The Extension!

### Description 
This extension is meant to be a study tool to make those who get distracted easily when using a web browser. Allows the user to select websites they would like to add to their 'WhiteList' and when the extension is activated only websites that are in the extension can be accessed and interacted with


### How to install this google chrome extension
1) download the WhiteList project file
2) Open the google chrome web browser
3) Enter this url into the search bar: chrome://extensions/
4) Click the developer mode toggle in the top right of the page
5) Click the "load unpacked" button in the top left of the page
6) Select the project file
7) Now pin the chrome extensions to your browser bar by selecting the puzzle piece icon in the top right of the browser
8) Locate the extension icon labeled "WhiteList" and press the pin button

#### known bugs
1) if the very edge of a button is clicked it will play the click animation but not perform its function  
   * (happens bc the button moves when clicked. the Click event listener listens when the user releases their mouse but when the button is pressed it drops down a bit. If the user is at the very top of the button then when the button moves and the click is released the user will not be 'clicking' the button when released)

2) Extension will not work properly for tabs already opened upon instalation of the extension
