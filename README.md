# Adaptive Learning Orchestrator - 

Implemented a small version of an Adaptive Learning System which generates a personalized assessment for a student based on their profile and the type of assessment they want (Review, New Topic, or Challenge).

## Architectural Design - 

- Controller Layer -> Handles API requests.
                      Validates input.
                      Calls the Planner and Executor in sequence.
                      Returns the final JSON response.

- Route Layer -> All API endpoints are defined here.
                 This keeps the API urls separate from business logic.
                 Updating or adding new API routes becomes easier.

- Planner -> Receives the list of valid topics from the controller.
             Decides what kind of questions should be asked.
             Takes student_profile + assessment_request.
             Produces a structured AssessmentPlan.
             This plan includes topics, difficulty range, time limits, and estimated question count.

- Executor -> Takes the AssessmentPlan and interacts with the problem database.
              Picks the questions that match the plan.
              It makes sure that the final selected questions fit inside the time limit.
              Returns the final set of questions

## Assessment Plan structure - 

- input structure -> {
                       "studentProfile" : {
                             "id":"abcd",
                             "mastered_topics":["Algebra","Geometry"],
                             "learning_goals":["Calculus","Arithmetic"]
                         },
                        "assessmentRequest":{
                             "max_total_time_minutes":20,
                             "pedagogical_strategy":"REVIEW"
                         }
}

- output Structure ->  {
                    assessment_id : "17e3a16e-afcb-4f43-8fd4-aab1982b0a50",
                    topics_to_cover : ["Algebra","Geometry","Calculus","Arithmetic"],
                    difficulty : [2,3],
                    total_question_count : 5,
                    reasoning_log : [
                            "Strategy REVIEW selected",
                            "combining both mastered and learning goal topics",
                            "picking difficulty range 2,3",
                            "Estimated max question count - 5"
                            ]
                }

- why this structure -> Keeps the plan simple and predictable.
                        Covers everything the executor needs.
                        Easy to extend later (e.g., add question type, hint requirement, etc.)

