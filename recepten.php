<?php

//php code met json als output
//header('Content-Type: application/json'); ?? EVEN VRAGEN IN DE LES WAARVOOR DIT IS
$jsonData = file_get_contents("recepten.json");

//Veranderd jsonData naar een php array, nu kan je er shit aan toe voegen
$json = json_decode($jsonData, true);

//Hiermee encode je de php array weer terug naar een json bestand.
//echo json_encode("$json");

//$length = count($json[0]['ingredienten']);
//
//for ($i = 0; $i < $length; $i++) {
//    echo $json[0]['ingredienten'][$i];
//}

//print_r($json);


//
//foreach ($json as $outerArray) {
//
//    foreach ($outerArray as $innerArray) {
//
//        if (is_array($innerArray)) {
//
//            foreach ($innerArray as $ingredienten) {
//
//                echo $ingredienten . "<br>";
//
//            }
//
//        } else {
//
//            echo $innerArray . "<br>";
//        }
//    }
//}
//?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Food Magazine!</title>
    <link rel="stylesheet" type="text/css" href="css/style.css"/>
</head>
<body>
<!-- TODO -->
<header>

    <section>
        <div>
            <h1>Food Magazine for Students!</h1>
        </div>
        <div><h2>Delicious, easy & cheap meals created for students, by students.</h2></div>
        <nav class="links">
            <a href="recepten.php">Recipes</a>
            <a href="blog.html">blog</a>
            <a href="videos.html">Videos</a>
            <a href="about.html">About</a>
        </nav>
    </section>

</header>
<main>

    <section>
        <div class="menu">
            <div class="parent-foods">
                <div class="child-foods food-div">
                    <h3>Pizza Margherita</h3>
                    <img src="img/1.jpg">
                    <button id="fav1">Add to favorites</button>
                    <button id="btnShowrecipe1">Show recipe</button>
                </div>
                <div class="child-foods food-div">
                    <h3>Spaghetti Carbonara</h3>
                    <img src="img/2.jpg">
                    <button id="fav2">Add to favorites</button>
                    <button id="btnShowrecipe2">Show recipe</button>
                </div>
                <div class="child-foods food-div">
                    <h3>Oven Burritos</h3>
                    <img src="img/3.jpg">
                    <button id="fav3">Add to favorites</button>
                    <button id="btnShowrecipe3">Show recipe</button>
                </div>
                <div class="child-foods food-div">
                    <h3>Flavourful Nachos</h3>
                    <img src="img/4.jpg">
                    <button id="fav4">Add to favorites</button>
                    <button id="btnShowrecipe4">Show recipe</button>
                </div>
            </div>
        </div>
    </section>

</main>
<script type="text/javascript" src="js/main.js"></script>
</body>
</html>
