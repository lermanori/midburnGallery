/*jshint esversion: 6 */
CanvasLayover = new canvasLayover();

function DrawBackground()
{
  background(240,255,255);
  image(CanvasLayover.centerImage, CanvasLayover.canvasCenterImageProperties.x, CanvasLayover.canvasCenterImageProperties.y, CanvasLayover.canvasCenterImageProperties.width, CanvasLayover.canvasCenterImageProperties.height);

  tint(255,17);
  image(CanvasLayover.leftImage, CanvasLayover.canvasLeftImageBlurryProperties.x  , CanvasLayover.canvasLeftImageBlurryProperties.y, CanvasLayover.canvasLeftImageBlurryProperties.height, CanvasLayover.canvasLeftImageBlurryProperties.width);
  image(CanvasLayover.rightImage, CanvasLayover.canvasRightImageBlurryProperties.x , CanvasLayover.canvasRightImageBlurryProperties.y, CanvasLayover.canvasRightImageBlurryProperties.height, CanvasLayover.canvasRightImageBlurryProperties.width);
  noTint();
  image(CanvasLayover.exitButton, CanvasLayover.canvasExitButtonProperties.x, CanvasLayover.canvasExitButtonProperties.y, CanvasLayover.canvasExitButtonProperties.width, CanvasLayover.canvasExitButtonProperties.height);
  image(CanvasLayover.leftButton, CanvasLayover.canvasLeftButtonProperties.x,CanvasLayover.canvasLeftButtonProperties.y, CanvasLayover.canvasLeftButtonProperties.width,CanvasLayover.canvasLeftButtonProperties.height);
  image(CanvasLayover.rightButton, CanvasLayover.canvasRightButtonProperties.x,CanvasLayover.canvasRightButtonProperties.y, CanvasLayover.canvasRightButtonProperties.width,CanvasLayover.canvasRightButtonProperties.height);
}

function on_mouseClicked(data) {

  var src = data.srcElement.src;
  var index =parseInt(data.srcElement.id);
  CanvasLayover.indexOfPhoto = index;
  CanvasLayover.indexToTheLeft = (CanvasLayover.indexOfPhoto-1<0)?jsonImagesInfo.items.length-1:CanvasLayover.indexOfPhoto-1;
  CanvasLayover.indexToTheRight = (CanvasLayover.indexOfPhoto+1 )% jsonImagesInfo.items.length;
  CanvasLayover.src = src;
  CanvasLayover.srcToTheLeft = jsonImagesInfo.items[CanvasLayover.indexToTheLeft].url;
  CanvasLayover.srcToTheRight = jsonImagesInfo.items[CanvasLayover.indexToTheRight].url;


  CanvasLayover.show();

}
function on_loadImage(img) {
  noTint();
  image(img, CanvasLayover.canvasCenterImageProperties.x, CanvasLayover.canvasCenterImageProperties.y, CanvasLayover.canvasCenterImageProperties.width, CanvasLayover.canvasCenterImageProperties.height);

  CanvasLayover.visible = true;
  CanvasLayover.canvas.show();
  let grid = select('.row');
  grid.style('display', 'none');
}


function on_loadLeftImage(img)
{
  tint(255, 17);
  image(img, CanvasLayover.canvasLeftImageBlurryProperties.x  , CanvasLayover.canvasLeftImageBlurryProperties.y, CanvasLayover.canvasLeftImageBlurryProperties.height, CanvasLayover.canvasLeftImageBlurryProperties.width);
//  image(img, CanvasLayover.rectX -  (CanvasLayover.rectWidth - CanvasLayover.spacing*8)  , CanvasLayover.rectY + CanvasLayover.spacing*2, CanvasLayover.rectWidth - CanvasLayover.spacing*10, CanvasLayover.rectheight - CanvasLayover.spacing*10);
  noTint();

  CanvasLayover.exitButton = loadImage("exitButton.png", on_loadExitButton);
  CanvasLayover.leftButton = loadImage("leftSign.png", on_loadLeftSign);


}

function on_loadRightImage(img)
{
  tint(255, 17);

  image(img, CanvasLayover.canvasRightImageBlurryProperties.x , CanvasLayover.canvasRightImageBlurryProperties.y, CanvasLayover.canvasRightImageBlurryProperties.height, CanvasLayover.canvasRightImageBlurryProperties.width);
  noTint();

    CanvasLayover.rightButton  = loadImage("rightSign.png", on_loadRightSign);

}

function on_loadExitButton(img) {
  image(img, CanvasLayover.canvasExitButtonProperties.x, CanvasLayover.canvasExitButtonProperties.y, CanvasLayover.canvasExitButtonProperties.width, CanvasLayover.canvasExitButtonProperties.height);

}

