const express = require("express");
const { dataroute, assessmentroute } = require("./Routes/routes");
require("dotenv").config();
const app = express();

app.use(express.json());

// CRUD ROUTES
app.use("/api",dataroute);

// ASSESSMENT ROUTES
app.use("/api",assessmentroute);

app.use((req, res, next) => {
    return res.status(404).json({
        message: "Url not found"
    })
})

app.listen(process.env.PORT,()=>{
    console.log(`app is listening at port ${process.env.PORT}`);
})



