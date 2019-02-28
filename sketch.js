const p5 = require('p5')
const io = require('socket.io-client')

let sketch = function(p) {
  let x = 500;
  let y = 500;

  p.setup = function() {
    var socket = io('http://localhost:3000');
    socket.on('data', (data) => {
      const { AcX, AcY } = JSON.parse(data)
      console.log(AcX, AcY)

      x += - (parseInt(AcX) / 100);
      y += (parseInt(AcY) / 100);

      if (x < 0) x = 1000
      if (x > 1000) x = 0

      if (y < 0) y = 1000
      if (y > 1000) y = 0
    });

    p.createCanvas(1000, 1000);
  };

  p.draw = function() {
    p.background(0);
    p.fill(255);
    p.rect(x, y, 50, 50);
  };
};

let myp5 = new p5(sketch);

console.log(myp5)