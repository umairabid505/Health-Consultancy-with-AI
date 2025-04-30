export const genHeaRepPromt = (
  existingCondition,
  age,
  finalSym,
  predicted_disease
) => {
  return `
Based on the following symptoms: ${finalSym}, existing condition: ${existingCondition}, and age: ${age}, return a JSON object with:  
1. 'possible_diseases': A list of up to 5 diseases, including:
   - '${predicted_disease}' (ensure it is always included at point three as the disease).
   Each disease should include:
   - 'name': Disease name
   - 'description': A brief description of the disease
   - 'probability': The probability strictly in percentage (e.g., 75%, 50%) of this disease based on symptoms.
   - 'level': The severity level of the disease (e.g., "High", "Moderate", "Low"). Use the following rules for determining the level:
     - If the probability is above 70%, the level should be "High".
     - If the probability is between 40% and 70%, the level should be "Moderate".
     - If the probability is below 40%, the level should be "Low".
2. 'precautions': A list of at least 5 preventive measures relevant to the diseases, considering '${existingCondition}' and '${age}' to avoid complications.
3. 'workout': At least 3 suitable workout or physical activity suggestions that are safe for someone with '${existingCondition}' and appropriate for '${age}'.
4. 'medications': At least 5 recommended medications_names(strictly), ensuring they do not interfere with '${existingCondition}' and are suitable for '${age}'.
5. 'diets': At least 3 dietary suggestions that are safe and beneficial for someone with '${existingCondition}' and '${age}'.
6. 'patient_condition': Strictly response in Array that contain one object. Include a 'heading' and only 30 words 'paragraph' that provide guidance on whether the patient needs self-care, emergency care, or should consult a doctor based on the symptoms, disease, '${existingCondition}', and '${age}'.

Format the response strictly as a valid JSON object. Example:

{
  "possible_diseases": [
    { 
      "name": "Disease1", 
      "description": "Description of Disease2.", 
      "probability": "75%",
      "level": "Moderate"
    },
    { 
      "name": "${predicted_disease}", 
      "description": "A description of ${predicted_disease}.", 
      "probability": "50%",
      "level": "High"
    },
    { 
      "name": "Disease3", 
      "description": "Description of Disease3.", 
      "probability": "20%",
      "level": "Low"
    }
  ],
  "precautions": [
    "Precaution1 (adjusted for ${existingCondition} and age ${age})", 
    "Precaution2", 
    "Precaution3"
  ],
  "workout": [
    "Workout1 (safe for ${existingCondition} and suitable for age ${age})", 
    "Workout2", 
    "Workout3"
  ],
  "medications": ${
    existingCondition
      ? `[ "Predicted_Disease1_Name: Medication1 (exactly Disease name specific and compatible with ${existingCondition}, strictly include medication_name)", "Predicted_Disease2_Name: Medication2", "Predicted_Disease3_Name: Medication3" ]`
      : `[ "Predicted_Disease1_Name: General Medication1 (exactly Disease name specific and strictly include medication_name)", "Predicted_Disease2_Name: General Medication2", "Predicted_Disease3_Name: General Medication3" ]`
  }
  "diets": [
    "Diet1 (suitable for ${existingCondition} and recommended for age ${age})", 
    "Diet2", 
    "Diet3"
  ],
  "patient_condition": [
  {
    "heading": "change this heading according to patient condition 'Consult a doctor immediately' ",  
    "paragraph": "Based on symptoms, ${existingCondition}, and age ${age}, a medical consultation is recommended to ensure safe treatment and avoid complications." 
  }
    ]
}
`;
};

export const symptomPrompt = (diseaseName) =>
  `Provide a JSON object strictly stored in the (symptoms) variable, listing the symptoms of ${diseaseName}. Format it with each symptom as a list item.`;

export const quizQuestionPrompt = (topic, difficulty) =>
  `Your task is to generate a quiz **only if the topic is health-related**. First, check whether the topic is health-related (like diseases, fitness, nutrition, body systems, medical knowledge, etc.).
  
  If the topic is NOT health-related, just return the following message (exactly):
  "It’s not a health-related topic."
  
  If the topic IS health-related, generate a 03-question multiple-choice quiz about the topic: "${topic}" for a ${difficulty} level. 
  
  Each question must include:
  - a "question"
  - four "options" (A, B, C, D)
  - a "correctAnswer" (one of "A", "B", "C", or "D")
  
  Return the result as a strict JSON array of objects like:
  [
    {
      "question": "What does BMI stand for?",
      "options": ["A. Body Mass Index", "B. Blood Measure Intake", "C. Body Mineral Index", "D. Brain Muscle Interaction"],
      "correctAnswer": "A"
    }
  ]`;

export const quizResulkPrompt = (formattedAnswers) =>
  `Evaluate the following user answers for a health quiz. For each question, provide:
  - whether the answer was correct,
  - correct answer (only if the userAnswer is incorrect)
  - explanation,
  
  Return the result in this JSON structure:
  {
    quizData: [ 
      {
        question: string,
        userAnswer: string | null,
        isCorrect: boolean,
        explanation: string,
        correctAnswer?: string,
      },
      ...
    ],
    totalScore: {
      correct: number,
      total: number
    }
  }
  
  Here is the JSON: ${JSON.stringify(formattedAnswers)}
  `;

export const dietPlanPrompt = (age, gender, bmi, goal, calories) =>
  `
You are a professional nutritionist.

A user has the following profile:
- Age: ${age}
- Gender: ${gender}
- BMI: ${bmi}
- Goal: ${goal} weight
- Daily Calorie Requirement: ${calories} kcal

Based on this, suggest:
1. A full-day balanced diet plan (breakfast, lunch, dinner, snacks).
2. Details of each item (quantity and why it’s included).
3. 3-5 relevant workout/exercise suggestions.
4. generate a personalized and detailed diet plan

Ensure the response is returned strictly and exclusively in the specified JSON format, without any additional data or content:
{
  "dietPlan": {
    "breakfast": [
      {
        "item": "Item name and serving details",
        "calories": "Approximate calories"
      }
    ],
    "lunch": [
      {
        "item": "Item name and serving details",
        "calories": "Approximate calories"
      }
    ],
    "snacks": [
      {
        "item": "Item name and serving details",
        "calories": "Approximate calories"
      }
    ],
    "dinner": [
      {
        "item": "Item name and serving details",
        "calories": "Approximate calories"
      }
    ]
  },
  exercises: [
    "Provide personalized exercise advice based on the user parameters",
    "Include types like strength training, cardio, and general tips"
    ]
}
`;
