// EFEITO DO FUNDO (Plexus/Partículas)
const canvas = document.getElementById('nokey');
const ctx = canvas.getContext('2d');

let particles = [];
const properties = {
    color: 'rgba(56, 189, 248, 0.4)',
    lineColor: 'rgba(56, 189, 248, 0.15)',
    particleRadius: 2,
    particleCount: 70,
    lineMaxLength: 150,
    velocity: 0.5
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * properties.velocity;
        this.vy = (Math.random() - 0.5) * properties.velocity;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        ctx.fillStyle = properties.color;
        ctx.fill();
    }
}

function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let dist = Math.sqrt(Math.pow(particles[i].x - particles[j].x, 2) + Math.pow(particles[i].y - particles[j].y, 2));
            if (dist < properties.lineMaxLength) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = properties.lineColor;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function init() {
    for (let i = 0; i < properties.particleCount; i++) {
        particles.push(new Particle());
    }
    animate();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
        p.update();
        p.draw();
    }
    drawLines();
    requestAnimationFrame(animate);
}

init();

// SEU CÓDIGO ORIGINAL DO SCROLL SUAVE (LENIS) E MENU
document.addEventListener('DOMContentLoaded', () => {
  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        lenis.scrollTo(targetElement, {
          offset: -50,
          duration: 1.5
        });
      }
    });
  });

  lenis.on('scroll', () => {
    let current = "";
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
});