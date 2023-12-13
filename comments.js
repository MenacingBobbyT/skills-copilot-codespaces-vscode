// create web server
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const port = 3000
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// create route
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/comments', (req, res) => {
  fs.readFile('./db/comments.json', 'utf8', (err, data) => {
    if (err) {
      return console.log('讀取失敗', err)
    }
    res.send(data)
  })
})
app.post('/comments', (req, res) => {
  fs.readFile('./db/comments.json', 'utf8', (err, data) => {
    if (err) {
      return console.log('讀取失敗', err)
    }
    const comments = JSON.parse(data)
    const comment = req.body
    comment.id = comments.length ? comments[comments.length - 1].id + 1 : 1
    comments.push(comment)
    fs.writeFile('./db/comments.json', JSON.stringify(comments), (err) => {
      if (err) {
        return console.log('寫入失敗', err)
      }
      res.send(comment)
    })
  })
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
