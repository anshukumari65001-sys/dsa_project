/**
 * Simple DSA Algorithm Visualizer
 * beginner-friendly JavaScript implementation with clear comments.
 */

// --- Global State Variables ---
let currentAlgo = 'bubble';
let array = [29, 10, 14, 37, 13];
let isRunning = false; // Flag to prevent multiple simultaneous runs

// Stack and Queue data storage
let stack = [10, 20, 30];
let queue = [10, 20, 30];

// Algorithm Metadata: Explanations & Complexities
const ALGO_INFO = {
  bubble: {
    title: "Bubble Sort",
    desc: "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
    best: "O(n)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)"
  },
  selection: {
    title: "Selection Sort",
    desc: "Selection Sort divides the array into sorted and unsorted regions. In each step, it finds the smallest element from the unsorted region and places it at the beginning.",
    best: "O(n²)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)"
  },
  linear: {
    title: "Linear Search",
    desc: "Linear Search checks each element of the array one by one from start to end until the target value is found or the list ends.",
    best: "O(1)",
    avg: "O(n)",
    worst: "O(n)",
    space: "O(1)"
  },
  binary: {
    title: "Binary Search",
    desc: "Binary Search works on a SORTED array. It repeatedly divides the search interval in half by comparing the middle element with the target.",
    best: "O(1)",
    avg: "O(log n)",
    worst: "O(log n)",
    space: "O(1)"
  },
  stack: {
    title: "Stack (LIFO - Last In, First Out)",
    desc: "A Stack is a linear data structure where elements are added and removed from the same end, called TOP.",
    best: "O(1)",
    avg: "O(1)",
    worst: "O(1)",
    space: "O(n)"
  },
  queue: {
    title: "Queue (FIFO - First In, First Out)",
    desc: "A Queue is a linear data structure where elements are added at REAR (Enqueue) and removed from FRONT (Dequeue).",
    best: "O(1)",
    avg: "O(1)",
    worst: "O(1)",
    space: "O(n)"
  }
};

// --- DOM Element References ---
const algoButtons = document.querySelectorAll('.algo-btn');
const arrayControls = document.getElementById('array-controls');
const searchControls = document.getElementById('search-controls');
const runControls = document.getElementById('run-controls');
const stackControls = document.getElementById('stack-controls');
const queueControls = document.getElementById('queue-controls');

const arrayInput = document.getElementById('array-input');
const targetInput = document.getElementById('target-input');
const setArrayBtn = document.getElementById('set-array-btn');
const randomArrayBtn = document.getElementById('random-array-btn');
const runBtn = document.getElementById('run-btn');
const resetBtn = document.getElementById('reset-btn');

const statusText = document.getElementById('status-text');

const arrayVisualizer = document.getElementById('array-visualizer');
const stackVisualizer = document.getElementById('stack-visualizer');
const queueVisualizer = document.getElementById('queue-visualizer');

const stackContainer = document.getElementById('stack-container');
const queueContainer = document.getElementById('queue-container');

const stackInput = document.getElementById('stack-input');
const stackPushBtn = document.getElementById('stack-push-btn');
const stackPopBtn = document.getElementById('stack-pop-btn');
const stackPeekBtn = document.getElementById('stack-peek-btn');

const queueInput = document.getElementById('queue-input');
const queueEnqueueBtn = document.getElementById('queue-enqueue-btn');
const queueDequeueBtn = document.getElementById('queue-dequeue-btn');
const queueFrontBtn = document.getElementById('queue-front-btn');

// Info card elements
const infoTitle = document.getElementById('info-title');
const infoDesc = document.getElementById('info-desc');
const infoBest = document.getElementById('info-best');
const infoAvg = document.getElementById('info-avg');
const infoWorst = document.getElementById('info-worst');
const infoSpace = document.getElementById('info-space');

// --- Helper Functions ---

// Sleep utility to pause execution for animations
function sleep(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Update the explanation and complexity card
function updateInfoCard(algoKey) {
  const info = ALGO_INFO[algoKey];
  infoTitle.textContent = info.title;
  infoDesc.textContent = info.desc;
  infoBest.textContent = info.best;
  infoAvg.textContent = info.avg;
  infoWorst.textContent = info.worst;
  infoSpace.textContent = info.space;
}

// Render array visually on the screen with dynamic bar heights
function renderArray(highlightMap = {}) {
  arrayVisualizer.innerHTML = '';
  // Determine min and max to calculate proportional bar heights
  const validVals = array.filter(v => typeof v === 'number' && !isNaN(v));
  const maxVal = validVals.length > 0 ? Math.max(...validVals, 10) : 50;
  const minVal = validVals.length > 0 ? Math.min(...validVals, 0) : 0;
  const range = Math.max(maxVal - minVal, 1);

  array.forEach((val, idx) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'array-item-wrapper';

    const box = document.createElement('div');
    box.className = 'array-box';
    box.textContent = val;

    // Calculate dynamic bar height between 58px and 180px for visual clarity
    const normalized = Math.max(0, (val - minVal) / range);
    const barHeight = Math.round(58 + normalized * 122);
    box.style.height = `${barHeight}px`;

    // Apply highlight class if specified in highlightMap (e.g. comparing, swapped, sorted, found)
    if (highlightMap[idx]) {
      box.classList.add(highlightMap[idx]);
    }

    const indexLabel = document.createElement('span');
    indexLabel.className = 'array-index';
    indexLabel.textContent = `[${idx}]`;

    wrapper.appendChild(box);
    wrapper.appendChild(indexLabel);
    arrayVisualizer.appendChild(wrapper);
  });
}

