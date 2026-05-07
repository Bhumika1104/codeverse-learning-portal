
// import React, { useState, useEffect, useRef } from "react";
// import javaInterviewQ from "./javaInterviewQ.json";

// const VoiceInterview = ({ selectedLanguage }) => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQ, setCurrentQ] = useState(0);
//   const [userAnswer, setUserAnswer] = useState("");
//   const [listening, setListening] = useState(false);
//   const [score, setScore] = useState(0);
//   const [interviewCompleted, setInterviewCompleted] = useState(false);
//   const [startTime, setStartTime] = useState(null);
//   const [totalTimeTaken, setTotalTimeTaken] = useState(0);

//   // ✅ NEW STATE
//   const [showReview, setShowReview] = useState(false);

//   const recognitionRef = useRef(null);
//   const allAnswersRef = useRef([]);

//   // ---------- RANDOM ----------
//   const getRandomQuestions = (arr, n) => {
//     const shuffled = [...arr];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled.slice(0, n);
//   };

//   // ---------- INIT ----------
//   useEffect(() => {
//     if (selectedLanguage && javaInterviewQ[selectedLanguage]) {
//       const allQ = javaInterviewQ[selectedLanguage];
//       setQuestions(getRandomQuestions(allQ, 3));
//       setStartTime(Date.now());
//     }

//     setCurrentQ(0);
//     setUserAnswer("");
//     setScore(0);
//     setInterviewCompleted(false);
//     setShowReview(false);
//     allAnswersRef.current = [];
//   }, [selectedLanguage]);

//   // ---------- SPEAK ----------
//   const speak = (text, callback) => {
//     speechSynthesis.cancel();
//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.onend = () => callback && callback();
//     speechSynthesis.speak(utterance);
//   };

//   // ---------- SMART SCORING ----------
//   const cleanText = (text) =>
//     text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

//   const getAnswerScore = (userAns, expectedAnswer) => {
//     const stopWords = ["is", "are", "the", "a", "an", "of", "to", "in", "on"];

//     const keywords = [...new Set(
//       cleanText(expectedAnswer)
//         .split(" ")
//         .filter(w => w.length > 3 && !stopWords.includes(w))
//     )];

//     const userWords = cleanText(userAns).split(/\s+/);

//     let match = 0;

//     keywords.forEach(k => {
//       userWords.forEach(u => {
//         if (u.includes(k) || k.includes(u)) {
//           match++;
//         }
//       });
//     });

//     const scoreRatio = match / (keywords.length || 1);

//     if (scoreRatio >= 0.7) return 1;
//     if (scoreRatio >= 0.4) return 0.5;
//     return 0;
//   };

//   // ---------- HANDLE ANSWER ----------
//   const handleAnswer = (answer) => {
//     const q = questions[currentQ];
//     const resultScore = getAnswerScore(answer, q.answer);

//     setUserAnswer(answer);
//     setScore((prev) => prev + resultScore);

//     allAnswersRef.current.push({
//       question: q.question,
//       userAnswer: answer || "No answer",
//       correctAnswer: q.answer,
//       score: resultScore,
//     });

//     setTimeout(() => {
//       speak("Okay", () => {
//         setTimeout(() => nextQuestion(), 300);
//       });
//     }, 100);
//   };

//   // ---------- VOICE ----------
//   const startListening = () => {
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) return alert("Not supported");

//     const recognition = new SpeechRecognition();
//     recognitionRef.current = recognition;

//     recognition.lang = "en-US";
//     recognition.start();
//     setListening(true);

//     const timeout = setTimeout(() => {
//       recognition.stop();
//       handleAnswer("");
//     }, 6000);

//     recognition.onresult = (e) => {
//       clearTimeout(timeout);
//       const ans = e.results[0][0].transcript;
//       setListening(false);
//       recognition.stop();
//       handleAnswer(ans);
//     };

//     recognition.onerror = () => {
//       clearTimeout(timeout);
//       setListening(false);
//       handleAnswer("");
//     };
//   };

//   const stopListening = () => {
//     recognitionRef.current?.stop();
//     setListening(false);
//   };

