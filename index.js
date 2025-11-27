const express = require("express")

const app = express();

app.use(express.json());

let users = [
    {id:1,name:"john"},
    {id:2,name:"Alice"}
];

