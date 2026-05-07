
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

const NotesSection = () => {
  const [notes, setNotes] = useState("");
  const [bgColor, setBgColor] = useState("bg-gray-50");
  const [textColor, setTextColor] = useState("text-gray-900");

  useEffect(() => {
    const savedNotes = localStorage.getItem("userNotes");
    if (savedNotes) setNotes(savedNotes);
  }, []);

  const handleNotesChange = (e) => {
    const value = e.target.value;
    setNotes(value);
    localStorage.setItem("userNotes", value);
  };

  const handleColorChange = (color) => {
    setBgColor(color);
  };

  const handleTextColorChange = (color) => {
    setTextColor(color);
  };

  const handleClearNotes = () => {
    setNotes("");
    localStorage.removeItem("userNotes");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.text(notes || "Empty Notes", 10, 10);
    doc.save("my-notes.pdf");
  };

  return (
    <div className="
      max-w-4xl mx-auto my-8 p-6 rounded-2xl
      bg-white dark:bg-gray-900
      border-2 border-purple-500
      shadow-[0_0_25px_rgba(168,85,247,0.5)]
      transition-all duration-500 transform hover:scale-[1.02]
    ">
      
      {/* Heading */}
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-600 dark:text-purple-300">
        Your Notes
      </h2>

      {/* Background Color Selector */}
      <div className="flex justify-center gap-3 mb-3">
        <button className="w-6 h-6 rounded-full bg-gray-50 border hover:scale-110 transition" onClick={() => handleColorChange("bg-gray-50")} />
        <button className="w-6 h-6 rounded-full bg-yellow-50 border hover:scale-110 transition" onClick={() => handleColorChange("bg-yellow-50")} />
        <button className="w-6 h-6 rounded-full bg-green-50 border hover:scale-110 transition" onClick={() => handleColorChange("bg-green-50")} />
        <button className="w-6 h-6 rounded-full bg-blue-50 border hover:scale-110 transition" onClick={() => handleColorChange("bg-blue-50")} />
      </div>

      {/* Text Color Selector */}
      <div className="flex justify-center gap-3 mb-4">
        <button className="w-6 h-6 rounded-full bg-black hover:scale-110 transition" onClick={() => handleTextColorChange("text-black")} />
        <button className="w-6 h-6 rounded-full bg-red-500 hover:scale-110 transition" onClick={() => handleTextColorChange("text-red-500")} />
        <button className="w-6 h-6 rounded-full bg-blue-500 hover:scale-110 transition" onClick={() => handleTextColorChange("text-blue-500")} />
        <button className="w-6 h-6 rounded-full bg-green-500 hover:scale-110 transition" onClick={() => handleTextColorChange("text-green-500")} />
      </div>

      {/* Notes Textarea */}
      <textarea
        className={`w-full h-96 p-5 text-lg rounded-xl border-2 focus:outline-none focus:ring-4
        ${bgColor} ${textColor}
        dark:bg-gray-700 dark:text-gray-100
        resize-none shadow-md transition-all duration-500`}
        placeholder="Type your notes here..."
        value={notes}
        onChange={handleNotesChange}
      />

      {/* Bottom Controls */}
      <div className="flex justify-between mt-3 items-center">
        <div className="text-sm text-gray-500">
          {notes.length} / 1000 characters
        </div>

        <div className="flex gap-3">
          
          {/* Download Button */}
          <button
            className="
              px-4 py-2 text-white rounded-lg
              bg-gradient-to-r from-purple-500 to-pink-500
              shadow-md hover:shadow-[0_0_15px_rgba(168,85,247,0.8)]
              hover:scale-105 transition-all duration-300
            "
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>

          {/* Clear Button */}
          <button
            className="
              px-4 py-2 text-white rounded-lg
              bg-gradient-to-r from-red-500 to-orange-500
              shadow-md hover:shadow-[0_0_15px_rgba(239,68,68,0.8)]
              hover:scale-105 transition-all duration-300
            "
            onClick={handleClearNotes}
          >
            Clear Notes
          </button>

        </div>
      </div>
    </div>
  );
};

export default NotesSection;
