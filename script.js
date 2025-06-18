// Heart Rain Animation
function createHeartRain() {
    const canvas = document.getElementById('heart-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const hearts = [];
    
    class Heart {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 15 + 10;
            this.speed = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.5;
        }
        
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.scale(this.size / 30, this.size / 30);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#ff69b4';
            
            ctx.beginPath();
            ctx.moveTo(0, -10);
            ctx.bezierCurveTo(-10, -20, -20, -10, 0, 10);
            ctx.bezierCurveTo(20, -10, 10, -20, 0, -10);
            ctx.fill();
            
            ctx.restore();
        }
        
        update() {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.y = -20;
                this.x = Math.random() * canvas.width;
            }
        }
    }
    
    // Create hearts
    for (let i = 0; i < 50; i++) {
        hearts.push(new Heart());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        hearts.forEach(heart => {
            heart.draw();
            heart.update();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Card flip functionality
function flipCard() {
    document.querySelector('.card').classList.add('flip');
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Show surprise
function showSurprise() {
    document.getElementById("surprise-box").classList.remove("hidden");
    typeMessage();
    startSlideshow();
    createHeartRain();
    
    // Trigger confetti
    confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.6 }
    });
}

// Typewriter effect
function typeMessage() {
    const message = `My dearest Bubuuu 💖,

From the very first time we spoke in that Instagram DM, you've been the light that makes my world brighter. Our chats, laughs, and finally our first real meet at Red Fort… are all etched in my heart forever. 🕌❤️

You're my person. Happy Birthday, jaan. I love you endlessly.

— Your Cherry 🍒`;

    let i = 0;
    const box = document.getElementById("typed-message");
    box.innerHTML = "";
    
    const typer = setInterval(() => {
        box.innerHTML += message.charAt(i);
        i++;
        if (i >= message.length) {
            clearInterval(typer);
            // Add confetti when message is complete
            confetti({
                particleCount: 50,
                spread: 45,
                origin: { y: 0.6 }
            });
        }
    }, 40);
}

// Slideshow functionality
function startSlideshow() {
    let index = 0;
    const slides = document.querySelectorAll('.slide');
    
    setInterval(() => {
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
        index = (index + 1) % slides.length;
    }, 4000); // Change slide every 4 seconds
}

// Quiz functionality
function quizAnswer(btn, isCorrect) {
    if (isCorrect) {
        btn.style.background = '#4caf50';
        btn.innerText = "💖 You're right!";
        
        // Trigger confetti for correct answer
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else {
        btn.style.background = '#d32f2f';
        btn.innerText = "Oops! 😅";
    }
    
    // Reset button after 2 seconds
    setTimeout(() => {
        btn.style.background = '#ff4081';
        btn.innerText = btn.getAttribute('data-original') || 'Try Again';
    }, 2000);
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Start heart rain immediately
    createHeartRain();
    
    // Add click event for audio (browser autoplay policy)
    document.addEventListener('click', function initAudio() {
        const audio = document.getElementById('bg-music');
        if (audio) {
            audio.play().catch(e => console.log('Audio autoplay blocked - this is normal'));
        }
        document.removeEventListener('click', initAudio);
    }, { once: true });
    
    // Store original button text for quiz
    document.querySelectorAll('.quiz button').forEach(btn => {
        btn.setAttribute('data-original', btn.innerText);
    });
});

// Add some floating quotes for extra romance
function showFloatingQuote() {
    const quotes = [
        "Every moment with you is a treasure 💖",
        "You make my heart smile ��",
        "Forever yours, my love 💝",
        "You're my favorite hello and my hardest goodbye 💕"
    ];
    
    const quote = document.createElement('div');
    quote.style.cssText = `
        position: fixed;
        color: white;
        font-size: 1.2em;
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        opacity: 0;
        animation: floatQuote 8s linear infinite;
        pointer-events: none;
        z-index: 1;
        left: ${Math.random() * 80 + 10}%;
    `;
    quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatQuote {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(quote);
    setTimeout(() => quote.remove(), 8000);
}

// Show floating quotes periodically
setInterval(showFloatingQuote, 5000); 