
var accountRouter = require('./routerAdmin/accountRouter');
var foodsRouter = require('./routerAdmin/foodsRouter');
var staffsRouter = require('./routerAdmin/staffRouter');
var slideRouter = require('./routerAdmin/slideRouter');



// ----------------------------
// var foodClient = require('./routerClient/foodsClient')
var slideClient = require('./routerClient/slidesClient')


function router(app){
    app.use('/admin/account', accountRouter)
    app.use('/admin/foods', foodsRouter)
    app.use('/admin/staffs', staffsRouter)
    app.use('/admin/slides', slideRouter)


    // ------------------
    // app.use('/', foodClient)
    app.use('/', slideClient)
}

module.exports = router;