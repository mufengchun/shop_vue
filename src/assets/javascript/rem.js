(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if(!clientWidth){
        return false;
      } else if (clientWidth < 1024) {
        clientWidth = 1024;
      } if (clientWidth > 1390) {
        clientWidth = 1390;
      }
      docEl.style.fontSize = 100 * (clientWidth / 2000) + 'px';
    };

  if(!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);