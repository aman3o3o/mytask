const express = require("express");
const { datainsert, datafetch, dataupdate, datadelete, datafetchone} = require("../Controller/controller");
datainsert

let dataroute = express.Router();

dataroute.post("/insert",datainsert);
dataroute.get("/fetch",datafetch);
dataroute.get("/fetchone/:id",datafetchone);
dataroute.put("/update/:id",dataupdate);
dataroute.delete("/delete/:id",datadelete);

let assessmentroute = express.Router();

assessmentroute.post("/assessments/generate",generateQues);

module.exports={dataroute};