    /* LOADER */

    window.addEventListener("load", function () {

        setTimeout(function () {

            document.getElementById("loader").style.opacity = "0";

            setTimeout(function () {
                document.getElementById("loader").style.display = "none";
            }, 600);

        }, 700);

    });


    /* NAVBAR */

    const header = document.getElementById("header");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        const topBtn = document.getElementById("topBtn");

        if (window.scrollY > 500) {
            topBtn.style.display = "flex";
        } else {
            topBtn.style.display = "none";
        }

    });


    /* MOBILE MENU */

    function toggleMenu() {

        document
            .getElementById("navLinks")
            .classList.toggle("active");

    }


    /* COUNTERS */

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const counter = entry.target;

                    const target =
                        Number(counter.dataset.target);

                    let current = 0;

                    const increment =
                        Math.ceil(target / 80);

                    const timer =
                        setInterval(function () {

                            current += increment;

                            if (current >= target) {

                                current = target;

                                clearInterval(timer);

                            }

                            counter.textContent =
                                current.toLocaleString();

                        }, 20);

                    observer.unobserve(counter);
                }

            });

        },
        {
            threshold: 0.5
        }
    );

    counters.forEach(function (counter) {
        counterObserver.observe(counter);
    });


    /* SCROLL REVEAL */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );

    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });


    /* AC CALCULATOR */

    function calculateAC() {

        const length =
            parseFloat(document.getElementById("length").value);

        const width =
            parseFloat(document.getElementById("width").value);

        const sunlight =
            parseFloat(document.getElementById("sunlight").value);

        if (!length || !width || length <= 0 || width <= 0) {

            alert("Please enter valid room dimensions.");

            return;

        }

        const area = length * width;

        let tons;

        if (area <= 100) {

            tons = 1;

        } else if (area <= 150) {

            tons = 1.5;

        } else if (area <= 250) {

            tons = 2;

        } else {

            tons = 2.5;

        }

        tons *= sunlight;

        if (tons <= 1.1) {
            tons = 1;
        } else if (tons <= 1.7) {
            tons = 1.5;
        } else if (tons <= 2.2) {
            tons = 2;
        } else {
            tons = 2.5;
        }

        document.getElementById("capacity").textContent =
            tons + " Ton";

        document.getElementById("calcResult").style.display =
            "block";

    }


    /* REVIEWS */

    let currentReview = 0;

    const reviews =
        document.querySelectorAll(".review");

    function showReview(index) {

        reviews.forEach(function (review) {
            review.classList.remove("active");
        });

        if (index >= reviews.length) {
            currentReview = 0;
        }

        if (index < 0) {
            currentReview = reviews.length - 1;
        }

        reviews[currentReview].classList.add("active");

    }

    function changeReview(direction) {

        currentReview += direction;

        showReview(currentReview);

    }

    setInterval(function () {

        currentReview++;

        showReview(currentReview);

    }, 5000);


    /* FAQ */

    const faqItems =
        document.querySelectorAll(".faq-item");

    faqItems.forEach(function (item) {

        const question =
            item.querySelector(".faq-question");

        question.addEventListener("click", function () {

            faqItems.forEach(function (otherItem) {

                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                }

            });

            item.classList.toggle("active");

            const icon =
                question.querySelector("i");

            if (item.classList.contains("active")) {

                icon.classList.remove("fa-plus");

                icon.classList.add("fa-minus");

            } else {

                icon.classList.remove("fa-minus");

                icon.classList.add("fa-plus");

            }

        });

    });


    /* MODAL */

    function openModal() {

        document
            .getElementById("bookingModal")
            .classList.add("active");

        document.body.style.overflow = "hidden";

    }

    function closeModal() {

        document
            .getElementById("bookingModal")
            .classList.remove("active");

        document.body.style.overflow = "auto";

    }

    window.addEventListener("click", function (event) {

        const modal =
            document.getElementById("bookingModal");

        if (event.target === modal) {

            closeModal();

        }

    });


    /* BOOKING FORM */

    document
        .getElementById("bookingForm")
        .addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                document.getElementById("customerName").value;

            const service =
                document.getElementById("service").value;

            alert(
                "Thank you, " +
                name +
                "!\n\nYour " +
                service +
                " request has been received."
            );

            this.reset();

            closeModal();

        });
