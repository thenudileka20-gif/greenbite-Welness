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

  // Workout Data
const workoutData = {
  arms: {
    none: [
      { name: "Push-ups", duration: 30, sets: 3, reps: "10-15" },
      { name: "Tricep Dips", duration: 30, sets: 3, reps: "10-12" }
    ],
    dumbbells: [
      { name: "Bicep Curls", duration: 45, sets: 3, reps: "12" },
      { name: "Hammer Curls", duration: 45, sets: 3, reps: "12" }
    ],
    resistancebands: [
      { name: "Resistance Band Bicep Curl", duration: 40, sets: 3, reps: "12" }
    ],
    kettlebell: [
      { name: "Kettlebell Curl Press", duration: 45, sets: 3, reps: "10" }
    ],
    barbell: [
      { name: "Barbell Curl", duration: 50, sets: 3, reps: "10" }
    ]
  },
  legs: {
    none: [
      { name: "Squats", duration: 45, sets: 3, reps: "15" },
      { name: "Lunges", duration: 45, sets: 3, reps: "10 each" }
    ],
    dumbbells: [
      { name: "Dumbbell Goblet Squats", duration: 45, sets: 3, reps: "12" }
    ],
    resistancebands: [
      { name: "Resistance Band Glute Kickbacks", duration: 40, sets: 3, reps: "15 each" }
    ],
    kettlebell: [
      { name: "Kettlebell Deadlifts", duration: 45, sets: 3, reps: "12" }
    ],
    barbell: [
      { name: "Barbell Back Squats", duration: 60, sets: 3, reps: "8" }
    ]
  },
  core: {
    none: [
      { name: "Plank", duration: 30, sets: 3, reps: "30 sec" },
      { name: "Crunches", duration: 30, sets: 3, reps: "15" }
    ],
    dumbbells: [
      { name: "Dumbbell Russian Twists", duration: 30, sets: 3, reps: "20 twists" }
    ],
    resistancebands: [
      { name: "Resistance Band Bicycle Crunches", duration: 30, sets: 3, reps: "20" }
    ],
    kettlebell: [
      { name: "Kettlebell Sit-Ups", duration: 35, sets: 3, reps: "15" }
    ],
    barbell: [
      { name: "Barbell Rollouts", duration: 40, sets: 3, reps: "8" }
    ]
  },
  upperbody: {
    none: [
      { name: "Incline Push-ups", duration: 30, sets: 3, reps: "15" }
    ],
    dumbbells: [
      { name: "Dumbbell Shoulder Press", duration: 40, sets: 3, reps: "12" }
    ],
    resistancebands: [
      { name: "Resistance Band Chest Fly", duration: 40, sets: 3, reps: "12" }
    ],
    kettlebell: [
      { name: "Kettlebell Shoulder Press", duration: 45, sets: 3, reps: "10" }
    ],
    barbell: [
      { name: "Barbell Overhead Press", duration: 50, sets: 3, reps: "10" }
    ]
  },
  fullbody: {
    none: [
      { name: "Burpees", duration: 30, sets: 3, reps: "10" }
    ],
    dumbbells: [
      { name: "Dumbbell Thrusters", duration: 45, sets: 3, reps: "12" }
    ],
    resistancebands: [
      { name: "Resistance Band Squat Press", duration: 40, sets: 3, reps: "15" }
    ],
    kettlebell: [
      { name: "Kettlebell Swings", duration: 45, sets: 3, reps: "20" }
    ],
    barbell: [
      { name: "Barbell Clean and Press", duration: 60, sets: 3, reps: "8" }
    ]
  }
};
  
// When page loads
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Set up body part selection
  const bodyPartBtns = document.querySelectorAll('#bodyPartSelection .selection-btn');
  bodyPartBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      bodyPartBtns.forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // 2. Set up equipment selection
  const equipmentBtns = document.querySelectorAll('#equipmentSelection .selection-btn');
  equipmentBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      equipmentBtns.forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // 3. Generate workout button
  document.getElementById('generateBtn').addEventListener('click', function() {
    const selectedBodyPart = document.querySelector('#bodyPartSelection .selected')?.dataset.value;
    const selectedEquipment = document.querySelector('#equipmentSelection .selected')?.dataset.value;
    
    if (!selectedBodyPart || !selectedEquipment) {
      alert("Please select both body part and equipment");
      return;
    }

    // Get exercises
    const exercises = workoutData[selectedBodyPart]?.[selectedEquipment] || [];
    if (exercises.length === 0) {
      alert("No exercises found for this combination");
      return;
    }

    // Display exercises
    displayWorkout(exercises);
  });

  // 4. Timer controls
  let timer;
  document.getElementById('startTimer').addEventListener('click', function() {
    if (timer) {
      clearInterval(timer);
      timer = null;
      this.textContent = "Start Timer";
    } else {
      startTimer();
      this.textContent = "Stop Timer";
    }
  });

  document.getElementById('resetTimer').addEventListener('click', function() {
    clearInterval(timer);
    timer = null;
    document.getElementById('startTimer').textContent = "Start Timer";
    document.querySelectorAll('.exercise-timer').forEach(el => {
      const duration = el.getAttribute('data-duration');
      el.textContent = formatTime(duration);
    });
  });

  // Helper function to display workout
  function displayWorkout(exercises) {
    const container = document.getElementById('exerciseContainer');
    container.innerHTML = '';
    
    exercises.forEach((ex, i) => {
      const card = document.createElement('div');
      card.className = 'exercise-card';
      card.innerHTML = `
        <div class="exercise-header">
          <h3>${ex.name}</h3>
          <div class="exercise-timer" data-duration="${ex.duration}">${formatTime(ex.duration)}</div>
        </div>
        <p>${ex.sets} sets of ${ex.reps}</p>
      `;
      container.appendChild(card);
    });
    
    document.getElementById('workoutPlan').style.display = 'block';
  }

  // Helper function to start timer
  function startTimer() {
    const timers = document.querySelectorAll('.exercise-timer');
    let currentIndex = 0;
    
    function runTimer() {
      if (currentIndex >= timers.length) return;
      
      const timerEl = timers[currentIndex];
      let timeLeft = parseInt(timerEl.getAttribute('data-duration'));
      
      // Highlight current exercise
      timers.forEach((t, i) => {
        t.parentElement.parentElement.classList.toggle('current-exercise', i === currentIndex);
      });
      
      timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = formatTime(timeLeft);
        
        if (timeLeft <= 0) {
          clearInterval(timer);
          currentIndex++;
          if (currentIndex < timers.length) {
            setTimeout(runTimer, 1000);
          }
        }
      }, 1000);
    }
    
    runTimer();
  }

  // Helper function to format time
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
});