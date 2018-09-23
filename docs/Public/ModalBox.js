/*jshint esversion: 6 */
class ModalBox
{
  constructor(text)
  {
    this.showing = false;
    this.modal = createDiv("");
    this.modal.class('modal');
    this.modal.id('myModal');
    this.modalBoxdivObj = createDiv("");
    this.modalBoxdivObj.class('modal-content');
    this.spanobject = createSpan("x");
    this.spanobject.class('close');
    this.paragraph = createP(text);
    this.spanobject.parent(this.modalBoxdivObj);
    this.paragraph.parent(this.modalBoxdivObj);
    this.modalBoxdivObj.parent(this.modal);
  }
  parent(obj)
  {
    this.modal.parent(obj);
  }
  show()
  {
    this.modal.addClass('on');
    this.spanobject.mouseClicked(this.hide);
    this.showing=true;
    this.modal.show();
  }
  hide()
  {
    var mod = select('.on');
    mod.removeClass('on');
    mod.hide();
    this.showing=false;
  }
}
