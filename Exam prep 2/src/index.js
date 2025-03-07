import express from 'express'
import mongoose from 'mongoose'
import handlebars from 'express-handlebars'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'

import routes from './routes.js'
import { auth } from './middlewares/authMiddleware.js'
import { tempData } from './middlewares/tempDataMiddleware.js'

const app = express()

//DB setup
try {
    const uri = 'mongodb://localhost:27017/homeCooking'       //todo change db name
    await mongoose.connect(uri)

    console.log('DB connected!');

} catch (err) {
    console.error('Cannot connect to DB!')
    console.log(err.message);
}

//handlebars setup
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        // allowProtoMethodsByDefault: true
    },
    helpers:{
        setTitle(title){
            this.pageTitle = title
            return ''
        }
    }
}))
app.set('view engine','hbs')
app.set('views','./src/views')

//express setup
app.use(express.static('./src/public'))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(expressSession({
    secret: 'ASDGFSDFGSFFCVTHGT314645YWFADFASD31244DS',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, httpOnly: true}
}))
app.use(auth)
app.use(tempData)
app.use(routes)

app.listen(3000, ()=> console.log('Server is listening on http://localhost:3000 ...'))