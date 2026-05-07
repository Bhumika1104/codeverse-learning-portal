import React, { useState } from "react";
import { motion } from "framer-motion";

// ⭐ Enhanced Roadmaps with More Topics + Timeline Style + Checkboxes
const roadmaps = {
  Java: {
    basic: [
      "Introduction to Java & JVM/JDK/JRE",
      "Installation & Setup (JDK, IntelliJ, VS Code)",
      "Variables, Data Types, Type Casting",
      "Operators & Expressions",
      "Conditional Statements",
      "Loops (for, while, do-while)",
      "Functions & Method Overloading",
      "Arrays (1D, 2D, Multi-dimensional)",
      "Strings & StringBuilder",
      "OOP Basics (Class, Object)"
    ],
    medium: [
      "OOP Deep Concepts",
      "Constructors & This/Super Keyword",
      "Inheritance & Polymorphism",
      "Interfaces & Abstraction",
      "Packages & Access Modifiers",
      "Collections Framework",
      "Generics",
      "Exception Handling",
      "File Handling",
      "Multithreading Basics"
    ]
  },

  Python: {
    basic: [
      "Variables & Data Types",
      "Input/Output",
      "Loops & Conditions",
      "Lists, Tuples, Sets",
      "Functions & Modules",
      "Basic File Handling"
    ],
    medium: [
      "OOP in Python",
      "Decorators & Generators",
      "Error Handling",
      "Working with JSON",
      "Virtual Environments",
      "NumPy Basics"
    ]
  },
  "C++": {
  basic: [
    "Syntax & Structure",
    "Variables, Data Types",
    "Input/Output",
    "Conditional Statements",
    "Loops",
    "Functions",
    "Arrays & Strings",
    "Pointers & References"
  ],
  medium: [
    "Object-Oriented Programming",
    "Constructors & Destructors",
    "Operator Overloading",
    "Inheritance & Polymorphism",
    "Templates",
    "Exception Handling",
    "Standard Template Library (STL)"
  ]
},
C: {
  basic: [
    "Basics of C",
    "Structure of C Program",
    "Compilation & Execution",
    "Variables",
    "Data Types",
    "Input/Output (printf, scanf)",
    "Operators",
    "Control Statements (if, else, switch)",
    "Loops (for, while, do-while)",
    "Functions",
    "Recursion",
    "Arrays",
    "Strings"
  ],

  medium: [
    "Pointers",
    "Pointer Arithmetic",
    "Dynamic Memory Allocation",
    "Structures",
    "File Handling",
    "Preprocessor Directives",
    "Practice Problems"
  ]
},
JavaScript: {
  basic: [
    "Variables (var, let, const)",
    "Data Types",
    "Functions",
    "Arrays & Objects",
    "DOM Manipulation",
    "Events"
  ],
  medium: [
    "ES6 Features (Arrow Functions, Spread, Rest)",
    "Promises & Async/Await",
    "Fetch API",
    "Modules & Imports",
    "LocalStorage & SessionStorage"
  ],
  advanced: [
    "ReactJS",
    "Node.js",
    "Express.js",
    "API Development",
    "WebSockets",
    "Next.js",
    "Authentication (JWT)"
  ]
},
HTML: {
  basic: [
    "HTML Structure",
    "Text & Formatting Tags",
    "Lists & Tables",
    "Forms & Input Elements",
    "Media Tags (audio/video)"
  ],
  medium: [
    "Semantic HTML",
    "Iframes",
    "Canvas Basics",
    "SVG Basics",
    "Meta Tags"
  ],
  advanced: [
    "SEO Optimization",
    "Accessibility Rules",
    "Structured Data",
    "Performance Optimization"
  ]
},
CSS: {
  basic: [
    "Selectors & Properties",
    "Colors & Fonts",
    "Box Model",
    "Display & Position"
  ],
  medium: [
    "Flexbox",
    "Grid Layout",
    "Transitions & Animations",
    "Responsive Design (Media Queries)"
  ],
  advanced: [
    "Tailwind CSS",
    "Sass/SCSS",
    "UI Frameworks",
    "Advanced Animations (Keyframes)",
    "CSS Architecture (BEM)"
  ]
},
PHP: {
  basic: [
    "Introduction to PHP & Syntax",
    "Variables, Data Types & Constants",
    "Operators & Expressions",
    "Conditionals (if, else, switch)",
    "Loops (for, while, foreach)",
    "Arrays (Indexed, Associative, Multidimensional)",
    "Functions (Built-in & User-defined)",
    "Working with Forms (GET/POST)"
  ],
  medium: [
    "String & Array Functions",
    "Sessions & Cookies",
    "File Handling (read/write uploads)",
    "Include & Require",
    "Basic OOP in PHP (Classes, Objects, Inheritance)",
    "Error & Exception Handling",
    "Working with MySQL using mysqli/PDO",
    "Basic Authentication (Login/Signup)"
  ],
  advanced: [
    "Advanced OOP (Traits, Interfaces, Abstract Classes)",
    "MVC Architecture",
    "Routing & Controllers",
    "Building REST APIs in PHP",
    "JWT Authentication",
    "Composer & Dependency Management",
    "Using Frameworks (Laravel / CodeIgniter)",
    "Security (XSS, CSRF, SQL Injection, Hashing)"
  ]
},
SQL: {
  basic: [
    "Introduction to Databases & SQL",
    "Data Types & Constraints",
    "CREATE, SELECT, INSERT, UPDATE, DELETE",
    "Filtering Data (WHERE, LIKE, IN, BETWEEN)",
    "Sorting & Aliasing",
    "Primary Key & Foreign Key Basics"
  ],
  medium: [
    "Joins (INNER, LEFT, RIGHT, FULL)",
    "Aggregate Functions (COUNT, SUM, AVG)",
    "GROUP BY & HAVING",
    "Subqueries",
    "Views & Indexes",
    "Stored Procedures & Functions"
  ],
  advanced: [
    "Triggers & Events",
    "Transactions (COMMIT, ROLLBACK, SAVEPOINT)",
    "Normalization (1NF, 2NF, 3NF, BCNF)",
    "Query Optimization Techniques",
    "Database Design & ER Diagrams",
    "Security (User Roles, GRANTS, Backups)",
    "Working with NoSQL (MongoDB Basics)"
  ]
},
'C#': {
  basic: [
    "C# Syntax & Structure",
    "Variables & Data Types",
    "Operators",
    "Conditions & Loops",
    "Methods & Parameters",
    "Arrays & Lists",
    "Basic OOP: Classes & Objects, Inheritance"
  ],
  medium: [
    "Interfaces & Abstract Classes",
    "Exception Handling",
    "Collections & Generics",
    "LINQ Basics",
    "File Handling & Serialization",
    "Delegates & Events",
    "Windows Forms / WPF Basics"
  ],
  advanced: [
    ".NET Framework & .NET Core Concepts",
    "Advanced LINQ",
    "Entity Framework & ORM",
    "ASP.NET MVC Web Development",
    "REST API Development",
    "Asynchronous Programming (async/await)",
    "Dependency Injection & Design Patterns",
    "Cloud Deployment (Azure Basics)"
  ]
},
TypeScript: {
  basic: [
    "What is TypeScript & Why Use It?",
    "Installing & Setting Up TypeScript (tsc)",
    "Basic Types (string, number, boolean)",
    "Union & Literal Types",
    "Arrays & Tuples",
    "Functions with Types",
    "Type Inference",
    "Interfaces & Type Aliases"
  ],
  medium: [
    "Classes & OOP in TypeScript",
    "Access Modifiers (public, private, protected)",
    "Generics (Functions, Interfaces, Classes)",
    "Enums",
    "Modules & Import/Export",
    "Narrowing & Type Guards",
    "Decorators (Basics)",
    "Working with JSON & APIs"
  ],
  advanced: [
    "Advanced Types (Mapped, Conditional, Intersection)",
    "Utility Types (Partial, Pick, Omit, Required)",
    "TypeScript with Node.js",
    "TypeScript with React",
    "Advanced Generics",
    "Decorators in Depth",
    "TypeScript Compiler Options (tsconfig)",
    "Building Large-Scale TS Projects"
  ]
},

  Ruby: {
    basic: [
      "Ruby Syntax & Structure",
      "Variables & Data Types",
      "Strings, Arrays & Hashes",
      "Conditions & Loops",
      "Methods & Blocks",
      "File Handling Basics",
      "Intro to RubyGems"
    ],
    medium: [
      "Advanced OOP (Classes, Modules, Mixins)",
      "Exception Handling",
      "Metaprogramming Basics",
      "Working with APIs",
      "Bundler & Gem Management",
      "Ruby on Rails Basics",
      "Database Handling with ActiveRecord"
    ],
    advanced: [
      "Rails Advanced (MVC, Routing, Controllers)",
      "Authentication & Authorization",
      "Background Jobs (Sidekiq)",
      "Testing (RSpec)",
      "Caching & Performance",
      "Security Best Practices",
      "Deploying Rails Apps"
    ]
  },

  Swift: {
    basic: [
      "Swift Syntax & Variables",
      "Data Types & Collections",
      "Control Flow",
      "Functions & Closures",
      "Optionals",
      "Structs & Enums",
      "Basic iOS App Structure"
    ],
    medium: [
      "Object-Oriented Swift",
      "Protocols & Extensions",
      "Error Handling",
      "SwiftUI Basics",
      "AutoLayout & UIKit",
      "Networking in Swift",
      "Using REST APIs"
    ],
    advanced: [
      "Advanced SwiftUI",
      "Concurrency (async/await)",
      "Core Data",
      "MVVM Architecture",
      "Push Notifications",
      "App Store Deployment",
      "Security & Keychain"
    ]
  },

  Kotlin: {
    basic: [
      "Kotlin Syntax",
      "Variables & Types",
      "Functions & Lambdas",
      "Classes & Objects",
      "Null Safety",
      "Collections & Loops",
      "Basic Android Studio Setup"
    ],
    medium: [
      "OOP & Inheritance",
      "Extension Functions",
      "Coroutines Basics",
      "Android UI Components",
      "Networking & APIs",
      "RecyclerView & Adapters",
      "Room Database"
    ],
    advanced: [
      "Advanced Coroutines & Flows",
      "MVVM Architecture",
      "Jetpack Compose",
      "Dependency Injection (Hilt/Koin)",
      "Advanced Android Security",
      "Firebase Integration",
      "Publishing Android Apps"
    ]
  },

  Go: {
    basic: [
      "Go Installation & Environment",
      "Variables & Data Types",
      "Functions",
      "Arrays, Slices & Maps",
      "Pointers",
      "Structs & Interfaces",
      "Basic File I/O"
    ],
    medium: [
      "Goroutines & Channels",
      "Concurrency Patterns",
      "Error Handling",
      "Go Modules",
      "Working with JSON",
      "Building CLI Applications",
      "REST APIs with net/http"
    ],
    advanced: [
      "Microservices in Go",
      "gRPC Fundamentals",
      "Testing & Benchmarking",
      "Database Handling",
      "Dockerizing Go Apps",
      "Performance Optimization",
      "Clean Architecture"
    ]
  },

  Rust: {
    basic: [
      "Rust Syntax",
      "Variables & Mutability",
      "Ownership & Borrowing",
      "Data Types & Enums",
      "Control Flow",
      "Functions & Modules",
      "Cargo Basics"
    ],
    medium: [
      "Structs & Traits",
      "Collections",
      "Error Handling",
      "Lifetimes",
      "Generics",
      "Working with Files",
      "Concurrency Basics"
    ],
    advanced: [
      "Async Rust (tokio)",
      "Systems Programming",
      "Memory Optimization",
      "Writing Web Servers (Rocket/Actix)",
      "Unsafe Rust",
      "FFI & Interoperability",
      "Building CLI & Tools"
    ]
  },

  Dart: {
    basic: [
      "Dart Syntax",
      "Variables & Data Types",
      "Functions",
      "Lists, Maps & Sets",
      "Loops & Conditions",
      "OOP Basics",
      "Null Safety"
    ],
    medium: [
      "Classes, Inheritance & Mixins",
      "Asynchronous Programming (Futures/Streams)",
      "Flutter Widgets",
      "Navigation & Routing",
      "State Management Basics",
      "Working with APIs"
    ],
    advanced: [
      "Advanced Flutter (Animations)",
      "Provider/Bloc/Riverpod",
      "Database Integration",
      "Firebase Auth",
      "Publishing Apps",
      "Performance Optimization",
      "Building Reusable Components"
    ]
  },

  R: {
    basic: [
      "R Syntax & Setup",
      "Vectors, Matrices, Lists",
      "Data Frames",
      "Basic Statistics",
      "Importing Data",
      "Basic Plotting"
    ],
    medium: [
      "dplyr for Data Manipulation",
      "ggplot2 for Visualizations",
      "Functions & Loops",
      "Applying Statistical Models",
      "Working with CSV, Excel, Databases",
      "Data Cleaning Techniques"
    ],
    advanced: [
      "Machine Learning in R",
      "Shiny Web Apps",
      "Advanced Data Visualization",
      "Time-Series Analysis",
      "Deep Learning with R",
      "Parallel Computing",
      "R Markdown Reporting"
    ]
  },

  MATLAB: {
    basic: [
      "MATLAB Environment",
      "Variables & Arrays",
      "Matrices & Operations",
      "Functions & Scripts",
      "Plots & Visualization",
      "Basic File Handling"
    ],
    medium: [
      "Advanced Plotting",
      "Control Flow",
      "Linear Algebra",
      "Signal Processing Basics",
      "Optimization Techniques",
      "Toolboxes Overview"
    ],
    advanced: [
      "Advanced Signal Processing",
      "Machine Learning in MATLAB",
      "Image Processing",
      "Simulink Basics",
      "Automation & Scripting",
      "Deploying MATLAB Apps"
    ]
  },

  NodeJS: {
    basic: [
      "Node.js Basics & Installation",
      "Modules & NPM",
      "File System & Streams",
      "Async Programming (Callbacks & Promises)",
      "Building a Basic HTTP Server",
      "Event Loop Concept"
    ],
    medium: [
      "Express.js Framework",
      "Routing & Middleware",
      "REST API Development",
      "MongoDB with Mongoose",
      "Authentication (JWT, Cookies)",
      "MVC Structure"
    ],
    advanced: [
      "WebSockets (Socket.io)",
      "Microservices with Node.js",
      "Redis & Caching",
      "Message Queues (RabbitMQ / Kafka)",
      "Testing (Mocha/Jest)",
      "Scaling & Load Balancing",
      "CI/CD Deployment"
    ]
}
  // Add more languages similarly...
};

