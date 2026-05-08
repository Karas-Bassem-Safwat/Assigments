import {Sequelize} from 'sequelize'

export const sequelize = new Sequelize('blog_app','root','',{
    host:'localhost',
    dialect:'mysql'
})

export const test_connection =async ()=>{
    try {
        await sequelize.authenticate()
        console.log("DB connnected successfully");
    } catch (error) {
        console.log(`DB connection error : ${error}`);
    }
} 