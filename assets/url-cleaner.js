// Script pour masquer les extensions .html dans les URLs
(function() {
  // Fonction pour nettoyer l'URL
  function cleanURL() {
    const currentPath = window.location.pathname;
    
    // Si l'URL contient .html, la nettoyer
    if (currentPath.endsWith('.html')) {
      const cleanPath = currentPath.replace(/\.html$/, '');
      // Utiliser replaceState pour changer l'URL sans recharger la page
      if (cleanPath === '') {
        window.history.replaceState({}, '', '/');
      } else {
        window.history.replaceState({}, '', cleanPath);
      }
    }
  }
  
  // Nettoyer l'URL au chargement de la page
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanURL);
  } else {
    cleanURL();
  }
  
  // Nettoyer aussi les liens internes pour qu'ils n'affichent pas .html
  document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href$=".html"]');
    links.forEach(function(link) {
      const href = link.getAttribute('href');
      // Ne pas modifier les liens externes ou les liens avec des ancres
      if (href && !href.startsWith('http') && !href.startsWith('//') && !href.includes('#')) {
        const cleanHref = href.replace(/\.html$/, '');
        link.setAttribute('href', cleanHref);
      }
    });
  });
})();

