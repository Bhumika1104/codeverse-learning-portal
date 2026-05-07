import React from "react";

const AIInterviewButton = ({ selectedLanguage }) => {

  const startAIInterview = () => {

    // ✅ Dynamic Language
    const lang = selectedLanguage || "Java";

    const prompt = `
You are a STRICT technical interviewer.

Language/Topic: ${lang}

Rules:
- Conduct ONLY ${lang} interview.
- Ask EXACTLY 2 questions.
- Ask ONE question at a time.
- Wait for answer before next question.

Restrictions:
- Do NOT answer other topics.
- If user asks anything else:
  "Please answer the interview question only."

Evaluation:
- Give short feedback (Correct / Incorrect)
- Maintain score internally

End:
- Show Score out of 2
- Give Remark (Excellent / Good / Average / Poor)

Start with Question 1.
`;

    const url = `https://chat.openai.com/?prompt=${encodeURIComponent(prompt)}`;

    window.open(url, "_blank");
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <button
        onClick={startAIInterview}
        style={{
          padding: "10px 20px",
          backgroundColor: "#9333ea",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Try AI Interview
      </button>
    </div>
  );
};

export default AIInterviewButton;