import React, { useState } from "react";
import AceEditor from "react-ace";
import StudyNotes from "StudyNotes";

import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
<StudyNotes language={selectedLanguage} visible={selectedOption === "study"} />

function Content({ selectedLanguage, selectedSection, tutorials }) {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  if (!selectedLanguage) {
    return <div className="content">Select a language to see content.</div>;
  }

  if (!selectedSection) {
    return <div className="content">Select a section for {selectedLanguage}.</div>;
  }

  const languageModeMap = {
    HTML: "html",
    JAVASCRIPT: "javascript"
    // Add more mappings as needed
  };

  const aceMode = languageModeMap[selectedLanguage] || "javascript";

  // Function to run HTML/JS code
  const runCode = () => {
    if (selectedLanguage === "HTML" || selectedLanguage === "JAVASCRIPT") {
      const iframe = document.getElementById("code-output");
      iframe.contentDocument.open();
      iframe.contentDocument.write(code);
      iframe.contentDocument.close();
    } else {
      alert("Running code is supported only for HTML/JS in this demo.");
    }
  };

  return (
    <div className="content">
      <h2>{selectedLanguage} - {selectedSection}</h2>

      {selectedSection !== "Code Editor" ? (
        <p>
          Demo content for <strong>{selectedLanguage}</strong> in <strong>{selectedSection}</strong>
        </p>
      ) : (
        <>
          <h3>Write Your {selectedLanguage} Code:</h3>
          <AceEditor
            mode={aceMode}
            theme="github"
            name="code-editor"
            width="100%"
            height="300px"
            value={code}
            onChange={setCode}
            fontSize={16}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              showLineNumbers: true,
              tabSize: 4
            }}
          />

          <button onClick={runCode} style={{
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            Run Code
          </button>

          <h3>Output:</h3>
          <iframe
            id="code-output"
            title="Output"
            style={{ width: "100%", height: "200px", border: "1px solid #ccc", borderRadius: "5px" }}
          ></iframe>
        </>
      )}
    </div>
  );
}

export default Content;
