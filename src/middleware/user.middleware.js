const errorTypes = require('../constants/error-types')
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')
// 登录中间件
const verifyUser = async (ctx,next) => {
    // 1.获取用户名和密码
    const {name,password} = ctx.request.body

    // 2.判断用户名或密码不能为空
    if(!name || !password){
        const error = new Error(errorTypes.NAME_OR_PWD_IS_REQUIRE)
        return ctx.app.emit('error',error,ctx)
    }
    
    // 3.判断这次注册的用户名是否重复（已注册）
    const result = await service.getUserByName(name)
    if(result.length){
        const error = new Error(errorTypes.USER_ALREADY_EXISTS)
        return ctx.app.emit('error',error,ctx)
    }
    
    await next()
}

// 处理密码
const handlePassword = async (ctx,next) => {
    let {password} = ctx.request.body
    ctx.request.body.password = md5password(password)

    await next()
}

module.exports = {
    verifyUser,
    handlePassword
}