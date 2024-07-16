const express = require("express")
const app = express()
const mysql = require("mysql2")
const cors = require("cors")
const routes = require("./Route/routes")
const config = require("dotenv")
const { raw } = require("mysql")
config.config({ path: "../config/config.env" })
app.use(cors())
app.use(express.json())
app.use(routes)


app.use((req, res) => {
  let checkURL = req.url
  if(checkURL.includes("?"))
{
  return res.status(400).send({code:400})
}
else
{
  return res.status(404).send({ status: 404})//invalid api endpoint
}
})

app.use((req, res, next)=>
{
  let checkURL = req.path.replace("/", "")
  
    
if(checkURL !== "GetTaskByState" || checkURL !== "PromoteTaskToDone" || checkURL !== "CreateTasks")
{
  return res.status(404).send({code:404})
}
next()
})


app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001")
})
