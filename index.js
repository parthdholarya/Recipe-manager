// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const searchInput = document.getElementById("searchInput");
  const lastSearch = localStorage.getItem("lastSearchQuery") || "";

  searchInput.value = lastSearch;
  loadRecipes(lastSearch);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    addRecipe();
  });

  searchInput.addEventListener("keyup", searchRecipes);
});

// Add new recipe
function addRecipe() {
  const form = document.getElementById("form");
  const formData = new FormData(form);

  const r_name = formData.get("r_name").trim();
  const r_ing = formData.get("r_ing").trim();
  const r_prep = formData.get("r_prep").trim();
  const img = formData.get("img");

  if (!r_name || !r_ing || !r_prep || !img) {
    alert("All fields are required!");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const r_img = reader.result;
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    recipes.push({ r_name, r_ing, r_prep, r_img });
    localStorage.setItem("recipes", JSON.stringify(recipes));

    form.reset();
    togglePopup();
    loadRecipes();
  };
  reader.readAsDataURL(img);
}

// Load and display recipes
function loadRecipes(searchQuery = "") {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  const container = document.getElementById("cardContainer");
  container.innerHTML = "";

  const query = searchQuery.toLowerCase();
  localStorage.setItem("lastSearchQuery", query);

  const filtered = recipes.filter(r => r.r_name.toLowerCase().includes(query));

  if (filtered.length === 0) {
    container.innerHTML = "<p>No matching recipes found!</p>";
    return;
  }

  filtered.forEach((recipe, index) => {
    const card = document.createElement("div");
    card.className = "col-md-3 mb-3";
    card.innerHTML = `
      <div class="card">
        <img src="${recipe.r_img}" class="card-img-top" alt="Recipe Image">
        <div class="card-body">
          <h5>
            <a href="#" class="card-title" onclick="viewRecipe(${index}, event)">${recipe.r_name}</a>
          </h5>
          <p class="card-text">${recipe.r_ing}</p>
          <button class="btn btn-danger" onclick="deleteRecipe(${index})">Delete</button>
        </div>
      </div>`;
    container.appendChild(card);
  });
}

// Search recipes
function searchRecipes() {
  const query = document.getElementById("searchInput").value;
  loadRecipes(query);
}

// View recipe in detail page
function viewRecipe(index, event) {
  event.preventDefault();
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  localStorage.setItem("selectedRecipe", JSON.stringify(recipes[index]));
  window.location.href = "Detail.html";
}

// Delete a recipe
function deleteRecipe(index) {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  if (confirm("Are you sure you want to delete this recipe?")) {
    recipes.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(recipes));
    loadRecipes();
  }
}

// Toggle popup visibility
function togglePopup() {
  document.getElementById("popupOverlay").classList.toggle("show");
}
