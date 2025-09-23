// Get all global elements at the top of the script
const navbar = document.getElementById("navbar");
const scrollBtn = document.getElementById("scrollTopBtn");
const scrollDownBtn = document.getElementById("scrollDownBtn");
const sections = document.querySelectorAll('section, footer');
const counters = document.querySelectorAll('.counter');

// Fade-in effect
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.hero-about').forEach(section => {
    observer.observe(section);
});

// Typing animation
const text = "Empowering the next generation through quality education and values.";
const target = document.getElementById('typing-text');
let i = 0;

function typeWriter() {
    if (i < text.length) {
        target.textContent = text.substring(0, i + 1) + '|';
        i++;
        setTimeout(typeWriter, 30);
    } else {
        target.textContent = text;
    }
}

window.onload = () => {
    typeWriter();
};

let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY) {
        navbar.style.top = "-100px";
    } else {
        navbar.style.top = "0";
    }
    lastScrollY = window.scrollY;
});

/*------Google_Translate------*/
function changeToMalayalam() {
    const lang = 'ml'; // Malayalam
    document.cookie = `googtrans=/en/${lang};path=/`;
    location.reload();
}

document.getElementById('translateButton').addEventListener('click', function() {
    const iframe = document.querySelector('iframe.goog-te-menu-frame');
    if (iframe) {
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        const malayalamOption = innerDoc.querySelector("span[textContent='Malayalam']");
        if (malayalamOption) {
            malayalamOption.click();
        } else {
            const options = innerDoc.querySelectorAll('.goog-te-menu2-item span.text');
            options.forEach(function(option) {
                if (option.innerText === 'Malayalam') {
                    option.click();
                }
            });
        }
    } else {
        alert("Please wait while the translation loads...");
    }
});

// Counter animation
const duration = 2000;

function animateCounter(counter) {
    const targetAttr = counter.getAttribute('data-target');
    const isPercent = targetAttr.includes('%');
    const target = parseInt(targetAttr);
    let current = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * target);
        counter.innerText = isPercent ? value + '%' : value;
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.innerText = isPercent ? target + '%' : target;
        }
    }
    requestAnimationFrame(updateCounter);
}

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.3 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// Dropdown click handler


// Function to find the next section to scroll to
function getNextSection() {
    const currentScrollY = window.scrollY;
    for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop > currentScrollY + 50) {
            return sections[i];
        }
    }
    return null;
}

// Global scroll event handler
window.addEventListener('scroll', function() {
    // Show/hide scroll to top button
    scrollBtn.style.display = (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) ? "block" : "none";

    // Show/hide scroll to down button
    if (scrollDownBtn) {
        const nextSection = getNextSection();
        scrollDownBtn.style.display = nextSection ? "block" : "none";
    }
});

// Scroll to top functionality
if (scrollBtn) {
    scrollBtn.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
}

// Scroll down functionality
if (scrollDownBtn) {
    scrollDownBtn.addEventListener("click", function() {
        const nextSection = getNextSection();
        if (nextSection) {
            window.scrollTo({
                top: nextSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// Hardcoded password
function checkPassword() {
    const password = document.getElementById("passwordInput").value;
    const correctPassword = "KGHSS@123"; // change this as needed
    if (password === correctPassword) {
        window.location.href = "announcement.html";
    } else {
        alert("Incorrect password. Please try again.");
    }
}

// Placeholder for fetch call (ensure this isn't executed on page load)
// fetch('/api/submit-announcement', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ content: input.value }),
// });
/* This function is called when the "Materials" button is clicked. */
/* --- Dropdown and Mobile Menu Logic --- */

// The primary function to toggle the dropdown
function toggleDropdown() {
  const dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle("show");
}
function toggleDropdown() {
  const dropdown = document.querySelector('.dropdown');
  dropdown.classList.toggle('show');
}

// Function to close all dropdowns
function closeAllDropdowns() {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
}
/* --- Dropdown and Mobile Menu Logic --- */

// The primary function to toggle the dropdown's visibility.
// This is triggered by the 'onclick' attribute on the button.
// --- Dropdown and Mobile Menu Logic ---

// The primary function to toggle the dropdown's visibility.
// This is triggered by the 'onclick' attribute on the button.
function toggleDropdown() {
    const dropdownContent = document.getElementById("myDropdown");
    if (dropdownContent) {
        dropdownContent.classList.toggle("show");
    }
}

// A helper function to close all dropdowns.
function closeAllDropdowns() {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
    }
}

// This event listener closes the dropdown when a user clicks anywhere on the page
// *unless* the click is inside the dropdown itself.
window.addEventListener('click', function(event) {
    if (!event.target.closest('.dropdown')) {
        closeAllDropdowns();
    }
});

// Optional: Add an event listener to the menu toggle checkbox
// This ensures the dropdown closes if the main mobile menu is closed
const menuToggle = document.getElementById('menu-toggle');
if (menuToggle) {
    menuToggle.addEventListener('change', function() {
        if (!this.checked) {
            closeAllDropdowns();
        }
    });
}
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
// Toggle mobile nav
function toggleMenu() {
  const nav = document.querySelector('.navbar-links');
  nav.classList.toggle('active');
}

// Toggle dropdown
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close dropdown if clicked outside (optional)
window.onclick = function (e) {
  if (!e.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove('show');
    }
  }
}

// --- End Dropdown Logic ---
