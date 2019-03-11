const SerialPort = require('serialport');

const port = new SerialPort('/dev/cu.usbserial-14320', {
  baudRate: 115200
});

const app = require('http').createServer(() => {})
const io = require('socket.io')(app);

let connections = []

app.listen(3000);

io.on('connection', function (socket) {
  connections.push(socket)
  console.log('connection via socket io');
});

port.on("open", function () {
  console.log('port connection open')
  port.on('data', function(data) {
    const dataString = data.toString('utf8')
    const dataArr = dataString.split(' ')

    const dataObj = {
      AcX: dataArr[0],
      AcY: dataArr[1],
      AcZ: dataArr[2],
      Tmp: dataArr[3],
    }
    console.log(dataObj)
    if (connections.length > 0) {
      connections.forEach(socket => socket.emit('data', JSON.stringify(dataObj)))
    }
  });
});
