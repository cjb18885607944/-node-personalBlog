const connection = require('../app/database')

class MomentService {
    async create(momentId,content,id){
        console.log('执行sql');
        const statement = `INSERT INTO comment (moment_id,content,user_id) VALUES (?,?,?)`
        const [result] = await connection.execute(statement,[momentId,content,id])
        return result
    }

    async reply(momentId,content,id,commentId){
        console.log('执行sql',momentId,content,id,commentId);
        const statement = `INSERT INTO comment (moment_id,content,user_id,comment_id) VALUES (?,?,?,?)`
        const [result] = await connection.execute(statement,[momentId,content,id,commentId])
        return result
    }
    async update(commentId,content){
        console.log('修改评论',commentId,content);
        const statement = `UPDATE comment SET content = ? WHERE id = ?`
        const [result] = await connection.execute(statement,[content,commentId])
        return result
    }
    async remove(commentId,content){
        console.log('删除评论',commentId);
        const statement = `DELETE FROM  comment  WHERE id = ?`
        const [result] = await connection.execute(statement,[commentId])
        return result
    }
    async getCommentByMomentId(momentId){
        console.log('根据momentId获取评论',momentId);
        const statement = `SELECT 
                                m.id,m.content,m.comment_id commentId,m.createAt createTime,
                                JSON_OBJECT('id',u.id,'name',u.name) user
                            FROM  comment m 
                            LEFT JOIN user u ON u.id = m.user_id
                            WHERE moment_id = ?`
        const [result] = await connection.execute(statement,[momentId])
        return result
    }
}

module.exports = new MomentService()