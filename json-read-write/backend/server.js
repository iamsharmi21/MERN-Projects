const express = require('express')
const app = express()
const fs = require('fs')

app.listen(8000, () => {
    console.log("Server is listening to 8000 in development environment")
})
app.use(express.json())

app.get('/api/v1/data', (req, res, next) => {
    const data = fs.readFileSync("data.json", "utf-8")
    console.log(data)
    res.json({
        success: true,
        message: "Api works",
        result: JSON.parse(data)
    })
})
app.post('/api/v1/create', (req, res, next) => {
    console.log(req.body)
    const data = fs.readFileSync("data.json", "utf-8")
    let read = JSON.parse(data)
    read.push(req.body)
    fs.writeFileSync("data.json", JSON.stringify(read))
    res.json({
        success: true,
        message: "Api workss"
    })
})

app.get('/api/v1/filter/:id', (req, res, next) => {
    const data = fs.readFileSync("data.json", "utf-8")
    const read = JSON.parse(data)
    const result = read.filter((e) => {
        if (e.name == req.params.id) {
            return e
        }
    })

    res.json({
        success: true,
        result
    })
})

app.delete('/api/v1/delete/:id', (req, res, next) => {
    const data = fs.readFileSync("data.json", "utf-8")
    const read = JSON.parse(data)
    const result = read.filter((e) => {
        if (e.name !== req.params.id) {
            return e
        }
    })
    const stringifyData = JSON.stringify(result)
    fs.writeFileSync("data.json", (stringifyData))
    res.json({
        success: true,
        result
    })

})

app.put('/api/v1/update/:id', (req, res, next) => {
    console.log(req.params)
    const reqId = req.params.id;
    const data = fs.readFileSync("data.json", "utf-8")
    const data1 = JSON.parse(data)
    const i = data1.findIndex((e, i) => {
        if (reqId === e.name) {
            return e
        }
    })
    console.log(i)
    console.log(data1[i])
    if (i >= 0) {
        data1[i] = req.body
        fs.writeFileSync("data.json", JSON.stringify(data1))
    }

    res.json({
        success: true
    })

})