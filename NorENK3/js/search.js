import { searchENKProfiles } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('advanced-search-form');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = searchInput.value;
        const results = await searchENKProfiles(query);
        displaySearchResults(results);
    });

    function displaySearchResults(results) {
        searchResults.innerHTML = '';
        results.forEach(profile => {
            const profileElement = document.createElement('div');
            profileElement.classList.add('profile-card');
            profileElement.innerHTML = `
                <h3>${profile.name}</h3>
                <p>${profile.category}</p>
                <p>${profile.location}</p>
            `;
            searchResults.appendChild(profileElement);
        });
    }
});
