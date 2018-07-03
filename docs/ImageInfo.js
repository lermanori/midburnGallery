/*jshint esversion: 6 */
class ImageInfo
{
  constructor () {
    this.subject = "";
    this.items = [];
  }
}
class Item
{
  constructor(url,description,tags = null)
  {
    this.url = url;
    this.description=description;
    this.tags = tags;
  }
}
class Tags
{
  constructor()
  {
    this.tagName="";
  }

}
