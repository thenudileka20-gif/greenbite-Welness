// ===== Newsletter Subscription =====
document.getElementById("newsletterForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("emailInput").value;
  
  if (email.includes("@") && email.includes(".")) {
    localStorage.setItem("newsletterEmail", email);
    document.getElementById("message").textContent = "Thank you for subscribing!";
    document.getElementById("message").style.color = "#5E8C61";
    document.getElementById("emailInput").value = ""; // Clear input
    
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
  
  this.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
});

document.addEventListener("click", function(e) {
  const navLinks = document.getElementById("navLinks");
  const hamburger = document.getElementById("hamburger");
  
  if (!e.target.closest(".navbar") && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    hamburger.textContent = "☰";
  }
});


// Calculator Functionality
function initCalculatorPage() {
    const calorieForm = document.getElementById('calorieForm');
    const resultsContainer = document.getElementById('results');
    
    if (!calorieForm) return; // Exit if not on calculator page

    calorieForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get input values
        const age = parseInt(document.getElementById('age').value);
        const height = parseInt(document.getElementById('height').value);
        const weight = parseInt(document.getElementById('weight').value);
        const activity = parseFloat(document.getElementById('activity').value);
        const gender = document.querySelector('input[name="gender"]:checked').value;
        
        // Validate inputs
        if (isNaN(age) || isNaN(height) || isNaN(weight)) {
            alert('Please fill in all fields with valid numbers');
            return;
        }
        
        // Calculate BMR
        let bmr;
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
        
        // Calculate TDEE
        const tdee = Math.round(bmr * activity);
        
        // Calculate Macros
        const carbs = Math.round((tdee * 0.50) / 4);
        const protein = Math.round((tdee * 0.20) / 4);
        const fat = Math.round((tdee * 0.30) / 9);
        
        // Display Results
        document.getElementById('bmrResult').textContent = Math.round(bmr) + ' kcal';
        document.getElementById('tdeeResult').textContent = tdee + ' kcal';
        document.getElementById('carbsGrams').textContent = carbs + 'g';
        document.getElementById('proteinGrams').textContent = protein + 'g';
        document.getElementById('fatGrams').textContent = fat + 'g';
        
        // Animate Progress Bars
        setTimeout(() => {
            document.getElementById('carbsBar').style.width = '50%';
            document.getElementById('proteinBar').style.width = '20%';
            document.getElementById('fatBar').style.width = '30%';
        }, 100);
        
        // Show Results
        resultsContainer.style.display = 'block';
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    });
}

// Update your DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {
    
    if (document.getElementById('calorieForm')) {
        initCalculatorPage();
    }
    
});
