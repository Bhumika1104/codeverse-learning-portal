
import React, { useState } from "react";

function Registration({ goToLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const userData = {
      name: fullName,
      email: email,
      password: password
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("Registration successful!");
        console.log("Saved User:", data);

        setFullName("");
        setEmail("");
        setPassword("");

        goToLogin();
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      console.log(error);
      alert("Server error! Check backend running.");
    }
  };

  return (

    <div
      className="min-h-screen text-white bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/ec/93/2c/ec932c9c8d440cc62a4a40707963d8c2.jpg')",
      }}
    >
      {/* TOP TITLE WITH ANIMATION */}
      <div className="text-center pt-8">
        <h1 className="text-6xl font-extrabold tracking-wide animate-gradient-x bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-[length:200%_200%] bg-clip-text text-transparent">
           Welcome to SmartCodePrep
        </h1>
      </div>

      <div className="flex mt-10">
        {/* LEFT CONTENT */}
<div className="w-3/5 px-16 py-16 bg-transparent rounded-3xl shadow-2xl min-h-[780px]">

  <div className="flex items-center gap-12 h-full">

    {/* LEFT IMAGE */}
    <div className="flex-1 flex justify-center">
      <img
        src="/hero2-image.png"
        alt="SmartCodePrep"
        className="w-[550px] h-[650px] object-contain"
      />
    </div>

    {/* RIGHT CONTENT */}
    <div className="flex-1 text-white">

      {/* TITLE */}
      <h2 className="text-4xl font-extrabold text-orange-400 mb-4">
        About Me
      </h2>

      {/* PARAGRAPH */}
      <p className="text-gray-300 leading-relaxed mb-6">
        Learn Smart. Practice Smart. Get Job Ready. SmartCodePrep is a simple
        and smart platform to learn programming easily. Whether you are just
        starting or preparing for interviews, this website helps you practice,
        improve, and build confidence. You can solve questions, give
        voice-based interviews, and check your performance instantly.
        Learning here is easy, interactive, and fun.
      </p>

      {/* CTA */}
      <p className="text-orange-400 font-semibold mb-8">
        Create your free account and begin your coding journey today!
      </p>

      {/* ICONS */}
      <div className="grid grid-cols-4 gap-6">

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
          <div
            key={i}
            className="flex flex-col items-center"
          >
            {/* ROUND ICON */}
            <div className="w-14 h-14 flex items-center justify-center rounded-full
              border-2 border-orange-400 text-2xl text-orange-400
              hover:bg-orange-400 hover:text-white transition">
              {icon}
            </div>

            {/* TEXT */}
            <p className="mt-2 text-sm font-semibold text-orange-300">
              {name}
            </p>
          </div>
        ))}

      </div>

    </div>

  </div>
</div>


        {/* RIGHT SIDE BIG CARD */}
        <div className="w-2/5 flex items-center justify-center">
          <div className="w-[500px] p-12 rounded-3xl border border-purple-500 bg-black/70 shadow-[0_0_50px_rgba(255,0,255,0.8)] backdrop-blur-lg">

            <h2 className="text-3xl font-bold text-center mb-8">
              Register
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-5 mb-5 text-lg rounded-xl bg-transparent border border-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition"
            />

            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-5 mb-5 text-lg rounded-xl bg-transparent border border-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition"
            />

            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-5 mb-6 text-lg rounded-xl bg-transparent border border-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition"
            />

            <button
              onClick={handleRegister}
              className="w-full py-5 text-xl rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition duration-300 shadow-lg"
            >
              Register
            </button>

            <p className="text-center mt-6 text-lg text-gray-300">
              Already have an account?{" "}
              <span
                onClick={goToLogin}
                className="text-pink-400 cursor-pointer font-semibold hover:underline"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ANIMATION STYLE */}
      <style>
        {`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .animate-gradient-x {
          animation: gradientMove 4s linear infinite;
        }
      `}
      </style>
    </div>
  );


  
}


export default Registration;

