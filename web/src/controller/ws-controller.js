const { createErrorMessage } = require('./messages')
const handleLogin = require('../handler/login-handler')
const handleMove = require('../handler/move-handler')
const handleDisconnect = require('../handler/disconnect-handler')
const Connection = require('./connection')
const ApiError = require('../util/api-error')

const TYPE_LOGIN = 'login'
const TYPE_MOVE = 'move'
const TYPE_DISCONNECT = 'disconnect'

const handlers = {
    [TYPE_LOGIN]: handleLogin,
    [TYPE_MOVE]: handleMove,
    [TYPE_DISCONNECT]: handleDisconnect,
}

function handleConnection(ws) {
    ws.connection = new Connection((message) => sendMessage(ws, message))
    ws.on('message', function (message) {
        handleRawMessage(ws, message)
    })
    ws.on('close', function () {
        handleMessage(ws, { type: TYPE_DISCONNECT })
    })
}

function handleRawMessage(ws, rawMessage) {
    console.log('< ' + rawMessage)
    const message = tryParseJSON(rawMessage)
    if (message === undefined) sendError(ws, 'Malformed JSON')
    handleMessage(ws, message)
}

function handleMessage(ws, message) {
    try {
        const type = message.type
        handlers[type](ws.connection, message)
    } catch (e) {
        if (!(e instanceof ApiError)) throw e
        sendError(ws, e.message)
    }
}

function tryParseJSON(json) {
    try {
        return JSON.parse(json)
    } catch (e) {}
}

function sendError(ws, message) {
    sendMessage(ws, createErrorMessage('Error: ' + message))
}

function sendMessage(ws, message) {
    const rawMessage = JSON.stringify(message)
    console.log('> ' + rawMessage)
    ws.send(rawMessage)
}

module.exports = { handleConnection }