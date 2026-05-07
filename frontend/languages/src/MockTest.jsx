
import React, { useState, useEffect, useMemo } from 'react';

const LANGUAGES = [
  "C", "C++", "Java", "Python", "JavaScript", "HTML", "CSS", "PHP", "SQL", "C#",
  "Ruby", "Swift", "Kotlin", "TypeScript", "Go", "Rust", "Dart", "R", "MATLAB", "NodeJS",
];

const QUESTION_SETS = {
  Java: {
    beginner: [
      { q: "Which keyword is used to define a class in Java?", options: ["class", "def", "struct", "object"], correct: "class" },
      { q: "Which data type stores whole numbers?", options: ["int", "float", "char", "boolean"], correct: "int" },
      { q: "Which symbol ends a Java statement?", options: [";", "!", ":", "."], correct: ";" },
      { q: "Which of these is NOT a Java feature?", options: ["Platform Independent", "Object-Oriented", "Pointer Arithmetic", "Secure"], correct: "Pointer Arithmetic" },
      { q: "Which method is the entry point of a Java program?", options: ["main()", "start()", "run()", "execute()"], correct: "main()" },
      { q: "Which company originally developed Java?", options: ["Sun Microsystems", "Microsoft", "IBM", "Oracle"], correct: "Sun Microsystems" },
      { q: "Which keyword creates an object?", options: ["new", "create", "object", "instance"], correct: "new" },
      { q: "Which of these is a loop structure?", options: ["for", "jump", "switch", "break"], correct: "for" },
      { q: "Java bytecode runs on:", options: ["JVM", "CPU", "Browser", "Database"], correct: "JVM" },
      { q: "Which is a valid Java identifier?", options: ["myVar", "2var", "var-name", "class"], correct: "myVar" },
      { q: "Which operator compares two values?", options: ["==", "=", "!=", "==="], correct: "==" },
      { q: "Which data type stores true/false?", options: ["boolean", "int", "char", "long"], correct: "boolean" },
      { q: "Java source files use extension:", options: [".java", ".jav", ".j", ".class"], correct: ".java" },
      { q: "What is the size of boolean?", options: ["1 bit", "Not defined", "8 bits", "32 bits"], correct: "Not defined" },
      { q: "Which loop always runs at least once?", options: ["do-while", "while", "for", "foreach"], correct: "do-while" },
      { q: "Default value of int?", options: ["0", "null", "undefined", "1"], correct: "0" },
      { q: "Java is:", options: ["Platform Independent", "OS Dependent", "Assembly Language", "Machine Code"], correct: "Platform Independent" },
      { q: "Which keyword stops a loop?", options: ["break", "stop", "exit", "finish"], correct: "break" },
      { q: "Which converts string to int?", options: ["Integer.parseInt()", "parseInt()", "convert()", "int()"], correct: "Integer.parseInt()" },
      { q: "Which is not primitive?", options: ["String", "int", "boolean", "char"], correct: "String" },
    ],
    medium: [
      { q: "Which exception is checked?", options: ["IOException", "NullPointerException", "ArithmeticException", "ArrayIndexOutOfBounds"], correct: "IOException" },
      { q: "Which keyword is used for inheritance?", options: ["extends", "implements", "inherits", "superclass"], correct: "extends" },
      { q: "Which collection allows duplicates?", options: ["List", "Set", "TreeSet", "HashSet"], correct: "List" },
      { q: "Method overloading means:", options: ["same method name, diff parameters", "same method name, child class", "same signature", "none"], correct: "same method name, diff parameters" },
      { q: "Which class is parent of all Java classes?", options: ["Object", "Base", "Root", "System"], correct: "Object" },
      { q: "String is:", options: ["Immutable", "Mutable", "Temporary", "Static"], correct: "Immutable" },
      { q: "Which keyword prevents inheritance?", options: ["final", "static", "private", "public"], correct: "final" },
      { q: "What is JVM responsible for?", options: ["Executing bytecode", "Compiling Java", "Running OS", "Debugging"], correct: "Executing bytecode" },
      { q: "Which interface does ArrayList implement?", options: ["List", "Map", "Set", "Collection"], correct: "List" },
      { q: "Which converts object to byte-stream?", options: ["Serialization", "Parsing", "Casting", "Extraction"], correct: "Serialization" },
      { q: "Which block always executes?", options: ["finally", "catch", "throw", "throws"], correct: "finally" },
      { q: "Which access modifier gives package-level access?", options: ["default", "public", "private", "protected"], correct: "default" },
      { q: "Which keyword refers to parent class?", options: ["super", "this", "base", "upper"], correct: "super" },
      { q: "Which is a wrapper class?", options: ["Integer", "int", "char", "boolean"], correct: "Integer" },
      { q: "Which method is used to compare strings?", options: ["equals()", "==", "compare()", "compareToInt()"], correct: "equals()" },
      { q: "Which collection maintains insertion order?", options: ["LinkedHashMap", "HashMap", "TreeMap", "Vector"], correct: "LinkedHashMap" },
      { q: "Which is not a Java thread state?", options: ["Running", "Sleeping", "Dreaming", "Blocked"], correct: "Dreaming" },
      { q: "Garbage collection frees:", options: ["Unused objects", "Memory leaks", "Active threads", "Network resources"], correct: "Unused objects" },
      { q: "Which operator is used for short-circuit AND?", options: ["&&", "&", "||", "!"], correct: "&&" },
      { q: "Polymorphism allows:", options: ["Many forms of method", "Only one method", "No method overloading", "Only static methods"], correct: "Many forms of method" },
    ],
    advanced: [
      { q: "Which algorithm does JVM use for garbage collection?", options: ["Mark and Sweep", "DFS", "BFS", "QuickGC"], correct: "Mark and Sweep" },
      { q: "Which class is immutable?", options: ["String", "StringBuilder", "StringBuffer", "Vector"], correct: "String" },
      { q: "Which Java feature enables runtime binding?", options: ["Dynamic Binding", "Static Binding", "Overloading", "Generic"], correct: "Dynamic Binding" },
      { q: "JIT compiler improves:", options: ["Runtime performance", "Compilation", "Memory usage", "File size"], correct: "Runtime performance" },
      { q: "Which collection is thread-safe?", options: ["Vector", "ArrayList", "HashSet", "LinkedList"], correct: "Vector" },
      { q: "Which keyword is used for custom exceptions?", options: ["throw", "throws", "error", "exception"], correct: "throw" },
      { q: "Which data structure powers HashMap?", options: ["Array + LinkedList + Tree", "Array only", "Tree only", "Graph"], correct: "Array + LinkedList + Tree" },
      { q: "What is reflection used for?", options: ["Inspecting classes at runtime", "Garbage collection", "Thread handling", "Compilation"], correct: "Inspecting classes at runtime" },
      { q: "Which is a daemon thread?", options: ["GC thread", "main thread", "UI thread", "Network thread"], correct: "GC thread" },
      { q: "Java uses which model for memory?", options: ["Heap + Stack", "Queue + Stack", "Only Heap", "Register"], correct: "Heap + Stack" },
      { q: "ReentrantLock belongs to:", options: ["java.util.concurrent", "java.io", "java.time", "java.net"], correct: "java.util.concurrent" },
      { q: "Which interface is used for lambda expressions?", options: ["Functional Interface", "Runnable", "Collection", "Comparator"], correct: "Functional Interface" },
      { q: "Which framework is used for dependency injection?", options: ["Spring", "React", "Hibernate", "Angular"], correct: "Spring" },
      { q: "Hibernate is:", options: ["ORM tool", "Compiler", "Debugger", "Library"], correct: "ORM tool" },
      { q: "Java Stream API introduced in:", options: ["Java 8", "Java 7", "Java 9", "Java 11"], correct: "Java 8" },
      { q: "Which improves performance of HashMap?", options: ["Treeified buckets", "Large buckets", "Small keys", "Static hashing"], correct: "Treeified buckets" },
      { q: "Volatile keyword ensures:", options: ["Visibility across threads", "Security", "Speed", "Class loading"], correct: "Visibility across threads" },
      { q: "Thread-safe alternative to HashMap?", options: ["ConcurrentHashMap", "TreeMap", "Hashtable", "Vector"], correct: "ConcurrentHashMap" },
      { q: "Which handles asynchronous programming?", options: ["CompletableFuture", "Runnable", "Thread", "Callable"], correct: "CompletableFuture" },
      { q: "Functional Interface must have:", options: ["Exactly one abstract method", "Two methods", "No methods", "Only static methods"], correct: "Exactly one abstract method" },
    ]
  },
    Python: {
    beginner: [
      { q:"Which symbol starts a comment in Python?", options:["#","//","/*","--"], correct:"#"},
      { q:"How do you define a function?", options:["def func():","function func()","func def()","fn func()"], correct:"def func():"},
      { q:"Which data type is immutable?", options:["tuple","list","dict","set"], correct:"tuple"},
      { q:"Which keyword creates a loop over iterable?", options:["for","while","loop","iterate"], correct:"for"},
      { q:"Which is used to print output?", options:["print()","echo","console.log","printf"], correct:"print()"},
      { q:"Which symbol is used for indentation block?", options:["Indentation (spaces/tabs)","{}","begin/end","()"], correct:"Indentation (spaces/tabs)"},
      { q:"Which converts string to int?", options:["int('123')","str(123)","float('123')","parseInt('123')"], correct:"int('123')"},
      { q:"Which is Python package installer?", options:["pip","npm","gem","composer"], correct:"pip"},
      { q:"Which type holds key-value pairs?", options:["dict","list","tuple","set"], correct:"dict"},
      { q:"Which creates a list?", options:["[]","()","{}","<>"], correct:"[]"},
      { q:"Which keyword creates class?", options:["class","struct","object","module"], correct:"class"},
      { q:"Which equals operator for comparison?", options:["==","=","===","!=="], correct:"=="},
      { q:"Which method adds element to list end?", options:["append()","push()","add()","insert()"], correct:"append()"},
      { q:"Which raises an exception for invalid operation?", options:["raise","throw","except","try"], correct:"raise"},
      { q:"Which returns length?", options:["len()","size()","length()","count()"], correct:"len()"},
      { q:"Which opens file for reading?", options:["open('file','r')","fopen('file')","open('file','w')","read('file')"], correct:"open('file','r')"},
      { q:"Which checks membership in list?", options:["in","contains","has","include"], correct:"in"},
      { q:"Which is used for multiline strings?", options:["'''triple quotes'''","\"\"\"","both 1 and 2","//"], correct:"both 1 and 2"},
      { q:"Which type is floating point?", options:["float","int","complex","bool"], correct:"float"},
      { q:"How to import a module?", options:["import math","#include <math>", "using math;","require 'math'"], correct:"import math"},
    ],
    medium: [
      { q:"Which method creates generator?", options:["yield","return","generate","emit"], correct:"yield"},
      { q:"Which data type is mutable?", options:["list","tuple","str","int"], correct:"list"},
      { q:"Which comprehensions create list?", options:["[x for x in iterable]","{x for x in iterable}","(x for x in iterable)","None"], correct:"[x for x in iterable]"},
      { q:"Which decorator makes function a class method?", options:["@classmethod","@staticmethod","@property","@decorator"], correct:"@classmethod"},
      { q:"Which is context manager protocol method for entry?", options:["__enter__","__exit__","__init__","__del__"], correct:"__enter__"},
      { q:"Which library for dataframes?", options:["pandas","numpy","matplotlib","scipy"], correct:"pandas"},
      { q:"Which converts iterable to iterator start?", options:["iter()","next()","iterable()","begin()"], correct:"iter()"},
      { q:"Which raises and handles exceptions?", options:["try/except","raise/catch","throw/catch","begin/rescue"], correct:"try/except"},
      { q:"Which built-in sorts list in place?", options:["list.sort()","sorted(list)","order()","sort(list)"], correct:"list.sort()"},
      { q:"Which module for regular expressions?", options:["re","regex","regexp","rex"], correct:"re"},
      { q:"Which is immutable mapping introduced in 3.3? (MappingProxyType)", options:["types.MappingProxyType","dictproxy","frozenset","mapping"] , correct:"types.MappingProxyType"},
      { q:"Which function returns next item from iterator?", options:["next()","iterator.next()","item()","get()"], correct:"next()"},
      { q:"Which library is core for numerical arrays?", options:["numpy","pandas","math","statistics"], correct:"numpy"},
      { q:"Which allows multiple inheritance?", options:["Python allows it","Java doesn't","C# doesn't","None"], correct:"Python allows it"},
      { q:"Which is used to create virtual environments?", options:["venv","virtualenv","pipenv","All of the above"], correct:"All of the above"},
      { q:"Which provides asynchronous IO support?", options:["asyncio","threading","multiprocessing","concurrent"], correct:"asyncio"},
      { q:"Which builtin returns all object attributes?", options:["dir()","vars()","attrs()","getattr()"], correct:"dir()"},
      { q:"Which statement opens file safely using context manager?", options:["with open('f') as f:","open('f')","try open","file.open"], correct:"with open('f') as f:"},
      { q:"Which method serializes an object to bytes (pickle)?", options:["pickle.dumps","json.dumps","marshal.dumps","serialize()"], correct:"pickle.dumps"},
      { q:"Which method combines mapping and iterables? (for key,value)", options:["zip()","map()","filter()","reduce()"], correct:"zip()"},
    ],
    advanced: [
      { q:"Which protocol helps async iteration?", options:["__aiter__ and __anext__","__iter__ and __next__","async for only","await only"], correct:"__aiter__ and __anext__"},
      { q:"Which GIL stands for?", options:["Global Interpreter Lock","Global IO Lock","General Interpreter Link","Global Instance Lock"], correct:"Global Interpreter Lock"},
      { q:"Which library helps type hints enforcement at runtime?", options:["mypy (static) / pydantic (runtime)","pytest","unittest","typing"], correct:"mypy (static) / pydantic (runtime)"},
      { q:"Which yields coroutine in async def?", options:["await","yield from","yield","return"], correct:"await"},
      { q:"Which provides multiprocessing-safe queues?", options:["multiprocessing.Queue","queue.Queue","asyncio.Queue","threading.Queue"], correct:"multiprocessing.Queue"},
      { q:"Which method avoids copy by view in numpy?", options:["use views (slicing)","copy()","tolist()","flatten()"], correct:"use views (slicing)"},
      { q:"Which feature in Python 3.10 improved pattern matching?", options:["Structural Pattern Matching (match/case)","switch-case","pattern functions","matchAll"], correct:"Structural Pattern Matching (match/case)"},
      { q:"Which CPython tool compiles .py to bytecode .pyc?", options:["compileall / import mechanism","pyinstaller","setuptools","pip"], correct:"compileall / import mechanism"},
      { q:"Which is used to create extension modules in C?", options:["CPython API / C-API","ctypes only","cython only","pip"], correct:"CPython API / C-API"},
      { q:"Which provides coroutine scheduling primitives?", options:["asyncio.loop","threading.Thread","multiprocessing.Process","concurrent.futures"], correct:"asyncio.loop"},
      { q:"Which is true about descriptor protocol?", options:["Implements __get__/__set__/__delete__","Used only in C extension","Deprecated","Only for functions"], correct:"Implements __get__/__set__/__delete__"},
      { q:"Which tool helps profile Python CPU usage?", options:["cProfile","profile","timeit","line_profiler"], correct:"cProfile"},
      { q:"Which library gives fast numerical computing by JIT?", options:["numba","numpy","pandas","scipy"], correct:"numba"},
      { q:"Which method serializes for interprocess with no Python objects? (shared memory)", options:["multiprocessing.shared_memory","pickle","json","socket"], correct:"multiprocessing.shared_memory"},
      { q:"Which is correct about metaclasses?", options:["They create classes","They modify class creation","Both","None"], correct:"Both"},
      { q:"Which handles asynchronous http clients efficiently?", options:["aiohttp","requests (sync)","http.client","urllib"], correct:"aiohttp"},
      { q:"Which CPython optimization stores small integers in a free list? ", options:["Integer interning / small int cache","Garbage collection","Object pooling","No optimization"], correct:"Integer interning / small int cache"},
      { q:"Which helps implement PEP 572 (walrus operator) usage?", options:["Assignment expressions (:=)","Lambda binding","Decorators","Metaclasses"], correct:"Assignment expressions (:=)"},
      { q:"Which ensures deterministic finalization for resources?", options:["Use context managers (with)","Rely on __del__","Use atexit only","None"], correct:"Use context managers (with)"},
      { q:"Which severely affects concurrency performance in CPython?", options:["GIL","asyncio","multiprocessing","cProfile"], correct:"GIL"},
    ]
  }, 
  C: {
    beginner: [
      { q: "Which file extension is used for C source files?", options: [".c", ".cpp", ".java", ".cs"], correct: ".c" },
      { q: "Which function is used to print to stdout in C?", options: ["printf()", "cout<<", "System.out.println", "console.log"], correct: "printf()" },
      { q: "Which header is required for printf?", options: ["stdio.h", "stdlib.h", "string.h", "math.h"], correct: "stdio.h" },
      { q: "Which operator is used for assignment?", options: ["=", "==", "!=", ":="], correct: "=" },
      { q: "Which data type stores integers?", options: ["int", "float", "char", "double"], correct: "int" },
      { q: "Which symbol ends a statement?", options: [";", "!", "?", "."], correct: ";" },
      { q: "Which function starts execution in C?", options: ["main", "start", "run", "init"], correct: "main" },
      { q: "Which library has malloc?", options: ["stdlib.h", "stdio.h", "math.h", "string.h"], correct: "stdlib.h" },
      { q: "How do you write a single-line comment?", options: ["// comment", "/* comment */", "# comment", "-- comment"], correct: "// comment" },
      { q: "Which format specifier prints an integer?", options: ["%d", "%f", "%c", "%s"], correct: "%d" },
      { q: "Which loop executes while condition is true?", options: ["while", "for", "do-while", "repeat"], correct: "while" },
      { q: "Which keyword declares a constant?", options: ["const", "final", "static", "immutable"], correct: "const" },
      { q: "Which header has string functions?", options: ["string.h", "stdio.h", "stdlib.h", "ctype.h"], correct: "string.h" },
      { q: "Which operator is used for equality check?", options: ["==", "=", "!=", "==="], correct: "==" },
      { q: "Which function deallocates memory from malloc?", options: ["free", "delete", "dispose", "release"], correct: "free" },
      { q: "Which escape sequence is newline?", options: ["\\n", "\\t", "\\r", "\\0"], correct: "\\n" },
      { q: "Which is a character type?", options: ["char", "string", "str", "character"], correct: "char" },
      { q: "Which header has math functions like sin?", options: ["math.h", "stdio.h", "stdlib.h", "time.h"], correct: "math.h" },
      { q: "Which loop runs at least once?", options: ["do-while", "while", "for", "switch"], correct: "do-while" },
      { q: "What does sizeof(int) return (typical on 32-bit)?", options: ["4", "2", "8", "1"], correct: "4" },
    ],
    medium: [
      { q: "Which function compares two strings?", options: ["strcmp", "strcpy", "strlen", "strcat"], correct: "strcmp" },
      { q: "Which is used to get memory dynamically?", options: ["malloc", "alloc", "new", "create"], correct: "malloc" },
      { q: "Which header contains memcpy?", options: ["string.h", "stdio.h", "stdlib.h", "stdint.h"], correct: "string.h" },
      { q: "What does NULL represent?", options: ["Null pointer", "Zero int", "Empty string", "End of file"], correct: "Null pointer" },
      { q: "Which is used to open a file?", options: ["fopen", "openfile", "file_open", "fcreate"], correct: "fopen" },
      { q: "Which header for time functions?", options: ["time.h", "stdio.h", "unistd.h", "math.h"], correct: "time.h" },
      { q: "What is prototype of main with args?", options: ["int main(int argc, char *argv[])", "void main()", "main()", "int main(string args[])"], correct: "int main(int argc, char *argv[])" },
      { q: "Which function copies memory blocks?", options: ["memcpy", "memmove", "strcpy", "copy"], correct: "memcpy" },
      { q: "Which is used for character testing?", options: ["ctype.h", "string.h", "stdio.h", "stdlib.h"], correct: "ctype.h" },
      { q: "Which operator gives address of a variable?", options: ["&", "*", "#", "@"], correct: "&" },
      { q: "What does pointer operator * do?", options: ["Dereference pointer", "Address-of", "Multiply only", "Comment"], correct: "Dereference pointer" },
      { q: "Which keyword prevents modification of pointer data?", options: ["const", "volatile", "static", "register"], correct: "const" },
      { q: "Which storage class gives internal linkage?", options: ["static", "extern", "auto", "register"], correct: "static" },
      { q: "Which function reallocates memory?", options: ["realloc", "malloc", "calloc", "free"], correct: "realloc" },
      { q: "Which returns length of C string?", options: ["strlen", "sizeof", "count", "strcount"], correct: "strlen" },
      { q: "Which function concatenates strings?", options: ["strcat", "strcpy", "strncpy", "append"], correct: "strcat" },
      { q: "Which header has integer types like int32_t?", options: ["stdint.h", "inttypes.h", "bytes.h", "limits.h"], correct: "stdint.h" },
      { q: "Which keyword hints compiler for optimization?", options: ["register", "volatile", "const", "inline"], correct: "register" },
      { q: "Which function sets memory block bytes?", options: ["memset", "memcpy", "bzero", "setmem"], correct: "memset" },
      { q: "Which is undefined behavior in C?", options: ["Accessing freed memory", "Using printf", "Declaring variables", "Calling main"], correct: "Accessing freed memory" },
    ],
    advanced: [
      { q: "What is UB?", options: ["Undefined Behavior", "Uniform Binary", "User Buffer", "Unique Block"], correct: "Undefined Behavior" },
      { q: "What is a memory leak?", options: ["Lost allocated memory", "Extra stack usage", "Too many loops", "Invalid syntax"], correct: "Lost allocated memory" },
      { q: "Which function allocates zero-initialized memory?", options: ["calloc", "malloc", "realloc", "alloc"], correct: "calloc" },
      { q: "What is pointer-to-pointer type look like?", options: ["int **p", "int &p", "int *p[]", "int p"], correct: "int **p" },
      { q: "What is volatile used for?", options: ["Prevent compiler optimizations", "Make variable constant", "Make variable global", "Allocate on heap"], correct: "Prevent compiler optimizations" },
      { q: "What does restrict keyword specify (C99)?", options: ["Pointer is sole initial means of access", "Variable is constant", "Function inline", "Static storage"], correct: "Pointer is sole initial means of access" },
      { q: "Which runtime error occurs on stack overflow?", options: ["Stack overflow", "Segmentation fault", "Memory leak", "Division by zero"], correct: "Stack overflow" },
      { q: "Which standard defines C99 features?", options: ["ISO C99", "POSIX", "ANSI C89", "C++11"], correct: "ISO C99" },
      { q: "Which function causes undefined behavior when format mismatched?", options: ["printf", "scanf", "fscanf", "all above"], correct: "scanf" },
      { q: "Which header for setjmp/longjmp?", options: ["setjmp.h", "setjmp", "setjmp.h (no)", "setjmp.h"], correct: "setjmp.h" },
      { q: "Which calls constructor in C? (trick)", options: ["C has no constructors", "init functions", "object constructors", "new"], correct: "C has no constructors" },
      { q: "What is pointer arithmetic scaled by?", options: ["Size of pointed type", "1 byte", "Platform word size", "Alignment"], correct: "Size of pointed type" },
      { q: "Which tool checks memory errors at runtime?", options: ["Valgrind", "GCC", "GDB", "Make"], correct: "Valgrind" },
      { q: "Which qualifier for thread-local storage in C11?", options: ["_Thread_local", "thread_local", "__thread", "tls"], correct: "_Thread_local" },
      { q: "Which is true about sequence points? ", options: ["They define order of evaluation", "They are only in C++", "They don't exist", "They are runtime objects"], correct: "They define order of evaluation" },
      { q: "Which header offers atomic operations in C11?", options: ["stdatomic.h", "atomic.h", "threads.h", "sync.h"], correct: "stdatomic.h" },
      { q: "Which function is async-signal-safe?", options: ["write", "malloc", "printf", "strtok"], correct: "write" },
      { q: "Which avoids data race in multithreaded C?", options: ["Mutexes", "Globals", "Volatile only", "Signals"], correct: "Mutexes" },
      { q: "Which is true about sizeof operator?", options: ["Evaluated at compile-time for types", "Always runtime", "Returns pointer value", "Must be function"], correct: "Evaluated at compile-time for types" },
      { q: "Which standard library function is not reentrant?", options: ["strtok", "strcpy", "memcpy", "strlen"], correct: "strtok" },
    ]
  },
  "C++": {
    "beginner": [
      { "q": "Which file extension is used for C++ source files?", "options": [".c", ".cpp", ".java", ".cs"], "correct": ".cpp" },
      { "q": "Which function is used to print output in C++?", "options": ["printf()", "cout<<", "System.out.println", "console.log"], "correct": "cout<<" },
      { "q": "Which header is required for cout?", "options": ["iostream", "stdio.h", "stdlib.h", "string.h"], "correct": "iostream" },
      { "q": "Which operator is used for scope resolution?", "options": ["::", ":", ".", "->"], "correct": "::" },
      { "q": "Which keyword is used to create a class?", "options": ["class", "struct", "object", "define"], "correct": "class" },
      { "q": "Which symbol ends a statement in C++?", "options": [";", "!", "?", "."], "correct": ";" },
      { "q": "Which function starts execution in C++?", "options": ["main", "start", "run", "init"], "correct": "main" },
      { "q": "Which keyword is used for input in C++?", "options": ["cin", "scanf", "input", "read"], "correct": "cin" },
      { "q": "Which operator is used for output in C++?", "options": ["<<", ">>", "::", "->"], "correct": "<<" },
      { "q": "Which is used for single-line comment?", "options": ["//", "/* */", "#", "--"], "correct": "//" },
      { "q": "Which data type stores integers?", "options": ["int", "float", "char", "double"], "correct": "int" },
      { "q": "Which keyword is used for constant variable?", "options": ["const", "final", "static", "immutable"], "correct": "const" },
      { "q": "Which header is used for strings?", "options": ["string", "stdio.h", "stdlib.h", "math.h"], "correct": "string" },
      { "q": "Which operator is used for equality check?", "options": ["==", "=", "!=", "==="], "correct": "==" },
      { "q": "Which loop checks condition before execution?", "options": ["while", "do-while", "for-each", "switch"], "correct": "while" },
      { "q": "Which loop executes at least once?", "options": ["do-while", "while", "for", "if"], "correct": "do-while" },
      { "q": "Which is a character data type?", "options": ["char", "string", "str", "text"], "correct": "char" },
      { "q": "Which keyword is used to allocate memory dynamically?", "options": ["new", "malloc", "alloc", "create"], "correct": "new" },
      { "q": "Which operator is used to access object members?", "options": [".", "::", "->", "&"], "correct": "." },
      { "q": "Which header is required for math functions?", "options": ["cmath", "math.h", "stdlib.h", "stdio.h"], "correct": "cmath" }
    ],
    "medium": [
      { "q": "What is function overloading?", "options": ["Same function name with different parameters", "Same function name only", "Different function names", "Runtime error"], "correct": "Same function name with different parameters" },
      { "q": "What is constructor?", "options": ["Special function to initialize objects", "Destroy object", "Print output", "Allocate memory only"], "correct": "Special function to initialize objects" },
      { "q": "What is destructor?", "options": ["Function to destroy object", "Create object", "Print object", "Copy object"], "correct": "Function to destroy object" },
      { "q": "What is inheritance?", "options": ["Acquiring properties of another class", "Deleting class", "Creating function", "Looping"], "correct": "Acquiring properties of another class" },
      { "q": "What is polymorphism?", "options": ["One name many forms", "Memory leak", "Data hiding", "Compilation error"], "correct": "One name many forms" },
      { "q": "What is encapsulation?", "options": ["Binding data and methods together", "Breaking code", "Memory allocation", "Looping"], "correct": "Binding data and methods together" },
      { "q": "What is abstraction?", "options": ["Hiding implementation details", "Showing all code", "Deleting data", "Memory leak"], "correct": "Hiding implementation details" },
      { "q": "What is STL?", "options": ["Standard Template Library", "System Tool Library", "Static Type Library", "String Template Logic"], "correct": "Standard Template Library" },
      { "q": "Which container is dynamic array?", "options": ["vector", "array", "list", "stack"], "correct": "vector" },
      { "q": "Which header is required for vector?", "options": ["vector", "stdlib.h", "stdio.h", "map"], "correct": "vector" },
      { "q": "What is pointer?", "options": ["Stores address of variable", "Stores value only", "Loop variable", "Function type"], "correct": "Stores address of variable" },
      { "q": "What is reference?", "options": ["Alias of variable", "Pointer type", "Function", "Class"], "correct": "Alias of variable" },
      { "q": "What is virtual function?", "options": ["Used for runtime polymorphism", "Compile time function", "Static function", "Inline function"], "correct": "Used for runtime polymorphism" },
      { "q": "What is friend function?", "options": ["Access private members of class", "Destroy class", "Create object", "Loop function"], "correct": "Access private members of class" },
      { "q": "What is operator overloading?", "options": ["Redefining operators", "Deleting operators", "Looping operators", "Error handling"], "correct": "Redefining operators" },
      { "q": "What is namespace?", "options": ["Avoid name conflicts", "Memory allocation", "Loop control", "File handling"], "correct": "Avoid name conflicts" },
      { "q": "Which keyword is used for dynamic memory release?", "options": ["delete", "free", "remove", "clear"], "correct": "delete" },
      { "q": "What is static variable?", "options": ["Retains value between function calls", "Temporary variable", "Global variable only", "Pointer variable"], "correct": "Retains value between function calls" },
      { "q": "What is exception handling?", "options": ["Handling runtime errors", "Compilation error fix", "Loop handling", "Memory allocation"], "correct": "Handling runtime errors" },
      { "q": "Which keyword is used in exception handling?", "options": ["try-catch", "throw-only", "error-handle", "if-else"], "correct": "try-catch" }
    ],
    "advanced": [
      { "q": "What is pure virtual function?", "options": ["Function with no definition", "Normal function", "Static function", "Inline function"], "correct": "Function with no definition" },
      { "q": "What is abstract class?", "options": ["Class with at least one pure virtual function", "Normal class", "Function class", "Template class"], "correct": "Class with at least one pure virtual function" },
      { "q": "What is diamond problem?", "options": ["Ambiguity in multiple inheritance", "Memory leak", "Syntax error", "Loop issue"], "correct": "Ambiguity in multiple inheritance" },
      { "q": "What is template in C++?", "options": ["Generic programming tool", "Loop structure", "Class type", "Pointer type"], "correct": "Generic programming tool" },
      { "q": "What is function template?", "options": ["Generic function definition", "Overloaded function", "Virtual function", "Destructor"], "correct": "Generic function definition" },
      { "q": "What is class template?", "options": ["Generic class definition", "Normal class", "Static class", "Abstract function"], "correct": "Generic class definition" },
      { "q": "What is RTTI?", "options": ["Run Time Type Information", "Real Time Transfer Interface", "Random Type Input", "Run Type Tool"], "correct": "Run Time Type Information" },
      { "q": "Which operator is used for dynamic casting?", "options": ["dynamic_cast", "static_cast", "const_cast", "reinterpret_cast"], "correct": "dynamic_cast" },
      { "q": "What is shallow copy?", "options": ["Copy pointer only", "Deep memory copy", "Function copy", "Class copy"], "correct": "Copy pointer only" },
      { "q": "What is deep copy?", "options": ["Copy actual data", "Pointer copy only", "No copy", "Reference copy"], "correct": "Copy actual data" },
      { "q": "What is segmentation fault?", "options": ["Invalid memory access", "Compilation error", "Loop error", "Syntax error"], "correct": "Invalid memory access" },
      { "q": "What is memory leak?", "options": ["Unreleased allocated memory", "Stack overflow", "Compile error", "Loop issue"], "correct": "Unreleased allocated memory" },
      { "q": "What is smart pointer?", "options": ["Automatic memory managing pointer", "Normal pointer", "Loop pointer", "Static pointer"], "correct": "Automatic memory managing pointer" },
      { "q": "Which smart pointer types exist?", "options": ["unique_ptr, shared_ptr, weak_ptr", "auto_ptr only", "raw_ptr", "int_ptr"], "correct": "unique_ptr, shared_ptr, weak_ptr" },
      { "q": "What is lambda function?", "options": ["Anonymous function", "Named function", "Class function", "Destructor"], "correct": "Anonymous function" },
      { "q": "What is move semantics?", "options": ["Transfer resources instead of copying", "Copy data", "Delete data", "Loop data"], "correct": "Transfer resources instead of copying" },
      { "q": "What is rvalue reference?", "options": ["Reference to temporary object", "Pointer type", "Class type", "Loop type"], "correct": "Reference to temporary object" },
      { "q": "What is multithreading?", "options": ["Multiple threads", "Single thread", "No thread", "Loop only"], "correct": "Multiple threads" }
    ]
  }
};

