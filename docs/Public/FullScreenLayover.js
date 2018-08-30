/*jshint esversion: 6 */
var slideIndex = 1;
// Next/previous controls
function plusSlides() {
  slideIndex++;
  showSlides(slideIndex);
}
function minusSlides() {
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
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  mainGrid.hide();
  fullScreenLayover.show();
}

function backToGrid() {
  fullScreenLayover.hide();
  mainGrid.show();
}
class ObjectProperties {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }
}
class FullScreenLayover {
  constructor(index = 0) {
    this.centerImageIndex = index;
    this.centerSrc = null;
    this.centerImage = null;
    this.backToGridButton = createButton("back to grid");
    this.backToGridButton.mouseClicked(backToGrid);
    this.backToGridButton.hide();
    this.backToGridButton.class("btn");
    this.mainDivContainer = createDiv("");
    this.mainDivContainer.hide();
    this.mainDivContainer.class("slideshow-container");
    this.leftButton = createElement("a", "&#10094;");
    this.leftButton.class('prev');
    this.leftButton.hide();
    this.leftButton.mouseClicked(minusSlides);
    this.leftButton.parent(this.mainDivContainer);
    this.rightButton = createElement("a", "&#10095;");
    this.rightButton.class('next');
    this.rightButton.hide();
    this.rightButton.mouseClicked(plusSlides);
    this.rightButton.parent(this.mainDivContainer);
    this.dotsContainer = createDiv("");
    this.dotsContainer.style('text-align', 'center');
    this.dotsContainer.style('margin', '2%');
    //  this.dotsContainer.parent(this.mainDivContainer);
    this.dotsContainer.hide();
  }
  addDot(n) {
    var dot = createSpan("");
    dot.class("dot");
    dot.attribute('onclick', 'currentSlide(' + (n + 1).toString() + ')');

    dot.parent(this.dotsContainer);
  }
  clearDots()
  {
    var dots = selectAll(".dot");
   for (var i = 0; i < dots.length; i++) {
     dots[i].remove();
   }
  }
  addframe(src, index) {
    //  var h = window.innerHeight|| document.documentElement.clientHeight||document.body.clientHeight;
    var frameDivContainer = createDiv("");
    frameDivContainer.class("mySlides fade");
    var frameDivNumberText = createDiv((index + 1).toString() + '/' + jsonImagesInfo.items.length.toString());
    frameDivNumberText.class("numbertext");
    frameDivNumberText.parent(frameDivContainer);
    this.centerImage = createImg(src);
    //this.centerImage.style('height',h.toString() + 'px');
    this.centerImage.style('width', '100%');
    this.centerImage.parent(frameDivContainer);
    var caption = createDiv("");
    caption.parent(frameDivContainer);
    frameDivContainer.parent(this.mainDivContainer);
  }

  show() {
    this.mainDivContainer.show();
    this.dotsContainer.show();
    this.rightButton.show();
    this.leftButton.show();
    this.backToGridButton.style('width', this.mainDivContainer.style('width'));
    this.backToGridButton.show();
  }

  hide() {
    this.mainDivContainer.hide();
    this.dotsContainer.hide();
    this.rightButton.hide();
    this.leftButton.hide();
    this.backToGridButton.hide();
  }
}
