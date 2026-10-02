const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mainNav = document.getElementById("main-nav");
const menuIcon = mobileMenuBtn.querySelector("i");

mobileMenuBtn.addEventListener("click", () => {

    mainNav.classList.toggle("open");

    const isOpen = mainNav.classList.contains("open");

    mobileMenuBtn.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");
        mobileMenuBtn.setAttribute("aria-label", "Close menu");
    } else {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
        mobileMenuBtn.setAttribute("aria-label", "Open menu");
    }

});

const navLinks = mainNav.querySelectorAll("a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("open");

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.setAttribute("aria-label", "Open menu");

    });

});
