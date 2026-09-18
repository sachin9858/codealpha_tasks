/* =====================================================
   INDIA CLASSICAL GALLERY
   FIXED CATEGORY IMAGE SYSTEM
===================================================== */


/* =====================================================
   CATEGORY DATABASE
===================================================== */

const galleryData = {

    places: {
        title: "Famous Places of India",
        symbol: "🏛",
        description:
            "Discover India's magnificent landscapes, cities and famous destinations.",
        images: [
            ["taj-mahal", "Taj Mahal • Agra"],
            ["varanasi", "Varanasi • Uttar Pradesh"],
            ["hawa-mahal", "Hawa Mahal • Jaipur"],
            ["india-gate", "India Gate • Delhi"],
            ["golden-temple", "Golden Temple • Amritsar"],
            ["kerala-backwaters", "Kerala Backwaters"],
            ["ladakh", "Ladakh • Himalayas"],
            ["goa", "Goa"],
            ["mysore-palace", "Mysore Palace"],
            ["gateway-of-india", "Gateway of India • Mumbai"],
            ["manali", "Manali • Himachal Pradesh"],
            ["meghalaya", "Meghalaya"],
            ["udaipur", "Udaipur • Rajasthan"],
            ["rishikesh", "Rishikesh • Uttarakhand"],
            ["andaman", "Andaman Islands"]
        ]
    },


    wildlife: {
        title: "Wildlife of India",
        symbol: "🐅",
        description:
            "Explore India's magnificent wildlife and the animals that inhabit its forests and grasslands.",
        images: [
            ["bengal-tiger", "Royal Bengal Tiger"],
            ["indian-elephant", "Indian Elephant"],
            ["indian-peacock", "Indian Peacock"],
            ["asiatic-lion", "Asiatic Lion"],
            ["indian-rhinoceros", "One-Horned Rhinoceros"],
            ["indian-deer", "Indian Deer"],
            ["indian-leopard", "Indian Leopard"],
            ["snow-leopard", "Snow Leopard"],
            ["indian-cobra", "Indian Cobra"],
            ["indian-monkey", "Indian Monkey"],
            ["sloth-bear", "Sloth Bear"],
            ["wild-buffalo", "Wild Buffalo"],
            ["indian-crocodile", "Indian Crocodile"],
            ["indian-flamingo", "Indian Flamingo"],
            ["indian-eagle", "Indian Eagle"]
        ]
    },


    culture: {
        title: "Culture of India",
        symbol: "🎭",
        description:
            "Experience India's festivals, traditions, clothing, dance, food and cultural heritage.",
        images: [
            ["indian-classical-dance", "Classical Indian Dance"],
            ["holi-festival", "Holi Festival"],
            ["diwali-festival", "Diwali"],
            ["indian-festival", "Indian Festival"],
            ["indian-wedding", "Traditional Wedding"],
            ["indian-saree", "Traditional Saree"],
            ["indian-traditional-clothes", "Traditional Attire"],
            ["bharatanatyam", "Bharatanatyam"],
            ["kathak", "Kathak"],
            ["indian-street-food", "Indian Street Food"],
            ["indian-market", "Traditional Market"],
            ["indian-musicians", "Indian Musicians"],
            ["indian-pottery", "Traditional Pottery"],
            ["indian-handicrafts", "Indian Handicrafts"],
            ["indian-village", "Indian Village Life"]
        ]
    },


    heritage: {
        title: "Heritage of India",
        symbol: "🕌",
        description:
            "Journey through India's ancient temples, forts, palaces and historical monuments.",
        images: [
            ["indian-palace", "Royal Palace"],
            ["indian-fort", "Historic Fort"],
            ["indian-temple", "Ancient Temple"],
            ["rajasthan-palace", "Rajasthan Palace"],
            ["red-fort", "Red Fort • Delhi"],
            ["agra-fort", "Agra Fort"],
            ["khajuraho", "Khajuraho Temples"],
            ["konark-temple", "Konark Sun Temple"],
            ["ajanta-caves", "Ajanta Caves"],
            ["ellora-caves", "Ellora Caves"],
            ["sanchi-stupa", "Sanchi Stupa"],
            ["qutub-minar", "Qutub Minar"],
            ["victoria-memorial", "Victoria Memorial"],
            ["meenakshi-temple", "Meenakshi Temple"],
            ["amber-fort", "Amber Fort"]
        ]
    }

};


/* =====================================================
   DOM ELEMENTS
===================================================== */

