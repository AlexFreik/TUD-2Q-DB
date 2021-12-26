const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const http = require('http')
const websocket = require('ws')

const indexRouter = require('./routes/index')

function createApp(port) {
    const app = express()

    app.set('port', port)

    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, 'public')))

    app.use('/', indexRouter)

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404))
    })

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message
        res.locals.error = req.app.get('env') === 'development' ? err : {}

        // render the error page
        res.status(err.status || 500)
        res.render('error')
    })

    return app
}

function createWebsocketServer(httpServer) {
    const wss = new websocket.Server({ server: httpServer })
    wss.on('connection', function (ws) {
        ws.on('message', function (message) {})
    })
}

function createServer(port) {
    const app = createApp(port)
    const server = http.createServer(app)
    createWebsocketServer(server)

    return server
}

module.exports = createServer