export default function RoadmapPage({ selectedLanguage }) {
  if (!selectedLanguage) return null;

  const roadmap = roadmaps[selectedLanguage];
  const [checked, setChecked] = useState(() => {
  const saved = localStorage.getItem("roadmapProgress");
  return saved ? JSON.parse(saved) : {};
});

  

  if (!roadmap) return <p className="text-center mt-10">No roadmap available.</p>;

  const toggleCheck = (key) => {
  setChecked((prev) => {
    const updated = {
      ...prev,
      [selectedLanguage]: {
        ...(prev[selectedLanguage] || {}),
        [key]: !((prev[selectedLanguage] || {})[key])
      }
    };

    localStorage.setItem("roadmapProgress", JSON.stringify(updated));
    return updated;
  });
};
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-blue-50 shadow-xl rounded-2xl mt-10 border"
    >
      <h2 className="text-4xl font-bold text-purple-700 text-center mb-8 drop-shadow-md">
        {selectedLanguage} Learning Roadmap
      </h2>

      {renderTimeline("First Level", roadmap.basic, checked, toggleCheck, selectedLanguage)}
{renderTimeline("Second Level", roadmap.medium, checked, toggleCheck, selectedLanguage)}

    </motion.div>
  );
}

// 🎯 Timeline Box Component
 function renderTimeline(title, topics, checked, toggleCheck, selectedLanguage) {

  return (
    <div className="mb-10">
      <h3 className="text-3xl font-semibold text-blue-700 mb-5">{title}</h3>

      <div className="relative border-l-4 border-purple-500 pl-6 space-y-6">
        {topics.map((topic, index) => {
          const key = `${title}-${index}`;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-white p-4 rounded-xl shadow-md border hover:shadow-xl duration-300 flex items-start gap-3"
            >
              <input
  type="checkbox"
  checked={checked[selectedLanguage]?.[key] || false}
  onClick={() => {
    if (!checked[selectedLanguage]?.[key]) toggleCheck(key);
  }}
  onDoubleClick={() => {
    if (checked[selectedLanguage]?.[key]) toggleCheck(key);
  }}
  className="w-5 h-5 mt-1 cursor-pointer accent-purple-600"
/>
              <div>
                <p className="text-lg font-medium text-gray-800">
                  <span className="text-purple-600 font-bold mr-2">{index + 1}.</span>
                  {topic}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}