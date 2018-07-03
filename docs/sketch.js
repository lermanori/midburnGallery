/*jshint esversion: 6 */
// next missions:1)to animate canvas layover transition the idea is to put load three images only to display one and then move the images in the canvases
//2)move canvas layover to diffrent file
//3)add buttons for block change
//4)add block change + animation
var prefixToFile = 'midburnPhotos\\';
var jsonImagesInfo;
var imgText = "kkkk";

let fullScreenLayover;
let mainGrid;



function setup() {
noCanvas();


  addStyleSheet('photoTileStyleSheet.css');
  addStyleSheet('gridStyleSheet.css');
  addStyleSheet('layoverStyleSheet.css');

  fullScreenLayover = new FullScreenLayover();
  mainGrid = new Grid();
  for (var i = 0; i < jsonImagesInfo.items.length; i++) {

    var path = jsonImagesInfo.items[i].url;
    var photoTile = new PhotoTile(path, "", i);
    fullScreenLayover.addframe(path,i);
    fullScreenLayover.addDot(i);
    photoTile.getContainerObj().mouseClicked(on_mouseClicked);
    mainGrid.addNewPhoto(photoTile);

  }
}

function draw() {

}


function preload() {
  jsonImagesInfo = loadJSON(prefixToFile + "\\ImageInfo.json");
}

function addStyleSheet(styleSheetPath) {
  let head = select('head');
  let linkElement = createElement('link');
  linkElement.attribute('rel', 'stylesheet');
  linkElement.attribute('type', 'text/css');
  linkElement.attribute('href', styleSheetPath);
  linkElement.parent(head);
}

function on_mouseClicked(data) {
  mainGrid.hide();
  slideIndex = parseInt(data.srcElement.id);
  currentSlide(slideIndex+1);
  fullScreenLayover.show();
}

class ObjectProperties{
  constructor(x,y,w,h){
    this.x =x;
    this.y =y;
    this.width =w;
    this.height = h;
  }
}
class FullScreenLayover{

  constructor(index = 0)
  {
    this.centerImageIndex =index;
    this.centerSrc = null;
    this.centerImage = null;
    this.backToGridButton = createButton("back to grid");
    this.backToGridButton.mouseClicked(backToGrid);
    this.backToGridButton.hide();
    this.backToGridButton.class("btn");

    this.mainDivContainer = createDiv("");
    this.mainDivContainer.hide();
    this.mainDivContainer.class("slideshow-container");


    this.leftButton = createElement("a","&#10094;");
    this.leftButton.class('prev');
    this.leftButton.hide();
    this.leftButton.mouseClicked(minusSlides);
    //this.leftButton.parent(this.mainDivContainer);

    this.rightButton = createElement("a","&#10095;");
    this.rightButton.class('next');
    this.rightButton.hide();
    this.rightButton.mouseClicked(plusSlides);

  //  this.rightButton.parent(this.mainDivContainer);

     var br = createElement('br','');
     br.parent(this.mainDivContainer);

    this.dotsContainer = createDiv("");
    this.dotsContainer.style('text-align','center');
    this.dotsContainer.parent(this.mainDivContainer);
    this.dotsContainer.hide();


  }
  addDot(n)
  {
    var dot = createSpan("");
    dot.class("dot");
    dot.attribute('onclick','currentSlide(' + (n+1).toString()+')');



    dot.parent(this.dotsContainer);
  }
  addframe(src,index)
  {
    var h = window.innerHeight|| document.documentElement.clientHeight||document.body.clientHeight;
    var frameDivContainer = createDiv("");
    frameDivContainer.class("mySlides fade");

    var frameDivNumberText = createDiv((index+1).toString() + '/' + jsonImagesInfo.items.length.toString() );
    frameDivNumberText.class("numbertext");

    frameDivNumberText.parent(frameDivContainer);

    h*=8/10;
    this.centerImage = createImg(src);

    this.centerImage.style('height',h.toString() + 'px');
    this.centerImage.style('margin-left','22%');
    this.centerImage.parent(frameDivContainer);

    var caption = createDiv("");
    caption.parent(frameDivContainer);



    frameDivContainer.parent(this.mainDivContainer);



  }



/*
  loadImage(index)
  {
    this.claculateAllSrc(index);
    this.centerImage.attribute('src',this.centerSrc);
  }
*/
/*
  claculateAllSrc(index)
  {
    this.centerSrc = jsonImagesInfo.items[index].url;
  }
  */
  show()
  {
    this.mainDivContainer.show();
    this.dotsContainer.show();
    this.rightButton.show();
    this.leftButton.show();
    this.backToGridButton.show();
  }
  hide()
  {
    this.mainDivContainer.hide();
    this.dotsContainer.hide();
    this.rightButton.hide();
    this.leftButton.hide();
    this.backToGridButton.hide();
  }

}
function backToGrid(){
  fullScreenLayover.hide();
  mainGrid.show();
}
var slideIndex = 1;

// Next/previous controls
function plusSlides() {
  slideIndex++;
  showSlides(slideIndex);
}
function minusSlides(){
  slideIndex--;
  showSlides(slideIndex);
}


// Thumbnail image controls
function currentSlide(n) {
  slideIndex = n;
  showSlides(slideIndex);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1;}
  if (n < 1) {slideIndex = slides.length;}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  mainGrid.hide();
  fullScreenLayover.show();
}
