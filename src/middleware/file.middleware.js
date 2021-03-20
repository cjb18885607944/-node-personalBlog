const path = require('path')
const Multer = require('koa-multer')
const Jimp = require('jimp')
const {AVATAR_PATH,PICTURE_PATH} = require('../constants/file-path')
// 头像
const avatarUpload = Multer({
    dest: AVATAR_PATH
})
const avatarHandler = avatarUpload.single('avatar')
// 图片
const pictureUpload = Multer({
    dest: PICTURE_PATH
})
const pictureHandler = pictureUpload.array('picture',9)
// 图片resize
const pictureResize = async (ctx,next) => {
    const files = ctx.req.files
    // 处理图片(jimp)
    for(let file of files){
        const destPath = path.join(file.destination,file.filename)
        try {
            Jimp.read(file.path).then(image => {
                console.log('resize');
                image.resize(1280,Jimp.AUTO).write(`${destPath}-large`)
                image.resize(640,Jimp.AUTO).write(`${destPath}-middle`)
                image.resize(320,Jimp.AUTO).write(`${destPath}-small`)
            })
        } catch (error) {
            console.log('----',error);
        }
    }
    await next()
}

module.exports = {
    avatarHandler,
    pictureHandler,
    pictureResize
}