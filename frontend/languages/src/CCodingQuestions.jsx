import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";

const CCodingQuestions = () => {
  const [activeTab, setActiveTab] = useState("Basic");

  const questions = {
    Basic: [
      {
        id: 1,
        question: "Print Hello World",
        code: `#include <stdio.h>
int main() {
    printf("Hello World");
    return 0;
}`,
        output: "Hello World",
      },
      {
        id: 2,
        question: "Sum of two numbers",
        code: `#include <stdio.h>
int main() {
    int a = 5, b = 7;
    printf("%d", a + b);
    return 0;
}`,
        output: "12",
      },
      {
        id: 3,
        question: "Even or Odd",
        code: `#include <stdio.h>
int main() {
    int n = 4;
    if(n % 2 == 0)
        printf("Even");
    else
        printf("Odd");
    return 0;
}`,
        output: "Even / Odd",
      },
    ],

    Intermediate: [
      {
        id: 4,
        question: "Factorial",
        code: `#include <stdio.h>
int main() {
    int n = 5, fact = 1;
    for(int i=1;i<=n;i++)
        fact *= i;
    printf("%d", fact);
    return 0;
}`,
        output: "120",
      },
      {
        id: 5,
        question: "Reverse Number",
        code: `#include <stdio.h>
int main() {
    int n = 123, rev = 0;
    while(n != 0) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    printf("%d", rev);
    return 0;
}`,
        output: "321",
      },
    ],

    Advanced: [
      {
        id: 6,
        question: "Pointers Example",
        code: `#include <stdio.h>
int main() {
    int a = 10;
    int *p = &a;
    printf("%d", *p);
    return 0;
}`,
        output: "10",
      },
    ],
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Copied!");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        C Coding Questions
      </h1>

      <div className="flex gap-4 mb-8">
        {["Basic", "Intermediate", "Advanced"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === tab ? "bg-blue-700 text-white" : "bg-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

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
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md mb-2"
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

export default CCodingQuestions;