/*jshint esversion: 6 */
class PhotoTile {
	constructor(pathToFile,imgText,index) {
		this.HtmlPhotoframe = new HtmlPhotoframe(pathToFile,imgText,index);
	}
	getContainerObj()
	{
		return this.HtmlPhotoframe.HtmlContainerObj;
	}
}
class HtmlPhotoframe {
	constructor(pathToFile,imgText,index)
	{
		this.HtmlContainerObj = createDiv("");
		this.HtmlContainerObj.addClass("container");
		this.HtmlContainerObj.id(index);

		this.HtmlOverlayObj = createDiv();
		this.HtmlOverlayObj.addClass("overlay");
		this.HtmlOverlayObj.html(imgText);

		this.HtmlPhotoObj = createImg(pathToFile);
		this.HtmlPhotoObj.addClass("image");
		this.HtmlPhotoObj.id(index);

		this.HtmlContainerObj.child(this.HtmlOverlayObj);
		this.HtmlContainerObj.child(this.HtmlPhotoObj);
	}
}
