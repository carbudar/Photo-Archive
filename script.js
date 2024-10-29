document.addEventListener("DOMContentLoaded", async () => {
    // skip title screen when is not first time loading the web, saved in local storage
    if (localStorage.getItem('skipTitle') === 'true') {
        const title = document.getElementById('title');
        if (title) {
            title.remove(); // Remove the title element from the DOM
        }
        // Clear the flag so it only happens once
        localStorage.removeItem('skipTitle');
    } else {
        // If it's the first visit or the flag isn't set, show the title with a timeout
        document.body.classList.add("no-scroll");

        // Set timeout to hide the title after 2 seconds
        setTimeout(() => {
            const title = document.getElementById("title");
            document.body.classList.remove("no-scroll");
            if (title) {
                title.classList.add("hide-title");
            }
        }, 2000); // 2 seconds
    }

    // Instagram link
    const instagram = document.querySelector('.fa-brands');
    if (instagram) {
        instagram.addEventListener('click', () => {
            window.open('https://www.instagram.com/carbudar.zip', '_blank');
        });
    }

    try {
        const response = await fetch('assets.json');
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const photoGallery = document.getElementById('photoGallery');

        // Loop through each photo and create image elements
        for (let key in data) { 
            const photo = data[key];
            if (photo.imgSrc) {
                const img = document.createElement('img');
                img.src = photo.imgSrc;
                img.alt = photo.title || 'Gallery Image';

               //cmake the images into buttons by adding click event listener
                img.addEventListener('click', () => {
                    window.location.href = `fullscreen.html?photoId=${encodeURIComponent(key)}`;
                });

                photoGallery.appendChild(img); // Add image to gallery
            }
        }
    } catch (error) {
        console.error("Error loading photos:", error);
    }
});
