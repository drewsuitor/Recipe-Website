/*
    Developed by Drew Suitor and YanPeng Gao
*/

const express = require('express') //express framework
const requestModule = require('request') //npm module for easy http requests
const PORT = process.env.PORT || 3000


const F2F_API_KEY = '07c27bbcabd21527d7e92e1625c14279'

const app = express()

//Middleware
app.use(express.static(__dirname + '/public')) //static server

//Routes
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get('/recipes', (request, response) => {
  let ingredients = request.query.ingredients
  if(!ingredients) {
    return response.json({message: 'Please enter an ingredients'})
  }
  const url = `http://food2fork.com/api/search?q=${ingredients}&key=${F2F_API_KEY}`
  requestModule.get(url, (err, res, data) => {
    return response.contentType('application/json').json(JSON.parse(data))

  })
})

//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT}`)
  }
})