//   // ---------- NEXT ----------
//   const nextQuestion = () => {
//     if (currentQ < questions.length - 1) {
//       setCurrentQ((p) => p + 1);
//       setUserAnswer("");
//     } else {
//       const end = Date.now();
//       setTotalTimeTaken(Math.floor((end - startTime) / 1000));

//       // ✅ SHOW REVIEW SCREEN FIRST
//       setShowReview(true);
//       speak("Interview completed");
//     }
//   };

//   // ---------- SUBMIT FINAL ----------
//   const handleSubmitInterview = () => {
//     setShowReview(false);
//     setInterviewCompleted(true);
//   };

//   // ---------- ASK ----------
//   useEffect(() => {
//     if (questions.length > 0 && !interviewCompleted) {
//       speak(questions[currentQ].question);
//     }
//   }, [currentQ, questions]);

//   // ---------- FEEDBACK ----------
//   const getFinalFeedback = () => {
//     const percent = (score / questions.length) * 100;
//     if (percent >= 80) return "Excellent performance";
//     if (percent >= 50) return "Good, improve more";
//     return "Need more practice";
//   };

//   // ---------- PROGRESS ----------
//   const getProgress = () => {
//     const qScore = allAnswersRef.current[currentQ]?.score || 0;
//     return qScore === 1 ? 100 : qScore === 0.5 ? 60 : 20;
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
//       <div className="w-full max-w-2xl bg-gray-900 text-white rounded-2xl border border-purple-500 p-6">

//         <h2 className="text-3xl font-bold text-center text-purple-400 mb-4">
//           AI Voice Interview
//         </h2>

//         {/* ---------------- QUESTIONS ---------------- */}
//         {questions.length > 0 && !showReview && !interviewCompleted && (
//           <>
//             <p className="text-purple-300">Question:</p>
//             <p className="bg-gray-800 p-3 rounded-lg mb-3">
//               {questions[currentQ].question}
//             </p>

//             <div className="w-full bg-gray-700 h-2 rounded mb-3">
//               <div
//                 className="h-2 bg-purple-500 rounded"
//                 style={{ width: `${getProgress()}%` }}
//               ></div>
//             </div>

//             <p className="text-purple-300">Your Answer:</p>
//             <textarea
//               value={userAnswer}
//               onChange={(e) => setUserAnswer(e.target.value)}
//               className="w-full p-2 rounded bg-gray-800 border border-purple-700 mb-3"
//               placeholder="Speak or type your answer..."
//             />

//             {/* ✅ LISTENING MESSAGE */}
//             {listening && (
//               <p className="text-green-400 mt-2 animate-pulse">
//                 🎤 Listening...
//               </p>
//             )}

//             <p className="text-purple-400 mb-3">
//               Score: {score} / {questions.length}
//             </p>

//             <div className="flex gap-4 justify-center">
//               <button
//                 onClick={startListening}
//                 disabled={listening}
//                 className="bg-blue-500 px-4 py-2 rounded"
//               >
//                 🎤 Voice
//               </button>

//               <button
//                 onClick={() => handleAnswer(userAnswer)}
//                 className="bg-green-500 px-4 py-2 rounded"
//               >
//                 Submit
//               </button>

//               <button
//                 onClick={stopListening}
//                 className="bg-red-500 px-4 py-2 rounded"
//               >
//                 Stop
//               </button>
//             </div>
//           </>
//         )}

//         {/* ---------------- REVIEW SCREEN ---------------- */}
//         {showReview && !interviewCompleted && (
//           <div className="text-center">
//             <h2 className="text-purple-400 text-2xl mb-2">
//               Interview Completed
//             </h2>

//             <p className="mb-2">{getFinalFeedback()}</p>

//             <p className="text-gray-300 mb-4">
//               Click submit to view final result
//             </p>

//             <button
//               onClick={handleSubmitInterview}
//               className="bg-purple-500 px-5 py-2 rounded"
//             >
//               Submit Interview
//             </button>
//           </div>
//         )}

//         {/* ---------------- FINAL RESULT ---------------- */}
//         {interviewCompleted && (
//           <div className="text-center">
//             <h2 className="text-purple-400 text-2xl">Final Result</h2>

//             <p>Score: {score}</p>
//             <p>Time: {totalTimeTaken} sec</p>
//             <p>{getFinalFeedback()}</p>

