(function() {

  console.log("Checking out the code? You can find this project on GitHub too! https://github.com/tholman/inspiring-online")

  const categories = ['code']

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

    } else {
      context.fillStyle = '#f1f1f1'
      drawTriangle(i)
    }
  }
})()
