// Dynamic Service Page Loader
document.querySelectorAll('.service-tag').forEach(button => {
    button.addEventListener('click', function() {
        const serviceId = this.closest('.service-card').dataset.service;
        loadServicePage(serviceId);
    });
});

function loadServicePage(serviceId) {
    // In real implementation: Fetch content from database/JSON
    window.location.href = `servico-${serviceId}.html`;
}