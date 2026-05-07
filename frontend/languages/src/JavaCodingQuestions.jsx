import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy } from "lucide-react";

const JavaCodingQuestions = () => {
  const [activeTab, setActiveTab] = useState("Basic");

  const questions = {
    Basic: [
      {
        id: 1,
        question: "Print Hello World",
        code: `public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}`,
        output: "Hello World",
      },
      {
        id: 2,
        question: "Sum of two numbers",
        code: `public class Sum {
  public static void main(String[] args) {
    int a = 5, b = 7;
    System.out.println(a + b);
  }
}`,
        output: "12",
      },
      {
        id: 3,
        question: "Even or Odd",
        code: `import java.util.*;
public class EvenOdd {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    if(n % 2 == 0)
      System.out.println("Even");
    else
      System.out.println("Odd");
  }
}`,
        output: "Even / Odd",
      },
      {
        id: 4,
        question: "Factorial of a number",
        code: `public class Factorial {
  public static void main(String[] args) {
    int n = 5, fact = 1;
    for(int i=1; i<=n; i++)
      fact *= i;
    System.out.println(fact);
  }
}`,
        output: "120",
      },
      {
        id: 5,
        question: "Reverse a string",
        code: `public class Reverse {
  public static void main(String[] args) {
    String s = "Java";
    String rev = "";
    for(int i=s.length()-1; i>=0; i--)
      rev += s.charAt(i);
    System.out.println(rev);
  }
}`,
        output: "avaJ",
      },
      {
        id: 6,
        question: "Check positive or negative",
        code: `public class PosNeg {
  public static void main(String[] args) {
    int n = -5;
    if(n > 0)
      System.out.println("Positive");
    else if(n < 0)
      System.out.println("Negative");
    else
      System.out.println("Zero");
  }
}`,
        output: "Negative",
      },
      {
        id: 7,
        question: "Swap two numbers",
        code: `public class Swap {
  public static void main(String[] args) {
    int a = 5, b = 10;
    int temp = a;
    a = b;
    b = temp;
    System.out.println(a + " " + b);
  }
}`,
        output: "10 5",
      },
      {
        id: 8,
        question: "Check divisible by 5",
        code: `public class DivBy5 {
  public static void main(String[] args) {
    int n = 20;
    System.out.println(n % 5 == 0 ? "Divisible by 5" : "Not divisible by 5");
  }
}`,
        output: "Divisible by 5",
      },
      {
        id: 9,
        question: "Sum of first N numbers",
        code: `public class SumN {
  public static void main(String[] args) {
    int n = 5, sum = 0;
    for(int i=1;i<=n;i++)
      sum += i;
    System.out.println(sum);
  }
}`,
        output: "15",
      },
      {
        id: 10,
        question: "Print multiplication table of 5",
        code: `public class Table {
  public static void main(String[] args) {
    int n = 5;
    for(int i=1;i<=10;i++)
      System.out.println(n + " x " + i + " = " + (n*i));
  }
}`,
        output: `5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
5 x 8 = 40
5 x 9 = 45
5 x 10 = 50`,
      },
    ],

    Intermediate: [
      {
        id: 11,
        question: "Palindrome String",
        code: `public class Palindrome {
  public static void main(String[] args) {
    String s = "level";
    String rev = new StringBuilder(s).reverse().toString();
    System.out.println(s.equals(rev) ? "Palindrome" : "Not Palindrome");
  }
}`,
        output: "Palindrome",
      },
      {
        id: 12,
        question: "Find largest in array",
        code: `public class MaxArray {
  public static void main(String[] args) {
    int[] arr = {2,9,1,7};
    int max = arr[0];
    for(int x : arr)
      if(x > max) max = x;
    System.out.println(max);
  }
}`,
        output: "9",
      },
      {
        id: 13,
        question: "Fibonacci Series",
        code: `public class Fibonacci {
  public static void main(String[] args) {
    int a=0,b=1;
    for(int i=0;i<7;i++){
      System.out.print(a+" ");
      int c=a+b;
      a=b;
      b=c;
    }
  }
}`,
        output: "0 1 1 2 3 5 8",
      },
      {
        id: 14,
        question: "Check prime number",
        code: `public class Prime {
  public static void main(String[] args) {
    int n = 11, flag = 1;
    for(int i=2;i<=n/2;i++)
      if(n%i==0) flag=0;
    System.out.println(flag==1 ? "Prime" : "Not Prime");
  }
}`,
        output: "Prime",
      },
      {
        id: 15,
        question: "OOP Student Program",
        code: `class Student {
  String name;
  int age;
  Student(String n, int a){
    name=n; age=a;
  }
  void display(){
    System.out.println(name+" "+age);
  }
}
public class Main {
  public static void main(String[] args) {
    Student s = new Student("Amit",20);
    s.display();
  }
}`,
        output: "Amit 20",
      },
      {
        id: 16,
        question: "Array Sum",
        code: `public class ArraySum {
  public static void main(String[] args) {
    int[] arr = {1,2,3,4};
    int sum = 0;
    for(int x : arr) sum += x;
    System.out.println(sum);
  }
}`,
        output: "10",
      },
      {
        id: 17,
        question: "Count vowels in string",
        code: `public class Vowels {
  public static void main(String[] args) {
    String s = "Java";
    int count = 0;
    for(int i=0;i<s.length();i++){
      char c = Character.toLowerCase(s.charAt(i));
      if(c=='a'||c=='e'||c=='i'||c=='o'||c=='u') count++;
    }
    System.out.println(count);
  }
}`,
        output: "2",
      },
      {
        id: 18,
        question: "Reverse array",
        code: `public class ReverseArray {
  public static void main(String[] args) {
    int[] arr = {1,2,3,4};
    for(int i=arr.length-1;i>=0;i--)
      System.out.print(arr[i]+" ");
  }
}`,
        output: "4 3 2 1",
      },
      {
        id: 19,
        question: "Sum of even numbers in array",
        code: `public class SumEven {
  public static void main(String[] args) {
    int[] arr = {1,2,3,4,5};
    int sum = 0;
    for(int x : arr)
      if(x%2==0) sum += x;
    System.out.println(sum);
  }
}`,
        output: "6",
      },
      {
        id: 20,
        question: "Factorial using recursion",
        code: `public class FactorialRec {
  static int fact(int n){
    if(n==0) return 1;
    return n*fact(n-1);
  }
  public static void main(String[] args){
    System.out.println(fact(5));
  }
}`,
        output: "120",
      },
    ],

    Advanced: [
      {
        id: 21,
        question: "Thread Example – Multithreading",
        code: `class A extends Thread {
  public void run(){
    System.out.println("Thread Running");
  }
}
public class Test {
  public static void main(String[] args){
    new A().start();
  }
}`,
        output: "Thread Running",
      },
      {
        id: 22,
        question: "File Read Example",
        code: `import java.io.*;
public class ReadFile {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new FileReader("a.txt"));
    System.out.println(br.readLine());
  }
}`,
        output: "File content",
      },
      {
        id: 23,
        question: "HashMap Example",
        code: `import java.util.*;
public class MapDemo {
  public static void main(String[] args){
    Map<Integer,String> m = new HashMap<>();
    m.put(1,"A");
    m.put(2,"B");
    System.out.println(m);
  }
}`,
        output: "{1=A, 2=B}",
      },
      {
        id: 24,
        question: "Inheritance Example",
        code: `class A {
  void show(){ System.out.println("A"); }
}
class B extends A {
  void show(){ System.out.println("B"); }
}
public class Main {
  public static void main(String[] args){
    new B().show();
  }
}`,
        output: "B",
      },
      {
        id: 25,
        question: "Polymorphism Example",
        code: `class A {
  void show(){ System.out.println("A"); }
}
class B extends A {
  void show(){ System.out.println("B"); }
}
public class Test {
  public static void main(String[] args){
    A obj = new B();
    obj.show();
  }
}`,
        output: "B",
      },
      {
        id: 26,
        question: "Exception Handling",
        code: `public class ExceptionDemo {
  public static void main(String[] args){
    try{
      int a=5/0;
    } catch(Exception e){
      System.out.println("Error: "+e);
    }
  }
}`,
        output: "Error: java.lang.ArithmeticException: / by zero",
      },
      {
        id: 27,
        question: "StringBuilder Example",
        code: `public class StringBuilderDemo {
  public static void main(String[] args){
    StringBuilder sb = new StringBuilder("Java");
    sb.append(" Rocks");
    System.out.println(sb);
  }
}`,
        output: "Java Rocks",
      },
      {
        id: 28,
        question: "LinkedList Example",
        code: `import java.util.*;
public class LinkedListDemo {
  public static void main(String[] args){
    LinkedList<Integer> list = new LinkedList<>();
    list.add(10);
    list.add(20);
    System.out.println(list);
  }
}`,
        output: "[10, 20]",
      },
      {
        id: 29,
        question: "Interface Example",
        code: `interface A {
  void show();
}
class B implements A {
  public void show(){ System.out.println("Interface Working"); }
}
public class Main {
  public static void main(String[] args){
    B obj = new B();
    obj.show();
  }
}`,
        output: "Interface Working",
      },
      {
        id: 30,
        question: "Generic Example",
        code: `import java.util.*;
public class GenericDemo {
  public static void main(String[] args){
    List<Integer> list = new ArrayList<>();
    list.add(10);
    list.add(20);
    System.out.println(list);
  }
}`,
        output: "[10, 20]",
      },
    ],
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Copied!");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-purple-600 mb-6">
        Java Coding Questions
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        {["Basic", "Intermediate", "Advanced"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === tab ? "bg-purple-700 text-white" : "bg-gray-700"
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

            {/* Copy Button */}
            <button
              onClick={() => copyCode(q.code)}
              className="flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded-md mb-2"
            >
              <Copy size={16} /> Copy
            </button>

            <pre className="bg-gray-900 text-green-300 p-4 rounded-lg text-sm overflow-auto">
              {q.code}
            </pre>

            <h3 className="text-lg font-bold mt-4">Output:</h3>
            <pre className="bg-gray-100 p-3 rounded-lg text-sm">{q.output}</pre>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JavaCodingQuestions;


