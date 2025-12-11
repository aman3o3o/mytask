# Adaptive Learning Orchestrator - 

Implemented a small version of an Adaptive Learning System which generates a personalized assessment for a student based on their profile and the type of assessment they want (Review, New Topic, or Challenge).

## Architectural Design - 

- Controller Layer -> Handles API requests.
                      Validates input.
                      Calls the Planner and Executor in sequence.
                      Returns the final JSON response.

- Planner -> Receives the list of valid topics from the controller.
             Decides what kind of questions should be asked.
             Takes student_profile + assessment_request.
             Produces a structured AssessmentPlan.
             This plan includes topics, difficulty range, time limits, and estimated question count.

- Executor -> Takes the AssessmentPlan and interacts with the problem database.
              Picks the questions that match the plan.
              It makes sure that the final selected questions fit inside the time limit.
              Returns the final set of questions