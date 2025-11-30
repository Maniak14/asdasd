document.addEventListener('DOMContentLoaded', function() {
  const burger = document.getElementById('burger');
  const navbar = document.querySelector('.navbar');
  
  if (!burger || !navbar) return;
  
  burger.addEventListener('click', function() {
    burger.classList.toggle('active');
    navbar.classList.toggle('active');
    document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
  });
  
  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      burger.classList.remove('active');
      navbar.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!navbar.contains(e.target) && !burger.contains(e.target)) {
      burger.classList.remove('active');
      navbar.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