export default function MockTest({ selectedLanguage, darkMode, user, onSaveSuccess }) {
  const [level, setLevel] = useState(null);
  const [testQuestions, setTestQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [mockTests, setMockTests] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  const storageKey = `mockTests_${user?.email || "guest"}`;

  useEffect(() => {
    setLevel(null);
    setTestQuestions([]);
    setCurrentIndex(0);
    setUserAnswers({});
    setShowResult(false);
    setIsSaved(false);
  }, [selectedLanguage]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageKey) || "[]");
    setMockTests(data);
  }, [storageKey]);

  const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

  const startTest = (lvl) => {
    if (!QUESTION_SETS || !QUESTION_SETS[selectedLanguage] || !QUESTION_SETS[selectedLanguage][lvl]) {
      alert("Question set not found for this language/level!");
      return;
    }
    const qset = QUESTION_SETS[selectedLanguage][lvl];
    setLevel(lvl);
    setTestQuestions(shuffle([...qset]).slice(0, 10));
    setCurrentIndex(0);
    setUserAnswers({});
    setShowResult(false);
    setIsSaved(false);
  };

  const selectOption = (opt) => {
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: opt }));
  };

  const finishTest = () => setShowResult(true);

  const score = useMemo(() => {
    if (!showResult) return { correct: 0, total: 0 };
    let correct = 0;
    testQuestions.forEach((q, i) => {
      if (userAnswers[i] === q.correct) correct++;
    });
    return { correct, total: testQuestions.length };
  }, [showResult, testQuestions, userAnswers]);

  const saveTestResult = () => {
    if (isSaved) {
      alert("Test already saved!");
      return;
    }

    const newTest = {
      language: selectedLanguage,
      level: level,
      score: `${score.correct}/${score.total}`,
      date: new Date().toLocaleDateString()
    };

    const existing = JSON.parse(localStorage.getItem(storageKey)) || [];
    existing.push(newTest);
    localStorage.setItem(storageKey, JSON.stringify(existing));
    setIsSaved(true);

    if (onSaveSuccess) {
      onSaveSuccess();
    }
    alert("Test Saved Successfully!");
  };

