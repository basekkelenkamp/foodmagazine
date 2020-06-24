//Global vars
let favorites = [];
let recipes;
let clickId;
let lastRecipe;
let recipeShown = false;
let buttonRecipe;

//Get elements
let parentFoods = document.querySelector(".parent-foods");
let menu = document.querySelector(".menu");

//Init on load
window.addEventListener("load", init);


function init() {

    //Get items from localstorage
    let checkSavedData = localStorage.getItem("localFavourites");

    //if localstorage is not empty, convert to array and init favorites in HTML
    if (checkSavedData !== null) {
        favorites = JSON.parse(checkSavedData);
        for (favorite of favorites) {
            let button = document.getElementById("fav" + favorite);
            button.classList.add('favorited');
            button.innerHTML = "Favorite";
        }
    }

    getAllRecipes();

    //EventListener for clicking
    parentFoods.addEventListener("click", buttonClick)
}

function getAllRecipes() {
    fetch('recepten.json')
        .then(function (response) {

            //Succes handler
            if (response.status === 200 && response.ok) {
                return response.json(); //JSON.parse
            }
            throw new Error(response.statusText)
        })

        //Actual data stored in recipes
        .then(function (data) {
            recipes = data;
            console.log(recipes);
        })

        //Error handler
        .catch(function (error) {
            console.log(error);
        })

}


function buttonClick(event) {

    //Get and save id from clicked recipe
    let clicked = event.target.id;
    clickId = clicked.replace(/\D/g, '');
    console.log(clickId);

    //check if favorite button was clicked
    if (clicked.startsWith("fav")) {
        addFavourite(clickId);
    }

    //check if recipe button was clicked
    if (clicked.startsWith("btn")) {
        showRecipe(clickId);
    }
}


function addFavourite(content) {

    console.log(content);
    console.log(favorites);

    //Get button with the correct id number
    let button = document.getElementById("fav" + clickId);

    //Adds item to array & creates favorited class if it doesnt exist
    if (!favorites.includes(content)) {
        favorites.push(content);
        button.classList.add('favorited');
        button.innerHTML = "Favorite";
    } else {

        //Else remove item from array & favorited class
        const index = favorites.indexOf(content);
        if (index > -1) {
            favorites.splice(index, 1);
            button.classList.remove('favorited');
            button.innerHTML = "Add to favorites";
        }
    }

    //Convert favorites to json and save in local storage
    let jsonString = JSON.stringify(favorites);
    localStorage.setItem("localFavourites", jsonString);
    console.log(jsonString);
}

function showRecipe(content) {

    if (!recipeShown) {

        // let recipeEmpty = document.getElementById('recipeEmpty');
        // recipeEmpty.remove();


        //Update status
        recipeShown = true;
        let x = clickId - 1;

        console.log(recipes);

        //Create main element
        let showRecipeDiv = document.createElement("div");
        showRecipeDiv.classList.add("recipe");

        //Create sub elements
        let recipeInfoDiv = document.createElement("div");

        let recipeTitle = document.createElement("h3");
        recipeTitle.innerHTML = recipes[x].gerecht;
        recipeTitle.classList.add("recipetitle");

        let recipeIngredients = document.createElement("p");
        recipeIngredients.innerHTML = recipes[x].ingredienten.join(' - ');
        recipeIngredients.classList.add("recipetext");

        let recipeDetailsDiv = document.createElement("div");

        let recipeTags = document.createElement("h3");
        recipeTags.innerHTML = recipes[x].origin;
        recipeTags.classList.add("recipetitle");

        let recipeDetails = document.createElement("p");
        recipeDetails.innerHTML = recipes[x].recept;
        recipeDetails.classList.add("recipetext");


        //append all sub divs to main div
        recipeInfoDiv.appendChild(recipeTitle);
        recipeInfoDiv.appendChild(recipeIngredients);
        recipeDetailsDiv.appendChild(recipeTags);
        recipeDetailsDiv.appendChild(recipeDetails);
        showRecipeDiv.appendChild(recipeInfoDiv);
        showRecipeDiv.appendChild(recipeDetailsDiv);

        //append main div to actual HTML
        menu.appendChild(showRecipeDiv);

        //Changes the buttons HTML
        buttonRecipe = document.getElementById("btnShowrecipe" + clickId);
        buttonRecipe.classList.add('recipe-shown');
        buttonRecipe.innerHTML = "Hide recipe";

        //Stores id in new variable
        lastRecipe = clickId;


    } else if (lastRecipe === clickId) {

        // let showRecipeDiv = document.createElement("div");
        // showRecipeDiv.classList.add("recipe");
        // menu.appendChild(showRecipeDiv);

        //reset lastRecipe
        lastRecipe = -1;

        //Update status
        recipeShown = false;

        //Remove recipe & add proper HTML
        let getRecipeDiv = document.querySelector(".recipe");
        getRecipeDiv.remove();
        buttonRecipe.classList.remove('recipe-shown');
        buttonRecipe.innerHTML = "Show recipe";
    }

}
