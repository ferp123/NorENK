document.addEventListener('DOMContentLoaded', function() {
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));

    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
});

async function loadComponent(url, elementId) {
    try {
        const response = await fetch(url);
        const data = await response.text();
        document.getElementById(elementId).innerHTML = data;
    } catch (error) {
        console.error(`Error loading ${elementId}:`, error);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    await loadComponent('components/header.html', 'header-placeholder');
    await loadComponent('components/footer.html', 'footer-placeholder');
});
