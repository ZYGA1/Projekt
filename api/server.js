const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan');
const userRouter = require('./routers/userRouter')
const productsRouter = require('./routers/productsRouter')

app.use(morgan('dev'));
app.use(cors())
app.use(express.json(express.urlencoded({ extended: true })));


app.use('/api/users', userRouter)
app.use('/api/products', productsRouter)



app.listen('9000', () => {
    console.log('[Listening] Listening on port 9000');
    console.log('Dev url: 127.0.0.1:9000');
});
