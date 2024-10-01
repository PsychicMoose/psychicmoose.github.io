document.addEventListener('DOMContentLoaded', () => {
    /* ----- Popup Functionality ----- */
    const popup = document.getElementById("project-popup");
    const popupTitle = document.getElementById("popup-title");
    const popupInfo = document.getElementById("popup-info");
    const closeBtn = document.querySelector(".close-btn");

    // Function to open the popup with project details
    function openPopup(title, info, videoUrl = null) {
        popupTitle.textContent = title;

        // Dynamically create content based on provided URLs
        let content = info;

        // Embed a video if a video URL is provided
        if (videoUrl) {
            content += ` Check out <a href="#" id="video-link">this video</a> for a more indepth look.`;
        }

        popupInfo.innerHTML = content;

        // Handle embedding video on link click
        if (videoUrl) {
            document.getElementById("video-link").addEventListener("click", (e) => {
                e.preventDefault();
                popupInfo.innerHTML = `${info}<br><iframe width="560" height="315" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            });
        }

        popup.classList.add("show");
    }

    // Close popup when the close button or outside of the popup is clicked
    closeBtn.addEventListener("click", () => popup.classList.remove("show"));
    window.addEventListener("click", (e) => e.target === popup && popup.classList.remove("show"));

    // Make the openPopup function globally accessible
    window.openPopup = openPopup;

    /* ----- Animated Skill Bars ----- */
    const skills = document.querySelectorAll('.skill');
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skill = entry.target;
                const width = skill.getAttribute('data-width') || '100%';
                skill.style.setProperty('--width', width);
                observer.unobserve(skill); // Stop observing once the animation is complete
            }
        });
    }, { threshold: 0.5 });
    
    skills.forEach(skill => {
        skill.style.setProperty('--width', '0%');
        skillObserver.observe(skill);
    });

    /* ----- Smooth Scroll with Active Link Highlighting ----- */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 70;
            if (pageYOffset >= sectionTop) currentSection = section.getAttribute('id');
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) link.classList.add('active');
        });
    });

    /* ----- Scroll Reveal Animations ----- */
    ScrollReveal().reveal('.home-section .intro, .about-section .profile-pic, .about-section .about-content, .project-card, .contact-section form', {
        duration: 2000,
        distance: '50px',
        opacity: 0,
        easing: 'ease-in-out',
        interval: 200
    });

    /* ----- Hamburger Menu Toggle ----- */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    hamburger.addEventListener('click', () => navMenu.classList.toggle('show'));

    /* ----- Contact Form Submission ----- */
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message!');
        contactForm.reset();
    });

    /* ----- Scroll to Top Button ----- */
    const btnScrollToTop = document.querySelector("#btnScrollToTop");
    btnScrollToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});

/* ----- EmailJS Send Email Functionality ----- */
(function() {
    emailjs.init("Qap7LiBhUo3lolkTE"); // Replace with your Public Key (User ID)
})();

function sendMail() {
    var tempParams = {
        from_name: document.getElementById("fromName").value,
        email_sender: document.getElementById("emailSender").value,
        subject_sender: document.getElementById("subjectSender").value,
        message_sender: document.getElementById("message").value,
    };

    emailjs.send("service_1v5yv8b", "template_gdt5gzs", tempParams)
    .then(function(response) {
        console.log("Success!", response.status, response.text);
        alert('Your message has been sent successfully!');
    }, function(error) {
        console.error("Failed...", error);
        alert('Failed to send message. Please try again later.');
    });
}


/* ----- Typing Animation Script ----- */
$(document).ready(() => {
    // Sticky Navbar
    $(window).scroll(function () {
        if (this.scrollY > 20) $(".navbar").addClass("sticky");
        else $(".navbar").removeClass("sticky");
    });

    // Toggle Menu
    $('.menu-btn').click(() => {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // Typing Animations
    const typingOptions = { typeSpeed: 100, backSpeed: 60, loop: true };
    new Typed(".typing", { strings: ["Your Skill", "Your Hobby", "Your Passion", "Your Proficiency"], ...typingOptions });
    new Typed(".typing-2", { strings: ["Your Skill", "Your Hobby", "Your Passion", "Your Proficiency"], ...typingOptions });
});

/* ----- Carousel Functionality ----- */
const carouselSlide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
let counter = 0;
const size = images[0].clientWidth;

setInterval(() => {
    if (counter >= images.length - 1) counter = -1;
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
}, 3000);
