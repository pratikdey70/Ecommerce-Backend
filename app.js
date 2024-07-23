
const path = require('path');
const express = require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const hbs = require('hbs')

// app.use(async (req,res,next)=>{
//     let user = await User.findOne({
//         _id: '662a7b3784ed0d995e117b7b'
//     });
//     req.user = user;
//     next();
// })

const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config()

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/' })
}))


const passport = require('./Authentication/passport');
app.use(passport.initialize());
app.use(passport.session());

// setting up the partials of hbs
hbs.registerPartials(__dirname + '/views/partials');


app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

const homeRouter = require('./routes/home')
app.use('/', homeRouter);
 
// Routes
// /admin, /admin/abc, /admin/abc/def, /admin/abc/../../
const adminRouter = require('./routes/admin');
const {isAdmin} = require('./middleware/isAdmin')
app.use('/admin', isAdmin ,adminRouter);

const shopRouter = require('./routes/shop');
const {isLoggedIn} = require('./middleware/isLoggedIn')
app.use('/shop', isLoggedIn, shopRouter);

mongoose.connect('mongodb://127.0.0.1:27017/ecommerce').then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:` + PORT);
    });
}).catch(err => {
    console.log(err)
})


