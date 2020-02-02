(function() {

  console.log("Checking out the code? You can find this project on GitHub too! https://github.com/tholman/inspiring-online")

  const categories = ['code', '#00abaf', 'games', '#faa000']

  const size = window.innerWidth
  const canvii = document.querySelectorAll('canvas')

  for( var i = 0; i < canvii.length; i++ ) {

    const canvas = canvii[i]
    const category = canvas.dataset.category
    const context = canvas.getContext('2d')

    canvas.width = size
    canvas.height = size

    function drawTriangle(iterator) {
      context.beginPath()

      if( iterator % 2 === 0 ) {
        context.moveTo(0, 0)
        context.lineTo(size/2, size/2)
        context.lineTo(0, size)
      } else {
        context.moveTo(size, 0)
        context.lineTo(size/2, size/2)
        context.lineTo(size, size)
      }

      context.fill()
    }

    if( categories.indexOf(category) !== -1 ) {

      const image = document.createElement('img');
      const j = i
      image.onload = () => {
        const fillPattern = context.createPattern(image, "repeat");
        context.fillStyle = fillPattern;
        drawTriangle(j)
      }

      image.src = `/assets/${category}.png`

      context.globalCompositeOperation = 'multiply';
      if( i % 2 === 0 ) {
        const fillGradient = context.createLinearGradient(0, 0, size/2, 0);
        fillGradient.addColorStop(0, categories[categories.indexOf(category) + 1]);
        fillGradient.addColorStop(0.75, "#fff");
        context.fillStyle = fillGradient;
      } else {
        const fillGradient = context.createLinearGradient(size/2, 0, size, 0);
        fillGradient.addColorStop(0.25, "#fff");
        fillGradient.addColorStop(1, categories[categories.indexOf(category) + 1]);
        context.fillStyle = fillGradient;
      }

      drawTriangle(i)

    } else {
      context.fillStyle = '#f1f1f1'
      drawTriangle(i)
    }
  }

  for( var t = 0; t < categories.length; t++ ) {
    if( t % 2 === 0 ) {
      const links = document.getElementsByClassName(categories[t])
      for( var r = 0; r < links.length; r++ ) {
        links[r].style.color = categories[t + 1]
        // The code below is in case the text overlaps too much with the triangle
        links[r].style.textShadow = "-1px 0 5px rgba(255,255,255,0.75), 0 1px 5px rgba(255,255,255,0.75), 1px 0 5px rgba(255,255,255,0.75), 0 -1px 5px rgba(255,255,255,0.75)"
      }
    }
  }
})()