const categoryPage =
    document.getElementById("categoryPage");

const categoryGrid =
    document.getElementById("categoryGrid");

const categoryTitle =
    document.getElementById("categoryTitle");

const categoryDescription =
    document.getElementById("categoryDescription");

const categorySymbol =
    document.getElementById("categorySymbol");

const categoryEyebrow =
    document.getElementById("categoryEyebrow");

const imageCount =
    document.getElementById("imageCount");

const searchInput =
    document.getElementById("searchInput");


/* =====================================================
   STATE
===================================================== */

let currentCategory = "places";

let currentImages = [];

let currentLightboxIndex = 0;


/* =====================================================
   UNIQUE IMAGE URL
===================================================== */

/*
   IMPORTANT:
   The category name is now part of the URL.

   This prevents the browser/CDN from accidentally
   reusing wildlife images for another category.
*/

function getImageUrl(category, query, index) {

    const safeQuery =
        encodeURIComponent(query);

    const uniqueNumber =
        category.length * 1000 +
        index * 17 +
        731;

    return (
        "https://loremflickr.com/1000/700/" +
        safeQuery +
        "?lock=" +
        uniqueNumber
    );
}


/* =====================================================
   FALLBACK IMAGE
===================================================== */

function setupImage(img, category, query, index) {

    let failed = false;

    img.addEventListener(
        "error",
        function () {

            if (failed) {
                return;
            }

            failed = true;

            /*
               Instead of showing wildlife for every
               failed category, use a neutral India
               image as the final fallback.
            */

            img.src =
                "https://loremflickr.com/1000/700/india,landscape?lock=" +
                (
                    20000 +
                    category.length * 100 +
                    index
                );

        }
    );

}


/* =====================================================
   OPEN CATEGORY
===================================================== */

function openCategory(category) {

    /*
       IMPORTANT:
       Read the exact category from galleryData.
    */

    const data =
        galleryData[category];

    if (!data) {

        console.error(
            "Unknown category:",
            category
        );

        return;
    }


    currentCategory =
        category;


    categoryTitle.textContent =
        data.title;

    categorySymbol.textContent =
        data.symbol;

    categoryDescription.textContent =
        data.description;

    categoryEyebrow.textContent =
        "EXPLORE • INDIA";


    searchInput.value = "";


    renderCategoryImages(
        data.images,
        category
    );


    categoryPage.classList.add(
        "open"
    );


    document.body.style.overflow =
        "hidden";


    /*
       Start the category page from top.
    */

    categoryPage.scrollTop = 0;

}


/* =====================================================
   RENDER CATEGORY IMAGES
===================================================== */

function renderCategoryImages(
    images,
    category = currentCategory
) {

    currentImages =
        images;


    categoryGrid.innerHTML =
        "";


    imageCount.textContent =
        `${images.length} photographs`;


    images.forEach(
        (item, index) => {

            const query =
                item[0];

            const title =
                item[1];


            /* CARD */

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "category-card";


            /* IMAGE */

            const image =
                document.createElement(
                    "img"
                );

            image.alt =
                title;

            image.loading =
                "lazy";


            /*
               CATEGORY IS NOW EXPLICITLY
               PASSED INTO URL GENERATOR.
            */

            image.src =
                getImageUrl(
                    category,
                    query,
                    index
                );


            setupImage(
                image,
                category,
                query,
                index
            );


            /* INFO */

            const info =
                document.createElement(
                    "div"
                );

            info.className =
                "category-card-info";


            const heading =
                document.createElement(
                    "h3"
                );

            heading.textContent =
                title;


            const description =
                document.createElement(
                    "p"
                );

            description.textContent =
                "India • Collection";


            info.appendChild(
                heading
            );

            info.appendChild(
                description
            );


            card.appendChild(
                image
            );

            card.appendChild(
                info
            );


            /* CLICK → LIGHTBOX */

            card.addEventListener(
                "click",
                function () {

                    openLightbox(
                        index
                    );

                }
            );


            categoryGrid.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   CLOSE CATEGORY
===================================================== */

function closeCategory() {

    categoryPage.classList.remove(
        "open"
    );

    document.body.style.overflow =
        "";

}


/* =====================================================
   VIEW ALL BUTTONS
===================================================== */

document
    .querySelectorAll("[data-open]")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    openCategory(
                        this.dataset.open
                    );

                }
            );

        }
    );


/* =====================================================
   TOP CATEGORY BUTTONS
===================================================== */

