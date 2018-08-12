
/*jshint esversion: 6 */
class Grid
{
	constructor()
	{
		this.initialize();
	}
	initialize()
	{
		this.rowHtmlObj = createDiv("");
		this.rowHtmlObj.class('row');
		this.curruentColumn = 0;
		this.k_colCapacity =1;
		this.leftspots = this.k_colCapacity;
		this.colsArr = [];
		this.addNewcolumn();
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
