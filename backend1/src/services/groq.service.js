import groq from "../config/groq.js";
import {
  SUMMARY_PROMPT,
  NOTES_PROMPT,
} from "../utils/prompts.js";

/**
 * Generic function to call Groq
 */
const generate = async (prompt) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are an expert AI tutor that generates structured educational content. Follow the user's instructions exactly.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error("Groq Error:", error?.error?.error?.message || error.message);
    throw new Error("Failed to generate AI response.");
  }
};
const generateJSON = async (prompt) => {
  const response = await generate(prompt);

  try {
    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Invalid JSON returned by Groq:");
    console.error(response);

    throw new Error("Groq returned invalid JSON.");
  }
};

const generateSmarterJSON = async (prompt) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an expert AI tutor. Return strictly valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
    });
    const cleaned = completion.choices[0].message.content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Groq 70b Error:", error?.error?.error?.message || error.message);
    throw new Error("Groq returned invalid JSON from smarter model.");
  }
};

/**
 * Summary
 */
export const generateSummary = async (transcript) => {
  return generate(`
${SUMMARY_PROMPT}

Instructions:
- Summarize the transcript.
- Use bullet points.
- Maximum 8 bullets.
- Avoid repetition.
- Mention the main topic first.
- IMPORTANT: You MUST provide the summary in TWO languages: First in English, and then in Hindi.
- Format exactly like this:
**English Summary:**
[English bullet points here]

**Hindi Summary (हिंदी सारांश):**
[Hindi bullet points here]

Transcript:

${transcript}
`);
};

/**
 * Notes
 */
export const generateNotes = async (transcript) => {
  return generate(`
${NOTES_PROMPT}

Instructions:
- Create well-structured notes.
- Use headings.
- Use bullet points.
- Include important concepts only.

Transcript:

${transcript}
`);
};

/**
 * Chat With Video
 */
export const answerQuestion = async (transcript, question) => {
  return generate(`
You are an AI tutor answering questions about a YouTube video.

Rules:
- Answer using the transcript.
- You may infer the overall topic if it is obvious.
- Keep the answer between 2 and 5 sentences.
- Do not invent facts that contradict the transcript.
- Only respond with "I couldn't find that information in the video." if the transcript genuinely contains no relevant information.

Transcript:

${transcript}

Question:

${question}

Answer:
`);
};

/**
 * Chapters
 */
export const generateChapters = async (transcript) => {
  return generateJSON(`
Create logical chapters for this transcript.

Return ONLY valid JSON.

Format:

[
  {
    "title":"Introduction",
    "timestamp":"00:00"
  }
]

Transcript:

${transcript}
`);
};

/**
 * Highlights
 */
export const generateHighlights = async (transcript) => {
  return generateJSON(`
Extract the 10 most important insights.

Return ONLY valid JSON.

Example:

[
  "Insight 1",
  "Insight 2"
]

Transcript:

${transcript}
`);
};

/**
 * Quiz
 */
export const generateQuiz = async (transcript) => {
  return generateJSON(`
Create 10 multiple choice questions.

Rules

Return ONLY valid JSON.

[
 {
   "question":"Question",
   "options":["A","B","C","D"],
   "answer":"B"
 }
]

Transcript:

${transcript}
`);
};


 
export const generateMindMap = async (transcript) => {
  return generateSmarterJSON(`
You are an expert educator.

Read the transcript and convert it into a hierarchical mind map.

Return ONLY valid JSON.

Rules:

- Maximum depth: 4
- Root node should contain the main topic.
- Every node must have:
  - title
  - optional children
- No markdown.
- No explanation.
- No text outside JSON.

Example:

{
  "title":"Operating System",
  "children":[
    {
      "title":"Process",
      "children":[
        {
          "title":"Scheduling"
        },
        {
          "title":"Synchronization"
        }
      ]
    },
    {
      "title":"Memory Management"
    }
  ]
}

Transcript:

${transcript}
`);
};
/**
 * Flashcards
 */
export const generateFlashcards = async (transcript) => {
  return generateJSON(`
Generate study flashcards.

Return ONLY valid JSON.

Example

[
 {
   "question":"What is React?",
   "answer":"A JavaScript library."
 }
]

Transcript:

${transcript}
`);
};