document
    .querySelectorAll(".category-btn")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                function () {

                    const category =
                        this.dataset.category;


                    document
                        .querySelectorAll(
                            ".category-btn"
                        )
                        .forEach(
                            btn => {

                                btn.classList.remove(
                                    "active"
                                );

                            }
                        );


                    this.classList.add(
                        "active"
                    );


                    if (
                        category === "all"
                    ) {

                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });

                        return;

                    }


                    openCategory(
                        category
                    );

                }
            );

        }
    );


/* =====================================================
   BACK BUTTONS
===================================================== */

document
    .getElementById("backHome")
    .addEventListener(
        "click",
        closeCategory
    );


document
    .getElementById("backHomeBottom")
    .addEventListener(
        "click",
        closeCategory
    );


/* =====================================================
   SEARCH
===================================================== */

searchInput.addEventListener(
    "input",
    function () {

        const text =
            this.value
                .toLowerCase()
                .trim();


        const data =
            galleryData[
                currentCategory
            ];


        if (!data) {
            return;
        }


        const filtered =
            data.images.filter(
                item => {

                    const query =
                        item[0]
                            .toLowerCase();

                    const title =
                        item[1]
                            .toLowerCase();


                    return (
                        query.includes(
                            text
                        ) ||
                        title.includes(
                            text
                        )
                    );

                }
            );


        renderCategoryImages(
            filtered,
            currentCategory
        );

    }
);


/* =====================================================
   LIGHTBOX ELEMENTS
===================================================== */

const lightbox =
    document.getElementById(
        "lightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const lightboxTitle =
    document.getElementById(
        "lightboxTitle"
    );

const lightboxCounter =
    document.getElementById(
        "lightboxCounter"
    );


/* =====================================================
   OPEN LIGHTBOX
===================================================== */

function openLightbox(index) {

    if (
        currentImages.length === 0
    ) {
        return;
    }


    currentLightboxIndex =
        index;


    updateLightbox();


    lightbox.classList.add(
        "open"
    );

}


/* =====================================================
   UPDATE LIGHTBOX
===================================================== */

function updateLightbox() {

    const item =
        currentImages[
            currentLightboxIndex
        ];


    if (!item) {
        return;
    }


    lightboxImage.src =
        getImageUrl(
            currentCategory,
            item[0],
            currentLightboxIndex + 500
        );


    lightboxImage.alt =
        item[1];


    lightboxTitle.textContent =
        item[1];


    lightboxCounter.textContent =
        `${currentLightboxIndex + 1} / ${currentImages.length}`;

}


/* =====================================================
   CLOSE LIGHTBOX
===================================================== */

function closeLightbox() {

    lightbox.classList.remove(
        "open"
    );

}


/* =====================================================
   NEXT
===================================================== */

function nextPhoto() {

    if (
        currentImages.length === 0
    ) {
        return;
    }


    currentLightboxIndex =
        (
            currentLightboxIndex + 1
        ) %
        currentImages.length;


    updateLightbox();

}


/* =====================================================
   PREVIOUS
===================================================== */

function previousPhoto() {

    if (
        currentImages.length === 0
    ) {
        return;
    }


    currentLightboxIndex--;

    if (
        currentLightboxIndex < 0
    ) {

        currentLightboxIndex =
            currentImages.length - 1;

    }


    updateLightbox();

}


/* =====================================================
   LIGHTBOX BUTTONS
===================================================== */

document
    .getElementById(
        "closeLightbox"
    )
    .addEventListener(
        "click",
        closeLightbox
    );


document
    .getElementById(
        "nextImage"
    )
    .addEventListener(
        "click",
        nextPhoto
    );


document
    .getElementById(
        "previousImage"
    )
    .addEventListener(
        "click",
        previousPhoto
    );


/* =====================================================
   CLICK OUTSIDE IMAGE
===================================================== */

lightbox.addEventListener(
    "click",
    function (event) {

        if (
            event.target === lightbox
        ) {

            closeLightbox();

        }

    }
);


/* =====================================================
   KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        /*
           Lightbox controls
        */

        if (
            lightbox.classList.contains(
                "open"
            )
        ) {

            if (
                event.key === "ArrowRight"
            ) {

                nextPhoto();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                previousPhoto();

            }


            if (
                event.key === "Escape"
            ) {

                closeLightbox();

            }


            return;

        }


        /*
           Category page controls
        */

        if (
            categoryPage.classList.contains(
                "open"
            ) &&
            event.key === "Escape"
        ) {

            closeCategory();

        }

    }
);
