const connectDB = require("./config/conexion");
const express = require("express");
const cors = require("cors");
var app = express();
connectDB();
app.use(express.json());
app.use(cors());

app.use("/api/login", require("./routes/login"));
app.use("/api/filmsSeries", require("./routes/filmsSeries"));
app.use("/api/users", require("./routes/users"));
app.use("/api/contacts", require("./routes/contact"));


/*if (process.env.NODE_ENV === "production") {
   app.use(express.static ("../frontend/build"));
   app.get("*", (req , res) => {
   res.sendFile(path.resolve(__dirname , "../frontend", "build", "index.html")
  );
   });
   }*/
  

app.listen(5000, function () {
  console.log("Servidor arrancado en el puerto 5000!");
});



