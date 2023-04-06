const express = require("express"); // express modülünü oluşturuyoruz.
const todo = require("./src/models/todoModel");
const app = express(); // uygulamayı oluşturuyoruz.
require("dotenv").config();  //.env dosyasını projeye dahil ediyoruz.
require("./src/config/dbConnection");
const port = process.env.PORT || 5001;  // process.env.PORT yok ise 5001'den çalışması sağlanıyor.
const todoRouter = require("./src/router/todoRouter");

//body'den gelen değişkenleri okuyabilmek için
app.use(express.json());

app.use("/api", todoRouter);
 
app.get("/", (req, res) => {
    res.send("Hoşgeldiniz");
});

//sunucu başlatılıyor.
app.listen(port, () => {
    console.log(`Server ${port} portundan başlatıldı.`);
});