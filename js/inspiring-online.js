/**
 * Inspiring Online
 * -- Simple client side rendering
 * -- And endless scroll
 */

var remoteAssetSource = "https://s3.amazonaws.com/inspiring.online/assets/post-images/";
var localAssetSource = "/assets/post-images/";
var imageWidthInTile = 214; // 250 - padding - borders

var isotopeObject;

function init() {
  createIsotopeContainer();
  renderInitialTile();
  renderPosts(postJSON);
}

function createIsotopeContainer() {
  var elem = document.querySelector('.tile-grid');
  isotopeObject = new Isotope( elem, {
    // options
    itemSelector: '.tile',
    masonry: {
      gutter: 30,
      fitWidth: true
    },
    sortBy: 'original-order',
    hiddenStyle: {
      transform: 'translate(9px, 9px)',
      'opacity': 0,
      'box-shadow': '0px 0px black'
    },
    visibleStyle: {
      transform: 'translate(0px, 0px)',
      opacity: 1,
      'box-shadow': '9px 9px black'
    }
  });
}

function renderInitialTile() {
  var element = document.createElement('div');
  element.innerHTML = `
    <h1>Inspiring Online</h1>
    <h2>A micro blog of whats up.</h2>
    <ul>
      <li><a href="/contributors">Contributors</a></li>
      <li><a href="https://github.com/tholman/inspiring-online#contributing" target="_blank">Join in?</a></li>
      <li><a href="https://github.com/tholman/inspiring-online#inspiring-online">About</a></li>
      <li><a href="/feed.xml">RSS</a></li> 
    </ul>
  </div>`

  element.className = "tile"
  isotopeObject.insert(element);
}

function renderPosts(postsData) {
  for( var i = 0; i < postsData.length; i++ ) {
    renderPost(postsData[i]);
  }
}

function renderPost(postData) {
  var element = document.createElement('div');
  element.className = 'tile';

  if( postData.image !== "" ) {
    var img = document.createElement('img');

    var src = "";
    if( postData.remoteAsset === "true" ) {
      src += remoteAssetSource;
    } else {
      src += localAssetSource;
    }

    var width = parseInt(postData.imgWidth);
    var height = parseInt(postData.imgHeight);
    
    var ratio = imageWidthInTile / width;
    var newWidth = 214;
    var newHeight = height * ratio;

    img.width = (newWidth);
    img.height = (newHeight);

    img.src = (src + postData.image);
    element.appendChild(img);
  }

  var title = document.createElement('h1');
  title.innerHTML = postData.title;
  element.appendChild(title);

  var content = document.createElement('div');
  content.innerHTML = postData.content;
  element.appendChild(content);

  isotopeObject.insert(element);
}

init();


