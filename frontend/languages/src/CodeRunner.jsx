import React, { useState } from "react";
import axios from "axios";

const CodeRunner = ({ selectedLanguage }) => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const languageIds = {
    c: 50,
    cpp: 54,
    java: 62,
    python: 71,
    javascript: 63,
  };

  const runCode = async () => {
    setLoading(true);
    setOutput("Running...");

    try {
      const response = await axios.post(
        "https://ce.judge0.com/submissions/?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: languageIds[selectedLanguage],
        }
      );

      setOutput(response.data.stdout || response.data.stderr || "No output");
    } catch (err) {
      console.error(err);
      setOutput("Error running code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        rows={10}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        placeholder={`Write your ${selectedLanguage} code here`}
      ></textarea>
      <button
        onClick={runCode}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
      >
        {loading ? "Running..." : "Run Code"}
      </button>
      <pre className="p-2 border rounded bg-gray-100">{output}</pre>
    </div>
  );
};

export default CodeRunner;
