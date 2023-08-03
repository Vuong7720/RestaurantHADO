const CombinedModel = require('../../models/dataModel');
const jwt = require('jsonwebtoken')
const { mutipleMongooseToObject } = require('../../util/mongoose');
const SlideModel = require('../../models/slideModel');
const StaffModel = require('../../models/staffModel');
const AccountModel = require('../../models/accountModel');
const FoodsModel = require('../../models/foodsModel');
const NewsModel = require('../../models/newsModel');

class DataControllerClient {
    async createData(req, res, next) {
        try {
            await CombinedModel.deleteMany({});
            const accountData = await AccountModel.find({});
            const foodsData = await FoodsModel.find({});
            const newsData = await NewsModel.find({});
            const slideData = await SlideModel.find({});
            const staffData = await StaffModel.find({});

          const combinedData = new CombinedModel({
            slides: slideData,
            account: accountData,
            foods: foodsData,
            news: newsData,
            staffs: staffData
          });
    
          await combinedData.save();
          res.redirect('/');
        } catch (error) {
          console.error('Error saving data:', error);
          res.status(500).send('Error saving data');
        }
      }

      showData(req, res, next) {
        var token = req.cookies.token;
          var result = null;
          try {
            if (token) {
                result = jwt.verify(token, 'mk');
            }
        } catch (err) {
            console.error('Invalid token:', err.message);
        }
        
        CombinedModel.find({})
          .populate('slides')
          .populate('foods')
          .populate({
            path: 'account',
            match: { _id: result ? result._id : null },
        })
          .populate('news')
          .populate('staffs')
          .exec()
          .then(combined => {
            res.render('clients/show', {
              isLogin: result,
              combined: mutipleMongooseToObject(combined),
            });
          })
          .catch(err => {
            console.error(err);
            res.status(500).json('Error showing data in server');
          });
      }
}

module.exports = new DataControllerClient();
