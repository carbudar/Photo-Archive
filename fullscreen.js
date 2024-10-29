document.addEventListener("DOMContentLoaded", async () => {
    // Get the `photoId` parameter from the URL
    const params = new URLSearchParams(window.location.search);
    const photoId = params.get('photoId');

    if (!photoId) {
        console.error("No photo ID provided.");
        return;
    }

    try {
        // Fetch the JSON data from assets.json
        const response = await fetch('assets.json');
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json(); // Parse JSON data

        // make var for photo id array from json
        const photo = data[photoId];

        if (photo) {
            //add info to placeholder
            document.querySelector('.titleHere').innerHTML = photo.title || "Untitled";
            document.querySelector('.dateHere').innerHTML = photo.date || "Unknown";
            document.querySelector('.placeHere').innerHTML = photo.place || "No Place";
            document.querySelector('.cameraHere').innerHTML = photo.camera || "No Camera Info";
            document.querySelector('.imageHere').src = photo.imgSrc; // Display the image itself
        } else {
            console.error("Photo not found in data.");
        }
    } catch (error) {
        console.error("Error loading JSON data:", error);
    }

    // Notification appears for 2 secs
    const notif = document.createElement('div');
    notif.classList.add('notif');
    notif.innerHTML = "Click anywhere on this screen<br>to go back.";

    document.body.appendChild(notif); // Append the notification to the body

    // Remove the notification after 2 seconds
    setTimeout(() => {
        notif.remove();
    }, 2000);

    // Event listener to go back to index.html when clicking anywhere on fullscreen
    const screen = document.querySelector('.fullscreenContainer');
    screen.addEventListener('click', () => {
        // Set a flag in localStorage to indicate the title should be removed on index.html
        localStorage.setItem('skipTitle', 'true');

        // Redirect back to index.html
        window.location.href = 'index.html#pageContainer';
        console.log("Clicked and redirected to index.html");
    });
});
