const express = require("express");
const config = require("config");
const mongoose = require("mongoose")

const app = express();

app.use(express.json({ extended: true }));

const PORT = config.get('port') || 8080;

app.use("/api/auth",require("./routes/auth"));
app.use("/api/ideas", require("./routes/idea"));

async function start(){
    try{
        await mongoose.connect(config.get("mongo-uri"),{
 
        });
        app.listen(PORT,() => {
            console.log(`App has been started on port ${PORT}.`);
        }); 
    }
    catch (e){
        console.log("Server error:", e.message);
        process.exit(1);
    }

}

start();
