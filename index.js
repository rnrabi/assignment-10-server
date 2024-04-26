const express = require('express');
const app = express()
const port = process.env.PORT || 5000;










app.get('/' , (req ,res)=>{
    res.send('assaignment 10 server is opening')
})
app.listen(port , ()=>{
    console.log('post is running in' , port)
})