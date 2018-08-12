/*jshint esversion: 6 */
let prefixToFile = 'midburnPhotos\\';
let jsonImagesInfo;
let fullScreenLayover;
let mainGrid;
let styleSheets;

function preload() {
  jsonImagesInfo = loadJSON(prefixToFile + "\\ImageInfoSortedByColor.json");
  styleSheets = loadJSON('styleSheets.json');
}
function setup() {
  noCanvas();
  loadStyleSheets();//uses already loaded json file stylesheets and load all the stylesheets in it
  fullScreenLayover = new FullScreenLayover();//class that represents the element that is revaeld when the user click on an image;
  mainGrid = new Grid();//class that represents the grid of images
  let wrapper = select(".wrapper");//insertion of the grid element into the css Grid that is called wrapper and is dividing the grid from the top tool bar
  mainGrid.parent(wrapper);
  loadImages();//uses jsonImagesInfo who at this time is initalized to load the json content of jsonImagesInfo sortedByColor and can be changed according to search
  let searchBar = select(".fa-search");
  searchBar.mouseClicked(searchBarSubmitValue);
}

//shouldnt sit here now for backend testing and studing
function searchBarSubmitValue()
{
  let searchValue = select("#searchField");
  let searchString = searchValue.value();
  console.log("/testing/"+searchString);
  loadJSON("/testing/"+searchString,on_loadJson);
}
function on_loadJson(value)
{
console.log(value);
jsonImagesInfo = value;
mainGrid.clear();
loadImages();
}
//end section -not supposed to be here

function draw() {

}
//uses json images info that is preloaded.
function loadImages() {
  for (var i = 0; i < jsonImagesInfo.items.length; i++) {
    var path = jsonImagesInfo.items[i].url;
    var photoTile = new PhotoTile(path, "", i);
    fullScreenLayover.addframe(path, i);
    fullScreenLayover.addDot(i);
    photoTile.getContainerObj().mouseClicked(on_mouseClickedOverPhoto);
    mainGrid.addNewPhoto(photoTile);
  }
}
//callback for event when ever picture is clicked on
function on_mouseClickedOverPhoto(data) {
  mainGrid.hide();
  slideIndex = parseInt(data.srcElement.id);
  currentSlide(slideIndex + 1);
  fullScreenLayover.show();
}