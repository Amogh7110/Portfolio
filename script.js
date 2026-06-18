// =========================================================
// 0. NAV BAR TOGGLE (Mobile Menu)
// =========================================================
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.onclick = () => {
        navbar.classList.toggle('active');
        // Toggle icon: bars <-> xmark
        menuIcon.querySelector('i').classList.toggle('fa-bars');
        menuIcon.querySelector('i').classList.toggle('fa-xmark');
    };
    // Close navbar when a link is clicked (for better mobile UX)
    document.querySelectorAll('.navbar a').forEach(link => {
        link.onclick = () => {
            navbar.classList.remove('active');
            menuIcon.querySelector('i').classList.remove('fa-xmark');
            menuIcon.querySelector('i').classList.add('fa-bars');
        };
    });
}


// =========================================================
// 1. NAME TYPEWRITER
// =========================================================

const nameText = "Amogh Patel";
const nameEl = document.getElementById("name");
let nameCharIndex = 0;

function typeName() {
    if (!nameEl) return;

    if (nameCharIndex < nameText.length) {
        nameEl.textContent += nameText.charAt(nameCharIndex);
        nameCharIndex++;
        setTimeout(typeName, 90); 
    }
}

// =========================================================
// 2. ROLE TYPEWRITER
// =========================================================

const roles = [
    "AI & ML Developer",
    "Frontend Developer",
    "Full Stack Developer",
    "Data Analyst",
    "Tech Enthusiast"
];

const roleEl = document.getElementById("role");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
    if (!roleEl) return;
    
    const currentRole = roles[roleIndex];

    if (!deleting) {
        // Typing phase
        roleEl.textContent = currentRole.substring(0, charIndex++);
        
        if (charIndex > currentRole.length) {
            // End of typing, pause for 1.5s, then start deletion
            deleting = true;
            setTimeout(typeRole, 1500); 
            return; 
        }
        setTimeout(typeRole, 120); 

    } else {
        // Deleting phase (Faster)
        roleEl.textContent = currentRole.substring(0, charIndex--);
        
        if (charIndex < 0) {
            // End of deletion, switch to next role
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            charIndex = 0; 
            setTimeout(typeRole, 300); // Short pause before typing new word
            return;
        }
        setTimeout(typeRole, 50); 
    }
}

// =========================================================
// 3. SKILL BAR ANIMATION (On Scroll) - FIXED
// =========================================================

// CRITICAL FIX: Target the inner element (.bar) which we want to animate.
const skillBars = document.querySelectorAll(".bar"); 

// 3a. Initialization: Store target width and reset to 0%
window.addEventListener('load', () => {
    skillBars.forEach(bar => {
        const initialWidth = bar.getAttribute('data-target-width');
        if (initialWidth) {
            bar.style.width = '0%'; 
            bar.setAttribute('data-animated', 'false'); // Ensure flag is reset
        }
    });
    // Start initial animations for bars already in the viewport
    animateSkillBars();
});


function animateSkillBars() {
    skillBars.forEach(bar => {
        // Check if the bar has already been animated
        if (bar.getAttribute('data-animated') === 'true') return;

        const topPosition = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Trigger animation when the bar is 150px or less below the viewport
        if (topPosition < windowHeight - 150) {
            const targetWidth = bar.getAttribute('data-target-width');
            bar.style.width = targetWidth; // Animate to the target percentage
            bar.setAttribute('data-animated', 'true'); 
        }
    });
}

// =========================================================
// 4. SCROLL-SPY (Navigation Highlighting)
// =========================================================

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar a');

function scrollActive() {
    // Get current scroll position (adjusted for header height)
    let scrollY = window.scrollY + 100; 

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        // Check if the current scroll position is within the bounds of the section
        if (scrollY >= top && scrollY < top + height) {
            // Remove 'active' class from all links
            navLinks.forEach(link => link.classList.remove('active'));

            // Add 'active' class to the corresponding link
            document.querySelector('.navbar a[href*=' + id + ']').classList.add('active');
        }
    });
}


// =========================================================
// 5. EVENT LISTENERS
// =========================================================

window.addEventListener('load', () => {
    typeName();
    typeRole();
    scrollActive(); 
    // Skill bar animation will start via animateSkillBars()
});

window.addEventListener("scroll", () => {
    animateSkillBars();
    scrollActive();
});
// =========================================================
// 6. Email contact form
// =========================================================
const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending...";

    emailjs.send(
        "service_9x6j7cg",
        "template_9ojdojf",
        {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value,
        }
    )
    .then(() => {
        alert("✅ Message sent successfully!");

        form.reset();

        submitBtn.disabled = false;
        submitBtn.innerHTML = `Send Message <i class="fas fa-paper-plane"></i>`;
    })
    .catch((error) => {
        console.error(error);

        alert("❌ Failed to send message.");

        submitBtn.disabled = false;
        submitBtn.innerHTML = `Send Message <i class="fas fa-paper-plane"></i>`;
    });
});
