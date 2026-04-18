// Store user input
let userArr = [];
let cap = "";

// Generate Captcha
function generateCaptcha() {
    let RandomCaptcha = [];
    for (let i = 0; i < 5; i++){
        let a = Math.floor(Math.random() * 9) + 1;
        RandomCaptcha.push(a);
    }

    cap = RandomCaptcha.join("");
    $(".captcha-box").html(cap);
    console.log("Captcha:", cap);
}

// Reset everything
function resetCaptcha() {
    $("input").val("");          // clear input
    userArr = [];                // clear array
    $(".captcha-box").removeClass("success error"); // remove animation
    generateCaptcha();           // new captcha
}

// Animation trigger
function triggerAnimation(isCorrect) {
    $(".captcha-box").removeClass("success error");

    if (isCorrect) {
        $(".captcha-box").addClass("success");
    } else {
        $(".captcha-box").addClass("error");
    }

    // remove class after animation so it can replay
    setTimeout(() => {
        $(".captcha-box").removeClass("success error");
    }, 600);
}


// Handle typing
$("input").keydown(function(event){

    // Handle backspace
    if (event.key === "Backspace") {
        userArr.pop();
        return;
    }

    // Allow only numbers (since captcha is numeric)
    if (!/^[0-9]$/.test(event.key)) return;

    // Limit to 5 characters
    if (userArr.length < 5) {
        userArr.push(event.key);
    }

    // When 5 digits entered
    if (userArr.length === 5){
        let userInput = userArr.join("");
        console.log("User Input:", userInput);

        if(userInput === cap){
            console.log("✅ Captcha Matched");
            triggerAnimation(true);

            // auto reset after success
            setTimeout(() => {
                resetCaptcha();
            }, 800);

        } else {
            console.log("❌ Wrong Captcha");
            triggerAnimation(false);
        }
    }
});


// Reset button click
$("#resetBtn").click(function(){
    resetCaptcha();
});


// Initial load
generateCaptcha();




$("#themeToggle").click(function () {
  $("body").toggleClass("dark");
});