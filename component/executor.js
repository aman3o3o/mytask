let { maindata } = require("../controller/controller");
let executor = (plan) => {
    let topic = plan.topics_to_cover;
    let difficulty = plan.difficulty;
    let total_ques = plan.total_question_count;
    let maxTime = plan.maxTime;

    let data = maindata.filter((data) => {
        return topic.includes(data.topic);
    }).filter((data) => {
        return data.difficulty >= difficulty[0] && data.difficulty <= difficulty[1];
    })

    data = data.slice(0, total_ques);

    data = data.sort((a, b) => {
        return b.estimated_time_to_solve_minutes - a.estimated_time_to_solve_minutes
    })

    let total_time = data.reduce((acc, cur) => {
        return cur.estimated_time_to_solve_minutes + acc;
    }, 0)
    while (total_time > maxTime) {
        data.pop();
        total_time = data.reduce((acc, cur) => {
            return cur.estimated_time_to_solve_minutes + acc;
        }, 0)
    }

    return {
        plan,data,total_time
    }

}

module.exports = executor;