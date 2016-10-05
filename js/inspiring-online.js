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
  if (postData.title.replace(/\s+/g, '-').replace(/[^a-z0-9+][^\w.-]/gi, '').toLowerCase() != window.location.pathname.replace(/\//g, '').toLowerCase()) {
    var element = document.createElement('div');
    element.className = 'tile';

    if( postData.image !== "" ) {

      var anchor = document.createElement('a');
      anchor.href = postData.link + '?ref=inspiring-online';
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
      var newWidth = imageWidthInTile;
      var newHeight = height * ratio;

      img.width = (newWidth);
      img.height = (newHeight);
      img.src = (src + postData.image);
      anchor.appendChild(img);
      element.appendChild(anchor);
    }

    var anchor2 = document.createElement('a');
    anchor2.href = postData.link + '?ref=inspiring-online';
    anchor2.target = "_blank"
    anchor2.className = "title-anchor";

    var title = document.createElement('h1');
    title.innerHTML = postData.title;
    if (postData.siteDown == "true") {
      element.className = 'tile site-down';
    }

    anchor2.appendChild(title);
    element.appendChild(anchor2);

    var content = document.createElement('div');
    content.innerHTML = postData.content;
    element.appendChild(content);

    var postUrl = '/' + postData.title.replace(/\s+/g, '-').replace(/[^a-z0-9+][^\w.-]/gi, '').toLowerCase() + '/'
    var anchor3 = document.createElement('a');
    anchor3.href = postUrl;
    anchor3.className = "maximize-post";
    anchor3.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 150 150" style="enable-background:new 0 0 150 150;" xml:space="preserve"><g><path d="M7,54.3l15.2-15l23.3,23.5c1.2,1.2,3.1,1.2,4.2,0l13.4-13.4c1.2-1.2,1.2-3.1,0-4.3L39.2,22.4L53.7,8.2   c1.7-1.6,0.5-4.5-1.8-4.5H5.8C4,3.7,2.5,5.2,2.5,7v45.5C2.5,54.8,5.3,55.9,7,54.3z"></path><path d="M144.2,3.7H98.1c-2.3,0-3.5,2.8-1.8,4.5l14.5,14.3l-24,23c-1.2,1.2-1.2,3.1,0,4.3L100,63.1   c1.2,1.2,3.1,1.2,4.2,0l23.6-23.8l15.2,15c1.7,1.6,4.5,0.5,4.5-1.9V7C147.5,5.2,146,3.7,144.2,3.7z"></path><path d="M50.1,85.8c-1.2-1.2-3.1-1.2-4.2,0l-23.7,23.9L7,94.7c-1.7-1.6-4.5-0.5-4.5,1.9V142c0,1.8,1.5,3.3,3.3,3.3   h46.1c2.3,0,3.5-2.8,1.8-4.5l-14.5-14.3l24.1-23.1c1.2-1.2,1.2-3.1,0-4.3L50.1,85.8z"></path><path d="M143,95.7l-15.2,15l-24.4-24.6c-1.2-1.2-3.1-1.2-4.2,0L85.8,99.5c-1.2,1.2-1.2,3.1,0,4.3l24.9,23.8l-14.5,14.3   c-1.7,1.6-0.5,4.5,1.8,4.5h46.1c1.8,0,3.3-1.5,3.3-3.3V97.6C147.5,95.2,144.7,94.1,143,95.7z"></path><path d="M97.9,71.9L77.1,51c-1.3-1.3-3.3-1.3-4.6,0L51.6,71.9c-1.3,1.3-1.3,3.3,0,4.6l20.9,20.9c1.3,1.3,3.3,1.3,4.6,0   l20.9-20.9C99.2,75.2,99.2,73.1,97.9,71.9z"></path></g></svg>`

    element.appendChild(anchor3);

    isotopeObject.insert(element);
  }
}

init();
