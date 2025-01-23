// Example stories data
const stories = [
    {
        title: "Twisted Love",
        author: "Ana Huang",
        image: "https://i.pinimg.com/736x/8e/35/a2/8e35a2da1f6c746db1ae17bb061c117a.jpg",
        link: "story1.html"
    },
    {
        title: "Twisted Game",
        author: "Ana Huang",
        image: "https://i.pinimg.com/474x/b1/d6/37/b1d6378ecc567b2ca056b07eba12a9b2.jpg",
        link: "story2.html"
    },
    {
        title: "Twisted Life",
        author: "Ana Huang",
        image: "https://i.pinimg.com/474x/f8/2f/0c/f82f0ccaeaa763afbd78f53b89e5e713.jpg",
        link: "story3.html"
    },
    
];

// Function to display books in the container
function displayBooks(filteredStories) {
    const container = document.getElementById("book-container");
    container.innerHTML = ''; // Clear container before displaying books

    filteredStories.forEach(story => {
        const bookCard = document.createElement("a");
        bookCard.classList.add("book-card");
        bookCard.href = story.link; // Make the card clickable
        bookCard.target = "_blank"; // Open the story in a new tab

        // Add book content
        bookCard.innerHTML = `
            <img src="${story.image}" alt="${story.title}">
            <h3>${story.title}</h3>
            <p>by ${story.author}</p>
        `;

        // Append the book card to the container
        container.appendChild(bookCard);
    });

    // If no stories match, display a message
    if (filteredStories.length === 0) {
        container.innerHTML = '<p>No stories found</p>';
    }
}

// Function to handle the search action
function searchStory() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredStories = stories.filter(story => story.title.toLowerCase().includes(searchInput));

    // Display the filtered books
    displayBooks(filteredStories);
}

// Call this function to display all books when the page is loaded
window.onload = () => {
    displayBooks(stories); // Display all books initially
};

// Function to toggle the visibility of the dropdown menu
function toggleDropdown() {
    const dropdown = document.getElementById('writeDropdown');
    dropdown.classList.toggle('show'); // Toggle the 'show' class
}

// Function to update the login state dynamically
function updateAuthLink() {
    const authLink = document.getElementById('authLink');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        authLink.textContent = 'Profile';  // Update text to "Profile"
        authLink.href = 'profile.html';    // Redirect to profile page
    } else {
        authLink.textContent = 'Log In';   // Reset text to "Log In"
        authLink.href = 'login.html';      // Redirect to login page
    }
}

// Call this function when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateAuthLink();  // Update the link based on login state
});
