const express = require('express')
const app = express()
const basicAuth = require('express-basic-auth');
const port = 8080
const songs = ['New York, New York' , 'Aint She Sweet', 'Adeste Fideles', 'Air For English Horn', 'All of You', 'All of Me', 'All My Tomorrows', 'All Alone', 'Always', 'Any Time at All', 
'April Played the Fiddle', 'Ave Maria', 'Barbara', 'The Bells of Christmas', 'The Best of Everything', 'Bim Bam Baby', 'The Birth of the Blues', 'Black', 'Blue', 'Blue Hawaii'
]
app.get('/', (req, res) => {
res.send(songs[Math.floor(Math.random() * songs.length)]);
})
app.get('/birth_date', function (req, res) {
  res.send('December 12, 1915');
});
app.get('/birth_city', function(req, res){
  res.send('Hoboken, New Jersey');
});
app.get('/wives', function(req, res){
  res.send("Nancy Barbato, Ava Gardner, Mia Farrow, Barbara Marx");
})
app.get('/picture', function(req, res){
  res.redirect('https://upload.wikimedia.org/wikipedia/commons/a/af/Frank_Sinatra_%2757.jpg'); // редирект отправляет фотографии 
})
app.get('/public', (req, res) => {
  res.send('Everybody can see this page');
})

app.get('/protected', (req, res, next) => {
  var authheader=req.headers.authorization;
  if(!authheader){
      var err=new Error("401 Not authorized")
      res.setHeader("WWW-Authenticate",'Basic')
      err.status=401
      return next(err)
  }

  var auth = new Buffer.from(authheader.split(' ')[1],
  'base64').toString().split(':');
  var user = auth[0];
  var pass = auth[1];

  // Checking the details
  if (user == 'admin' && pass == 'admin') {
    res.send("Welcome, authenticated client")
  } else {
      var err = new Error('401 Not authorized');
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
  }
})

  app.listen(port, () => {
      console.log('listen');
})