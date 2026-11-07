const attackButton = document.querySelector("#attack");
const levelUpButton = document.querySelector("#level-up");
const healthDisplay = document.querySelector("#health");
const levelDisplay = document.querySelector("#level");

let level = 1;

levelUpButton.addEventListener("click", function() {
    if (health === 0) {
        alert("This character can't level up, they're dead!");
    } else if (level < 20) {
        level++;
        levelDisplay.textContent = level;
    } else {
        alert("20 is the max level");
    }
});

let health = 60;

attackButton.addEventListener("click", function() {
    if (health > 0) {
        health -= 20;
        healthDisplay.textContent = health;

        if (health === 0) {
            alert("The Character is dead!");
        }
    }
});