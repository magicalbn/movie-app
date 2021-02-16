const next = require('next')
const express = require('express')



const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;
const app = next({ dev });
const handler = app.getRequestHandler();

const movieRouter = require('./router/moviesRouter')

app.prepare().then(()=>{
    const server = express()

    server.use(express.json())

    server.use('/movie',movieRouter);



    server.get("*", (req, res) => {
        return handler(req, res)
    })

    server.listen(port, err => {
        if (err) throw err;
        console.log(`Listening on PORT ${port} => http://localhost:${port}`);
    });
})