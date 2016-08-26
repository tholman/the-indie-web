/**
 * Inspiring Online
 * -- Simple client side rendering
 * -- And endless scroll
 */

var remoteAssetSource = "https://s3.amazonaws.com/inspiring.online/assets/post-images/";
var localAssetSource = "/assets/post-images/";

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
    sortBy: 'original-order'
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

    (function() {
      var _element = element;
      img.onload = function() {
        console.log("loaded?");
        isotopeObject.insert(_element);
      }
    })();

    img.src = (src + postData.image);
    element.appendChild(img);
  }

  var title = document.createElement('h1');
  title.innerHTML = postData.title;
  element.appendChild(title);

  var content = document.createElement('div');
  content.innerHTML = postData.content;
  element.appendChild(content);

  // Add straight away if it doesn't have an image
  if( postData.image === "" ) {
    isotopeObject.insert(element);
  }
}

init();


