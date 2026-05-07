import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "./resumeStyles.css"; // <-- CSS FILE ADDED

const ResumeBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    experience: "",
    projects: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ================================
  // PDF GENERATION
  // ================================
  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");

    if (selectedTemplate === "template1") {
      generateTemplate1(doc);
    } else {
      generateTemplate2(doc);
    }

    doc.save(`${formData.name || "Resume"}.pdf`);
  };

  const generateTemplate1 = (doc) => {
    doc.setFillColor(235, 235, 255);
    doc.rect(0, 0, 210, 30, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text(formData.name, 15, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Email: ${formData.email}`, 15, 38);
    doc.text(`Phone: ${formData.phone}`, 15, 46);

    let y = 60;
    addSection(doc, "Education", formData.education, y);
    y += 25;
    addSection(doc, "Skills", formData.skills, y);
    y += 25;
    addSection(doc, "Experience", formData.experience, y);
    y += 25;
    addSection(doc, "Projects", formData.projects, y);
  };

  const generateTemplate2 = (doc) => {
    doc.setFillColor(60, 60, 120);
    doc.rect(0, 0, 60, 297, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text(formData.name, 10, 20);
    doc.setFontSize(10);
    doc.text(`Email: ${formData.email}`, 10, 35);
    doc.text(`Phone: ${formData.phone}`, 10, 42);

    let x = 75;
    let y = 30;

    doc.setTextColor(0, 0, 0);
    addSection(doc, "Education", formData.education, y, x);
    y += 25;
    addSection(doc, "Skills", formData.skills, y, x);
    y += 25;
    addSection(doc, "Experience", formData.experience, y, x);
    y += 25;
    addSection(doc, "Projects", formData.projects, y, x);
  };

  const addSection = (doc, title, body, y, x = 15) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(title, x, y);

    doc.setFont("helvetica", "normal");
    doc.text(body || "Not Provided", x, y + 8, { maxWidth: 120 });
  };

  // ================================
  // UI STARTS HERE
  // ================================
  return (
    <div className="resume-container">

      <h1 className="main-title">Resume Builder</h1>

      {/* TEMPLATE SELECTION */}
      {!selectedTemplate && (
        <div className="template-grid">
          <div
            className="template-card"
            onClick={() => setSelectedTemplate("template1")}
          >
            <h3>Professional Template</h3>
            <img
              src="https://i.redd.it/cmna3cgxi4ld1.jpeg"
              alt="Template 1"
            />
          </div>

          <div
            className="template-card"
            onClick={() => setSelectedTemplate("template2")}
          >
            <h3>Modern Simple Template</h3>
            <img
              src="https://marketplace.canva.com/EAFszEvkM50/2/0/1131w/canva-simple-professional-cv-resume-36p5VOFVDxY.jpg"
              alt="Template 2"
            />
          </div>
        </div>
      )}

      {/* FORM + LIVE PREVIEW */}
      {selectedTemplate && (
        <div className="editor-layout">
          {/* LEFT FORM */}
          <form className="form-box">
            <h2 className="form-title">Enter Your Details</h2>

            {Object.keys(formData).map((field) => (
              <div key={field} className="form-field">
                <label>{field.toUpperCase()}</label>
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  rows={field === "experience" || field === "education" ? 3 : 1}
                />
              </div>
            ))}

            <button type="button" className="btn-generate" onClick={generatePDF}>
              Generate PDF
            </button>

            <button
              type="button"
              className="btn-back"
              onClick={() => setSelectedTemplate(null)}
            >
              Change Template
            </button>
          </form>

          {/* RIGHT LIVE PREVIEW */}
          <div className="preview-box">
            {selectedTemplate === "template1" ? (
              <div className="resume-template1">
                <div className="header">{formData.name || "Your Name"}</div>
                <div className="section">
                  <h4>Contact</h4>
                  <p>Email: {formData.email}</p>
                  <p>Phone: {formData.phone}</p>
                </div>
                <div className="section">
                  <h4>Education</h4>
                  <p>{formData.education}</p>
                </div>
                <div className="section">
                  <h4>Skills</h4>
                  <p>{formData.skills}</p>
                </div>
                <div className="section">
                  <h4>Experience</h4>
                  <p>{formData.experience}</p>
                </div>
                <div className="section">
                  <h4>Projects</h4>
                  <p>{formData.projects}</p>
                </div>
              </div>
            ) : (
              <div className="resume-template2">
                <div className="left-bar">
                  <h2>{formData.name || "Your Name"}</h2>
                  <p>Email: {formData.email}</p>
                  <p>Phone: {formData.phone}</p>
                </div>

                <div className="right-content">
                  <div className="section">
                    <h4>Education</h4>
                    <p>{formData.education}</p>
                  </div>
                  <div className="section">
                    <h4>Skills</h4>
                    <p>{formData.skills}</p>
                  </div>
                  <div className="section">
                    <h4>Experience</h4>
                    <p>{formData.experience}</p>
                  </div>
                  <div className="section">
                    <h4>Projects</h4>
                    <p>{formData.projects}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