// Parse comma separated values from the input box
function parseArrayInput() {
  const text = arrayInput.value.trim();
  if (!text) return [10, 20, 30, 40, 50];
  const items = text.split(',')
    .map(x => parseInt(x.trim(), 10))
    .filter(x => !isNaN(x));
  return items.length > 0 ? items : [10, 20, 30];
}

// Toggle controls based on active algorithm
function switchAlgorithm(algoKey) {
  if (isRunning) return;

  currentAlgo = algoKey;

  // Update active tab button style
  algoButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.algo === algoKey);
  });

  // Update info section
  updateInfoCard(algoKey);

  // Hide all sections first
  arrayControls.classList.add('hidden');
  searchControls.classList.add('hidden');
  runControls.classList.add('hidden');
  stackControls.classList.add('hidden');
  queueControls.classList.add('hidden');

  arrayVisualizer.classList.add('hidden');
  stackVisualizer.classList.add('hidden');
  queueVisualizer.classList.add('hidden');

  if (algoKey === 'stack') {
    stackControls.classList.remove('hidden');
    stackVisualizer.classList.remove('hidden');
    statusText.textContent = 'Stack mode: Use Push, Pop, or Peek.';
    renderStack();
  } else if (algoKey === 'queue') {
    queueControls.classList.remove('hidden');
    queueVisualizer.classList.remove('hidden');
    statusText.textContent = 'Queue mode: Use Enqueue, Dequeue, or Front.';
    renderQueue();
  } else {
    // Array-based algorithms (Sorting & Searching)
    arrayControls.classList.remove('hidden');
    runControls.classList.remove('hidden');
    arrayVisualizer.classList.remove('hidden');

    if (algoKey === 'linear' || algoKey === 'binary') {
      searchControls.classList.remove('hidden');
      if (algoKey === 'binary') {
        // Binary search needs sorted elements
        array.sort((a, b) => a - b);
        arrayInput.value = array.join(', ');
        statusText.textContent = 'Binary search requires a sorted array. Array has been sorted.';
      } else {
        statusText.textContent = `Linear search ready. Enter target and click "Start Algorithm".`;
      }
    } else {
      statusText.textContent = `${ALGO_INFO[algoKey].title} ready. Click "Start Algorithm".`;
    }

    renderArray();
  }
}

// Disable/Enable control buttons while algorithm runs
function setRunningState(running) {
  isRunning = running;
  runBtn.disabled = running;
  setArrayBtn.disabled = running;
  randomArrayBtn.disabled = running;
  resetBtn.disabled = running;
  algoButtons.forEach(btn => btn.disabled = running);
}

// --- 1. Bubble Sort Implementation ---
async function runBubbleSort() {
  setRunningState(true);
  const n = array.length;
  let swapped;

  statusText.textContent = 'Starting Bubble Sort...';
  await sleep(400);

  // Outer loop for passes
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      // Step: Highlight comparing elements
      statusText.textContent = `Comparing array[${j}] (${array[j]}) and array[${j + 1}] (${array[j + 1]})`;
      renderArray({ [j]: 'comparing', [j + 1]: 'comparing' });
      await sleep(600);

      // If left element is greater than right element, swap them
      if (array[j] > array[j + 1]) {
        statusText.textContent = `Swapping ${array[j]} and ${array[j + 1]}`;
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        swapped = true;

        renderArray({ [j]: 'swapped', [j + 1]: 'swapped' });
        await sleep(600);
      }
    }

    // If no swaps occurred in a pass, array is already sorted
    if (!swapped) break;
  }

  // Final sorted highlight
  const allSorted = {};
  array.forEach((_, idx) => allSorted[idx] = 'sorted');
  renderArray(allSorted);
  statusText.textContent = 'Bubble Sort completed! Array is now sorted.';
  setRunningState(false);
}

