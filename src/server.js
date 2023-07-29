const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const router = require('./router')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const methodOverride = require('method-override')
const app = express()
const port = 4000




app.use(cookieParser())

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
   eq:(v1, v2) => v1 === v2,
   arrPage:(v1, v2) => {
    for (let i = 0; i < v1; i++) {
      v2.push(i + 1);
    }
   },
   pagi:(b1, b2)=> Math.ceil(b1/b2),
   range:(start, end, options)=>{
    let result = '';
  for (let i = start; i <= end; i++) {
    result += options.fn(i);
  }
  return result;
   }
  }
});
app.engine('.hbs', engine.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resource/views'));

// router init
router(app)


app.get('/', function (req, res) {
  res.render('clients/show')
})

app.listen(port, () => {
  console.log(`server on http://localhost:${port}`)
})