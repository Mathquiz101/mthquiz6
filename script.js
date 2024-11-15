// Array of motivational quotes
const quotes = [
    "The best way to predict the future is to create it.",
    "You are stronger than you think.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Dream big and dare to fail.",
    "Believe you can and you're halfway there.",
    "Act as if what you do makes a difference. It does.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Don’t watch the clock; do what it does. Keep going.",
];

// Function to generate a random quote
function generateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById("quote").textContent = quote;
}
