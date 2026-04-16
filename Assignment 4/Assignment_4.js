import express from "express"
import fs from "fs/promises"
const readusers = async () => {
    return JSON.parse(await fs.readFile("./users.json", 'utf-8'));
}

const writeusers = async (data) => {
    await fs.writeFile("./users.json", JSON.stringify(data, null, 2));
}
const app = express();
app.use(express.json())

app.get('/user',async(req,res)=>{
    const users = await readusers()
    const user=users
    res.write(JSON.stringify(user))
    res.end()

});

app.get('/user/getByName',async(req,res)=>{
    const users = await readusers()
    const {id,name,age,email}=req.body
    const index=users.findIndex((element)=>{
      return  element.name==name
    })

    if(index==-1){
        res.write("user not found")
        res.end()
    }else{
    const user=users[index]
    res.write(JSON.stringify(user))
    res.end()
    }

});

app.get('/user/id',async(req,res)=>{
    const users = await readusers()
    const {id,name,age,email}=req.body
    const index=users.findIndex((element)=>{
      return  element.id==id
    })

    if(index==-1){
        res.write("id not found")
        res.end()
    }else{
    const user=users[index]
    res.write(JSON.stringify(user))
    res.end()
    }

});

app.get('/user/filter',async(req,res)=>{
    const users = await readusers()
    const {age}=req.body
    const index=users.filter((element)=>{
        return   age<=element.age
    })
    if (index.length === 0) return res.json({ message: 'no user found' });
    res.json(index)
    res.end()
    }
);

app.post('/user',async (req,res)=>{
    const users = await readusers()
    const {name ,age ,email} = req.body;
    const index=users.findIndex((element)=>{
      return  element.email==email
    })

    if (index!=-1){
        res.write("Email already exist")
        res.end()
    }else{
     const last_id = users.length > 0 ? users[users.length - 1].id : 0;
     const new_user={
        id:last_id+1,
        name,
        age:Number(age),
        email,
     }   
    users.push(new_user)
    writeusers(users)
    res.write("User added sucessfully")
    res.end()
    }
});


app.patch('/user/id',async (req,res)=>{
    const users = await readusers()
    const {id , name ,age ,email} = req.body;
    const index=users.findIndex((element)=>{
      return  element.id==id
    })

    const index_email=users.findIndex((element)=>{
      return  element.email==email
    })

    if (index == -1){
        res.write("id not found")
        res.end()
    }else{

     if (index_email!=-1){
        res.write("Email already exist")
        res.end()
    }else{
    if (name) users[index].name = name;
  if (age) users[index].age = age;
  if (email) users[index].email = email;  
    
  writeusers(users)
  
  if (name) res.write("User name updated successfully")
  if (age)  res.write("User age updated successfully")
  if (email)  res.write("User email updated successfully")

    res.end()
  }
    }

});


app.delete('/user/id',async(req,res)=>{
    const users = await readusers()
    const {id , name ,age ,email} = req.body;
    const index=users.findIndex((element)=>{
      return  element.id==id
    })

    if(index==-1){
        res.write("Id not found")
        res.end()
    }
    else{
        users.splice(index,1)
        writeusers(users)
        res.write("User deleted successfully")
        res.end()
    }
});

app.listen(3000,()=>{
    console.log("Server is Running");
})