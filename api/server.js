const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan');
const userRouter = require('./routers/userRouter')
const productsRouter = require('./routers/productsRouter')
const auth = require('./auth/Auth')

app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json(express.urlencoded({ extended: true })));
app.use((req, res, next) => {
    res.set('x-powered-by', 'zyga')
    next()
})

app.use(auth)
app.use('/api/users', userRouter)
app.use('/api/products', productsRouter)



app.listen('9000', () => {
    console.log('[Listening] Listening on port 9000');
    console.log('Dev url: 127.0.0.1:9000');
});