return (
  <div className="flex justify-center items-center py-8 px-3">
    <div
      className={`w-full max-w-3xl rounded-2xl border transition-all duration-300
      shadow-[0_0_25px_rgba(168,85,247,0.3)] hover:shadow-[0_0_35px_rgba(168,85,247,0.5)]
      ${
        darkMode
          ? "bg-slate-950 border-purple-500 text-slate-100" 
          : "bg-white border-purple-300 text-slate-900" 
      } p-6`}
    >
      <h2 className="text-3xl font-bold mb-4 border-b border-purple-400 pb-2 tracking-wide">
        🚀 Mock Test {selectedLanguage ? `- ${selectedLanguage}` : ""}
      </h2>

      {!level && selectedLanguage && (
        <div className="text-center">
          <p className="mt-4 text-lg font-medium">Select Difficulty Level</p>
          <div className="flex justify-center gap-4 mt-5 flex-wrap">
            <button onClick={() => startTest("beginner")} className="px-5 py-2 rounded-xl bg-green-600 text-white shadow-md hover:scale-105 transition-all">Beginner</button>
            <button onClick={() => startTest("medium")} className="px-5 py-2 rounded-xl bg-yellow-500 text-black shadow-md hover:scale-105 transition-all">Medium</button>
            <button onClick={() => startTest("advanced")} className="px-5 py-2 rounded-xl bg-red-600 text-white shadow-md hover:scale-105 transition-all">Advanced</button>
          </div>
        </div>
      )}

      {!selectedLanguage && (
        <p className="text-center py-10 text-gray-400">Please select a language from the dashboard to start.</p>
      )}

      {level && !showResult && testQuestions.length > 0 && (
        <div className="mt-6">
          {/* Main Question Card - Updated for Dark Mode visibility */}
          <div className="p-5 rounded-xl border border-purple-300/50 shadow-[0_0_15px_rgba(168,85,247,0.1)] bg-purple-50 dark:bg-slate-900">
            <h3 className="mb-4 font-semibold text-lg text-slate-900 dark:text-purple-100">
              Q{currentIndex + 1}: {testQuestions[currentIndex].q}
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {testQuestions[currentIndex].options.map((opt, i) => (
                <button 
                  key={i} 
                  onClick={() => selectOption(opt)} 
                  className={`p-3 border rounded-lg text-left transition-all font-medium
                    ${userAnswers[currentIndex] === opt 
                      ? "bg-purple-600 text-white border-purple-400" 
                      : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-gray-200 dark:border-slate-700 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-slate-700"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between mt-5">
            <button onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))} className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-700 transition">⬅ Previous</button>
            {currentIndex === testQuestions.length - 1 ? (
              <button onClick={finishTest} className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition">Finish ✅</button>
            ) : (
              <button onClick={() => setCurrentIndex((i) => Math.min(testQuestions.length - 1, i + 1))} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">Next ➡</button>
            )}
          </div>
        </div>
      )}

      {showResult && (
        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-2">🎯 Result</h3>
          <p className="mb-4 text-lg">Score: <span className="font-bold text-purple-500">{score.correct}</span> / {score.total}</p>
          <button onClick={saveTestResult} disabled={isSaved} className={`px-5 py-2 rounded-xl transition-all border ${isSaved ? "bg-gray-600 text-gray-300 cursor-not-allowed" : "bg-purple-600 text-white hover:bg-purple-700"}`}>{isSaved ? "Saved ✓" : "Save Test"}</button>
          
          <div className="mt-5 space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {testQuestions.map((q, i) => (
              <div key={i} className="p-4 rounded-xl border border-purple-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm">
                <p className="font-semibold text-slate-900 dark:text-slate-100">Q{i + 1}. {q.q}</p>
                <p className="text-slate-600 dark:text-slate-400">Your Answer: <span className="text-slate-900 dark:text-slate-200">{userAnswers[i] || "Not Answered"}</span></p>
                <p className="text-slate-600 dark:text-slate-400">Correct Answer: <span className="text-green-600 dark:text-green-400 font-medium">{q.correct}</span></p>
                <p className={`mt-1 font-bold ${userAnswers[i] === q.correct ? "text-green-500" : "text-red-500"}`}>
                  {userAnswers[i] === q.correct ? "✔ Correct" : "✘ Wrong"}
                </p>
              </div>
            ))}
          </div>
          <button className="mt-5 px-5 py-2 rounded-lg bg-gray-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition hover:bg-gray-300 dark:hover:bg-slate-700" onClick={() => setLevel(null)}>🔙 Back to Levels</button>
        </div>
      )}
    </div>
  </div>
);
}

