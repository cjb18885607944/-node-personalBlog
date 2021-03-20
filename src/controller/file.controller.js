const { AVATAR_PATH } = require('../constants/file-path')
const fileService = require('../service/file.service')
const userService = require('../service/user.service')
const {APP_HOST,APP_PORT} = require('../app/config')
class FileController{
    async saveAvatarInfo(ctx,next){
        // 获取图像相关信息
        const {filename,mimetype,size} = ctx.req.file 
        const {id} = ctx.user
        // 将信息保存数据库中
        const result = await fileService.createAvatar(filename,mimetype,size,id)
        console.log('保存成功',result);

        // 将图片地址保存到user表中
        const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
        await userService.updateAvatarUrlById(avatarUrl,id)
        console.log('上传成功');
        ctx.body = {
            code:200,
            message:'上传成功！'
        }
    }
    async savePictureInfo(ctx,next){
        // 获取图像相关信息
        const files = ctx.req.files
        const {id} = ctx.user
        const {momentId} = ctx.query
        // 将信息保存数据库中
        for(let file of files){
            console.log('file',file);
            const {filename,mimetype,size} = file 
            await fileService.createFile(filename,mimetype,size,id,momentId)
            console.log('插入数据库--',filename,mimetype,size,id,momentId);
        }
        ctx.body = '动态图片上传完成~'
    }
}

module.exports = new FileController()