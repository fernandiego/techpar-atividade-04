const cfg = require("./knexfile")
let env = process.env.NODE_ENV || "development" // failsafe
const knex = require("knex")(cfg[env])
exports.knex = knex
exports.env = env
const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const app = express()
app.use(express.static("public"))

app.use(morgan("dev"))

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.get("/hello", (req, res) => {
  console.log("hello, dear developer")
  res.send("Hello, world!")
})

app.post("/save", (req, res) => {
  const pessoa = req.body
  console.log(pessoa)
  knex("pessoa").insert(pessoa, "idpessoa").then(ret => {
      res.send(ret)
  }).catch(err => {
    res.status(500).send(err)
    console.log(err)
  })
})

app.get("/list", (req, res) => {
  knex("pessoa").select().then(ret => {
    res.send(ret)
  }).catch(err => {
    res.status(500).send(err)
    console.log(err)
  })
})

knex.migrate.latest().then(_ =>
  app.listen(3000, _ =>
console.log("Let's go!")))
