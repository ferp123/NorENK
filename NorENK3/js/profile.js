function displayProfile(profileId) {
    const profile = enkProfiles.find(p => p.id === parseInt(profileId));
    if (!profile) return;

    const profileContent = document.getElementById('profile-content');
    profileContent.innerHTML = `
        <div class="profile-header">
            <div class="profile-image">
                <img src="${profile.image}" alt="${profile.name}">
            </div>
            <h1 class="profile-name">${profile.name}</h1>
        </div>
        <div class="profile-info">
            <div class="info-section">
                <h2>Kontaktinformasjon</h2>
                <p>Kategori: ${profile.category}</p>
                <p>Lokasjon: ${profile.location}</p>
                <p>Telefon: ${profile.phone}</p>
                <p>E-post: ${profile.email}</p>
                <p>Nettside: <a href="${profile.website}">${profile.website}</a></p>
            </div>
            <div class="info-section">
                <h2>Om ${profile.name}</h2>
                <p>${profile.description}</p>
            </div>
        </div>
        <div class="skills-section">
            <h2>Ferdigheter</h2>
            <div class="skills-list">
                ${profile.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
    `;
    displayRatingAndReviews(profileId);
}

function displayRatingAndReviews(profileId) {
    const profile = enkProfiles.find(p => p.id === parseInt(profileId));
    if (!profile) return;

    const ratingSection = document.createElement('div');
    ratingSection.className = 'rating-section';
    ratingSection.innerHTML = `
        <h2>Vurderinger og anmeldelser</h2>
        <div class="rating-stars">${getStarRating(profile.rating)}</div>
        <p>Gjennomsnittlig vurdering: ${profile.rating.toFixed(1)} av 5</p>
        <ul class="review-list">
            ${profile.reviews.map(review => `
                <li class="review-item">
                    <p class="review-author">${review.author}</p>
                    <div class="review-rating">${getStarRating(review.rating)}</div>
                    <p>${review.text}</p>
                </li>
            `).join('')}
        </ul>
    `;

    document.getElementById('profile-content').appendChild(ratingSection);
}

function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return '★'.repeat(fullStars) + '½'.repeat(halfStar) + '☆'.repeat(emptyStars);
}

document.addEventListener('DOMContentLoaded', () => {
    const profileId = new URLSearchParams(window.location.search).get('id');
    displayProfile(profileId);
});
