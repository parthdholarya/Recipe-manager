document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the selected recipe from localStorage
  let selectedRecipe = JSON.parse(localStorage.getItem("selectedRecipe"));

  if (selectedRecipe) {
    // Populate the fields with recipe details
    document.getElementById("recipeName").textContent = selectedRecipe.r_name;
    document.getElementById("recipeIngredients").textContent = selectedRecipe.r_ing;
    document.getElementById("recipePreparation").textContent = selectedRecipe.r_prep;
    document.getElementById("recipeImage").src = selectedRecipe.r_img;
  } else {
    document.body.innerHTML = "<p>Recipe not found!</p>";  // If no recipe is selected
  }
});
