const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
let maindata = JSON.parse(fs.readFileSync(path.join(__dirname, "../ProblemSet.json"), "utf8"));

let datainsert = (req, res) => {
    try {
        let data = req.body;
        if (data.text && data.topic && data.difficulty && data.estimated_time_to_solve_minutes) {
            data.id = uuidv4();
            maindata.push(data);
            fs.writeFileSync("../ProblemSet.json", JSON.stringify(maindata, null, 2));
            return res.status(200).json({
                success: true,
                message: "data insert successfully"
            })
        }
        else {
            return res.status(400).json({
                message: "please provide valid key details"
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "internal server error",
            err_name: err.name,
            err_mess: err.message
        })
    }
}

let datafetch = (req, res) => {
    try {
        return res.status(200).json({
            data: maindata
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "internal server error",
            err_name: err.name,
            err_mess: err.message
        })
    }
}

let datafetchone = (req, res) => {
    try {
        let id = req.params.id;
        let index = maindata.findIndex((data) => {
            return data.id === id;
        })
        if (index === -1) {
            return res.status(404).json({
                message: "id not found"
            })
        }
        return res.status(200).json({
            success: true,
            data: maindata[index],
            message: "data found successfully"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "internal server error",
            err_name: err.name,
            err_mess: err.message
        })
    }
}

let dataupdate = (req, res) => {
    try {
        let valid_key = Object.keys(req.body).every((key)=>{
            return ["text","topic","difficulty","estimated_time_to_solve_minutes"].includes(key);
        })
        if(!valid_key){
            return res.status(400).json({
                message:"please provide valid key details"
            })
        }
        let id = req.params.id;
        let index = maindata.findIndex((obj) => {
            return obj.id === id
        })
        if (index === -1) {
            return res.status(404).json({
                message: "id not found"
            })
        }
        maindata[index] = { ...maindata[index], ...req.body };
        fs.writeFileSync("../ProblemSet.json", JSON.stringify(maindata, null, 2));
        return res.status(200).json({
            success: true,
            message: "data updated successfully"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "internal server error",
            err_name: err.name,
            err_mess: err.message
        })
    }
}

let datadelete = (req, res) => {
    try {
        let id = req.params.id;
        let index = maindata.findIndex((data) => {
            return data.id === id
        })
        if (index === -1) {
            return res.status(404).json({
                message: "id not found"
            })
        }
        let new_maindata = maindata.filter((data) => {
            return data.id !== id
        })
        fs.writeFileSync("../ProblemSet.json", JSON.stringify(new_maindata))
        return res.status(200).json({
            success: true,
            message: "data deleted successfully"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "internal server error",
            err_name: err.name,
            err_mess: err.message
        })
    }
}

module.exports = { datainsert, datafetch, datafetchone, dataupdate, datadelete, maindata };