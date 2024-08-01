// Check if there's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  // console.log('Local storage is not empty, you can set it on root now');
  // console.log(localStorage.getItem("color_option"));

  document.documentElement.style.setProperty("--main-color", mainColors);

  // Remove Active Class From All Colors List Items
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // Add Active Class on Element with Data-Color === Local Storage Item
    if (element.dataset.color === mainColors) {
      // Add Active Class
      element.classList.add("active");
    }
  });
}

// Random Background Option
let backgroundOption = true;

// variable to control the Background interval
let backgroundInterval;

// Check if there's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");

// Check if Random Background Local Storage is not Empty
if (backgroundLocalItem !== null) {
  // Remove Active class from all Spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  // Toggle Class Fa-spin for Rotation on Self
  this.classList.toggle("fa-spin");

  //Toggle class Open on Main Settings Box
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop on All List Items
colorsLi.forEach((li) => {
  // Click on Each List Item
  li.addEventListener("click", (e) => {
    // Set Color on Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // Set Color on Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

// Switch Background Random Images
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// Loop on All Spans
randomBackEl.forEach((span) => {
  // Click on Each Span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;

      randomizeImgs();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

//Get Array of Images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Change Background Image Url
landingPage.style.backgroundImage = 'url("imgs/02.jpg")';

// Funtion to Randomize Images
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number (0 to 4)
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change Background Image Url
      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + '")';
    }, 10000);
  }
}

randomizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  // Margin to trigger animation before the section is fully in view
  let margin = 1;

  if (
    windowScrollTop >
    skillsOffsetTop + skillsOuterHeight - windowHeight - margin
  ) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup with the Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay element
    let overlay = document.createElement("div");

    // Add class to overlay
    overlay.className = "popup-overlay";

    // Append overlay to the body
    document.body.appendChild(overlay);
    overlay.classList.toggle("show"); // Toggle overlay

    // Create the Popup
    let popupBox = document.createElement("div");

    // Add Class to the Popup Box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create text for heading
      let imgTetx = document.createTextNode(img.alt);

      // Append the text to the heading
      imgHeading.appendChild(imgTetx);

      // Append the heading to the popup box
      popupBox.appendChild(imgHeading);
    }

    // Create the Image
    let popupImage = document.createElement("img");

    // Set image source
    popupImage.src = img.src;

    // Add Image to Popup Box
    popupBox.appendChild(popupImage);

    // Append the popop box to body
    document.body.appendChild(popupBox);

    // Create the Close Span
    let closeButton = document.createElement("span");

    // Create the Close Button Text
    let closeButtonText = document.createTextNode("X");

    // Append text to Close Button
    closeButton.appendChild(closeButtonText);

    // Add Class to Close Button
    closeButton.className = "close-button";

    // Add Close Button to the Popup Box
    popupBox.appendChild(closeButton);
  });

  // Close popup
  document.addEventListener("click", function (e) {
    if (e.target.className == "close-button") {
      e.target.parentNode.remove(); // Remove the gallery popup
      document.querySelector(".popup-overlay.show").remove();
    }
  });
});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links
const allLinks = document.querySelectorAll(".links a");

// Select All Widget Links
const allWidgetLinks = document.querySelectorAll(".widget-links a");

// Selecct Buttons
const allButtons = document.querySelectorAll(
  ".button-container button.more-info"
);

function scrollToElement(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToElement(allBullets);
scrollToElement(allLinks);
scrollToElement(allWidgetLinks);
scrollToElement(allButtons);

// Handle Active State
function handleActive(ev) {
  // Remove Active Class From All Children
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // Add Active Class on Self
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletsLocalItem = localStorage.getItem("bullets_option");

if (bulletsLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletsLocalItem === "block") {
    bulletsContainer.style.display = "block";

    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";

    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }

    handleActive(e);
  });
});

// Reset Button
document.querySelector(".reset-options").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");

  // Reload Window
  window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let theLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();

  // Toggle Class "menu-active" on Button
  this.classList.toggle("menu-active");

  // Toggle Class "open" on Links
  theLinks.classList.toggle("open");
};

// Click anywhere outside menu and toggle button to close menu
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== theLinks) {
    // Check if Menu is Open
    if (theLinks.classList.contains("open")) {
      // Toggle Class "menu-active" on Button
      toggleBtn.classList.toggle("menu-active");

      // Toggle Class "open" on Links
      theLinks.classList.toggle("open");
    }
  }
});

// Stop Propagation on Menu
theLinks.onclick = function (e) {
  e.stopPropagation();
};

// // Send Email
// (function () {
//   emailjs.init("E6kb0V1mzinyL9gw5"); // Replace with your public key
// })();

// function sendEmail() {
//   var templateParams = {
//     from_name: document.getElementById("name").value,
//     from_email: document.getElementById("email").value,
//     phone: document.getElementById("phone").value,
//     subject: document.getElementById("subject").value,
//     message: document.getElementById("message").value,
//   };

//   emailjs.send("service_1dg6q4h", "template_jfmtj0q", templateParams).then(
//     function (response) {
//       alert("Message sent successfully!");
//       console.log("SUCCESS!", response.status, response.text);
//     },
//     function (error) {
//       alert("Message not sent. Please try again later.");
//       console.log("FAILED...", error);
//     }
//   );
// }

