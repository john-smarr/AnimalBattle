const http = require("http")

class Animal {
    constructor(name, pic) {
        this.name = name;
        this.pic = pic;
    }
    getName() {
        return this.name
    }
    getPic() {
        return this.pic
        if(typeof window === "object") {
            return document.getElementById(this.pic)
        } else {
            return `${this.name} pic is supposed to go here`
        }
    }
}

animal1 = new Animal("birdo","bear.jpg")
console.log(animal1.getPic())
const server = http.createServer((req,res)=>{
    var x = 0;
    setInterval(()=> {
        console.log(`hey this is x: ${x, x++}`)
    }, 1000)
    res.end(`<html> <h1> Hello there you chose: ${animal1.getName()}</h1> <img src="./img/bear.jpg"/> </html>`, 'utf-8')
})

const port = 5000
console.log(`Listening on: ${port}`)
server.listen(port)