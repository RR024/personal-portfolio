/* ================= MOBILE MENU ================= */

const sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.classList.add("open");
}

function closemenu() {
    sidemenu.classList.remove("open");
}


/* ================= TABS ================= */

const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname, element) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }

    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    element.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}


/* ================= TYPING EFFECT ================= */

const typingText = document.getElementById("typing-text");

const roles = [
    "a Developer.",
    "an AI Enthusiast.",
    "a Problem Solver.",
    "a Full Stack Developer."
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];

    if (!deleting) {
        typingText.textContent = currentRole.substring(0, charIndex++);

        if (charIndex > currentRole.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typingText.textContent = currentRole.substring(0, charIndex--);

        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, deleting ? 60 : 100);
}

typeEffect();


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach(element => {
    observer.observe(element);
});


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section, #header");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


/* ================= SCROLL PROGRESS ================= */

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / documentHeight) * 100;

    document.getElementById("scroll-progress").style.width = scrollPercentage + "%";
});


/* ================= GOOGLE SHEETS ================= */

const scriptURL = '<YOUR-GOOGLE-APPS-SCRIPT-URL>';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();

        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                msg.innerHTML = "Message sent successfully ✓";
                setTimeout(() => {
                    msg.innerHTML = "";
                }, 5000);
                form.reset();
            })
            .catch(error => {
                msg.innerHTML = "Something went wrong. Please try again.";
                console.error('Error!', error.message);
            });
    });
}
