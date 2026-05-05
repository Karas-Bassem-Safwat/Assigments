import express from 'express'
import sql from 'mysql2/promise'
const app = express()
const connection =await sql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"",
    database:"small_store"
   });
connection.connect((err)=>{
    if(err){
        return console.log(`database server error : ${err}`);
    }
    return console.log("DB Connected successfully");
    
});
app.use(express.json())

app.post(async(req,res)=>{
    const {name}=req.query
    await connection.execute()
}

)
const port=3000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})