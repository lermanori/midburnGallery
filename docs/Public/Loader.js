/*jshint esversion: 6 */
class Loader
{
	constructor()
	{
		this.loaderHtmlObject = createDiv("");
		this.loaderHtmlObject.class('loader');
		this.loaderHtmlObject.hide();

	}
	parent(i_parent)
	{
			this.loaderHtmlObject.parent(i_parent);
	}
	show()
	{
			this.loaderHtmlObject.show();
	}
	hide()
	{
			this.loaderHtmlObject.hide();
	}
}