function on_clickCanvasLayover(img) {
  if (CanvasLayover.isOverExitButton()) {
    CanvasLayover.hide();
    let grid = select('.row');
    grid.style('display', 'flex');
  } else {
    var indicatorForClicked = false;
    if (CanvasLayover.isOverLeftButton()) {
      indicatorForClicked = true;
      CanvasLayover.animationReady=true;

      CanvasLayover.direction="left";

      CanvasLayover.indexOfPhoto = (CanvasLayover.indexOfPhoto - 1);
      if (CanvasLayover.indexOfPhoto == -1) {
        CanvasLayover.indexOfPhoto = jsonImagesInfo.items.length - 1;
      }
    } else if (CanvasLayover.isOverRightButton()) {
      indicatorForClicked = true;
      CanvasLayover.direction="right";
      CanvasLayover.animationReady=true;

      CanvasLayover.indexOfPhoto = (CanvasLayover.indexOfPhoto + 1) % jsonImagesInfo.items.length;
    }
    if (indicatorForClicked)
    {
    animate();
    CanvasLayover.src = jsonImagesInfo.items[CanvasLayover.indexOfPhoto].url;
    var indexToTheRight = (CanvasLayover.indexOfPhoto + 1) % jsonImagesInfo.items.length;
    CanvasLayover.srcToTheRight = jsonImagesInfo.items[indexToTheRight].url;
    var indexToTheLeft = (CanvasLayover.indexOfPhoto - 1);

    if (indexToTheLeft == -1) {
      indexToTheLeft = jsonImagesInfo.items.length - 1;
    }
    CanvasLayover.srcToTheLeft = jsonImagesInfo.items[indexToTheLeft].url;

    CanvasLayover.show();
  }

  }

}

function on_loadLeftSign(img) {
  image(img, CanvasLayover.canvasLeftButtonProperties.x,CanvasLayover.canvasLeftButtonProperties.y, CanvasLayover.canvasLeftButtonProperties.width,CanvasLayover.canvasLeftButtonProperties.height);
}

function on_loadRightSign(img) {
  image(img, CanvasLayover.canvasRightButtonProperties.x,CanvasLayover.canvasRightButtonProperties.y, CanvasLayover.canvasRightButtonProperties.width,CanvasLayover.canvasRightButtonProperties.height);

}

class canvasLayover {
  constructor() {
    this.canvasCenterRectBehindImageProperties = new CanvasObjectProperties(windowWidth / 2 - windowWidth/6,0,windowWidth/3,windowHeight);
    this.Canvasheight = windowHeight;
    /*
    this.rectheight = windowHeight;
    this.rectWidth = windowWidth/3;
    this.rectX = windowWidth / 2 - this.rectWidth / 2;
    this.rectY = 0;*/

    this.indexOfPhoto = 1;
    this.canvasExitButtonProperties = new CanvasObjectProperties(windowHeight/10,windowHeight/10,windowHeight/7,windowHeight/7);
    /*
    this.exitButtonX = 30;
    this.exitButtonY = 30;
    this.exitButtonHeight = 120;
    this.exitButtonWidth = 120;
    */
    this.canvasRightButtonProperties = new CanvasObjectProperties(windowHeight/10,windowHeight/2,windowHeight/10,windowHeight/10);
    /*
    this.rightButtonX = 15;
    this.rightButtonY = windowHeight / 2;
    this.rightButtonHeight = 30;
    this.rightButtonWidth = 30;
    */

    this.canvasLeftButtonProperties =  new CanvasObjectProperties(windowWidth - (windowWidth/10),windowHeight/2,windowHeight/10,windowHeight/10);
    /*
    this.leftButtonX = windowWidth - 50;
    this.leftButtonY = this.rightButtonY;
    this.leftButtonHeight = this.rightButtonHeight;
    this.leftButtonWidth = this.rightButtonWidth;
    */

    this.spacing = 10;
    this.speed = 10;
    this.canvasCenterImageProperties = new CanvasObjectProperties(this.canvasCenterRectBehindImageProperties.x + this.spacing,
                                                                  this.canvasCenterRectBehindImageProperties.y + this.spacing,
                                                                  this.canvasCenterRectBehindImageProperties.width - this.spacing*2,
                                                                  this.canvasCenterRectBehindImageProperties.height - this.spacing*2);
    this.canvasLeftImageBlurryProperties = new CanvasObjectProperties(this.canvasCenterRectBehindImageProperties.x -  (this.canvasCenterRectBehindImageProperties.width - this.spacing*8),
                                                                       this.canvasCenterRectBehindImageProperties.y + this.spacing*2,
                                                                       this.canvasCenterRectBehindImageProperties.width - this.spacing*10,
                                                                       this.canvasCenterRectBehindImageProperties.height - this.spacing*10);

    this.canvasRightImageBlurryProperties = new CanvasObjectProperties(this.canvasCenterRectBehindImageProperties.x+(this.canvasCenterRectBehindImageProperties.width +this.spacing*2),
                                                                        this.canvasCenterRectBehindImageProperties.y + this.spacing*2,
                                                                        this.canvasCenterRectBehindImageProperties.width- this.spacing*10,
                                                                      this.canvasCenterRectBehindImageProperties.height- this.spacing*10);



    this.canvas = createCanvas(windowWidth, this.Canvasheight);
    this.canvas.mouseClicked(on_clickCanvasLayover);
    this.canvas.style('margin', '0 auto');
    //this.canvas.style('margin-top','0.25%');
    this.visible = false;
    this.canvas.hide();

    this.src = null;
    this.srcToTheLeft = null;
    this.srcToTheRight = null;

    this.centerImage  = null;
    this.leftImage = null;
    this.rightImage = null;
    this.exitButton = null;
    this.leftButton = null;
    this.rightButton = null;

    this.animationReady = false;
    this.direction = null;

    fill(0, 60, 0, 70);
    noStroke();
    rect(this.canvasCenterRectBehindImageProperties.x,
         this.canvasCenterRectBehindImageProperties.y,
         this.canvasCenterRectBehindImageProperties.width,
         this.canvasCenterRectBehindImageProperties.height);


  }

