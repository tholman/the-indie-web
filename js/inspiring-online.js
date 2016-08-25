/* 
 *  Inspiring Online
 */

var elem = document.querySelector('.tile-grid');
var iso = new Isotope( elem, {
  // options
  itemSelector: '.tile',
  masonry: {
    gutter: 30,
    fitWidth: true
  }
});
