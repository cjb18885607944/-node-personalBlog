const service =  require('../service/label.service')

const verifyLabelExists = async (ctx,next) => {
    // 1.去除所有标签
    const {labels} = ctx.request.body

    // 2.判断每个标签在label是否存在
    const newLabels = []
    for(let name of labels){
        const labelResult = await service.getLabelByName(name)
        let label = {name}
        if(!labelResult){
            // 不存在，创建标签
            const result = await service.create(name)
            label.id = result.insertId
        }else{
            label.id = labelResult.id
        }
        newLabels.push(label)
    }
    ctx.labels = newLabels
    
    await next()
}

module.exports = {
    verifyLabelExists
}