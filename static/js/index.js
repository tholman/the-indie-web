(function() {

  console.log("Checking out the code? You can find this project on GitHub too! https://github.com/tholman/inspiring-online")

  const categories = ['art', '#fa0faf',
                      'code', '#00abaf',
                      'games', '#faa000',
                      'sounds', '#6102f1',
                      'resource', '#aa150a',
                      'aesthetic', '#fa90af',
                      'typography', '#178fff',
                      'take-my-money', '#119f55',
                      'amazing-people', '#00ea5f']

  var oldWidth = 0
  const canvii = document.querySelectorAll('canvas')

  function drawCanvii() {
    const dpr = window.devicePixelRatio;
    const size = window.innerWidth * dpr

    if( size !== oldWidth ) {
      for( var i = 0; i < canvii.length; i++ ) {

        const canvas = canvii[i]
        const category = canvas.dataset.category
        const context = canvas.getContext('2d')
        const isLeft = i % 2 === 0

        if( categories.indexOf(category) !== -1 ) {
          var color = categories[categories.indexOf(category) + 1]
        } else {
          var color = "#888"
        }

        canvas.width = size
        canvas.height = size

        function draw() {
          context.fillRect(0, 0, size, size)
        }

        function clearTriangle(iterator) {
          context.beginPath()

          context.strokeStyle = '#f1f1f1'

          if( isLeft ) {
            context.moveTo(0, 0)
            context.lineTo(size/2, size/2)
            context.lineTo(0, size)
            context.stroke();
          } else {
            context.moveTo(size, 0)
            context.lineTo(size/2, size/2)
            context.lineTo(size, size)
            context.stroke();
          }
          context.globalCompositeOperation = 'destination-in'
          context.fillStyle = "#fff"
          context.fill()
          context.globalCompositeOperation = 'source-over'
        }

        context.clearRect(0, 0, canvas.width, canvas.height)

        if( size > 1300 ) {
          if( isLeft ) {
            const fillGradient = context.createLinearGradient(0, 0, size/2, 0);
            fillGradient.addColorStop(0, color);
            fillGradient.addColorStop(0.8, "#fff");
            context.fillStyle = fillGradient;
          } else {
            const fillGradient = context.createLinearGradient(size/1.8, 0, size, 0);
            fillGradient.addColorStop(0, "#fff");
            fillGradient.addColorStop(0.8, color);
            context.fillStyle = fillGradient;
          }
        } else {
          context.globalAlpha = .1
          context.fillStyle = color
        }
        draw()

        const miniCanvas = document.createElement('canvas');
        const miniContext = miniCanvas.getContext('2d');

        miniCanvas.width = size
        miniCanvas.height = size

        miniContext.lineJoin = 'round';

        var line,
            odd = false,
            lines = [],
            gap = size / 16;


        for( var y = gap / 2; y <= size; y += gap ) {
          odd = !odd;
          line = [];

          for( var x =  -2 * gap; x <= size + gap * 2; x += gap ) {
            line.push({
              x: x + (Math.random()*.8 - .5) * gap + (odd ? gap/2 : 0),
              y: y + (Math.random()*.8 - .5) * gap
            });
          }
          lines.push(line);
        }

        function drawTriangle(pointA, pointB, pointC) {
          miniContext.beginPath();
          miniContext.moveTo(pointA.x, pointA.y);
          miniContext.lineTo(pointB.x, pointB.y);
          miniContext.lineTo(pointC.x, pointC.y);
          miniContext.lineTo(pointA.x, pointA.y);
          miniContext.closePath();
          

          let centerX = (pointA.x + pointB.x + pointC.x) / 3;
          const centerY = (pointA.y + pointB.y + pointC.y) / 3;
          if( centerX < 0 ) {
            centerX = 0
          } else if (centerX > size) {
            centerX = size -1
          }

          var p = context.getImageData(centerX, centerY, 1, 1).data; 

          if( size > 1300 ) {
            miniContext.strokeStyle = '#f1f1f1'
            miniContext.fillStyle = "rgb("+p[0]+","+p[1]+","+p[2]+")"
          } else {
            miniContext.strokeStyle = '#fff'
            miniContext.fillStyle = "rgba("+p[0]+","+p[1]+","+p[2]+", 0.05)"
          }
          miniContext.stroke();
          miniContext.fill();
        }

        var dotLine;
        odd = true;

        for( var y = 0; y < lines.length - 1; y++ ) {
          odd = !odd;
          dotLine = [];
          for( var x = 0; x < lines[y].length; x++ ) {
            dotLine.push(odd ? lines[y][x]   : lines[y+1][x]);
            dotLine.push(odd ? lines[y+1][x] : lines[y][x]);
          }
          for( var z = 0; z < dotLine.length - 2; z++ ) {
            drawTriangle(dotLine[z], dotLine[z+1], dotLine[z+2]);
          }
        }

        const fillPattern = context.createPattern(miniCanvas, "no-repeat");
        context.fillStyle = fillPattern;
        
        context.globalAlpha = 1
        draw();
        clearTriangle(i);
      }
      oldWidth = size
    }
  }

  drawCanvii()

  var resizeId // This ensures new canvii aren't drawn until resizing ends
  window.addEventListener('resize', function() {
    clearTimeout(resizeId)
    resizeId = setTimeout(drawCanvii, 100)
  })

  for( var t = 0; t < categories.length; t++ ) {
    if( t % 2 === 0 ) {
      const links = document.getElementsByClassName(categories[t])
      for( var r = 0; r < links.length; r++ ) {
        links[r].style.color = categories[t + 1]
      }
    }
  }
})()