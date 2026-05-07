import React from "react";

const InterviewQ = ({ selectedLanguage, questions }) => {
  return (
    <div className="w-11/12 bg-white p-6 mt-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-purple-600">
        {selectedLanguage} Interview Questions
      </h2>

      {questions && questions.length > 0 ? (
        questions.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 p-4 rounded-lg mb-4 shadow"
          >
            <p className="font-semibold text-lg">{item.question}</p>
            <p className="text-gray-700 mt-2">{item.answer}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-lg">No questions available.</p>
      )}
    </div>
  );
};

export default InterviewQ;
