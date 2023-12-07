const express = require("express");
const app = express();
require("dotenv").config();
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
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
}));

app.use("/login", loginRouter);
app.use("/usuario", userRouter);
app.use("/comanda", comandaRoutes);
app.use("/produto", produtoRoutes);

connection
    .then(() => {
        app.listen(process.env.PORT);
        console.log("Estamos conectados com o Mongo");
    })
    .catch(() => console.log("Erro ao conectar ao DB"));