// ---------------------------------------------------------------------------
// AI Roadmap Generator — syllabus data
// Each topic has an ordered list of units. A unit = a Day/Week's main topic.
// For each unit we list subtopics, learning tasks and practice tasks.
// The generator picks units based on the user's skill level and duration.
// ---------------------------------------------------------------------------

export const SYLLABI = {
  dsa: {
    label: 'DSA (Data Structures & Algorithms)',
    units: [
      {
        topic: 'Arrays',
        subtopics: ['Declaration & traversal', 'Insertion & deletion', 'Multi-dimensional arrays'],
        learn: ['Learn array basics and memory layout', 'Understand traversal techniques', 'Study time complexity of array operations'],
        practice: ['Solve 3 basic array problems', 'Reverse an array', 'Find the maximum element'],
      },
      {
        topic: 'Searching',
        subtopics: ['Linear search', 'Binary search', 'Search on rotated arrays'],
        learn: ['Understand linear search', 'Master binary search logic', 'Learn search in rotated sorted arrays'],
        practice: ['Implement binary search', 'Solve 2 search problems', 'Find first and last occurrence'],
      },
      {
        topic: 'Sorting',
        subtopics: ['Bubble, selection, insertion sort', 'Merge sort', 'Quick sort'],
        learn: ['Learn comparison-based sorts', 'Understand divide & conquer', 'Analyze sort complexities'],
        practice: ['Implement merge sort', 'Sort an array of 0s, 1s and 2s', 'Solve 2 sorting problems'],
      },
      {
        topic: 'Strings',
        subtopics: ['String manipulation', 'Pattern matching', 'Two-pointer techniques'],
        learn: ['Learn string operations', 'Study palindromes & anagrams', 'Understand two-pointer approach'],
        practice: ['Check palindrome', 'Reverse words in a string', 'Solve 2 string problems'],
      },
      {
        topic: 'Linked Lists',
        subtopics: ['Singly linked list', 'Doubly linked list', 'Fast & slow pointers'],
        learn: ['Understand node structure', 'Learn insertion & deletion', 'Study fast/slow pointer technique'],
        practice: ['Reverse a linked list', 'Detect a cycle', 'Find the middle node'],
      },
      {
        topic: 'Stacks & Queues',
        subtopics: ['Stack operations', 'Queue & deque', 'Monotonic stack'],
        learn: ['Learn LIFO & FIFO principles', 'Understand stack applications', 'Study monotonic stacks'],
        practice: ['Valid parentheses', 'Implement queue using stacks', 'Next greater element'],
      },
      {
        topic: 'Recursion & Backtracking',
        subtopics: ['Recursion basics', 'Backtracking template', 'Subsets & permutations'],
        learn: ['Understand recursion tree', 'Learn backtracking pattern', 'Study base cases & pruning'],
        practice: ['Generate all subsets', 'N-Queens problem', 'Sudoku validator'],
      },
      {
        topic: 'Trees',
        subtopics: ['Binary tree', 'BST', 'Tree traversals'],
        learn: ['Learn tree terminology', 'Understand BFS & DFS traversals', 'Study binary search trees'],
        practice: ['Inorder traversal', 'Level order traversal', 'Validate a BST'],
      },
      {
        topic: 'Heaps & Hashing',
        subtopics: ['Min/max heap', 'Priority queue', 'Hash maps & sets'],
        learn: ['Understand heap property', 'Learn heapify & operations', 'Master hash map usage'],
        practice: ['Kth largest element', 'Top K frequent elements', 'Two sum problem'],
      },
      {
        topic: 'Graphs',
        subtopics: ['Graph representation', 'BFS & DFS', 'Shortest path'],
        learn: ['Learn adjacency list & matrix', 'Understand graph traversal', 'Study Dijkstra’s algorithm'],
        practice: ['Number of islands', 'BFS on a graph', 'Shortest path in unweighted graph'],
      },
      {
        topic: 'Dynamic Programming',
        subtopics: ['1D DP', '2D DP', 'Knapsack & subset problems'],
        learn: ['Understand overlapping subproblems', 'Learn memoization & tabulation', 'Study classic DP patterns'],
        practice: ['Climbing stairs', '0/1 Knapsack', 'Longest common subsequence'],
      },
      {
        topic: 'Greedy & Mock Interviews',
        subtopics: ['Greedy algorithms', 'Interview patterns', 'Full mock test'],
        learn: ['Learn greedy choice property', 'Review common interview patterns', 'Revise time complexities'],
        practice: ['Activity selection', 'Solve 5 mixed problems', 'Timed mock test (90 min)'],
      },
    ],
  },

  python: {
    label: 'Python Programming',
    units: [
      {
        topic: 'Python Basics',
        subtopics: ['Variables & data types', 'Input & output', 'Operators'],
        learn: ['Learn Python syntax and indentation', 'Understand data types', 'Study operators and expressions'],
        practice: ['Write a calculator program', 'Swap two variables', 'Solve 3 basic problems'],
      },
      {
        topic: 'Control Flow',
        subtopics: ['Conditional statements', 'Loops', 'Break & continue'],
        learn: ['Master if-elif-else', 'Understand for & while loops', 'Learn break and continue'],
        practice: ['Print patterns', 'FizzBuzz problem', 'Check prime number'],
      },
      {
        topic: 'Functions & Modules',
        subtopics: ['Defining functions', 'Arguments & return', 'Built-in modules'],
        learn: ['Learn function definition', 'Understand arguments & scope', 'Explore built-in modules'],
        practice: ['Build a reusable utility function', 'Use the math module', 'Solve 2 function problems'],
      },
      {
        topic: 'Data Structures in Python',
        subtopics: ['Lists & tuples', 'Dictionaries', 'Sets'],
        learn: ['Master list operations', 'Understand dictionaries', 'Learn sets and their use cases'],
        practice: ['Count word frequency', 'Remove duplicates using set', 'Solve 3 problems'],
      },
      {
        topic: 'Object-Oriented Programming',
        subtopics: ['Classes & objects', 'Inheritance', 'Polymorphism'],
        learn: ['Learn classes and objects', 'Understand inheritance', 'Study polymorphism & encapsulation'],
        practice: ['Create a Bank Account class', 'Implement inheritance hierarchy', 'Solve 2 OOP problems'],
      },
      {
        topic: 'File Handling & Exceptions',
        subtopics: ['Reading & writing files', 'Exception handling', 'Context managers'],
        learn: ['Learn file operations', 'Understand try-except-finally', 'Study context managers (with)'],
        practice: ['Read and write a text file', 'Handle division by zero', 'Log errors to a file'],
      },
      {
        topic: 'Standard Libraries',
        subtopics: ['os & sys', 'datetime', 'collections'],
        learn: ['Explore os and sys modules', 'Work with dates and times', 'Use collections (Counter, deque)'],
        practice: ['List files in a directory', 'Build a countdown timer', 'Count characters with Counter'],
      },
      {
        topic: 'Mini Project & Best Practices',
        subtopics: ['Project structure', 'PEP 8', 'Debugging'],
        learn: ['Learn project organization', 'Understand PEP 8 style guide', 'Study debugging techniques'],
        practice: ['Build a to-do CLI app', 'Refactor code to PEP 8', 'Add error handling to a script'],
      },
    ],
  },

  'web development': {
    label: 'Web Development',
    units: [
      {
        topic: 'HTML Fundamentals',
        subtopics: ['Page structure', 'Forms & inputs', 'Semantic HTML'],
        learn: ['Learn HTML tags and structure', 'Understand forms and inputs', 'Study semantic elements'],
        practice: ['Build a personal profile page', 'Create a contact form', 'Structure a blog page'],
      },
      {
        topic: 'CSS & Layouts',
        subtopics: ['Selectors & box model', 'Flexbox', 'Grid'],
        learn: ['Master CSS selectors', 'Understand the box model', 'Learn Flexbox and Grid layouts'],
        practice: ['Style the profile page', 'Build a responsive navbar', 'Create a card grid layout'],
      },
      {
        topic: 'JavaScript Basics',
        subtopics: ['Variables & types', 'Functions', 'DOM manipulation'],
        learn: ['Learn JS syntax and variables', 'Understand functions and scope', 'Study DOM manipulation'],
        practice: ['Build a counter app', 'Create a to-do list', 'Add interactivity to a page'],
      },
      {
        topic: 'JavaScript Advanced',
        subtopics: ['ES6+ features', 'Async & promises', 'Fetch API'],
        learn: ['Master arrow functions & destructuring', 'Understand promises and async/await', 'Learn the Fetch API'],
        practice: ['Fetch data from a public API', 'Build a weather app', 'Handle async errors'],
      },
      {
        topic: 'Responsive Design',
        subtopics: ['Media queries', 'Mobile-first design', 'CSS frameworks'],
        learn: ['Learn media queries', 'Understand mobile-first approach', 'Explore a CSS framework'],
        practice: ['Make the to-do app responsive', 'Build a mobile landing page', 'Test on different screen sizes'],
      },
      {
        topic: 'Frontend Framework',
        subtopics: ['Components', 'State & props', 'Routing'],
        learn: ['Learn component-based architecture', 'Understand state and props', 'Study client-side routing'],
        practice: ['Build a counter with a framework', 'Create a product list page', 'Add routing between pages'],
      },
      {
        topic: 'Backend Basics',
        subtopics: ['Node.js & Express', 'REST APIs', 'Routing & middleware'],
        learn: ['Understand Node.js runtime', 'Learn Express basics', 'Study REST API design'],
        practice: ['Build a simple REST API', 'Create CRUD endpoints', 'Add middleware for logging'],
      },
      {
        topic: 'Databases & Deployment',
        subtopics: ['SQL & NoSQL', 'Connecting database', 'Deploying the app'],
        learn: ['Learn SQL and NoSQL basics', 'Understand database connections', 'Study deployment platforms'],
        practice: ['Connect an API to a database', 'Deploy the full-stack app', 'Document the project in a README'],
      },
    ],
  },

  'machine learning': {
    label: 'Machine Learning',
    units: [
      {
        topic: 'ML Foundations',
        subtopics: ['What is ML?', 'Supervised vs unsupervised', 'ML workflow'],
        learn: ['Understand machine learning concepts', 'Learn types of ML', 'Study the end-to-end ML workflow'],
        practice: ['Summarize ML types with examples', 'Outline a sample ML project', 'Take notes on ML workflow'],
      },
      {
        topic: 'Python for ML',
        subtopics: ['NumPy', 'Pandas', 'Matplotlib'],
        learn: ['Learn NumPy arrays & operations', 'Master Pandas DataFrames', 'Study data visualization'],
        practice: ['Analyze a CSV with Pandas', 'Plot a dataset with Matplotlib', 'Clean a messy dataset'],
      },
      {
        topic: 'Data Preprocessing',
        subtopics: ['Missing values', 'Scaling & encoding', 'Train/test split'],
        learn: ['Learn handling missing data', 'Understand scaling & encoding', 'Study train/test splitting'],
        practice: ['Preprocess a real dataset', 'Encode categorical features', 'Split data for training'],
      },
      {
        topic: 'Regression',
        subtopics: ['Linear regression', 'Evaluation metrics', 'Regularization'],
        learn: ['Understand linear regression', 'Learn MSE, MAE, R²', 'Study L1 & L2 regularization'],
        practice: ['Predict house prices', 'Evaluate a regression model', 'Apply ridge regression'],
      },
      {
        topic: 'Classification',
        subtopics: ['Logistic regression', 'KNN', 'Decision trees'],
        learn: ['Learn logistic regression', 'Understand KNN', 'Study decision trees'],
        practice: ['Classify iris flowers', 'Build a KNN classifier', 'Train a decision tree'],
      },
      {
        topic: 'Model Evaluation',
        subtopics: ['Confusion matrix', 'Precision & recall', 'Cross-validation'],
        learn: ['Understand confusion matrix', 'Learn precision, recall, F1', 'Study cross-validation'],
        practice: ['Evaluate a classifier', 'Plot a confusion matrix', 'Run k-fold cross-validation'],
      },
      {
        topic: 'Unsupervised Learning',
        subtopics: ['K-Means clustering', 'PCA', 'Hierarchical clustering'],
        learn: ['Understand clustering', 'Learn PCA for dimensionality reduction', 'Study hierarchical clustering'],
        practice: ['Cluster customer data', 'Apply PCA to a dataset', 'Compare clustering methods'],
      },
      {
        topic: 'Mini ML Project',
        subtopics: ['Problem framing', 'Model pipeline', 'Reporting results'],
        learn: ['Frame an ML problem', 'Build an end-to-end pipeline', 'Learn to report results clearly'],
        practice: ['Complete a Kaggle beginner project', 'Document the ML pipeline', 'Present findings in a notebook'],
      },
    ],
  },
};

// Fuzzy match the user's free-text topic to one of our syllabi.
export function resolveTopic(rawTopic) {
  const t = (rawTopic || '').trim().toLowerCase();
  if (!t) return null;
  if (SYLLABI[t]) return t;
  for (const key of Object.keys(SYLLABI)) {
    if (t.includes(key) || key.includes(t)) return key;
  }
  // Keyword hints
  const hints = [
    { key: 'dsa', words: ['data structure', 'algorithm', 'dsa', 'competitive'] },
    { key: 'python', words: ['python', 'django', 'flask'] },
    { key: 'web development', words: ['web', 'frontend', 'fullstack', 'full stack', 'react', 'html', 'css'] },
    { key: 'machine learning', words: ['machine learning', 'ml', 'ai', 'deep learning', 'data science'] },
  ];
  for (const h of hints) {
    if (h.words.some((w) => t.includes(w))) return h.key;
  }
  return null;
}
