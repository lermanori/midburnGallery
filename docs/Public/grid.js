/*jshint esversion: 6 */
class Grid
{
	constructor()
	{
		this.emptyMessage = "no images to show";
		this.initialize();
		this.loaded = false;
	}
	initialize()
	{
		this.divEmptyMessage= createDiv(this.emptyMessage);
		this.rowHtmlObj = createDiv("");
		this.rowHtmlObj.class('row');
		this.curruentColumn = 0;
		this.k_colCapacity =1;
		this.leftspots = this.k_colCapacity;
		this.colsArr = [];
		this.divEmptyMessage.parent(this.rowHtmlObj);
		this.addNewcolumn();
		this.divEmptyMessage.id('emptyMessage');
		this.divEmptyMessage.hide();

	}
	addNewcolumn()
	{
		let columnHtmlObj = createDiv('');
		columnHtmlObj.class('column');
		columnHtmlObj.parent(this.rowHtmlObj);
		this.curruentColumn++;
		this.colsArr[this.curruentColumn] = columnHtmlObj;
		this.leftspots=this.k_colCapacity;
	}
	addNewPhoto(frameObj)
	{
		this.loaded = true;
		if(this.leftspots==0)
		{
			this.addNewcolumn();
		}
		let imgHtmlObj = frameObj.getContainerObj();
		imgHtmlObj.parent(this.colsArr[this.curruentColumn]);
		this.leftspots--;
	}
	clear()
	{
		this.loaded = false;
		 var slides = selectAll(".mySlides");
		for (var i = 0; i < slides.length; i++) {
			slides[i].remove();
		}
		this.divEmptyMessage.remove();
		this.rowHtmlObj.remove();
		this.initialize();
	}
	hide()
	{
		this.rowHtmlObj.hide();
	}
	show()
	{
		this.rowHtmlObj.show();
		this.rowHtmlObj.style('display','flex');
	}
	parent(TheParent)
	{
		this.rowHtmlObj.parent(TheParent);
	}
}
