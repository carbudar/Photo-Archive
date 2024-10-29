document.addEventListener("DOMContentLoaded", async () => {
    // Check if the flag is set in localStorage to skip the title screen
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

        // Set timeout to hide the title after 3 seconds
        setTimeout(() => {
            const title = document.getElementById("title");
            document.body.classList.remove("no-scroll");
            if (title) {
                title.classList.add("hide-title");
            }
        }, 2000); // 3 seconds
    }

    // Instagram link
    const instagram = document.querySelector('.fa-brands');
    if (instagram) {
        instagram.addEventListener('click', () => {
            window.open('https://www.instagram.com/carbudar.zip', '_blank');
        });
    }

    // Load photos asynchronously
    try {
        // Fetch the JSON data
        const response = await fetch('assets.json');
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        // Parse the JSON data
        const data = await response.json();
        
        // Get the photo gallery container
        const photoGallery = document.getElementById('photoGallery');

        // Loop through each photo in the data and create image elements
        Object.values(data).forEach(photo => {
            if (photo.imgSrc) {
                const img = document.createElement('img');
                img.src = photo.imgSrc;
                img.alt = photo.title || 'Gallery Image';

                // Redirect to fullscreen.html with imgSrc as a parameter on click
                img.addEventListener('click', () => {
                    window.location.href = `fullscreen.html?imgSrc=${encodeURIComponent(photo.imgSrc)}`;
                });

                photoGallery.appendChild(img); // Add image to gallery
            }
        });
    } catch (error) {
        console.error("Error loading photos:", error);
    }
});
