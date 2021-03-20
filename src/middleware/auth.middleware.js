const service = require('../service/user.service')
const authService = require('../service/auth.service')
const errorTypes = require('../constants/error-types')
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')
const jwt = require('jsonwebtoken')

const verifyLogin = async (ctx,next) => {
    const {name,password} = ctx.request.body

    // 判断用户名或密码是否为空
    if(!name || !password){
        const error = new Error(errorTypes.NAME_OR_PWD_IS_REQUIRE)
        return ctx.app.emit('error',error,ctx)
    }
    
    // 用户是否存在
    const result = await service.getUserByName(name)
    const user = result[0]
    console.log(user);
    if(!user){
        const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
        return ctx.app.emit('error',error,ctx)
    }
    
    // 用户密码是否一致
    if(md5password(password) !== user.password){
        const error = new Error(errorTypes.PASSWORD_IS_INCORRENT)
        return ctx.app.emit('error',error,ctx)
    }

    ctx.user = user
    await next()
}

// 验证授权
const verifyAuth = async (ctx,next) => {
    console.log('验证token');
    // 获取token
    const authorization = ctx.headers.authorization
    if(!authorization){
        const error = new Error(errorTypes.UNAUTHORIZATION)
        return ctx.app.emit('error',error,ctx)
    }
    const token = authorization.replace('Bearer ','')
    // 验证token
    try{
        const result = jwt.verify(token,PUBLIC_KEY,{
            algorithms:["RS256"]
        })
        ctx.user = result
        await next()
    }catch (err){
        const error = new Error(errorTypes.UNAUTHORIZATION)
        ctx.app.emit('error',error,ctx)
    }
}
// 判断是否有权限（动态id是否是本人id）
const verifyPermission = async (ctx,next) => {
    console.log('验证操作权限');
    const [reourceKey] = Object.keys(ctx.params)
    const tableName = reourceKey.replace('Id','')
    const resourceId = ctx.params[reourceKey]
    const {id} = ctx.user
    const isPermission = await authService.checkPermission(tableName,resourceId,id)
    if(!isPermission){
        const error = new Error(errorTypes.UNPERMISSION)
        ctx.app.emit('error',error,ctx)
    }else{
        await next()
    }
}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}