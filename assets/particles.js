document.addEventListener('DOMContentLoaded', function() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  const particleCount = 50;
  const particles = [];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(150, 100, 200, 0.5);
      border-radius: 50%;
      pointer-events: none;
    `;
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = 10 + Math.random() * 20;
    const delay = Math.random() * 5;
    
    particle.style.left = x + '%';
    particle.style.top = y + '%';
    particle.style.animation = `floatParticle ${duration}s ${delay}s infinite ease-in-out`;
    
    particlesContainer.appendChild(particle);
    particles.push({
      element: particle,
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    });
  }
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0%, 100% {
        transform: translate(0, 0);
        opacity: 0.3;
      }
      50% {
        transform: translate(20px, -20px);
        opacity: 0.8;
      }
    }
  `;
  document.head.appendChild(style);
  
  function animateParticles() {
    particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      if (particle.x < 0 || particle.x > 100) particle.vx *= -1;
      if (particle.y < 0 || particle.y > 100) particle.vy *= -1;
      
      particle.element.style.left = particle.x + '%';
      particle.element.style.top = particle.y + '%';
    });
    
    requestAnimationFrame(animateParticles);
  }
  
  animateParticles();
});

