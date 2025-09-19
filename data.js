// ===== Rotating Health Slogans =====
const slogans = [
  "Welcome to GreenBite!",
  "Nourish Your Body, Elevate Your Life",
  "Small Changes, Big Results",
  "Eat Green, Feel Great",
  "Wellness Starts on Your Plate"
];
let currentSlogan = 0;

function rotateSlogans() {
  document.getElementById("slogan").textContent = slogans[currentSlogan];
  currentSlogan = (currentSlogan + 1) % slogans.length;
}

// Rotate every 4 seconds
setInterval(rotateSlogans, 4000);

// ===== Daily Health Tip (Date-Based) =====
const dailyTip = [
  "Drink a glass of water first thing in the morning.",
  "Add one extra vegetable to every meal today.",
  "Take a 5-minute stretch break every hour.",
  "Swap refined grains for whole grains today.",
  "Practice deep breathing for 3 minutes.",
  "Get 7-8 hours of sleep tonight.",
  "Try a new healthy recipe this week."
];

function getDailyTip() {
  const today = new Date().getDate(); // Get day of month (1-31)
  const tipIndex = today % dailyTip.length; // Ensure it cycles through tips
  document.getElementById("dailyTip").textContent = dailyTip[tipIndex];
}

// ===== Newsletter Subscription =====
document.getElementById("newsletterForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("emailInput").value;
  
  // Basic validation
  if (email.includes("@") && email.includes(".")) {
    localStorage.setItem("newsletterEmail", email);
    document.getElementById("message").textContent = "Thank you for subscribing!";
    document.getElementById("message").style.color = "#5E8C61";
    document.getElementById("emailInput").value = ""; // Clear input
    
    // Hide message after 3 seconds
    setTimeout(() => {
      document.getElementById("message").textContent = "";
    }, 3000);
  } else {
    document.getElementById("message").textContent = "Please enter a valid email.";
    document.getElementById("message").style.color = "#E74C3C";
  }
});

// ===== Mobile Hamburger Menu =====
document.getElementById("hamburger").addEventListener("click", function() {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
  
  // Change hamburger icon to X when open
  this.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
});

// ===== Initialize Page =====
window.onload = function() {
  rotateSlogans(); // Start slogan rotation
  getDailyTip();   // Show today's tip
  
  // Close mobile menu if clicking outside
  document.addEventListener("click", function(e) {
    const navLinks = document.getElementById("navLinks");
    const hamburger = document.getElementById("hamburger");
    
    if (!e.target.closest(".navbar") && navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      hamburger.textContent = "☰";
    }
  });
};

// ===== Initialize Page =====
window.onload = function() {
  rotateSlogans(); // Start slogan rotation
  getDailyTip();   // Show today's tip
  
}