// Testimonials
const testimonials = document.querySelectorAll(".testimonial");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const indicator = document.querySelector(".indicator");

let currentTestimonial = 0;

function fadeOut(element, duration, callback) {
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = 0;
  setTimeout(callback, duration);
}

function fadeIn(element, duration) {
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = 1;
}

function showTestimonial(n) {
  const previousTestimonial = testimonials[currentTestimonial];
  currentTestimonial = (n + testimonials.length) % testimonials.length;
  const nextTestimonial = testimonials[currentTestimonial];

  fadeOut(previousTestimonial, 500, () => {
    previousTestimonial.classList.remove("active");
    nextTestimonial.classList.add("active");
    fadeIn(nextTestimonial, 500);
  });

  indicator.textContent = `${currentTestimonial + 1} / ${testimonials.length}`;
}

function nextTestimonial() {
  showTestimonial(currentTestimonial + 1);
}

function prevTestimonial() {
  showTestimonial(currentTestimonial - 1);
}

nextBtn.addEventListener("click", nextTestimonial);
prevBtn.addEventListener("click", prevTestimonial);

showTestimonial(currentTestimonial); // Show the first testimonial initially

// scroll
const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

// Donate Button
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");
  const donateButton = document.querySelector(".button.donate");

  if (donateButton) {
    donateButton.addEventListener("click", function () {
      console.log("Donate button clicked");

      // Calculate window position for centering
      const width = 600;
      const height = 600;
      const left = (window.innerWidth - width) / 2.4;
      const top = (window.innerHeight - height) / 2.4;

      window.open(
        "http://localhost:4242/checkout.html",
        "popup",
        `width=${width},height=${height},left=${left},top=${top}`
      );
    });
  } else {
    console.log("Donate button not found");
  }
});

// Donate Button in Widget
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");
  const donateButton = document.querySelector(".widget-content .button.donate");

  if (donateButton) {
    donateButton.addEventListener("click", function () {
      console.log("Donate button clicked");

      // Calculate window position for centering
      const width = 600;
      const height = 600;
      const left = (window.innerWidth - width) / 2.4;
      const top = (window.innerHeight - height) / 2.4;

      window.open(
        "http://localhost:4242/checkout.html",
        "popup",
        `width=${width},height=${height},left=${left},top=${top}`
      );
    });
  } else {
    console.log("Donate button not found");
  }
});

// Popup
const viewBtn = document.querySelector(".widget-content .button.share");
const popup = document.querySelector(".popup");
const closeBtn = popup.querySelector(".close");
const field = popup.querySelector(".field");
const input = field.querySelector("input");
const copyBtn = field.querySelector("button");

// Select the overlay element (you added this in the HTML)
const overlay = document.querySelector(".popup-overlay");

viewBtn.onclick = () => {
  popup.classList.toggle("show");
  overlay.classList.toggle("show");
};

closeBtn.onclick = () => {
  popup.classList.toggle("show");
  overlay.classList.remove("show");
};

copyBtn.onclick = () => {
  input.select();
  if (document.execCommand("copy")) {
    field.classList.add("active");
    copyBtn.innerText = "Copied";
    setTimeout(() => {
      window.getSelection().removeAllRanges();
      field.classList.remove("active");
      copyBtn.innerText = "Copy";
    }, 3000);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  // Log to verify the script is loaded
  console.log("DOM fully loaded and parsed");

  // Select the "Return to Homepage" link
  const returnHomeLink = document.querySelector(".return-home");

  if (returnHomeLink) {
    returnHomeLink.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default link behavior
      console.log("Return home link clicked");
      window.close(); // Close the window
    });
  } else {
    console.log("Return home link not found");
  }
});

// Define the total amount needed
const totalAmountNeeded = 1370;

// Function to format the number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Function to fetch the total donated amount from the server
async function fetchDonatedAmount() {
  try {
    // Fetch data from the server
    const response = await fetch("http://localhost:4242/api/donations");

    // Check if response is OK
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse the JSON data
    const data = await response.json();
    const donatedAmount = data.totalAmount;

    // Debugging log
    console.log("Fetched donated amount:", donatedAmount);

    // Calculate the remaining amount needed
    const remainingAmount = totalAmountNeeded - donatedAmount;

    // Ensure remainingAmount is non-negative
    const displayAmount = remainingAmount > 0 ? remainingAmount : 0;

    const fundedPercentage = Math.min(
      (donatedAmount / totalAmountNeeded) * 100,
      100
    ).toFixed(2);

    // Debugging log
    console.log("Remaining amount:", displayAmount);
    console.log("Funded percentage:", fundedPercentage);

    // Update the content of the <span> element
    document.getElementById("funding-amount").innerText = `$${formatNumber(
      displayAmount
    )} to go`;
    document.getElementById(
      "funded-percentage"
    ).innerText = `${fundedPercentage}% FUNDED`;
    document.getElementById(
      "funding-progress"
    ).style.width = `${fundedPercentage}%`;
  } catch (error) {
    // Log any errors
    console.error("Error fetching donated amount:", error);
  }
}

// Fetch the donated amount when the page loads
window.onload = fetchDonatedAmount;
