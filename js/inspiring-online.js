/**
 * Inspiring Online
 * -- Simple client side rendering
 * -- And endless scroll
 */

var remoteAssetSource = "https://s3.amazonaws.com/inspiring.online/assets/post-images/";
var localAssetSource = "/assets/post-images/";
var splitString = "splitHERE"; // Surely there is a better way to get json data in jekyll?
var imageWidthInTile = 214; // 250 - padding - borders
var page = 1;
var loading = false;

var isotopeObject;
var loader;

function init() {
  cacheDom();
  createIsotopeContainer();
  renderInitialTile();

  if( typeof postJSON === "undefined" ) {
    $.ajax({
      url: '/',
      type: 'GET',
      success: function(data) {
        eval(data.split(splitString)[1]);
        renderPosts(postJSON);
        loader.className = "loader";
        loading = false;
        addPaginator();
      }
    })
  } else {
    renderPosts(postJSON);
    addPaginator();
  }
}

function cacheDom() {
  loader = document.querySelector('.loader');
}

function addPaginator() {
  // TODO: Wouldn't hurt to debounce this
  window.onscroll = function(e) {
    if ((window.innerHeight + window.scrollY) >= (document.body.scrollHeight - 50)) {
      paginate();
    }
  };
}

function paginate() {
  if( loading === true ) {
    return;
  }

  loading = true;
  loader.className = "loader loading";
  page++;
  $.ajax({
    url: '/' + page,
    type: 'GET',
    success: function(data) {
      eval(data.split(splitString)[1]);
      renderPosts(postJSON);
      loader.className = "loader";
      loading = false;
    },
    error: function() {
      // Hide loader... but also, you're at the end of the page.
      renderFooterTile();
      loader.className = "loader";
    }
  })
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
      <li><a href="https://github.com/tholman/inspiring-online/graphs/contributors" target="_blank">Contributors</a></li>
      <li><a href="https://github.com/tholman/inspiring-online#contributing" target="_blank">Join in?</a></li>
      <li><a href="http://twitter.com/NspiringOnline" target="_blank">Twitter</a></li>
      <li><a href="https://github.com/tholman/inspiring-online#inspiring-online" target="_blank">About</a></li>
      <li><a href="/feed.xml">RSS</a></li> 
    </ul>`

  element.className = "tile"
  isotopeObject.insert(element);
}

function renderFooterTile() {
  var element = document.createElement('footer');
  element.innerHTML = `
    <footer>
      Wow, you got to the end! Got something to share, you should <a href="https://github.com/tholman/inspiring-online#contributing" target="_blank">consider contributing!</a>
    </footer>`
  document.body.appendChild(element);
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

    var anchor = document.createElement('a');
    anchor.href = postData.link;
    anchor.target = "_blank"

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
    anchor.appendChild(img);
    element.appendChild(anchor);
  }

  var anchor2 = document.createElement('a');
  anchor2.href = postData.link;
  anchor2.target = "_blank"
  anchor2.className = "title-anchor";

  var title = document.createElement('h1');
  title.innerHTML = postData.title;

  anchor2.appendChild(title);
  element.appendChild(anchor2);

  var content = document.createElement('div');
  content.innerHTML = postData.content;
  element.appendChild(content);

  isotopeObject.insert(element);
}

init();


