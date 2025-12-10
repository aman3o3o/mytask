const express = require("express");
const { dataroute } = require("./Routes/routes");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use("/api",dataroute);

app.use((req, res, next) => {
    return res.status(404).json({
        message: "Url not found"
    })
})

app.listen(process.env.PORT,()=>{
    console.log("app is listening at port 3000");
})



