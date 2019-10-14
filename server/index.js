require('dotenv').config()
const express = require('express')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const swagController = require('./controllers/swagController')
const authController = require('./controllers/authController')
const cartController = require('./controllers/cartController')
const searchController = require('./controllers/searchController')

const {SERVER_PORT, SESSION_SECRET} = process.env
const app = express()

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {}
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`));


//AUTH CONTROLLERS
// what is the read method. what does it do and how does it work/////////////////////////////////////////////////////////////////////////////////
app.get('/api/swag', swagController.read)
app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)

//CART CONTROLLERS
app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)

//SEARCH CONTROLLER
app.get(`/api/search/`, searchController.search)



port = SERVER_PORT
app.listen(port, () => console.log(`server is runnin on ${port} like a boss`))