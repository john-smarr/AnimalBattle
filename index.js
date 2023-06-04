const express = require("express")
const path = require("path")

const app = express()

const {API_PORT} = process.env;
const port = process.env.port || API_PORT || 5000

app.use('/public' , express.static('public'));

//server listening
app.get('/',(req, res)=> {
    res.sendFile(path.resolve(__dirname, './pages/homepage.html'))
})

app.get('/about',(req, res)=>{
    res.send("Created and maintained by John Smarr. This project was made using Node.js and Express as well as HTML, CSS, and Javascript. ")
})

app.all('*', (req, res)=> {
    res.status(404).send('resource not found')
})

app.listen(5000, ()=>{
    console.log("listening on 5000....")
})