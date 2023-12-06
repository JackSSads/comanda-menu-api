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

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
}));

app.use("/login", loginRouter);
app.use("/usuario", userRouter);
app.use("/comanda", comandaRoutes);
app.use("/produto", produtoRoutes);

connection
    .then(() => {
        console.log("Conectado ao Mongo");
        app.listen(80)
    })
    .catch(() => console.log("Erro ao conectart ao Mongo"));