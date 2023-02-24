// TODO:
// SUGAR BUTTON
// If sugar is clicked, add sugar sprinkling from top of screen downwards animation. ✅
// Bonus: if more than 3 sugar is added, send pop up saying "would you like some coffee with your sugar?"

// CREAM BUTTON
// If cream is clicked, show animation of cream splash on screen.
// If user adds cream, coffee becomes lighter brown color, if no cream is added then coffee is dark brown.

// BREW COFFEE BUTTON
// When brew coffee button is clicked, all 3 buttons dissapear and the top section will display a reset button and "Brewing..."
// Follow by "Pouring..."
// animation of coffee pouring into cup begins
// Display now shows "Coffee is ready, enjoy! :)"
// cup now is no longer empty and shows coffee inside (Color will depend on cream or no cream)
// Bonus: add steam coming from top of cup effect?

// RESET BUTTON
// interrupt the process and reset to start
// reset to start whenever button is pressed, during or after process.

const brewBtn = document.querySelector(".brew-btn");

// ============================================ SUGAR BUTTON FUNCTIONALITY =================================================

// Set the maximum duration and number of sugarGrains
const maxDuration = 2000; // in milliseconds
const maxSugarGrains = 100;

// Create a timeline to manage the animation sequence
const tl = gsap.timeline({ paused: true, onComplete: stopSugarFall });

// Add sugarGrains to the timeline
function addSugarGrains() {
  for (let i = 0; i < maxSugarGrains; i++) {
    let sugarGrain = document.createElement("div");
    sugarGrain.className = "sugarGrain";
    document.body.appendChild(sugarGrain);

    // Randomize the starting position and speed of each sugarGrain
    let startX = Math.random() * window.innerWidth;
    let endX = startX + Math.random() * 100 - 50;
    let endY = window.innerHeight + 10;
    let duration = Math.random() * 3 + 1;

    // Add the sugarGrain tween to the timeline
    tl.to(sugarGrain, {
      duration: duration,
      x: endX,
      y: endY,
      ease: "power1.in",
      repeat: -1,
      delay: -duration,
    }).fromTo(
      sugarGrain,
      { opacity: 0 },
      { duration: 0.5, opacity: 0.8, ease: "power1.inOut" },
      0
    );
  }

  // Stop the animation after maxDuration
  gsap.to(tl, { duration: maxDuration / 1000, onComplete: stopSugarFall });
}

// Stop the sugarfall animation when it's finished
function stopSugarFall() {
  tl.pause();
  const sugarGrains = document.getElementsByClassName("sugarGrain");
  while (sugarGrains[0]) {
    sugarGrains[0].parentNode.removeChild(sugarGrains[0]);
  }
}

// Event listener for button click
const sugarBtn = document.querySelector(".sugar-btn");
sugarBtn.addEventListener("click", function () {
  addSugarGrains();
  tl.play();
});

// ============================================ CREAM BUTTON FUNCTIONALITY =================================================
document.addEventListener("DOMContentLoaded", function () {
  // Set the duration and size of the splash
  const splashDuration = 1;
  const splashSize = 300;

  // Create the splash animation
  const splashTimeline = gsap.timeline({ paused: true });
  splashTimeline.to("#creamSplash", {
    duration: splashDuration,
    scale: splashSize,
    opacity: 0,
    ease: "power2.in",
  });

  // Add event listener to cream button
  const creamBtn = document.querySelector(".cream-btn");
  creamBtn.addEventListener("click", function () {
    // Show the cream splash element
    gsap.set("#creamSplash", { display: "block" });
    // Reset the splash size and opacity
    gsap.set("#creamSplash", { scale: 0, opacity: 0.8 });

    // Trigger the splash animation
    splashTimeline.restart();

    // Fix for the issue with resizing the screen
    setTimeout(function () {
      window.scrollTo(0, 0);
    }, 10);
  });
});
