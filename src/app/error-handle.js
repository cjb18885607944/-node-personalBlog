const errorTypes = require('../constants/error-types')

const errorHandler = (error,ctx) => {
    let status,message;
    switch (error.message){
        case errorTypes.NAME_OR_PWD_IS_REQUIRE:
            status = 400
            message = "用户名或密码不能为空"
            break;
        case errorTypes.USER_ALREADY_EXISTS:
            status = 409
            message = "用户名已存在"
            break;
        case errorTypes.USER_DOES_NOT_EXISTS:
            status = 400
            message = "用户名不存在"
            break;
        case errorTypes.PASSWORD_IS_INCORRENT:
            status = 403
            message = "密码错误"
            break;
        case errorTypes.UNAUTHORIZATION:
            status = 401
            message = "无效的token"
            break;
        case errorTypes.UNPERMISSION:
            status = 403
            message = "无权限！"
            break;
        default:
            status = 404
            message = "NOT FOUND"
    }
    
    console.log('err:',message);
    ctx.status = status
    ctx.body = message
}

module.exports = errorHandler