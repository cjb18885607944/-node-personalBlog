const connection = require('../app/database')

class FileService {
    async createAvatar(filename,mimetype,size,userId){
        const statement = `INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?)`
        const [result] = await connection.execute(statement,[filename,mimetype,size,userId])
        return result
    }
    async getAvatarByUserId(userId){
        const statament = `SELECT * FROM avatar WHERE user_id = ?`
        const [result] = await connection.execute(statament,[userId])
        return result[0]
    }

    async createFile(filename,mimetype,size,userId,momentId){
        const statement = `INSERT INTO file (filename,mimetype,size,user_id,moment_id) VALUES (?,?,?,?,?)`
        const [result] = await connection.execute(statement,[filename,mimetype,size,userId,momentId])
        return result
    }

    async getFileByFilename(filename){
        const statament = `SELECT * FROM file WHERE filename = ?`
        const [result] = await connection.execute(statament,[filename])
        return result[0]
    }
}

module.exports = new FileService()