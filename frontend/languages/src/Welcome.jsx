
import React, { useState, useEffect } from "react";
import MockTest from "./MockTest";
import InterviewQ from "./InterviewQ";
import questionsA from "./questionsA.json";
import questionsB from "./questionsB.json";
import javaNotes from "./javaNotes.json";
import pythonNotes from "./pythonNotes.json";
import cNotes from "./cNotes.json";
import cplussNotes from "./cplussNotes.json";
// import javascriptNotes from "./javascriptNotes.json"
import AIInterview from "./AIInterview";
import JavaRoadmap from "./JavaRoadmap";
import JavaCodingQuestions from "./JavaCodingQuestions";
import PythonCodingQuestions from "./PythonCodingQuestions";
import CCodingQuestions from "./CCodingQuestions";
import CPPCodingQuestions from "./CPPCodingQuestions";
import NotesSection from "./NotesSection";

// ⭐ NEW IMPORT FOR AI INTERVIEW
import javaInterviewQ from "./javaInterviewQ.json";
import { Import } from "lucide-react";

const languages = [
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "PHP", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "C#", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
  { name: "Ruby", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg" },
  { name: "Swift", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg" },
  { name: "Kotlin", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Go", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
  { name: "Rust", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" },
  { name: "Dart", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
  { name: "R", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" },
  { name: "MATLAB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg" },
  { name: "NodeJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
];

const featureTabs = [
  "RoadMap",
  "Learning Material",
  "Interview Questions",
  "Mock Test",
  "Coding Questions",
  "AI Interview",
  "Notes",
];

const topics = {
  ...javaNotes,
  ...pythonNotes,
  ...cNotes,
  ...cplussNotes,
  // ...javascriptNotes,
};

const Welcome = ({ user, handleLogout }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showProgress, setShowProgress] = useState(false);
  const [mockTests, setMockTests] = useState([]);
  const storageKey = `mockTests_${user?.email || "guest"}`;
  const progressKey = user?.email ? `completedTopics_${user.email}` : "completedTopics_guest";

  const [completedTopics, setCompletedTopics] = useState(() => {
    const saved = localStorage.getItem(progressKey);
    return saved ? JSON.parse(saved) : {};
  });

 
  const refreshHistory = () => {
    const data = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setMockTests(data);
  };

  useEffect(() => {
    localStorage.setItem(progressKey, JSON.stringify(completedTopics));
  }, [completedTopics, progressKey]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setMockTests(data);
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleCompleted = (lang, topicTitle) => {
    setCompletedTopics((prev) => {
      const langTopics = prev[lang] || [];
      if (langTopics.includes(topicTitle)) {
        return { ...prev, [lang]: langTopics.filter((t) => t !== topicTitle) };
      } else {
        return { ...prev, [lang]: [...langTopics, topicTitle] };
      }
    });
  };

  const getCompletionPercent = (lang) => {
    const total = topics[lang]?.length || 0;
    const done = completedTopics[lang]?.length || 0;
    return total > 0 ? Math.round((done / total) * 100) : 0;
  };

//  ✅ IMPROVED SPEECH LOGIC TO PREVENT "synthesis-failed"
  const speakText = (text) => {
    if (!text) return;

    // 1. Cancel everything currently playing
    window.speechSynthesis.cancel();

    // 2. Wrap in a small timeout to allow state to clear
    setTimeout(() => {
      const speech = new SpeechSynthesisUtterance(text);
      
      // Try to use a standard voice
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        speech.voice = voices.find(v => v.lang.includes('en')) || voices[0];
      }

      speech.lang = "en-US";
      speech.rate = 1;
      speech.pitch = 1;

      speech.onerror = (event) => {
        // Silently handle 'interrupted' but log others
        if (event.error !== 'interrupted') {
           console.error("Speech error:", event.error);
        }
      };

      window.speechSynthesis.speak(speech);
    }, 100);
  };

  return (
    <div className={`${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"} min-h-screen flex flex-col transition-all duration-300`}>
      {/* Header */}
      <header className={`w-full flex justify-between items-center ${darkMode ? "bg-gray-500" : "bg-purple-500"} text-white px-10 py-4 fixed top-0 left-0 shadow-md z-10`}>
        <h1 className="text-2xl font-bold">SmartCodePrep</h1>

        <div className="flex items-center gap-4">
          {/* Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? "bg-white text-black" : "bg-gray-200 text-gray-800"} hover:scale-110 transition`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {/* Username */}
          <span className="font-semibold">{user?.name || "Guest"}</span>

          {/* Progress Button */}
          <div className="relative">
            <button
              onClick={() => setShowProgress(!showProgress)}
              className="bg-purple-500 hover:bg-purple-600 hover:scale-110 transition px-4 py-2 rounded-md text-sm font-medium text-white"
            >
              Show Progress
            </button>
            {showProgress && (
              <div className="absolute top-16 right-0 w-80 md:w-96 p-5 
                                  bg-white/90 backdrop-blur-lg text-black 
                                  rounded-2xl shadow-2xl border border-gray-200 
                                  z-30 max-h-[75vh] overflow-y-auto
                                  animate-fadeIn">

                <h3 className="font-bold text-xl text-center mb-4 tracking-wide">
                  📊 Learning Dashboard
                </h3>

                <div className="space-y-4">
                  {languages.map((lang) => {
                    const percent = getCompletionPercent(lang.name);
                    if (percent > 0) {
                      return (
                        <div key={lang.name} className="p-3 bg-gray-50 rounded-xl shadow-sm border">
                          <div className="flex justify-between text-sm font-semibold mb-1">
                            <span>{lang.name}</span>
                            <span className="text-blue-600">{percent}%</span>
                          </div>
                          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-3 rounded-full bg-gradient-to-r from-blue-400 via-green-400 to-purple-500 
                                               transition-all duration-700 ease-in-out"
                              style={{ width: `${percent}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    } else return null;
                  })}
                </div>

                {Object.keys(completedTopics).length === 0 && (
                  <p className="text-center text-gray-500 text-sm italic mt-3">
                    No progress yet
                  </p>
                )}

                <hr className="my-4 border-gray-300" />

                <div>
                  <h3 className="font-bold text-center mb-3 text-lg">
                    🧠 Mock Test History
                  </h3>
                  {mockTests.length > 0 ? (
                    mockTests.map((test, index) => (
                      <div
                        key={index}
                        className="mb-3 p-3 rounded-xl border bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm hover:shadow-md transition"
                      >
                        <p className="text-sm font-semibold">
                          {test.language} ({test.level})
                        </p>
                        <p className="text-sm">
                          Score: <span className="font-bold text-green-600">{test.score}</span>
                        </p>
                        <p className="text-xs text-gray-500">{test.date}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500 text-sm italic">
                      No tests saved yet
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setSelectedLanguage(null);
              setSelectedFeature(null);
              setSelectedTopic(null);
            }}
            className="bg-yellow-400 hover:bg-yellow-500 hover:scale-110 transition px-4 py-2 rounded-md text-sm font-medium text-black"
          >
            🔙 Back
          </button>

          <button
            onClick={() => {
              handleLogout();
              setSelectedLanguage(null);
              setSelectedFeature(null);
              setSelectedTopic(null);
            }}
            className="bg-red-400 hover:bg-purple-500 hover:scale-110 transition px-4 py-2 rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="mt-24 flex flex-col items-center">
        {/* Language Buttons */}
        <div className={`w-full ${darkMode ? "bg-gray-700" : "bg-gray-100"} p-3 flex flex-wrap justify-center shadow-md rounded-lg`}>
          {languages.map((lang) => {
            const isMainLang = ["C", "C++", "Java", "Python"].includes(lang.name);
            return (
              <button
                key={lang.name}
                onClick={() => {
                  if (isMainLang) {
                    setSelectedLanguage(lang.name);
                    setSelectedFeature(null);
                    setSelectedTopic(null);
                  } else {
                    const ok = window.confirm("🚀 Coming Soon\nOnly completed features are available right now.");
                    if (ok) {
                      setSelectedLanguage(lang.name);
                      setSelectedFeature(null);
                      setSelectedTopic(null);
                    }
                  }
                }}
                className={`m-2 px-4 py-2 rounded-md font-semibold transition
                        ${selectedLanguage === lang.name ? "bg-purple-500 text-white" : darkMode ? "bg-gray-800 text-white hover:bg-purple-500" : "bg-white text-gray-800 hover:bg-blue-200"}
                        ${!isMainLang ? "opacity-50" : ""}
                    `}
              >
                {lang.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-24 flex-1 flex flex-col items-center">
        {!selectedLanguage && (
          <div className="w-full px-10 py-2">
            <h2 className="text-3xl font-extrabold text-center mb-14 text-green-600">
              Available Languages
            </h2>
            <div className="grid grid-cols-4 gap-14 place-items-center mb-20">
              {languages.filter((lang) => ["C", "C++", "Java", "Python"].includes(lang.name)).map((lang) => (
                <div
                  key={lang.name}
                  onClick={() => setSelectedLanguage(lang.name)}
                  className="relative flex flex-col items-center justify-center w-52 h-52 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md dark:shadow-black/40 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-emerald-400 cursor-pointer group"
                >
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 bg-emerald-400 blur-2xl transition"></div>
                  <img src={lang.logo} alt={lang.name} className="w-24 h-24 object-contain z-10" />
                  <p className="mt-3 text-lg font-semibold text-gray-800 dark:text-gray-200 z-10">{lang.name}</p>
                </div>
              ))}
            </div>

            <h2 className="text-3xl font-extrabold text-center mb-14 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 tracking-wide">
              Coming Soon Languages
            </h2>
            <div className="grid grid-cols-4 gap-14 place-items-center">
              {languages.filter((lang) => !["C", "C++", "Java", "Python"].includes(lang.name)).map((lang) => (
                <div key={lang.name} className="relative flex flex-col items-center justify-center w-52 h-52 rounded-full bg-gray-100 dark:bg-gray-800 border border-dashed border-yellow-400 opacity-70 transition-all duration-300 hover:shadow-[0_0_25px_rgba(250,204,21,0.7)] hover:scale-105 cursor-not-allowed">
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/25">
                    <span className="text-3xl">🔒</span>
                  </div>
                  <img src={lang.logo} alt={lang.name} className="w-24 h-24 object-contain opacity-60" />
                  <p className="mt-3 text-lg font-medium text-gray-700 dark:text-gray-300">{lang.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!selectedLanguage && (
          <footer className="w-full mt-16 py-10 px-6 text-center bg-gray-800 text-white rounded-t-2xl shadow-xl">
            <h3 className="text-2xl font-extrabold mb-2 tracking-wide">SmartCodePrep</h3>
            <p className="text-sm max-w-2xl mx-auto opacity-90">
              SmartCodePrep is your complete coding learning companion — offering interview questions, notes, mock tests, resume builder, language progress tracking, and real-time learning assistance.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-800/40 py-3 rounded-lg shadow-md"><p className="font-semibold">📘 Interview Questions</p></div>
              <div className="bg-gray-800/40 py-3 rounded-lg shadow-md"><p className="font-semibold">📝 Notes & Explanations</p></div>
              <div className="bg-gray-800/40 py-3 rounded-lg shadow-md"><p className="font-semibold">🎧 Mock Test + Listen Feature</p></div>
            </div>
            <p className="mt-6 text-sm">Contact: support@smartcodeprep.com</p>
            <p className="text-xs mt-2 opacity-80">© 2025 SmartCodePrep — All rights reserved.</p>
          </footer>
        )}

        {selectedLanguage && (
          <div className="w-full flex flex-col md:flex-row gap-6 p-5">
            <div className={`w-full md:w-1/4 rounded-2xl p-6 shadow-xl border transition-all duration-300 min-h-[65vh] ${darkMode ? "bg-gray-900 border-gray-700" : "bg-gradient-to-b from-white via-blue-50 to-blue-100 border-blue-100"}`}>
              <h2 className="text-xl font-bold text-center mb-6 text-purple-500 tracking-wide animate-pulse">⚡ Features Hub</h2>
              <div className="flex flex-col gap-3">
                {featureTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedFeature(tab)}
                    className={`relative px-4 py-3 rounded-xl font-semibold text-left transition-all duration-300 transform hover:scale-[1.05] border overflow-hidden group shadow-sm ${selectedFeature === tab ? "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white shadow-lg" : darkMode ? "bg-gray-800 text-white border-gray-700 hover:bg-purple-700" : "bg-white text-gray-800 border-blue-100 hover:bg-blue-100"}`}
                  >
                    <span className="absolute left-0 top-0 h-full w-1 bg-purple-500 rounded-r-full group-hover:w-2 transition-all duration-300"></span>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full md:w-3/4">
  

{!selectedFeature && (
  <div className="w-full max-w-[1600px] px-20 py-16 bg-slate-900/40 backdrop-blur-md rounded-[40px] shadow-2xl min-h-[600px] flex flex-col border border-gray-800 mx-auto"> 
    {/* TOP SECTION: CONTENT & IMAGE */}
    <div className="flex flex-1 items-center gap-16">
      
      {/* LEFT CONTENT */}
      <div className="flex-1 text-white">
        {/* TITLE */}
        <h2 className="text-5xl font-extrabold text-white mb-6">
          Hi, I'm <span className="text-orange-400">SmartCodePrep</span>
        </h2>

        {/* PARAGRAPH */}
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
         🛣 Roadmap – Used to guide users step-by-step learning journey .<br></br>

📘 Notes – Used to study important theory concepts in an easy .<br></br>

🧠 Mock – Used for practice tests to improve knowledge.<br></br>

💻 Coding – Used to practice programming problems.<br></br>

🎯 Interview – Used to practice interview questions .<br></br>

✍️ Write – Used for practicing writing answers.<br></br>

📊 Progress – Used to track user performance, scores.<br></br>

❓ Quiz/Help – Used to clear doubts and test understanding.
        </p>

      </div>

      {/* RIGHT IMAGE */}
      <div className="flex-1 flex justify-center relative">
        {/* Glow effect behind image to match the reference style */}
        <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full"></div>
        <img
          src="/hero-image.png"
          alt="SmartCodePrep"
          className="w-[500px] h-auto object-contain z-10"
        />
      </div>
    </div>

    {/* FOOTER SECTION: ICONS */}
    <div className="mt-8 pt-8 border-t border-gray-700/50">
      <div className="flex justify-center gap-10">
        {[
          ["🛣", "Roadmap"],
          ["📘", "Notes"],
          ["🧠", "Mock"],
          ["💻", "Coding"],
          ["🎯", "Interview"],
          ["✍️", "Write"],
          ["📊", "Progress"],
          ["❓", "Q&A"],
        ].map(([icon, name], i) => (
          <div key={i} className="flex flex-col items-center group cursor-pointer">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl
              bg-gray-800/50 border border-gray-700 text-xl
              group-hover:border-orange-400 group-hover:scale-110 transition-all duration-300">
              {icon}
            </div>
            <p className="mt-2 text-xs font-medium text-gray-400 group-hover:text-orange-300">
              {name}
            </p>
          </div>
        ))}
      </div>
    </div>

  </div>
)}
              {selectedFeature === "RoadMap" && <JavaRoadmap selectedLanguage={selectedLanguage} />}
              {selectedFeature === "Notes" && <NotesSection />}
              {selectedFeature === "Mock Test" && (
                <MockTest 
                  selectedLanguage={selectedLanguage} 
                  user={user} 
                  darkMode={darkMode} 
                  onSaveSuccess={refreshHistory} // 
                />
              )}
              {selectedFeature === "AI Interview" && <AIInterview selectedLanguage={selectedLanguage} questions={javaInterviewQ} />}
              {selectedFeature === "Coding Questions" && (
                <>
                  {selectedLanguage === "Java" && <JavaCodingQuestions />}
                  {selectedLanguage === "Python" && <PythonCodingQuestions />}
                  {selectedLanguage === "C" && <CCodingQuestions />}
                  {selectedLanguage === "C++" && <CPPCodingQuestions />}
                </>
              )}
              {selectedFeature === "Interview Questions" && (
                <div className="flex w-11/12 mt-8">
                  <div className={`w-1/4 p-4 ${darkMode ? "bg-gray-800" : "bg-gray-100"} rounded-l-xl`}>
                    {/* <button onClick={() => speakText(selectedTopic?.answer)} className="p-3 mt-4 py-2 rounded-md font-semibold transition bg-purple-500 text-white px-4">Listen Answer</button>
                    <button onClick={() => window.speechSynthesis.cancel()} className="p-3 mt-4 py-2 rounded-md font-semibold transition bg-purple-500 text-white px-4">Stop</button> */}

         {/* <button onClick={() => speakText(selectedTopic?.answer)} className="flex-1 py-2 bg-purple-500 text-white rounded-md font-bold">Listen</button>
                      <button onClick={() => window.speechSynthesis.cancel()} className="flex-1 py-2 bg-red-500 text-white rounded-md font-bold">Stop</button> */}

<div className="flex gap-3 mb-4 sticky top-0 bg-inherit p-2 z-10">
  <button 
    onClick={() => speakText(selectedTopic?.answer || selectedTopic?.title)} 
    className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg font-bold shadow-md 
               border-2 border-transparent hover:border-purple-300 hover:bg-purple-700 
               active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
  >
    <span>🔊</span> Listen
  </button>
  
  <button 
    onClick={() => window.speechSynthesis.cancel()} 
    className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg font-bold shadow-md 
               border-2 border-transparent hover:border-red-300 hover:bg-red-600 
               active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
  >
    <span>🛑</span> Stop
  </button>
</div>

                    <h3 className="text-xl font-bold mb-6 text-white">Questions</h3>
                    {([...questionsA[selectedLanguage] || [], ...questionsB[selectedLanguage] || []]).map((q) => (
                      <button key={q.question} onClick={() => setSelectedTopic(q)} className={`block w-full text-left px-3 py-2 my-1 rounded-md font-medium transition ${selectedTopic?.question === q.question ? "bg-purple-500 text-white" : darkMode ? "hover:bg-gray-700" : "hover:bg-blue-100"}`}>{q.question}</button>
                    ))}
                  </div>
                  <div className={`w-3/4 p-6 ${darkMode ? "bg-gray-900" : "bg-white"} rounded-r-xl shadow-inner`}>
                    {selectedTopic ? (
                      <>
                        <h2 className="text-2xl font-bold text-purple-500 mb-3">{selectedTopic.question}</h2>
                        <p className="text-lg">{selectedTopic.answer}</p>
                      </>
                    ) : (
                      <p className="text-gray-500 text-lg italic">Select a question from the sidebar to view the answer.</p>
                    )}
                  </div>
                </div>
              )}

              {selectedFeature === "Learning Material" && (
                <div className="flex w-11/12 mt-8">
                  <div className={`w-1/4 p-4 ${darkMode ? "bg-gray-800" : "bg-gray-100"} rounded-l-xl`}>
                       {/* <button 
                        onClick={() => {
                          const textToRead = `${selectedTopic?.title}. ${selectedTopic?.sections?.map(s => s.text || s.heading).join(". ")}`;
                          speakText(textToRead);
                        }} 
                        className="flex-1 py-2 bg-purple-500 text-white rounded-md font-bold"
                      >Listen</button>
                      <button onClick={() => window.speechSynthesis.cancel()} className="flex-1 py-2 bg-red-500 text-white rounded-md font-bold">Stop</button> */}

                      <div className="flex gap-3 mb-4 sticky top-0 bg-inherit p-2 z-10">
  <button 
    onClick={() => {
      const textToRead = `${selectedTopic?.title}. ${selectedTopic?.sections?.map(s => s.text || s.heading).join(". ")}`;
      speakText(textToRead);
    }} 
    className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg font-bold shadow-md 
               border-2 border-transparent hover:border-purple-300 hover:bg-purple-700 
               active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
  >
    🔊 Listen
  </button>
  
  <button 
    onClick={() => window.speechSynthesis.cancel()} 
    className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg font-bold shadow-md 
               border-2 border-transparent hover:border-red-300 hover:bg-red-600 
               active:scale-95 transition-all duration-200 flex items-center justify-center gap-2"
  >
    🛑 Stop
  </button>
</div>
                    <h3 className="text-xl font-bold mb-6 text-white">Topics</h3>
                    {(topics[selectedLanguage] || [{ title: "Coming Soon", sections: [] }]).map((topic) => (
                      <button key={topic.title} onClick={() => setSelectedTopic(topic)} className={`block w-full text-left px-3 py-2 my-1 rounded-md font-medium transition ${selectedTopic?.title === topic.title ? "bg-purple-500 text-white" : darkMode ? "hover:bg-gray-700 text-white" : "hover:bg-blue-100"}`}>{topic.title}</button>
                    ))}
                  </div>
                  <div className={`w-3/4 p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-white"} rounded-r-xl shadow-inner`}>
                    {selectedTopic ? (
                      <>
                        <h2 className="text-2xl font-bold text-purple-400 mb-3">{selectedTopic.title}</h2>
                        {selectedTopic.sections?.map((section, index) => (
                          <div key={index} className="mb-6">
                            {section.type === "heading" && <h2 className="text-2xl font-bold text-purple-300 mt-6 mb-3">{section.heading}</h2>}
                            {section.type === "subheading" && <h3 className="text-xl font-semibold text-purple-200 mt-4 mb-2">{section.heading}</h3>}
                            {section.type === "definition" && <><h3 className="text-lg font-semibold">{section.heading}</h3><p className="mt-2">{section.text}</p></>}
                            {section.type === "textblock" && <><h3 className="text-lg font-semibold">{section.heading}</h3><p className="mt-2">{section.text}</p></>}
                            {section.type === "list" && <><h3 className="text-lg font-semibold">{section.heading}</h3><ul className="list-disc ml-6 mt-2">{section.items.map((item, i) => (<li key={i}>{item}</li>))}</ul></>}
                            {section.type === "steps" && <><h3 className="text-lg font-semibold">{section.heading}</h3><ol className="list-decimal ml-6 mt-2">{section.steps.map((step, i) => (<li key={i} className="mb-1">{step}</li>))}</ol></>}
                            {section.type === "syntax" && <><h3 className="text-lg font-semibold">{section.heading}</h3><pre className="bg-gray-800 text-green-300 p-3 rounded mt-2">{section.text}</pre></>}
                            {section.type === "code" && <><h3 className="text-lg font-semibold">{section.heading}</h3><pre className="bg-black text-green-300 p-3 rounded mt-2 overflow-auto">{section.code}</pre></>}
                          </div>
                        ))}
                        <button onClick={() => toggleCompleted(selectedLanguage, selectedTopic.title)} className={`mt-4 px-4 py-2 rounded-md font-semibold transition ${completedTopics[selectedLanguage]?.includes(selectedTopic.title) ? "bg-purple-500 text-white" : "bg-gray-300 text-black hover:bg-gray-400"}`}>
                          {completedTopics[selectedLanguage]?.includes(selectedTopic.title) ? "Completed ✅" : "Mark as Completed"}
                        </button>
                      </>
                    ) : (
                      <p className="text-gray-400 text-lg italic">Select a topic from the sidebar to view details.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;



