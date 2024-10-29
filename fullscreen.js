fetch('assets.json')
    .then(response => response.json()) // Parse the JSON data
    .then(data => {
        // Now `data` is the JavaScript object equivalent of your JSON
        document.querySelector('.titleHere').innerHTML = data.photo1.title;
        document.querySelector('.dateHere').innerHTML = data.photo1.date;
        document.querySelector('.placeHere').innerHTML = data.photo1.place;
        document.querySelector('.cameraHere').innerHTML = data.photo1.camera;
        document.querySelector('.imageHere').src = data.photo1.imgSrc;
    })
    .catch(error => console.error('Error loading JSON data:', error));

// fullscreen.js
document.addEventListener('DOMContentLoaded', () => {
    const screen = document.querySelector('.fullscreenContainer'); 

    screen.addEventListener('click', () => {
        // Set a flag in localStorage to indicate the title should be removed
        localStorage.setItem('skipTitle', 'true');

        // Redirect to index.html
        window.location.href = 'index.html#pageContainer';
        console.log("Clicked and redirected to index.html");
    });
});


document.addEventListener("DOMContentLoaded", () => {
  
        const notif = document.createElement('div');
        notif.classList.add('notif')
        notif.innerHTML = "Click anywhere on this screen<br>to go back.";


       
        document.body.appendChild(notif);

        setTimeout(() => {
            notif.remove();
        }, 2000); // 2 secs

});
 