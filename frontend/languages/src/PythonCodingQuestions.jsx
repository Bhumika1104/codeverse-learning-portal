import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";

const PythonCodingQuestions = () => {
  const [activeTab, setActiveTab] = useState("Basic");

  const questions = {
    Basic: [
      {
        id: 1,
        question: "Print Hello World",
        code: `print("Hello World")`,
        output: "Hello World",
      },
      {
        id: 2,
        question: "Sum of two numbers",
        code: `a = 5
b = 7
print(a + b)`,
        output: "12",
      },
      {
        id: 3,
        question: "Even or Odd",
        code: `n = int(input())
if n % 2 == 0:
    print("Even")
else:
    print("Odd")`,
        output: "Even / Odd",
      },
      {
        id: 4,
        question: "Factorial of a number",
        code: `n = 5
fact = 1
for i in range(1, n+1):
    fact *= i
print(fact)`,
        output: "120",
      },
      {
        id: 5,
        question: "Reverse a string",
        code: `s = "Python"
print(s[::-1])`,
        output: "nohtyP",
      },
    ],

    Intermediate: [
      {
        id: 6,
        question: "Palindrome String",
        code: `s = "level"
if s == s[::-1]:
    print("Palindrome")
else:
    print("Not Palindrome")`,
        output: "Palindrome",
      },
      {
        id: 7,
        question: "Largest in Array",
        code: `arr = [2, 9, 1, 7]
print(max(arr))`,
        output: "9",
      },
      {
        id: 8,
        question: "Fibonacci Series",
        code: `a, b = 0, 1
for i in range(7):
    print(a, end=" ")
    a, b = b, a + b`,
        output: "0 1 1 2 3 5 8",
      },
      {
        id: 9,
        question: "Prime Number Check",
        code: `n = 11
flag = True
for i in range(2, n):
    if n % i == 0:
        flag = False
        break
print("Prime" if flag else "Not Prime")`,
        output: "Prime",
      },
      {
        id: 10,
        question: "Sum of Array",
        code: `arr = [1, 2, 3, 4]
print(sum(arr))`,
        output: "10",
      },
    ],

    Advanced: [
      {
        id: 11,
        question: "File Handling Example",
        code: `with open("a.txt", "r") as f:
    print(f.readline())`,
        output: "File content",
      },
      {
        id: 12,
        question: "Dictionary Example",
        code: `d = {1: "A", 2: "B"}
print(d)`,
        output: "{1: 'A', 2: 'B'}",
      },
      {
        id: 13,
        question: "Exception Handling",
        code: `try:
    print(5/0)
except Exception as e:
    print("Error:", e)`,
        output: "Error: division by zero",
      },
      {
        id: 14,
        question: "Class Example",
        code: `class Student:
    def __init__(self, name):
        self.name = name

s = Student("Amit")
print(s.name)`,
        output: "Amit",
      },
      {
        id: 15,
        question: "Inheritance Example",
        code: `class A:
    def show(self):
        print("A")

class B(A):
    pass

obj = B()
obj.show()`,
        output: "A",
      },
    ],
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Copied!");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-green-600 mb-6">
        Python Coding Questions
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        {["Basic", "Intermediate", "Advanced"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === tab ? "bg-green-700 text-white" : "bg-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {questions[activeTab].map((q) => (
          <motion.div
            key={q.id}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-700 text-black rounded-xl shadow-lg p-5 border"
          >
            <h2 className="text-lg font-semibold mb-3">{q.question}</h2>

            <button
              onClick={() => copyCode(q.code)}
              className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-md mb-2"
            >
              <Copy size={16} /> Copy
            </button>

            <pre className="bg-gray-900 text-green-300 p-4 rounded-lg text-sm overflow-auto">
              {q.code}
            </pre>

            <h3 className="text-lg font-bold mt-4">Output:</h3>
            <pre className="bg-gray-100 p-3 rounded-lg text-sm">
              {q.output}
            </pre>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PythonCodingQuestions;