// --- 2. Selection Sort Implementation ---
async function runSelectionSort() {
  setRunningState(true);
  const n = array.length;

  statusText.textContent = 'Starting Selection Sort...';
  await sleep(400);

  // Outer loop: moving boundary of unsorted subarray
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    statusText.textContent = `Finding minimum element starting from index ${i}`;

    for (let j = i + 1; j < n; j++) {
      // Highlight current minimum candidate and element being checked
      statusText.textContent = `Comparing current minimum (${array[minIdx]}) with array[${j}] (${array[j]})`;
      renderArray({ [minIdx]: 'swapped', [j]: 'comparing' });
      await sleep(500);

      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }

    // Swap found minimum with first element of unsorted part
    if (minIdx !== i) {
      statusText.textContent = `Swapping minimum (${array[minIdx]}) with array[${i}] (${array[i]})`;
      const temp = array[i];
      array[i] = array[minIdx];
      array[minIdx] = temp;
      renderArray({ [i]: 'swapped', [minIdx]: 'swapped' });
      await sleep(600);
    }
  }

  // Final sorted highlight
  const allSorted = {};
  array.forEach((_, idx) => allSorted[idx] = 'sorted');
  renderArray(allSorted);
  statusText.textContent = 'Selection Sort completed! Array is now sorted.';
  setRunningState(false);
}

// --- 3. Linear Search Implementation ---
async function runLinearSearch() {
  const target = parseInt(targetInput.value, 10);
  if (isNaN(target)) {
    statusText.textContent = 'Please enter a valid target number.';
    return;
  }

  setRunningState(true);
  statusText.textContent = `Starting Linear Search for target: ${target}`;
  await sleep(400);

  let foundIndex = -1;

  // Check each item sequentially
  for (let i = 0; i < array.length; i++) {
    statusText.textContent = `Checking index ${i}: Is ${array[i]} == ${target}?`;
    renderArray({ [i]: 'comparing' });
    await sleep(600);

    if (array[i] === target) {
      foundIndex = i;
      break;
    }
  }

  if (foundIndex !== -1) {
    statusText.textContent = `Target ${target} FOUND at index ${foundIndex}!`;
    renderArray({ [foundIndex]: 'found' });
  } else {
    statusText.textContent = `Target ${target} was NOT found in the array.`;
    renderArray();
  }

  setRunningState(false);
}

// --- 4. Binary Search Implementation ---
async function runBinarySearch() {
  const target = parseInt(targetInput.value, 10);
  if (isNaN(target)) {
    statusText.textContent = 'Please enter a valid target number.';
    return;
  }

  // Ensure array is sorted for binary search
  array.sort((a, b) => a - b);
  arrayInput.value = array.join(', ');

  setRunningState(true);
  statusText.textContent = `Starting Binary Search for target: ${target}`;
  await sleep(400);

  let low = 0;
  let high = array.length - 1;
  let foundIndex = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    // Build visual map: mark eliminated items and current mid
    const map = {};
    for (let i = 0; i < array.length; i++) {
      if (i < low || i > high) {
        map[i] = 'eliminated';
      }
    }
    map[mid] = 'comparing';

    statusText.textContent = `low = ${low}, high = ${high}, mid = ${mid}. Checking array[${mid}] (${array[mid]})...`;
    renderArray(map);
    await sleep(700);

    if (array[mid] === target) {
      foundIndex = mid;
      break;
    } else if (array[mid] < target) {
      statusText.textContent = `${array[mid]} < ${target}. Target is in right half. Eliminating left side.`;
      await sleep(600);
      low = mid + 1;
    } else {
      statusText.textContent = `${array[mid]} > ${target}. Target is in left half. Eliminating right side.`;
      await sleep(600);
      high = mid - 1;
    }
  }

  if (foundIndex !== -1) {
    statusText.textContent = `Target ${target} FOUND at index ${foundIndex}!`;
    renderArray({ [foundIndex]: 'found' });
  } else {
    statusText.textContent = `Target ${target} NOT found in the array.`;
    renderArray();
  }

  setRunningState(false);
}

// --- 5. Stack Data Structure Operations ---
function renderStack(peekIndex = -1) {
  stackContainer.innerHTML = '';
  if (stack.length === 0) {
    stackContainer.innerHTML = '<span style="font-size:12px; color:#94a3b8; text-align:center; margin:auto;">Empty Stack</span>';
    return;
  }

  stack.forEach((val, idx) => {
    const item = document.createElement('div');
    item.className = 'stack-item';
    item.textContent = val;
    if (idx === peekIndex) {
      item.classList.add('peeked');
    }
    stackContainer.appendChild(item);
  });
}

