// Wait for the DOM to be fully loaded before executing any code
document.addEventListener('DOMContentLoaded', function () {
    // Your existing code for fetching data and displaying cards
    getData();
});


// Function to fetch data from the specified API endpoint
async function getData() {
    try {
        // Make a GET request to the API endpoint
        const response = await fetch('https://opensheet.elk.sh/1ON9yVCud01SIgyn9dwmNqYHov5kxtB81cWcd3asVaRk/Sheet1');
        
        // Parse the response as JSON
        const data = await response.json();

        // Call the displayCards function with the retrieved data
        displayCards(data);
    } catch (error) {
        // Handle errors if the fetch or JSON parsing fails
        console.error('Error fetching data:', error);
    }
}


// Function to display album cards on the webpage
function displayCards(data) {
    // Get the container element where album cards will be displayed
    const cardContainer = document.getElementById('albumCards');

    // Iterate through each row of data
    data.forEach((row) => {
        // Create a card element for each album
        const card = document.createElement('div');
        card.className = `album rating${row.rating}`;
        
        // Create HTML elements for various details of the album
        const albumTitle = document.createElement('h1');
        const artistName = document.createElement('p');
        const pubYear = document.createElement('p');
        const albumRating = document.createElement('p');

        const faveLyric = document.createElement('div');
        faveLyric.className = "container";
        const faveLyricOverlay = document.createElement('div');
        faveLyricOverlay.className = "overlay";
        const faveLyricText = document.createElement('div');
        faveLyricText.className = "text";

        // const faveLyric = document.createElement('q');
        //faveLyric.style.display = "block";
        const albumArtwork = document.createElement('img');
        albumArtwork.className = "image";
        
        // Add the created elements to the card
        faveLyricOverlay.appendChild(faveLyricText)
        faveLyric.append(albumArtwork, faveLyricOverlay);

        card.append(albumTitle, artistName, albumRating, pubYear, faveLyric);

        // Create heart icons based on the rating and append them to the albumRating element
        for (var i = 0; i < 5; i++) {
            const icon = document.createElement('i');
            if (i < row.rating) {
                icon.className = 'fas fa-solid fa-heart checked';
            } else {
                icon.className = 'fas fa-solid fa-heart';
            }
            albumRating.append(icon);
        }
        
        // Append the card to the album cards container
        cardContainer.append(card);

        // Populate the card with data from the current row
        albumTitle.innerText = row.album;
        artistName.innerText = row.artist;
        pubYear.innerText = row.year;
        albumArtwork.src = row.cover;
        albumArtwork.setAttribute('alt', `Cover for the album ${row.album}`);
        faveLyricText.innerText = row.lyrics;
    });
}

// Function to filter albums based on the selected rating
function filterSelection(rating) {
    // Get all elements with the 'album' class
    const elements = document.querySelectorAll('.album');

    // Iterate through each element
    Array.from(elements).forEach((element) => {
        // Check if the element has the selected rating class
        if (element.classList.contains(rating)) {
            // If yes, display the element
            element.style.display = "block";
        } else {
            // If not, hide the element
            element.style.display = "none";
        }
    });
}

// function selectButton(button)
function selectButton(button) {
    // Remove the 'selected' class from all buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => btn.classList.remove('selected'));

    // Add the 'selected' class to the clicked button
    button.classList.add('selected');

    // Check if the clicked button is the "Spotify Playlist" button
    if (button.classList.contains('spotifyBtn')) {
        const playlist = document.getElementById('playlist');
        playlist.style.display = "grid";
    } else {
        // If not, hide the playlist
        playlist.style.display = "none";
    }
}

// Reduce size of heading once you start scrolling down
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        document.getElementById("myHeader").classList.add("small");
    }
}