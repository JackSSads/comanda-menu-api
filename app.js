const express = require("express");
const app = express();
require("dotenv").config();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: process.env.URL_FRONT } });

const cors = require("cors");

const connection = require("./db/connection");

const caixaRoutes = require("./routes/caixaRoutes");
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
    origin: [process.env.URL_FRONT],
    credentials: true,
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
}));

app.use("/caixa", caixaRoutes);
app.use("/login", loginRouter);
app.use("/usuario", userRouter);
app.use("/produto", produtoRoutes);
app.use("/comanda", comandaRoutes);

io.on("connection", (socket) => {
    console.log("Usuário conectado", socket.id);

    socket.on("disconnect", reason => {
        console.log("Usuário desconectado", socket.id);
    });

    socket.on("novo_pedido", (pedido) => {
        socket.data.pedido = pedido;

        io.emit("lista_novo_pedido", socket.data.pedido);
    });
});

connection
    .then(() => {
        server.listen(process.env.PORT);
        console.log("Estamos conectados com o Mongo");
    })
    .catch(() => console.log("Erro ao conectar ao DB"));