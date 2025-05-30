document.addEventListener('DOMContentLoaded', () => {
    /* ----- Popup Functionality ----- */
    const popup = document.getElementById("project-popup");
    const popupTitle = document.getElementById("popup-title");
    const popupInfo = document.getElementById("popup-info");
    const closeBtn = document.querySelector(".close-btn");

    function openPopup(title, info, videoUrl = null) {
        popupTitle.textContent = title;
        let content = info;

        if (videoUrl) {
            content += ` Check out <a href="#" id="video-link">this video</a> for a more in-depth look.`;
        }

        popupInfo.innerHTML = content;

        if (videoUrl) {
            document.getElementById("video-link").addEventListener("click", (e) => {
                e.preventDefault();
                popupInfo.innerHTML = `${info}<br><iframe width="560" height="315" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            });
        }

        popup.classList.add("show");
    }

    if (popup && closeBtn) {
        closeBtn.addEventListener("click", () => popup.classList.remove("show"));
        window.addEventListener("click", (e) => {
            if (e.target === popup) popup.classList.remove("show");
        });
    }

    window.openPopup = openPopup;

    /* ----- Animated Skill Bars ----- */
    const skills = document.querySelectorAll('.skill');
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skill = entry.target;
                const width = skill.getAttribute('data-width') || '100%';
                skill.style.setProperty('--width', width);
                observer.unobserve(skill);
            }
        });
    }, { threshold: 0.5 });

    skills.forEach(skill => {
        skill.style.setProperty('--width', '0%');
        skillObserver.observe(skill);
    });

    /* ----- Scroll Reveal Animations ----- */
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.home-section .intro, .about-section .profile-pic, .about-section .about-content, .project-card, .contact-section form', {
            duration: 2000,
            distance: '50px',
            opacity: 0,
            easing: 'ease-in-out',
            interval: 200
        });
    }

    /* ----- Hamburger Menu Toggle ----- */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    // Toggle menu
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
    
    // Collapse menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });
 
      

    /* ----- Scroll to Top Button ----- */
    const btnScrollToTop = document.querySelector("#btnScrollToTop");
    if (btnScrollToTop) {
        btnScrollToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    /* ----- Active Nav Link Highlighting ----- */
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
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    
});

/* ----- Carousel Functionality ----- */
document.addEventListener('DOMContentLoaded', () => {
    const carouselSlide = document.querySelector('.carousel-slide');
    const images = document.querySelectorAll('.carousel-slide img');
    if (!carouselSlide || images.length === 0) return;

    let counter = 0;
    const size = images[0].clientWidth;

    setInterval(() => {
        if (counter >= images.length - 1) counter = -1;
        counter++;
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
    }, 3000);
});