function stackPush() {
  const val = parseInt(stackInput.value, 10);
  if (isNaN(val)) {
    statusText.textContent = 'Please enter a valid number to push.';
    return;
  }
  if (stack.length >= 7) {
    statusText.textContent = 'Stack overflow! (Limit reached for visual demo)';
    return;
  }

  // Push: Insert element onto top of stack
  stack.push(val);
  renderStack();
  statusText.textContent = `Pushed ${val} onto the Stack (TOP is now ${val}).`;
}

function stackPop() {
  if (stack.length === 0) {
    statusText.textContent = 'Stack underflow! Cannot pop from an empty stack.';
    return;
  }

  // Pop: Remove element from top of stack
  const removed = stack.pop();
  renderStack();
  statusText.textContent = `Popped ${removed} from the Stack.`;
}

function stackPeek() {
  if (stack.length === 0) {
    statusText.textContent = 'Stack is empty. Nothing to peek.';
    return;
  }

  // Peek: Look at the top element without removing it
  const topIndex = stack.length - 1;
  const topVal = stack[topIndex];
  renderStack(topIndex);
  statusText.textContent = `Peek: TOP element is ${topVal} at index ${topIndex}.`;
}

// --- 6. Queue Data Structure Operations ---
function renderQueue(frontHighlight = false) {
  queueContainer.innerHTML = '';
  if (queue.length === 0) {
    queueContainer.innerHTML = '<span style="font-size:12px; color:#94a3b8; text-align:center; width:100%;">Empty Queue</span>';
    return;
  }

  queue.forEach((val, idx) => {
    const item = document.createElement('div');
    item.className = 'queue-item';
    item.textContent = val;
    if (frontHighlight && idx === 0) {
      item.classList.add('front-item');
    }
    queueContainer.appendChild(item);
  });
}

function queueEnqueue() {
  const val = parseInt(queueInput.value, 10);
  if (isNaN(val)) {
    statusText.textContent = 'Please enter a valid number to enqueue.';
    return;
  }
  if (queue.length >= 8) {
    statusText.textContent = 'Queue full! (Limit reached for visual demo)';
    return;
  }

  // Enqueue: Add element at rear
  queue.push(val);
  renderQueue();
  statusText.textContent = `Enqueued ${val} at the REAR of the Queue.`;
}

function queueDequeue() {
  if (queue.length === 0) {
    statusText.textContent = 'Queue underflow! Cannot dequeue from an empty queue.';
    return;
  }

  // Dequeue: Remove element from front
  const removed = queue.shift();
  renderQueue();
  statusText.textContent = `Dequeued ${removed} from the FRONT of the Queue.`;
}

function queueFront() {
  if (queue.length === 0) {
    statusText.textContent = 'Queue is empty. No front element.';
    return;
  }

  // Front: View front element without removing it
  const frontVal = queue[0];
  renderQueue(true);
  statusText.textContent = `Front element is ${frontVal}.`;
}

// --- Event Listeners ---

// Switching tabs
algoButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    switchAlgorithm(btn.dataset.algo);
  });
});

// Setting custom array
setArrayBtn.addEventListener('click', () => {
  array = parseArrayInput();
  if (currentAlgo === 'binary') {
    array.sort((a, b) => a - b);
    arrayInput.value = array.join(', ');
  }
  renderArray();
  statusText.textContent = 'Array updated.';
});

// Generating random array
randomArrayBtn.addEventListener('click', () => {
  const size = 5;
  array = Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
  if (currentAlgo === 'binary') {
    array.sort((a, b) => a - b);
  }
  arrayInput.value = array.join(', ');
  renderArray();
  statusText.textContent = 'Random array generated.';
});

// Reset button
resetBtn.addEventListener('click', () => {
  if (isRunning) return;
  array = parseArrayInput();
  if (currentAlgo === 'binary') {
    array.sort((a, b) => a - b);
  }
  renderArray();
  statusText.textContent = 'Array reset to input values.';
});

// Start algorithm runner button
runBtn.addEventListener('click', () => {
  if (isRunning) return;

  if (currentAlgo === 'bubble') {
    runBubbleSort();
  } else if (currentAlgo === 'selection') {
    runSelectionSort();
  } else if (currentAlgo === 'linear') {
    runLinearSearch();
  } else if (currentAlgo === 'binary') {
    runBinarySearch();
  }
});

// Stack button listeners
stackPushBtn.addEventListener('click', stackPush);
stackPopBtn.addEventListener('click', stackPop);
stackPeekBtn.addEventListener('click', stackPeek);

// Queue button listeners
queueEnqueueBtn.addEventListener('click', queueEnqueue);
queueDequeueBtn.addEventListener('click', queueDequeue);
queueFrontBtn.addEventListener('click', queueFront);

// Initial initialization
renderArray();
updateInfoCard('bubble');
