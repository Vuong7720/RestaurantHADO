const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const router = require('./router')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const app = express()
const port = 4000



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))
app.use(express.static(path.join(__dirname, '/public')))

// ------method overide
app.use(methodOverride('_method'))
// ----

//template engine
const engine = exphbs.create({
  extname: '.hbs',
  helpers: {
   sum:(a,b)=>a+b,
   eq:(v1, v2) => v1 === v2
  }
});
app.engine('.hbs', engine.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resource/views'));

// router init
router(app)


app.get('/', function (req, res) {
  res.render('home')
})

app.listen(port, () => {
  console.log(`server on http://localhost:${port}`)
})