  show() {
    background(240,255,255);
    this.centerImage = loadImage(this.src, on_loadImage);
    this.leftImage = loadImage(this.srcToTheLeft, on_loadLeftImage);
    this.rightImage = loadImage(this.srcToTheRight, on_loadRightImage);
    //this.canvas.show();
  }

  hide() {
    this.canvas.hide();
    this.visible = false;

  }
  isOverExitButton() {
    if (mouseX <= this.canvasExitButtonProperties.x + this.canvasExitButtonProperties.width && mouseX >= this.canvasExitButtonProperties.x && mouseY >= this.canvasExitButtonProperties.y && mouseY <= this.canvasExitButtonProperties.y + this.canvasExitButtonProperties.height) {
      return true;
    } else {
      return false;
    }

  }
  isOverLeftButton() {
    if (mouseX <= this.canvasLeftButtonProperties.x + this.canvasLeftButtonProperties.width && mouseX >= this.canvasLeftButtonProperties.x && mouseY >= this.canvasLeftButtonProperties.y && mouseY <= this.canvasLeftButtonProperties.y + this.canvasLeftButtonProperties.height){
      return true;
    } else {
      return false;
    }

  }
  isOverRightButton() {
    //this.canvasRightButtonProperties
    if (mouseX <= this.canvasRightButtonProperties.x + this.canvasRightButtonProperties.width && mouseX >= this.canvasRightButtonProperties.x && mouseY >= this.canvasRightButtonProperties.y && mouseY <= this.canvasRightButtonProperties.y + this.canvasRightButtonProperties.height) {
      return true;
    } else {
      return false;
    }

  }
  /*
    this.sourceImageProperties;
  */







}
function animate()
{
  if(canvasLayover.direction == "left")
  {
    canvasLayover.canvasCenterImageProperties.x-=canvasLayover.speed;
    if (canvasLayover.canvasCenterImageProperties.x<=canvasLayover.canvasLeftImageBlurryProperties.x)
    {
      canvasLayover.canvasCenterImageProperties.x=canvasLayover.canvasLeftImageBlurryProperties.x;
      canvasLayover.canvasCenterImageProperties.x=canvasLayover.canvasLeftImageBlurryProperties.y;
      canvasLayover.canvasCenterImageProperties.x=canvasLayover.canvasLeftImageBlurryProperties.width;
      canvasLayover.canvasCenterImageProperties.x=canvasLayover.canvasLeftImageBlurryProperties.height;
      canvasLayover.animationReady = false;
    }
  }
  else if(canvasLayover.direction == "right")
  {
    canvasLayover.canvasCenterImageProperties.x+=canvasLayover.speed;
    if (canvasLayover.canvasCenterImageProperties.x>=canvasLayover.canvasRightImageBlurryProperties.x)
    {
      canvasLayover.canvasCenterImageProperties.x=canvasLayover.canvasRightImageBlurryProperties.x;
      canvasLayover.canvasCenterImageProperties.x=canvasLayover.canvasRightImageBlurryProperties.y;
      canvasLayover.canvasCenterImageProperties.x=canvasLayover.canvasRightImageBlurryProperties.width;
      canvasLayover.canvasCenterImageProperties.x=canvasLayover.canvasRightImageBlurryProperties.height;
      canvasLayover.animationReady = false;

    }
    window.requestAnimationFrame(animate);
  }
}