//             {allAnswersRef.current.map((a, i) => (
//               <div key={i} className="bg-gray-800 p-3 mt-3 rounded">
//                 <p>Q: {a.question}</p>
//                 <p>Your: {a.userAnswer}</p>
//                 <p>Correct: {a.correctAnswer}</p>

//                 <p>
//                   {a.score === 1
//                     ? "✔ Correct"
//                     : a.score === 0.5
//                     ? "⚡ Partial"
//                     : "❌ Incorrect"}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VoiceInterview;


import React, { useState, useEffect, useRef } from "react";
import javaInterviewQ from "./javaInterviewQ.json";
import AIInterviewButton from "./AIInterviewButton";

const VoiceInterview = ({ selectedLanguage }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [listening, setListening] = useState(false);
  const [score, setScore] = useState(0);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [totalTimeTaken, setTotalTimeTaken] = useState(0);

  const [showReview, setShowReview] = useState(false);

  const recognitionRef = useRef(null);
  const allAnswersRef = useRef([]);

  // ✅ FIX 1: prevent question repeat
  const lastSpokenQRef = useRef(-1);

  const getRandomQuestions = (arr, n) => {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, n);
  };

  // ---------- INIT ----------
  useEffect(() => {
    if (selectedLanguage && javaInterviewQ[selectedLanguage]) {
      const allQ = javaInterviewQ[selectedLanguage];
      setQuestions(getRandomQuestions(allQ, 3));
      setStartTime(Date.now());
    }

    setCurrentQ(0);
    setUserAnswer("");
    setScore(0);
    setInterviewCompleted(false);
    setShowReview(false);
    allAnswersRef.current = [];
    lastSpokenQRef.current = -1; // reset speak tracker
  }, [selectedLanguage]);

  // ---------- SPEAK ----------
  const speak = (text, callback) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => callback && callback();
    speechSynthesis.speak(utterance);
  };

  // ---------- SMART SCORING ----------
  const cleanText = (text) =>
    text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

  const getAnswerScore = (userAns, expectedAnswer) => {
    const stopWords = ["is", "are", "the", "a", "an", "of", "to", "in", "on"];

    const keywords = [...new Set(
      cleanText(expectedAnswer)
        .split(" ")
        .filter(w => w.length > 3 && !stopWords.includes(w))
    )];

    const userWords = cleanText(userAns).split(/\s+/);

    let match = 0;

    keywords.forEach(k => {
      userWords.forEach(u => {
        if (u.includes(k) || k.includes(u)) {
          match++;
        }
      });
    });

    const scoreRatio = match / (keywords.length || 1);

    if (scoreRatio >= 0.7) return 1;
    if (scoreRatio >= 0.4) return 0.5;
    return 0;
  };

  // ---------- HANDLE ANSWER ----------
  const handleAnswer = (answer) => {
    const q = questions[currentQ];
    const resultScore = getAnswerScore(answer, q.answer);

    setUserAnswer(answer);
    setScore((prev) => prev + resultScore);

    allAnswersRef.current.push({
      question: q.question,
      userAnswer: answer || "No answer",
      correctAnswer: q.answer,
      score: resultScore,
    });

    setTimeout(() => {
      speak("Okay", () => {
        setTimeout(() => nextQuestion(), 300);
      });
    }, 100);
  };

  // ---------- VOICE ----------
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return alert("Not supported");

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "en-US";
    recognition.start();
    setListening(true);

    const timeout = setTimeout(() => {
      recognition.stop();
      handleAnswer("");
    }, 6000);

    recognition.onresult = (e) => {
      clearTimeout(timeout);
      const ans = e.results[0][0].transcript;
      setListening(false);
      recognition.stop();
      handleAnswer(ans);
    };

    recognition.onerror = () => {
      clearTimeout(timeout);
      setListening(false);
      handleAnswer("");
    };
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  // ---------- NEXT ----------
  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((p) => p + 1);
      setUserAnswer("");
    } else {
      const end = Date.now();
      setTotalTimeTaken(Math.floor((end - startTime) / 1000));
      setShowReview(true);
      speak("Interview completed");
    }
  };

  // ---------- SUBMIT FINAL ----------
  const handleSubmitInterview = () => {
    setShowReview(false);
    setInterviewCompleted(true);
  };

  // ---------- RESTART (NEW FIX) ----------
  const restartInterview = () => {
    setQuestions(getRandomQuestions(javaInterviewQ[selectedLanguage], 3));
    setCurrentQ(0);
    setUserAnswer("");
    setScore(0);
    setInterviewCompleted(false);
    setShowReview(false);
    setStartTime(Date.now());
    setTotalTimeTaken(0);
    allAnswersRef.current = [];
    lastSpokenQRef.current = -1;
  };

  // ---------- ASK ----------
  useEffect(() => {
    if (
      questions.length > 0 &&
      !interviewCompleted &&
      lastSpokenQRef.current !== currentQ
    ) {
      speak(questions[currentQ].question);
      lastSpokenQRef.current = currentQ;
    }
  }, [currentQ, questions]);

  const getFinalFeedback = () => {
    const percent = (score / questions.length) * 100;
    if (percent >= 80) return "Excellent performance";
    if (percent >= 50) return "Good, improve more";
    return "Need more practice";
  };

  const getProgress = () => {
    const qScore = allAnswersRef.current[currentQ]?.score || 0;
    return qScore === 1 ? 100 : qScore === 0.5 ? 60 : 20;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="w-full max-w-2xl bg-gray-900 text-white rounded-2xl border border-purple-500 p-6">

        <h2 className="text-3xl font-bold text-center text-purple-400 mb-4">
          Mock Voice Interview
        </h2>
         <AIInterviewButton selectedLanguage={selectedLanguage} /> 

        {/* QUESTIONS */}
        {questions.length > 0 && !showReview && !interviewCompleted && (
          <>
            <p className="text-purple-300">Question:</p>
            <p className="bg-gray-800 p-3 rounded-lg mb-3">
              {questions[currentQ].question}
            </p>

            <div className="w-full bg-gray-700 h-2 rounded mb-3">
              <div
                className="h-2 bg-purple-500 rounded"
                style={{ width: `${getProgress()}%` }}
              ></div>
            </div>

            <p className="text-purple-300">Your Answer:</p>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 border border-purple-700 mb-3"
              placeholder="Speak or type your answer..."
            />

            {listening && (
              <p className="text-green-400 mt-2 animate-pulse">
                🎤 Listening...
              </p>
            )}

            <p className="text-purple-400 mb-3">
              Score: {score} / {questions.length}
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={startListening}
                disabled={listening}
                className="bg-blue-500 px-4 py-2 rounded"
              >
                🎤 Voice
              </button>

              <button
                onClick={() => handleAnswer(userAnswer)}
                className="bg-green-500 px-4 py-2 rounded"
              >
                Submit
              </button>

              <button
                onClick={stopListening}
                className="bg-red-500 px-4 py-2 rounded"
              >
                Stop
              </button>
            </div>
          </>
        )}

        {/* REVIEW */}
        {showReview && !interviewCompleted && (
          <div className="text-center">
            <h2 className="text-purple-400 text-2xl mb-2">
              Interview Completed
            </h2>

            <p className="mb-2">{getFinalFeedback()}</p>

            <p className="text-gray-300 mb-4">
              Click submit to view final result
            </p>

            <button
              onClick={handleSubmitInterview}
              className="bg-purple-500 px-5 py-2 rounded"
            >
              Submit Interview
            </button>
          </div>
        )}

        {/* RESULT */}
        {interviewCompleted && (
          <div className="text-center">
            <h2 className="text-purple-400 text-2xl">Final Result</h2>

            <p>Score: {score}</p>
            <p>Time: {totalTimeTaken} sec</p>
            <p>{getFinalFeedback()}</p>

            {allAnswersRef.current.map((a, i) => (
              <div key={i} className="bg-gray-800 p-3 mt-3 rounded">
                <p>Q: {a.question}</p>
                <p>Your: {a.userAnswer}</p>
                <p>Correct: {a.correctAnswer}</p>
                <p>
                  {a.score === 1
                    ? "✔ Correct"
                    : a.score === 0.5
                    ? "⚡ Partial"
                    : "❌ Incorrect"}
                </p>
              </div>
            ))}

            {/* ✅ FIX 2: Restart Button */}
            <button
              onClick={restartInterview}
              className="mt-5 bg-blue-600 px-5 py-2 rounded"
            >
              Restart Interview
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceInterview;

