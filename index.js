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


app.listen(3000,"0.0.0.0",() =>{
    console.log("API running")
})