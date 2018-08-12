/*jshint esversion: 6 */

function addStyleSheet(styleSheetPath) {
  let head = select('head');
  let linkElement = createElement('link');
  linkElement.attribute('rel', 'stylesheet');
  linkElement.attribute('type', 'text/css');
  linkElement.attribute('href', styleSheetPath);
  linkElement.parent(head);
}

function loadStyleSheets()
{
  for(let i = 0; i<styleSheets.styleSheets.length;i++)
  {
    let styleSheet = styleSheets.styleSheets[i].url;
    addStyleSheet(styleSheet);
  }
}
