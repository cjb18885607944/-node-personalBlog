const Router = require('koa-router')

const momentRouter = new Router({prefix:'/moment'})

const {
    create,detail,list,update,remove,addLabels,fileInfo
} = require('../controller/moment.controller.js')
const {
    verifyAuth,
    verifyPermission
} = require('../middleware/auth.middleware')
const {
    verifyLabelExists
} = require('../middleware/label.middleware')
// 发表动态
momentRouter.post('/',verifyAuth,create)
// 查询多条动态
momentRouter.get('/',list)
// 根据id查询单条动态
momentRouter.get('/:momentId',detail)
// 修改动态接口(1.必须登录2.仅修改自己发表的)
momentRouter.patch('/:momentId',verifyAuth,verifyPermission,update)
momentRouter.delete('/:momentId',verifyAuth,verifyPermission,remove)
// 给动态添加标签
momentRouter.post('/:momentId/labels',verifyAuth,verifyPermission,verifyLabelExists,addLabels)
// 动态图片接口
momentRouter.get('/images/:filename',fileInfo)

module.exports = momentRouter