let {maindata} = require("./controller");
console.log(maindata);
let generateQues = (req,res) => {
    try{
        let {studentprofile} = req.body;
        let {assessmentRequest} = req.body;

        let assessmentPlan = planner(studentprofile,assessmentRequest);
    }
    catch(err){

    }
}