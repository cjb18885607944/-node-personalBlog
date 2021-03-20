const fileService = require('../service/file.service');
const momentService = require('../service/moment.service')
const fs = require('fs');
const { PICTURE_PATH } = require('../constants/file-path');

class momentController {
    async create(ctx,next){
        //1.获取数据（user_id，content）
        const userId = ctx.user.id
        const content = ctx.request.body.content
        console.log(userId,content);

        // 将数据插入到数据库
        const result = await momentService.create(userId,content);
        ctx.body = '发表成功~'
    }

    async detail(ctx,next) {
        // 1.获取moment的id
        const momentId = ctx.params.momentId
        console.log(`id为${momentId}`);
        // 2.查询数据
        const result = await momentService.getMomentById(momentId)
        
        console.log(`查询id为${momentId}的动态.${result}`);
        ctx.body = result
    }

    async list(ctx,next){
        // 获取offset和page
        const {offset,size} = ctx.query
        // 查询列表
        const result = await momentService.getMomentList(offset,size)
        ctx.body = result
    }

    async update(ctx,next){
        // 获取momentId
        const {momentId} = ctx.params
        const {content} = ctx.request.body
        const result = await momentService.updateMoment(content,momentId)
        ctx.body = result
    }

    async remove(ctx,next){
        // 获取momentId
        const {momentId} = ctx.params
        const result = await momentService.deleteMoment(momentId)
        ctx.body = result
    }

    async addLabels(ctx,next){
        // 获取标签和momentId
        const {momentId} = ctx.params
        const {labels} = ctx
        console.log(labels);
        // 给动态添加标签
        for(let label of labels){
            console.log(label); 
            const  isExist = await momentService.hasLabel(momentId,label.id)
            if(!isExist){
                // 不存在，添加
                await momentService.addLabel(momentId,label.id)
            }
        }
        // const result = await momentService
        ctx.body = '添加标签成功~'
    }

    async fileInfo(ctx,next){
        const {filename} = ctx.params
        const fileInfo = await fileService.getFileByFilename(filename)
        const {type} = ctx.query
        const types = ["small","middle","large"]
        if(types.some(item => item === type)){
            filename = filename + '-' + type
        }

        ctx.response.set('content-type',fileInfo.mimetype)
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
    }
}

module.exports = new momentController()