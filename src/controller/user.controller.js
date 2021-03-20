const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const {AVATAR_PATH} = require('../constants/file-path')
const fs = require('fs')
class UserController {
    async create(ctx,next) {
        console.log('调用了注册接口（user）');
        // 获取传递的参数
        const user = ctx.request.body
        // console.log(ctx.request);
        // 查询数据
        const result = await userService.create(user)

        // 返回数据
        ctx.body = result
    }

    async avatarInfo(ctx,next){
        // 获取userId
        const {userId} = ctx.params
        const avatarInfo = await fileService.getAvatarByUserId(userId)

        ctx.response.set('content-type',avatarInfo.mimetype)
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
    }
}

module.exports = new UserController()