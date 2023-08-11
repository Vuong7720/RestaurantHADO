
var accountRouter = require('./routerAdmin/accountRouter');
var foodsRouter = require('./routerAdmin/foodsRouter');
var staffsRouter = require('./routerAdmin/staffRouter');
var slideRouter = require('./routerAdmin/slideRouter');
var newsRouter = require('./routerAdmin/newsRouter');

// ------router trashs
var trashAccountRouter = require('./routerTrash/accountRouter');
var trashFoodsRouter = require('./routerTrash/foodsRouter');
var trashStaffsRouter = require('./routerTrash/staffsRouter');
var trashNewsRouter = require('./routerTrash/newsRouter');
var trashSlidesRouter = require('./routerTrash/slideRouter');



// ----------------------------
var login = require('./routerClient/login')
var allData = require('./routerClient/appRouter')
var foodsClient = require('./routerClient/foodsClientRouter')
var detaiClient = require('./routerClient/detaiRouter')


function router(app){
    app.use('/admin/account', accountRouter)
    app.use('/admin/foods', foodsRouter)
    app.use('/admin/staffs', staffsRouter)
    app.use('/admin/slides', slideRouter)
    app.use('/admin/news', newsRouter)

    // -----------------------

    app.use('/trash/account', trashAccountRouter)
    app.use('/trash/foods', trashFoodsRouter)
    app.use('/trash/staffs', trashStaffsRouter)
    app.use('/trash/news', trashNewsRouter)
    app.use('/trash/slides', trashSlidesRouter)


    // ------------------
    app.use('/login', login)
    app.use('/', allData)
    app.use('/foods', foodsClient)
    app.use('/', detaiClient)
}

module.exports = router;