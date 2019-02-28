var SerialPort = require('serialport');

var port = new SerialPort('/dev/cu.usbserial-14210', {
  baudRate: 115200
});

var app = require('http').createServer(() => {})
var io = require('socket.io')(app);

app.listen(3000);

port.on("open", function () {
  io.on('connection', function (socket) {
    // Read the port data
    console.log('open');
    port.on('data', function(data) {
      socket.emit('data', data.toString('utf8'));
    });
  });
});