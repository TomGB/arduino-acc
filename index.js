const SerialPort = require('serialport');

const port = new SerialPort('/dev/cu.usbserial-14320', {
  baudRate: 115200
});

const app = require('http').createServer(() => {})
const io = require('socket.io')(app);

let connections = []

app.listen(3000);

io.on('connection', socket => {
  connections.push(socket)
  console.log('connection via socket io');
});

port.on("open", () => {
  console.log('port connection open')

  let current = ''

  port.on('data', data => {
    const dataString = data.toString('utf8')
    current += dataString
    if (!current.includes('*')) {
      return
    }

    const dataArr = current.split('*')[0].split(' ')

    const dataObj = {
      AcX: dataArr[0],
      AcY: dataArr[1],
      AcZ: dataArr[2],
      Tmp: dataArr[3],
      GyX: dataArr[4],
      GyY: dataArr[5],
      GyZ: dataArr[6],
    }

    console.log(dataObj)
    if (connections.length > 0) {
      connections.forEach(socket => socket.emit('data', JSON.stringify(dataObj)))
    }

    current = ''
  });
});
