# Simple DSA Algorithm Visualizer

A beginner-friendly and clean web-based visualizer designed to help college students understand and explain fundamental Data Structures and Algorithms (DSA) with step-by-step visual execution.

---

## 📖 Project Description

This project provides an interactive and straightforward way to learn fundamental algorithms and data structures. It visualizes each comparison, swap, search step, and data structure operation with clear status messages, color highlights, and time/space complexity notes.

No complex setup, backend, or heavy libraries are required—making it lightweight, fast, and easy to explain during college presentations, vivas, and lab exams.

---

## 🧠 DSA Concepts Used

1. **Bubble Sort**:
   - Compares adjacent elements in an array and swaps them if they are in the wrong order.
   - Repeats until no more swaps are needed.

2. **Selection Sort**:
   - Divides the list into a sorted part and an unsorted part.
   - Repeatedly finds the minimum element from the unsorted part and places it at the front.

3. **Linear Search**:
   - Sequentially checks each element of the array from left to right until the target is found.

4. **Binary Search**:
   - Efficient search algorithm for **sorted arrays**.
   - Compares target to the middle element and cuts search space in half each step.

5. **Stack (LIFO - Last In, First Out)**:
   - Operations:
     - `Push`: Add an item to the top.
     - `Pop`: Remove the top item.
     - `Peek`: View the top item without removing it.

6. **Queue (FIFO - First In, First Out)**:
   - Operations:
     - `Enqueue`: Add an item to the rear.
     - `Dequeue`: Remove an item from the front.
     - `Front`: View the front item without removing it.

---

## ⚡ Features

- **Algorithm Switching**: Easily switch between Sorting, Searching, Stack, and Queue using tabs.
- **Custom Input Support**: Input your own comma-separated array or click "Random" to generate values.
- **Visual Step-by-Step Flow**:
  - Yellow highlights for elements currently being compared.
  - Orange highlights for elements being swapped.
  - Green highlights for sorted or successfully found elements.
  - Faded elements for regions eliminated during binary search.
- **Status Log**: Detailed text explaining exactly what the algorithm is doing at each step.
- **Complexity Reference**: Instant display of Best, Average, Worst Time Complexity and Space Complexity.
- **Simple, Responsive UI**: Works cleanly on laptops, tablets, and phones.

---

## 🛠️ Technologies Used

- **HTML5**: Page structure and semantic elements.
- **CSS3**: Clean styling, flexbox/grid layout, and visual state highlights (no external CSS libraries).
- **JavaScript (ES6+)**: Core algorithm logic, DOM updates, and asynchronous animation pauses using `Promise` / `async-await` (no external JS libraries).

---

## ⏱️ Time and Space Complexities

| Algorithm / Data Structure | Best Time Complexity | Average Time Complexity | Worst Time Complexity | Space Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **Bubble Sort** | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| **Selection Sort** | $O(n^2)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| **Linear Search** | $O(1)$ | $O(n)$ | $O(n)$ | $O(1)$ |
| **Binary Search** | $O(1)$ | $O(\log n)$ | $O(\log n)$ | $O(1)$ |
| **Stack (Push/Pop/Peek)** | $O(1)$ | $O(1)$ | $O(1)$ | $O(n)$ |
| **Queue (Enqueue/Dequeue/Front)** | $O(1)$ | $O(1)$ | $O(1)$ | $O(n)$ |

---

## 🚀 How to Run the Project Locally

Because this project is built entirely with pure HTML, CSS, and JavaScript, no build tools or package managers are needed!

### Method 1: Direct File Open (Easiest)
1. Navigate to the project directory:
   ```
   C:\Users\anshu\OneDrive\Desktop\dsa-visualizer
   ```
2. Double-click on `index.html` to open it directly in any web browser (Chrome, Edge, Firefox, Brave, Safari).

### Method 2: Using Python Simple Server (Optional)
If you have Python installed and wish to serve over HTTP:
1. Open PowerShell or Command Prompt in the project folder:
   ```powershell
   cd "C:\Users\anshu\OneDrive\Desktop\dsa-visualizer"
   ```
2. Start the local server:
   ```powershell
   python -m http.server 8000
   ```
3. Open your browser and visit:
   ```
   http://localhost:8000
   ```
