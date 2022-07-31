// Start the game
let startingMinutes = 1;
let time = 60;
let intervalId;

document.querySelector(".control-button span").onclick = function () {
    // Ask for name by using prompt
    let yourName = prompt("What's Your Name?");

    // Start sound effect
    document.getElementById("start").play();

    if (yourName == null || yourName == "") {
        // Set Unknown if name is emty
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        // Set user's name
        document.querySelector(".name span").innerHTML = yourName;
    }

    // Remove start div after getting the name
    document.querySelector(".control-button").remove();
    
    intervalId = setInterval(updateTimer, duration);

}

// Play Agin Button
document.querySelector(".lose-popup span:nth-child(2)").onclick = playAgain;
document.querySelector(".win-popup span:nth-child(2)").onclick = playAgain;

// Timer function
function updateTimer() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds: seconds;

    document.querySelector(".timer span").innerHTML = `${minutes}:${seconds}`;

    time--;
}

// Main Variables
let duration = 1000; // 1s

let blocksContainer = document.querySelector(".game-container");

// Get all blocks in an array
let blocks = Array.from(blocksContainer.children);

// Randomize the blocks

// Create range of keys
let orderRange = [...Array(blocks.length).keys()];

// Randomize it
randomizeArray(orderRange);
// Add order cssproperty to game blocks
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];

    // Add click event
    block.addEventListener("click", function() {
        fliBlock(block);
    })
});

// Flip block
function fliBlock(selectedBlock) {
    // Add class is-flipped
    selectedBlock.classList.add("is-flipped");

    // Collect all flipped cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"));

    // if two selected blocks
    if (allFlippedBlocks.length === 2) {
        // stop clicking function
        stopClicking();

        // check matched blocks
        checkMatched(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

// stop clicking function
function stopClicking() {
    blocksContainer.classList.add("no-clicking");

    setTimeout(() => {
        // remove class no clicking after the duration
        blocksContainer.classList.remove("no-clicking");
    }, duration);
}

// check matched blocks
function checkMatched(firstBlock, secondBlock) {
    let triesElement = document.querySelector(".tries span");

    // If the two blocks matched
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

        // Play success audio
        document.getElementById("success").play();

        //Check if the user won
        let allMatched = true;
        blocks.forEach(block => {
            if (!(block.classList.contains("has-match"))) {
                // if wefind a blockednot matched
                allMatched = false;
            }
        });
        if (allMatched) {
            // Display win popup
            document.getElementById("success").play();
            document.querySelector(".win-popup").style.display = "block";
            clearInterval(intervalId);
        }       
    } else {
        // Increase wrong tries
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);

        // Play fail audio
        document.getElementById("fail").play();
    }
}

// Randomize function
function randomizeArray(array) {
    let current = array.length,
        temp,
        random;

    while (current > 0) {
        // get random number
        random = Math.floor(Math.random() * current);

        // decrease length -1
        current--;

        // switch the two elements
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;

    }
    return array;
}

// Time function
function updateTimer() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    seconds = seconds < 10? '0' + seconds: seconds;

    document.querySelector(".timer span").innerHTML = `${minutes}:${seconds}`;

    time--;

    if (document.querySelector(".timer span").innerHTML == "0:00") {
        clearInterval(intervalId);
        
        blocks.forEach(block => {
            if (!(block.classList.contains("has-match"))) {
                // Display lose popup
                document.getElementById("fail").play();
                document.querySelector(".lose-popup").style.display = "block";
            }
        });

        startingMinutes = 1;
        time = 60;
    }
    
}

// Play Again function
function playAgain() {
    document.querySelector(".lose-popup").style.display = "none";
    document.querySelector(".win-popup").style.display = "none";

    blocks.forEach((block) => {
        block.classList.remove("has-match");
        block.classList.remove("is-flipped");
    });

    // Create range of keys
    let orderRange = [...Array(blocks.length).keys()];
    // Randomize it
    randomizeArray(orderRange);


    // Add order cssproperty to game blocks
    blocks.forEach((block, index) => {
        block.style.order = orderRange[index];

        // Add click event
        // block.addEventListener("click", function() {
        //     fliBlock(block);
        // });
    });

    intervalId = setInterval(updateTimer, duration);

    document.querySelector(".tries span").innerHTML = 0;
    document.querySelector(".timer span").innerHTML = "1:00";

    // Initialise time
    startingMinutes = 1;
    time = 60;
}




