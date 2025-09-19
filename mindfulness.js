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

 
// Close mobile menu if clicking outside
document.addEventListener("click", function(e) {
const navLinks = document.getElementById("navLinks");
const hamburger = document.getElementById("hamburger");

if (!e.target.closest(".navbar") && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    hamburger.textContent = "☰";
}
});


// Breathing Animation with Line
const breathingLine = document.getElementById('breathingLine');
const breatheText = document.getElementById('breatheText');
const startBreathingBtn = document.getElementById('startBreathing');
let isBreathing = false;
let breathInterval;

if (startBreathingBtn) {
    startBreathingBtn.addEventListener('click', function() {
        if (isBreathing) {
            // Stop breathing
            clearInterval(breathInterval);
            breathingLine.style.animation = 'none';
            breathingLine.style.transform = 'scaleX(1)';
            breatheText.textContent = "Paused";
            this.innerHTML = 'Start Breathing';
            isBreathing = false;
        } else {
            // Start breathing
            this.innerHTML = ' Pause Breathing';
            isBreathing = true;
            
            // Initial breath
            breatheIn();
            
            // Continue breathing cycle
            breathInterval = setInterval(() => {
                if (!isBreathing) return;
                if (breatheText.textContent === "Breathe In...") {
                    breatheOut();
                } else {
                    breatheIn();
                }
            }, 4000);
        }
    });
}

function breatheIn() {
    breatheText.textContent = "Breathe In...";
    breathingLine.style.animation = 'breatheIn 2s forwards';
}

function breatheOut() {
    breatheText.textContent = "Breathe Out...";
    breathingLine.style.animation = 'breatheOut 2s forwards';
}

// ===== Meditation Timer =====
const startTimerBtn = document.getElementById("startTimer");
const resetTimerBtn = document.getElementById("resetTimer");
const timerDisplay = document.getElementById("timerDisplay");
const sessionCounter = document.getElementById("sessionCount");
const timeOptions = document.querySelectorAll(".time-option");
let timerInterval;
let timeLeft = 300; // Default 5 minutes
let sessions = parseInt(localStorage.getItem("meditationSessions")) || 0;

// Initialize session count
if (sessionCounter) {
    sessionCounter.textContent = sessions;
}

// Format time as MM:SS
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update timer display
function updateDisplay() {
    if (timerDisplay) {
        timerDisplay.textContent = formatTime(timeLeft);
    }
}

// Complete session handler
function completeSession() {
    sessions++;
    if (sessionCounter) {
        sessionCounter.textContent = sessions;
    }
    localStorage.setItem("meditationSessions", sessions.toString());
    alert("Meditation session complete! Great job!");
}

// Start/pause timer
if (startTimerBtn) {
    startTimerBtn.addEventListener("click", function() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            this.innerHTML = 'Start';
        } else {
            this.innerHTML = ' Pause';
            updateDisplay();
            
            timerInterval = setInterval(() => {
                timeLeft--;
                updateDisplay();
                
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    startTimerBtn.innerHTML = 'Start';
                    completeSession();
                }
            }, 1000);
        }
    });
}

// Reset timer
if (resetTimerBtn) {
    resetTimerBtn.addEventListener("click", function() {
        clearInterval(timerInterval);
        timerInterval = null;
        timeLeft = 300; // Reset to 5 minutes
        updateDisplay();
        if (startTimerBtn) {
            startTimerBtn.innerHTML = ' Start';
        }
    });
}

// Time options
timeOptions.forEach(option => {
    option.addEventListener("click", function() {
        timeLeft = parseInt(this.dataset.minutes) * 60;
        updateDisplay();
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            if (startTimerBtn) {
                startTimerBtn.innerHTML = 'Start';
            }
        }
    });
});

// ===== Ambient Sounds =====
const soundBtns = document.querySelectorAll(".sound-btn");
const sounds = {
birds: new Audio("burghrecords__birds-singing-forest-scotland(chosic.com).mp3"),
rain: new Audio("Heavy-Rain(chosic.com).mp3"),
waves: new Audio("nervousneal__morning-surf-at-boracay-philippines(chosic.com).mp3")
};
let currentSound = null;

// Set all sounds to loop
Object.values(sounds).forEach(sound => {
    sound.loop = true;
});

soundBtns.forEach(btn => {
    btn.addEventListener("click", function() {
        const soundType = this.dataset.sound;
        
        // Stop current sound if playing
        if (currentSound) {
            sounds[currentSound].pause();
            document.querySelector(`.sound-btn[data-sound="${currentSound}"]`).classList.remove("active");
        }
        
        // Play new sound if different
        if (currentSound !== soundType) {
            sounds[soundType].currentTime = 0;
            sounds[soundType].play();
            this.classList.add("active");
            currentSound = soundType;
        } else {
            currentSound = null;
        }
    });
});