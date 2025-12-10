const {v4:uuidv4} = require("uuid");

let planner = (studentprofile,assessmentRequest,dbtopic) => {

    let mastered_topics = studentprofile.mastered_topics || [];
    let learning_goals = studentprofile.learning_goals || [];
    let strategy = assessmentRequest.pedagogical_strategy;
    let maxTime = assessmentRequest.max_total_time_minutes;

    mastered_topics = mastered_topics.filter((data)=>{
        return dbtopic.includes(data);
    })

    learning_goals = learning_goals.filter((data)=>{
        return dbtopic.includes(data);
    })

    if(mastered_topics.length===0 && learning_goals===0){
        return "please provide valid topic"
    }

    if(!['REVIEW','CHALLENGE','NEW_TOPIC_INTRODUCTION'].includes(strategy)){
        return "please provide valid strategy"
    }

    let topics_to_cover = []
    let difficulty = []
    if(strategy==="REVIEW"){
        topics_to_cover = [...mastered_topics,...learning_goals];
        difficulty = [2,3]
    }
    else if(strategy==="NEW_TOPIC_INTRODUCTION"){
        if(learning_goals.length===0){
            return "Learning goal is empty"
        }
        topics_to_cover = [...learning_goals];
        difficulty = [1,2]
    }
    else if(strategy==="CHALLENGE"){
        topics_to_cover = [...mastered_topics,...learning_goals];
        difficulty = [3,5]
    }
    let avg_time_per_ques = 4;
    let total_question_count = Math.max(1,Math.round(maxTime/avg_time_per_ques));
    let assessment_id = uuidv4();
    return {
        assessment_id,topics_to_cover,difficulty,total_question_count,maxTime
    }
}

module.exports = planner;