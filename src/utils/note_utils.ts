export default class NoteUtils {
  static createSpanToSurroundText() {
    const markerEl = document.createElement("span");
    markerEl.id = "sel_" + new Date().getTime() + "_" + Math.random().toString().substr(2);
    return markerEl;
  }  

  static getSelectedRange() {
    const sel: Selection = <Selection>window.getSelection();
    const range = sel.getRangeAt(0).cloneRange();
    return range;
  }

}
  