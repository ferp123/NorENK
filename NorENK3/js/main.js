// Add the fuzzysort library for fuzzy matching
document.head.appendChild(Object.assign(document.createElement('script'), {
    src: 'https://cdn.jsdelivr.net/npm/fuzzysort@2.0.1/fuzzysort.min.js'
}));

function filterProfiles(searchTerm) {
    if (!searchTerm) return enkProfiles;

    const fuzzyResults = fuzzysort.go(searchTerm, enkProfiles, {
        keys: ['name', 'category', 'location', 'skills'],
        threshold: -10000
    });

    return fuzzyResults.map(result => result.obj);
}

function displayProfiles(profiles, isSearchResult = false) {
    const profileGrid = document.querySelector('.profile-grid');
    const heading = document.querySelector('#showcase h2');
    
    heading.textContent = isSearchResult ? "Resultater for ditt søk" : "Dagens firkløver 🍀";
    
    profileGrid.innerHTML = '';

    if (profiles.length === 0) {
        profileGrid.innerHTML = '<p class="no-results">Ingen resultater funnet</p>';
        return;
    }

    profiles.forEach(profile => {
        const card = document.createElement('div');
        card.className = 'profile-card';
        card.innerHTML = `
            <a href="profile.html?id=${profile.id}">
                <div class="profile-image">
                    <img src="${profile.image}" alt="${profile.name}">
                </div>
                <div class="profile-info">
                    <h3>${profile.name}</h3>
                    <p>${profile.category}</p>
                    <p>${profile.location}</p>
                    <p>${profile.phone}</p>
                    <p class="skills">Ferdigheter: ${profile.skills.join(', ')}</p>
                </div>
            </a>
        `;
        profileGrid.appendChild(card);
    });
}

function initializeSearch() {
    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('input', debounce(() => {
        const searchTerm = searchInput.value.trim();
        const profiles = filterProfiles(searchTerm);
        displayProfiles(profiles, searchTerm !== '');
    }, 300));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function getRandomProfiles(count) {
    return enkProfiles.sort(() => 0.5 - Math.random()).slice(0, count);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
    displayProfiles(getRandomProfiles(4));
});
