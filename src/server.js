const express = require('express')
const server = express()
const routes = require('./routes')
const path = require('path')

//usando template engine
server.set('view engine', 'ejs')

// Mudar a localização da pasta views
server.set('views', path.join(__dirname, 'views'))

//habilitar arquivos statics
server.use(express.static('public'))

//usar o re.body
server.use(express.urlencoded({ extended: true }))

//routes
server.use(routes)

const PORT = process.env.PORT || 3000

server.listen(PORT, function () {
  console.log('Server listening at', PORT)
})

require('dotenv/config')

// ...
