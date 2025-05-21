const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const bodyParser = require('body-parser')
dotenv.config();
const app = express();
const port = process.env.PORT || 4000
app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

const todoRoutes = require('./routes/todoRoutes')

// app.get('/', (req, res) => {
//     res.send("hi")
// })

app.use('/api', todoRoutes)

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);

})