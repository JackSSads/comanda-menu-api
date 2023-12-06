const express = require("express");
const app = express();

const cors = require("cors");

const connection = require("./db/connection");

const comandaRoutes = require("./routes/comandaRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const userRouter = require("./routes/userRouter");
const loginRouter = require("./routes/loginRouter");

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
    next();
  });

app.use("/login", loginRouter);
app.use("/usuario", userRouter);
app.use("/comanda", comandaRoutes);
app.use("/produto", produtoRoutes);

connection
    .then(() => {
        console.log("Conectado ao Mongo");
        app.listen(3001)
    })
    .catch(() => console.log("Erro ao conectart ao Mongo"));