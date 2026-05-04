import express from 'express';

const app = express();

app.get('/', (req, res)=> {
    res.send({
        message: 'Basic Api Done',
        success: true
    })
})

app.listen(3200)