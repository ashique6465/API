const express = require("express")

const app = express();

app.use(express.json());

let users = [
    {id:1,name:"john"},
    {id:2,name:"Alice"}
];
app.get("/", (req, res) => {
    res.send("API is running! Go to /users");
});

app.get("/users",(req,res)=>{
    res.json(users)
})

app.post('/users',(req,res)=>{
    const newUser = {
        id:users.length + 1 ,
        name : req.body.name
    };
    users.push(newUser);
    res.json({message: 'User creatd',user:newUser})

})

app.put('/users/:id',(req,res)=>{
    const id = req.params.id;
    let user = users.find(u => u.id == id);
    if(!user) return res.json({message:"user not found"})
        user.name = req.body.name
    res.json({message:"User updated",user})
})  

app.delete('/users/:id',(req,res)=>{
    const id  = parseInt(req.params.id);
    users = users.filter(u => u.id != id);
    res.json({message:"user deleted"});
})


app.listen(3000,"0.0.0.0",() =>{
    console.log("API running")
})