/*jshint esversion: 6 */
let prefixToFile = 'midburnPhotos\\';
let jsonImagesInfo;
let fullScreenLayover;
let mainGrid;
let loader;
let styleSheets;
let modalAbout;
let modalContacts;

function stopRKey(i_evt) {
  var evt = (i_evt) ? i_evt : ((event) ? event : null);
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
}

document.onkeypress = stopRKey;

function preload() {
  styleSheets = loadJSON('styleSheets.json');
  jsonImagesInfo = loadJSON(prefixToFile + "\\ImageInfoSortedByColor.json");
  jsonCategoriesInfo = loadJSON(prefixToFile + "\\JsonCategoriesInfo.json");
}

function setup() {
  noCanvas();
  loadStyleSheets();//uses already loaded json file stylesheets and load all the stylesheets in it
  fullScreenLayover = new FullScreenLayover();//class that represents the element that is revaeld when the user click on an image;
  mainGrid = new Grid();//class that represents the grid of images
  loader = new Loader();
  var body = select('body');
  modalAbout = new ModalBox("testing about");
  modalAbout.parent(body);
  modalContacts = new ModalBox("testing contacts");
  modalContacts.parent(body);
  let wrapper = select(".wrapper");//insertion of the grid element into the css Grid that is called wrapper and is dividing the grid from the top tool bar
  mainGrid.parent(wrapper);
  loader.parent(wrapper);
  loadImages();//uses jsonImagesInfo who at this time is initalized to load the json content of jsonImagesInfo sortedByColor and can be changed according to search
  let searchBar = select(".fa-search");
  searchBar.mouseClicked(searchBarSubmitValue);
  let categoriesButton = select("#categoriesButton");
  categoriesButton.mouseClicked(categoriesButton_onClick);
}
function categoriesButton_onClick()
{
  mainGrid.clear();
  fullScreenLayover.hide();
  fullScreenLayover.clearDots();
  mainGrid.divEmptyMessage.hide();
  loadCategories();
}
//shouldnt sit here now for backend testing and studing
function searchBarSubmitValue()
{
  let searchValue = select("#searchField");
  let searchString = searchValue.value();
  console.log("/testing/"+searchString);
  fullScreenLayover.hide();
  loader.show();
  mainGrid.clear();
  fullScreenLayover.clearDots();
  loadJSON("/testing/"+searchString,on_loadJson,on_notLoadJson);

}

function on_notLoadJson()
{
  jsonImagesInfo = null;
  loadImages();
  mainGrid.divEmptyMessage.show();
  mainGrid.show();
}

function on_loadJson(value)
{
console.log(value);
jsonImagesInfo = value;
loadImages();
mainGrid.show();
}
//end section -not supposed to be here

function draw() {

}
//uses json images info that is preloaded.
function loadCategories()
{
  for (var i = 0; i < jsonCategoriesInfo.items.length; i++) {
    var path = jsonCategoriesInfo.items[i].backImgPath;
    var photoTile = new PhotoTile(path, "", i);
    photoTile.getContainerObj().mouseClicked(on_mouseClickedOverCategory);
    mainGrid.addNewPhoto(photoTile);
  }
}
function on_mouseClickedOverCategory(data)
{
  console.log(data);
  var categoryIndex = parseInt(data.srcElement.id);
  var pathToCategoryJson = jsonCategoriesInfo.items[categoryIndex].pathToFile;
  mainGrid.clear();
  loadJSON(pathToCategoryJson,on_loadJson,on_notLoadJson);
}

function loadImages() {
  if(jsonImagesInfo!=null)
  {
  mainGrid.divEmptyMessage.hide();
  for (var i = 0; i < jsonImagesInfo.items.length; i++) {
    var path = jsonImagesInfo.items[i].url;
    var photoTile = new PhotoTile(path, "", i);
    fullScreenLayover.addframe(path, i);
    fullScreenLayover.addDot(i);
    photoTile.getContainerObj().mouseClicked(on_mouseClickedOverPhoto);
    mainGrid.addNewPhoto(photoTile);
  }
}
else {
  loadCategories();
}
  loader.hide();
}
//callback for event when ever picture is clicked on
function on_mouseClickedOverPhoto(data) {
  mainGrid.hide();
  slideIndex = parseInt(data.srcElement.id);
  currentSlide(slideIndex + 1);
  fullScreenLayover.show();
}
function openAbout()
{
  modalAbout.show();
}
function openContact()
{
  modalContacts.show();
}
