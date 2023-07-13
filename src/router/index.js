
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
// var foodClient = require('./routerClient/foodsClient')
var slideClient = require('./routerClient/slidesClient')


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
    // app.use('/', foodClient)
    app.use('/', slideClient)
}

module.exports = router;