const Router = require('koa-router')

const authRouter = new Router()

const {
    login
} = require('../controller/auth.controller')

const {
    verifyLogin,
    verifyAuth
} = require('../middleware/auth.middleware')

authRouter.post('/login',verifyLogin,login)
authRouter.get('/test',verifyAuth,(ctx,next) => {
    ctx.body = '验证成功'
})

module.exports = authRouter