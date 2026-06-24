// ====== UI & Interactions ======

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Typewriter Effect
const typedTextSpan = document.querySelector(".typed-text");
const textArray = ["Full Stack Developer", "AI Enthusiast", "Computer Vision Dev"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if(textArray.length) setTimeout(type, newTextDelay + 250);

    // Scroll-triggered fade-in animations
    const faders = document.querySelectorAll('.glass-panel, .section-title, .hero-text, .github-section .glass-panel');
    faders.forEach(el => el.classList.add('fade-in'));

    const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    faders.forEach(el => observer.observe(el));

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});


// ====== Three.js Background Setup ======

const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050505, 0.002);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2 for mobile perf

// Groups for rotation
const group = new THREE.Group();
scene.add(group);

// 1. Particle System (Stars/Dust)
const particlesGeometry = new THREE.BufferGeometry();
const isMobile = window.innerWidth < 768;
const particlesCount = isMobile ? 600 : 1500; // Fewer particles on mobile
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    // Spread particles over a large area
    posArray[i] = (Math.random() - 0.5) * 100;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0xffffff, // Changed to white for monochrome look
    transparent: true,
    opacity: 0.4, // Reduced opacity for subtlety
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
group.add(particlesMesh);

// 2. Abstract Geometry (Icosahedron Wireframe)
const geom = new THREE.IcosahedronGeometry(10, 1);
const mat = new THREE.MeshBasicMaterial({
    color: 0xaaaaaa, // Subtle grey
    wireframe: true,
    transparent: true,
    opacity: 0.1
});
const shape = new THREE.Mesh(geom, mat);
shape.position.set(15, 0, -10); // Offset it slightly to the right
group.add(shape);

const geom2 = new THREE.IcosahedronGeometry(15, 1);
const mat2 = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: 0.05
});
const shape2 = new THREE.Mesh(geom2, mat2);
shape2.position.set(-15, -5, -20);
group.add(shape2);

// Interactivity: Mouse movement influences rotation
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Constant slow rotation
    shape.rotation.x += 0.001;
    shape.rotation.y += 0.002;
    
    shape2.rotation.x -= 0.001;
    shape2.rotation.y -= 0.0015;

    particlesMesh.rotation.y = -elapsedTime * 0.05;

    // Mouse interactive rotation (smooth interpolation)
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    group.rotation.y += 0.05 * (targetX - group.rotation.y);
    group.rotation.x += 0.05 * (targetY - group.rotation.x);

    renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
