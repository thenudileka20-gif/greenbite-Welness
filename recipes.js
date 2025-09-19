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


  // Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Recipe data
    const recipes = [
        {
            id: 1,
            title: "Greek Yogurt Parfait",
            category: "breakfast",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU9SVgsVPJlamNo1Cm6P-bcsEO3F2xqGn47A&s",
            description: "Layered Greek yogurt with fresh berries and crunchy granola",
            ingredients: [
                "1 cup Greek yogurt",
                "1/2 cup fresh strawberries, sliced",
                "1/4 cup blueberries",
                "1/4 cup granola",
                "1 tsp honey (optional)"
            ],
            instructions: [
                "In a glass or bowl, add 1/3 of the Greek yogurt",
                "Add a layer of granola and some blueberries",
                "Spoon in another layer of yogurt and add strawberries",
                "Top with remaining yogurt, granola, and berries",
                "Drizzle honey on top if desired"
            ],
            nutrition: {
                calories: 290,
                protein: 17,
                carbs: 28,
                fat: 10
            }
        },
        {
            id: 2,
            title: "Avocado Toast",
            category: "breakfast",
            image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b",
            description: "Simple, delicious and packed with healthy fats",
            ingredients: [
                "2 slices whole grain bread",
                "1 ripe avocado",
                "1 tbsp lemon juice",
                "Salt and pepper to taste",
                "Red pepper flakes (optional)",
                "2 eggs (optional)"
            ],
            instructions: [
                "Toast the bread until golden and crisp",
                "Mash the avocado with lemon juice, salt and pepper",
                "Spread the avocado mixture on the toast",
                "Top with red pepper flakes if desired",
                "For extra protein, add a poached or fried egg on top"
            ],
            nutrition: {
                calories: 320,
                protein: 8,
                carbs: 30,
                fat: 20
            }
        },
        {
            id: 3,
            title: "Quinoa Buddha Bowl",
            category: "lunch",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRnrLIp-AdGma2Jgyu_8VreMkiF40pRCYGog&s",
            description: "Nutritious and colorful plant-based meal",
            ingredients: [
                "1 cup cooked quinoa",
                "1/2 cup chickpeas",
                "1/2 avocado, sliced",
                "1/2 cup cherry tomatoes, halved",
                "1/2 cucumber, diced",
                "2 cups mixed greens",
                "2 tbsp tahini dressing"
            ],
            instructions: [
                "Cook quinoa according to package instructions",
                "Prepare all vegetables",
                "Assemble bowl with quinoa as base",
                "Arrange vegetables and chickpeas on top",
                "Drizzle with tahini dressing"
            ],
            nutrition: {
                calories: 450,
                protein: 15,
                carbs: 55,
                fat: 20
            }
        },
        {
            id: 4,
            title: "Baked Salmon with Vegetables",
            category: "dinner",
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
            description: "Omega-3 rich dinner ready in 30 minutes",
            ingredients: [
                "2 salmon fillets",
                "1 tbsp olive oil",
                "1 lemon, sliced",
                "2 cups mixed vegetables (asparagus, zucchini, bell peppers)",
                "1 tsp garlic powder",
                "Salt and pepper to taste"
            ],
            instructions: [
                "Preheat oven to 400°F (200°C)",
                "Place salmon and vegetables on baking sheet",
                "Drizzle with olive oil and season",
                "Add lemon slices on top of salmon",
                "Bake for 15-20 minutes until salmon flakes easily"
            ],
            nutrition: {
                calories: 380,
                protein: 34,
                carbs: 12,
                fat: 22
            }
        },
        {
            id: 5,
            title: "Chicken Veggie Wrap",
            category: "lunch",
            image: "https://whatsfordinner.com/wp-content/uploads/2017/02/chicken-vegetable-wrap-sandwich-recipe.jpg",
            description: "A protein-packed, fresh and easy-to-make lunch wrap",
            ingredients: [
                "1 whole wheat tortilla",
                "1/2 cup grilled chicken, sliced",
                "1/4 cup shredded carrots",
                "1/4 cup sliced cucumber",
                "1/4 avocado, sliced",
                "1 tbsp hummus",
                "1 handful of spinach leaves"
            ],
            instructions: [
                "Warm tortilla in a pan or microwave for 10 seconds",
                "Spread hummus over the tortilla",
                "Add grilled chicken, veggies, and spinach in the center",
                "Top with avocado slices",
                "Wrap tightly and slice in half to serve"
            ],
            nutrition: {
                calories: 400,
                protein: 28,
                carbs: 32,
                fat: 18
            }
        },
        {
            id: 6,
            title: "Energy Balls",
            category: "snack",
            image: "https://images.unsplash.com/photo-1609951651556-5334e2706168",
            description: "No-bake protein-packed energy bites",
            ingredients: [
                "1 cup dates, pitted",
                "1 cup nuts (almonds or walnuts)",
                "2 tbsp cocoa powder",
                "1 tbsp chia seeds",
                "1/4 cup shredded coconut",
                "1 tsp vanilla extract"
            ],
            instructions: [
                "Process dates and nuts in food processor until sticky",
                "Add cocoa powder, chia seeds and vanilla, process again",
                "Roll mixture into small balls",
                "Coat with shredded coconut",
                "Refrigerate for 1 hour before serving"
            ],
            nutrition: {
                calories: 180,
                protein: 4,
                carbs: 20,
                fat: 10
            }
        }
    ];

    // Get DOM elements
    const recipeContainer = document.getElementById('recipeContainer');
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');
    const modal = document.getElementById('recipeModal');
    const closeModal = document.querySelector('.close');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const ingredientsList = document.getElementById('ingredientsList');
    const instructionsList = document.getElementById('instructionsList');
    const nutritionTable = document.getElementById('nutritionTable');

    // Display all recipes initially
    displayRecipes(recipes);

    // Search and filter functionality
    searchInput.addEventListener('input', filterRecipes);
    filterSelect.addEventListener('change', filterRecipes);

    // Close modal when clicking X
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Function to display recipes
    function displayRecipes(recipesToDisplay) {
        recipeContainer.innerHTML = '';
        
        recipesToDisplay.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                <div class="recipe-info">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <p class="recipe-desc">${recipe.description}</p>
                    <span class="recipe-category">${recipe.category}</span>
                </div>
            `;
            
            recipeCard.addEventListener('click', function() {
                showRecipeModal(recipe);
            });
            
            recipeContainer.appendChild(recipeCard);
        });
    }

    // Function to filter recipes
    function filterRecipes() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = filterSelect.value;
        
        const filteredRecipes = recipes.filter(recipe => {
            const matchesSearch = recipe.title.toLowerCase().includes(searchTerm) || 
                                recipe.description.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || 
                                  recipe.category === selectedCategory;
            
            return matchesSearch && matchesCategory;
        });
        
        displayRecipes(filteredRecipes);
    }

    // Function to show recipe modal
    function showRecipeModal(recipe) {
        modalTitle.textContent = recipe.title;
        modalImage.src = recipe.image;
        modalImage.alt = recipe.title;
        
        // Clear previous content
        ingredientsList.innerHTML = '';
        instructionsList.innerHTML = '';
        
        // Add ingredients
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientsList.appendChild(li);
        });
        
        // Add instructions
        recipe.instructions.forEach(instruction => {
            const li = document.createElement('li');
            li.textContent = instruction;
            instructionsList.appendChild(li);
        });
        
        // Add nutrition info
        nutritionTable.innerHTML = `
            <tr>
                <th>Calories</th>
                <th>Protein</th>
                <th>Carbs</th>
                <th>Fat</th>
            </tr>
            <tr>
                <td>${recipe.nutrition.calories}</td>
                <td>${recipe.nutrition.protein}g</td>
                <td>${recipe.nutrition.carbs}g</td>
                <td>${recipe.nutrition.fat}g</td>
            </tr>
        `;
        
        modal.style.display = 'block';
    }
});
