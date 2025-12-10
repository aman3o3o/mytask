let {maindata} = require("./crud");
let planner = require("../component/planner");
let executor = require("../component/executor");

let db_topics = maindata.map((data)=>{
    return data.topic
})

let generateQues = (req,res) => {
    try{
        let {studentprofile} = req.body;
        let {assessmentRequest} = req.body;

        let assessmentPlan = planner(studentprofile,assessmentRequest,db_topics);
        if(typeof assessmentPlan === "string"){
            return res.status(400).json({
                message:assessmentPlan
            })
        }
        let generatedAssessment = executor(assessmentPlan);
        return res.status(200).json({
            success:true,
            data : generatedAssessment
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            err_name : err.name,
            err_message:err.message
        })
    }
}

module.exports = generateQues;