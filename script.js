// ===== CONFIGURATION =====
// Set your phone number with country code (e.g., '919876543210' for India or '97798...' for Nepal)
const ANKIT_PHONE_NUMBER = '917086826509'; 

// Topic for instant free push notifications via https://ntfy.sh
// You can open https://ntfy.sh/ankit-sonam-date-2026 on your phone/browser to receive instant alerts!
const NTFY_TOPIC = 'ankit-sonam-date-2026';

// ===== STATE =====
let noCount = 0;
let yesScale = 1;
let isMusicPlaying = false;
let hasSaidYes = false; // Strictly prevents any audio from playing before Yes is clicked

// ===== DOM ELEMENTS =====
const questionScreen = document.getElementById('questionScreen');
const celebrationScreen = document.getElementById('celebrationScreen');
const bearContainer = document.getElementById('bearContainer');
const bearHeart = document.getElementById('bearHeart');
const tearLeft = document.getElementById('tearLeft');
const tearRight = document.getElementById('tearRight');
const questionText = document.getElementById('questionText');
const subText = document.getElementById('subText');
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const noCountMsg = document.getElementById('noCountMsg');
const heartsRain = document.getElementById('heartsRain');
const floatingHearts = document.getElementById('floatingHearts');
const sparklesContainer = document.getElementById('sparkles');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const whatsappBtn = document.getElementById('whatsappBtn');

// ===== BEAR EXPRESSION DATA =====
const bearStates = [
    {
        expression: '',
        question: 'Sonam, will you go on a date with me? 💙🥺',
        subtext: 'Please say yes, Sonam... 💙',
        tears: false,
        heart: '💙',
        msg: ''
    },
    {
        expression: 'sad',
        question: 'Sonam, are you sure? 😢',
        subtext: 'The bear is getting sad... look at his face! 🐻💙',
        tears: false,
        heart: '💔',
        msg: 'Hmm... maybe you clicked the wrong button, Sonam? 🤔'
    },
    {
        expression: 'sad',
        question: 'Really, Sonam? Think again... 🥺',
        subtext: 'Every moment with you would be magical ✨💙',
        tears: false,
        heart: '💔',
        msg: "The bear doesn't believe you meant that! 🐻"
    },
    {
        expression: 'crying',
        question: "Sonam, you're making me cry... 😭",
        subtext: "I promise I'll make you smile every single day! 🌸💙",
        tears: true,
        heart: '😢',
        msg: "Please don't break the bear's heart, Sonam... 💔"
    },
    {
        expression: 'crying',
        question: "I'll be really sad, Sonam... 💔",
        subtext: "Just one date? That's all I'm asking for... 🌹💙",
        tears: true,
        heart: '😭',
        msg: 'The bear is running out of tissues! 🧻'
    },
    {
        expression: 'devastated',
        question: "Sonam, my heart can't take this... 😭💔",
        subtext: "I'll plan the most amazing date ever for you, I promise! ✨🌟",
        tears: true,
        heart: '💔',
        msg: 'Even the No button is trying to run away from you! 😅'
    },
    {
        expression: 'pleading',
        question: 'Sonam, look into my eyes... 🥺👉👈',
        subtext: 'How can you say no to this face? Look at it! 🐻💙',
        tears: true,
        heart: '🥺',
        msg: "The bear is using his ultimate puppy eyes for Sonam! 🐶💙"
    },
    {
        expression: 'pleading',
        question: 'Sonam, pretty please with a cherry on top? 🍒💙',
        subtext: "I've been practicing my best smile just for you! 😊🌈",
        tears: true,
        heart: '🙏',
        msg: "Come on Sonam... you know you want to say YES! 💙"
    },
    {
        expression: 'pleading',
        question: 'Sonam, I know you want to say yes! 💙✨',
        subtext: "Stop fighting it... the Yes button is RIGHT THERE! ➡️💙",
        tears: true,
        heart: '💝',
        msg: "Just click Yes already, Sonam... the bear is BEGGING! 🧸🙏"
    },
    {
        expression: 'pleading',
        question: "Okay fine Sonam... but I'm not giving up! 😤💙",
        subtext: "I'll keep asking forever because you're worth it, Sonam! 🌹✨💙",
        tears: true,
        heart: '💙',
        msg: "The bear will NEVER give up on Sonam! 🐻💪💙"
    }
];

// ===== INIT =====
function init() {
    hasSaidYes = false;
    if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }
    createFloatingHearts();
    createSparkles();
}

// ===== FLOATING HEARTS BACKGROUND =====
function createFloatingHearts() {
    const hearts = ['💙', '🩵', '💎', '🦋', '✨', '🫧', '💠', '❄️', '🌊'];
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (8 + Math.random() * 12) + 's';
        heart.style.animationDelay = (Math.random() * 15) + 's';
        heart.style.fontSize = (0.8 + Math.random() * 1) + 'rem';
        floatingHearts.appendChild(heart);
    }
}

// ===== SPARKLES =====
function createSparkles() {
    for (let i = 0; i < 25; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = (Math.random() * 3) + 's';
        sparkle.style.animationDuration = (1.5 + Math.random() * 2) + 's';
        sparklesContainer.appendChild(sparkle);
    }
}

// ===== HANDLE NO =====
function handleNo() {
    noCount++;
    
    // Get state (loop back to last if exceeded)
    const stateIndex = Math.min(noCount, bearStates.length - 1);
    const state = bearStates[stateIndex];
    
    // Update bear expression
    bearContainer.className = 'bear-container';
    if (state.expression) {
        bearContainer.classList.add(state.expression);
    }
    
    // Shake animation
    bearContainer.classList.add('shake');
    setTimeout(() => bearContainer.classList.remove('shake'), 500);
    
    // Tears
    if (state.tears) {
        tearLeft.classList.add('visible');
        tearRight.classList.add('visible');
    }
    
    // Update heart
    bearHeart.textContent = state.heart;
    
    // Update text
    questionText.textContent = state.question;
    subText.textContent = state.subtext;
    
    // Update counter message
    if (state.msg) {
        noCountMsg.textContent = state.msg;
        noCountMsg.classList.add('visible');
    }
    
    // Grow Yes button
    yesScale += 0.15;
    btnYes.style.transform = `scale(${yesScale})`;
    btnYes.style.zIndex = 10 + noCount;
    
    // Shrink No button slightly
    const noScale = Math.max(0.6, 1 - noCount * 0.05);
    btnNo.style.fontSize = `${Math.max(0.7, 0.95 - noCount * 0.03)}rem`;
    
    // Move No button to random position after 2 clicks
    if (noCount >= 1) {
        moveNoButton();
    }
    
    // Emit sad particles
    emitSadParticles();
}

// ===== MOVE NO BUTTON =====
function moveNoButton() {
    btnNo.classList.add('runaway');
    
    const padding = 30;
    const btnWidth = btnNo.offsetWidth || 100;
    const btnHeight = btnNo.offsetHeight || 45;
    
    // Use visualViewport for accurate mobile dimensions (accounts for keyboard, URL bar)
    const vw = (window.visualViewport ? window.visualViewport.width : window.innerWidth);
    const vh = (window.visualViewport ? window.visualViewport.height : window.innerHeight);
    
    const minX = padding;
    const minY = padding;
    const maxX = vw - btnWidth - padding;
    const maxY = vh - btnHeight - padding;
    
    let newX, newY;
    let attempts = 0;
    
    // Make sure it doesn't land too close to the Yes button
    do {
        newX = minX + Math.random() * (maxX - minX);
        newY = minY + Math.random() * (maxY - minY);
        attempts++;
    } while (attempts < 20 && isNearYesButton(newX, newY));
    
    // Clamp to safe area so it never goes off-screen
    newX = Math.max(minX, Math.min(newX, maxX));
    newY = Math.max(minY, Math.min(newY, maxY));
    
    btnNo.style.left = newX + 'px';
    btnNo.style.top = newY + 'px';
}

function isNearYesButton(x, y) {
    const yesRect = btnYes.getBoundingClientRect();
    const distance = Math.sqrt(
        Math.pow(x - yesRect.left, 2) + Math.pow(y - yesRect.top, 2)
    );
    return distance < 150;
}

// ===== SAD PARTICLES =====
function emitSadParticles() {
    const particles = ['💔', '😢', '😭', '🥺'];
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.position = 'fixed';
        particle.style.left = (Math.random() * window.innerWidth) + 'px';
        particle.style.top = (Math.random() * window.innerHeight * 0.5) + 'px';
        particle.style.fontSize = '1.5rem';
        particle.style.zIndex = '50';
        particle.style.pointerEvents = 'none';
        particle.style.transition = 'all 2s ease-out';
        particle.style.opacity = '1';
        document.body.appendChild(particle);
        
        requestAnimationFrame(() => {
            particle.style.transform = `translateY(${100 + Math.random() * 200}px) rotate(${Math.random() * 360}deg)`;
            particle.style.opacity = '0';
        });
        
        setTimeout(() => particle.remove(), 2000);
    }
}

// ===== HANDLE YES =====
function handleYes() {
    // Only after clicking YES is audio authorized to play
    hasSaidYes = true;

    // Send instant notification to Ankit & prepare WhatsApp link
    notifyAnkit();

    // Hide question screen
    questionScreen.classList.add('hidden');
    
    // Show celebration
    setTimeout(() => {
        celebrationScreen.classList.remove('hidden');
        startCelebration();
    }, 400);
}

// ===== CELEBRATION =====
function startCelebration() {
    // Start hearts rain
    startHeartsRain();
    
    // Confetti burst
    createConfettiBurst();
    
    // Play romantic music
    playRomanticMusic();
    
    // Add image sparkles
    createImageSparkles();
}

// ===== HEARTS RAIN =====
function startHeartsRain() {
    const hearts = ['💙', '🩵', '💎', '🦋', '✨', '🫧', '💠', '🌊', '⭐', '🌸', '💐'];
    
    function createRainHeart() {
        const heart = document.createElement('div');
        heart.className = 'rain-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (0.8 + Math.random() * 1.5) + 'rem';
        heart.style.animationDuration = (3 + Math.random() * 5) + 's';
        heart.style.animationDelay = Math.random() * 0.5 + 's';
        heart.style.opacity = 0.5 + Math.random() * 0.5;
        heartsRain.appendChild(heart);
        
        setTimeout(() => heart.remove(), 8000);
    }
    
    // Initial burst
    for (let i = 0; i < 30; i++) {
        setTimeout(() => createRainHeart(), i * 100);
    }
    
    // Continuous rain
    setInterval(() => {
        createRainHeart();
    }, 300);
}

// ===== CONFETTI BURST =====
function createConfettiBurst() {
    const colors = ['#38bdf8', '#0ea5e9', '#0284c7', '#7dd3fc', '#e0f2fe', '#bae6fd', '#ffd54f', '#a5f3fc', '#67e8f9'];
    
    for (let i = 0; i < 60; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = (40 + Math.random() * 20) + '%';
            confetti.style.top = (30 + Math.random() * 20) + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (5 + Math.random() * 10) + 'px';
            confetti.style.height = (5 + Math.random() * 10) + 'px';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 100 + Math.random() * 300;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;
            
            confetti.style.setProperty('--tx', tx + 'px');
            confetti.style.setProperty('--ty', ty + 'px');
            confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s ease-out forwards`;
            confetti.style.transform = `translate(${tx}px, ${ty}px)`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// ===== IMAGE SPARKLES =====
function createImageSparkles() {
    const wrapper = document.querySelector('.image-sparkles');
    if (!wrapper) return;
    
    const sparkleEmojis = ['✨', '⭐', '💫', '🌟'];
    
    setInterval(() => {
        const sparkle = document.createElement('span');
        sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = (0.6 + Math.random() * 0.8) + 'rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.transition = 'all 1.5s ease-out';
        sparkle.style.opacity = '1';
        wrapper.appendChild(sparkle);
        
        requestAnimationFrame(() => {
            sparkle.style.transform = `translateY(-30px) scale(0)`;
            sparkle.style.opacity = '0';
        });
        
        setTimeout(() => sparkle.remove(), 1500);
    }, 400);
}

// ===== NOTIFICATION & WHATSAPP SYSTEM =====
function openWhatsApp(e) {
    if (e && e.preventDefault) e.preventDefault();
    const phone = ANKIT_PHONE_NUMBER || '917086826509';
    const textMessage = 'Hina mayalu jaam date ma ❤️';
    const encoded = encodeURIComponent(textMessage);

    const isMobile = /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        // Direct WhatsApp app protocol - launches the app immediately on phone, skipping the browser preview entirely
        window.location.href = `whatsapp://send?phone=${phone}&text=${encoded}`;
        setTimeout(() => {
            window.location.href = `https://api.whatsapp.com/send/?phone=${phone}&text=${encoded}`;
        }, 1200);
    } else {
        // Desktop / Laptop: Open WhatsApp Web directly (bypasses buggy api.whatsapp.com web preview)
        window.open(`https://web.whatsapp.com/send?phone=${phone}&text=${encoded}`, '_blank');
    }
}

function notifyAnkit() {
    // 1. Prepare WhatsApp message link
    if (whatsappBtn) {
        const phone = ANKIT_PHONE_NUMBER || '917086826509';
        const textMessage = 'Hina mayalu jaam date ma ❤️';
        const encoded = encodeURIComponent(textMessage);
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        whatsappBtn.href = isMobile 
            ? `whatsapp://send?phone=${phone}&text=${encoded}`
            : `https://web.whatsapp.com/send?phone=${phone}&text=${encoded}`;
    }

    // 2. Send instant free push notification via ntfy.sh
    if (NTFY_TOPIC) {
        try {
            fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
                method: 'POST',
                headers: {
                    'Title': '💙 Sonam Said YES! 🎉',
                    'Priority': 'urgent',
                    'Tags': 'tada,heart,blue_heart,ring'
                },
                body: `🎉 SONAM SAID YES TO YOUR DATE! 💙\nDate & Time: ${new Date().toLocaleTimeString()}\nShe clicked "No" ${noCount} time(s) before saying YES! 🥰`
            }).catch(err => {
                console.log('Push notification silent log:', err);
            });
        } catch (e) {
            console.log('Notification fetch error:', e);
        }
    }
}

// ===== MUSIC CONTROL & PLAYBACK =====
let bgAudio = null;
let musicToggleInitialized = false;

function setupMusicToggle() {
    if (!musicToggle || musicToggleInitialized) return;
    musicToggleInitialized = true;

    musicToggle.classList.remove('hidden');
    musicToggle.addEventListener('click', toggleMusic);
}

function toggleMusic() {
    if (!hasSaidYes || !bgAudio) return;

    if (isMusicPlaying) {
        bgAudio.pause();
        isMusicPlaying = false;
        if (musicToggle) musicToggle.classList.remove('playing');
        if (musicIcon) musicIcon.textContent = '🔇';
    } else {
        bgAudio.play().then(() => {
            isMusicPlaying = true;
            if (musicToggle) musicToggle.classList.add('playing');
            if (musicIcon) musicIcon.textContent = '🎵';
        }).catch(err => {
            console.log('Audio resume error:', err);
        });
    }
}

// ===== PLAY ROMANTIC MUSIC (sonam.mpeg / sonam.mp3) =====
function playRomanticMusic() {
    // Strictly prevent audio from playing unless she has pressed Yes
    if (!hasSaidYes) return;

    try {
        bgAudio = bgMusic || new Audio('sonam.mpeg');
        bgAudio.volume = 0.9;
        bgAudio.loop = true;

        setupMusicToggle();

        const playPromise = bgAudio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isMusicPlaying = true;
                if (musicToggle) {
                    musicToggle.classList.remove('hidden');
                    musicToggle.classList.add('playing');
                }
                if (musicIcon) musicIcon.textContent = '🎵';
            }).catch(error => {
                console.log('Audio autoplay prevented or error, falling back to Web Audio melody:', error);
                if (hasSaidYes) playSynthesizedMelody();

                // Enable playback upon next user gesture (phone/browser tap)
                const onFirstTouch = () => {
                    if (hasSaidYes && bgAudio) {
                        bgAudio.play().then(() => {
                            isMusicPlaying = true;
                            if (musicToggle) {
                                musicToggle.classList.remove('hidden');
                                musicToggle.classList.add('playing');
                            }
                            if (musicIcon) musicIcon.textContent = '🎵';
                        }).catch(() => {});
                    }
                    window.removeEventListener('click', onFirstTouch);
                    window.removeEventListener('touchstart', onFirstTouch);
                };
                window.addEventListener('click', onFirstTouch, { once: true });
                window.addEventListener('touchstart', onFirstTouch, { once: true });
            });
        }
    } catch (e) {
        console.log('Audio file error, falling back to synth melody:', e);
        if (hasSaidYes) playSynthesizedMelody();
    }
}

// ===== FALLBACK SYNTHESIZED MELODY =====
function playSynthesizedMelody() {
    // Strictly prevent melody from playing unless she has pressed Yes
    if (!hasSaidYes) return;

    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();

        const melody = [
            { freq: 523.25, duration: 0.6, delay: 0 },
            { freq: 493.88, duration: 0.3, delay: 0.6 },
            { freq: 440.00, duration: 0.6, delay: 0.9 },
            { freq: 392.00, duration: 0.3, delay: 1.5 },
            { freq: 440.00, duration: 0.6, delay: 1.8 },
            { freq: 493.88, duration: 0.6, delay: 2.4 },
            { freq: 523.25, duration: 0.9, delay: 3.0 },
            { freq: 440.00, duration: 0.6, delay: 4.2 },
            { freq: 392.00, duration: 0.3, delay: 4.8 },
            { freq: 349.23, duration: 0.6, delay: 5.1 },
            { freq: 329.63, duration: 0.3, delay: 5.7 },
            { freq: 349.23, duration: 0.6, delay: 6.0 },
            { freq: 392.00, duration: 0.6, delay: 6.6 },
            { freq: 440.00, duration: 0.9, delay: 7.2 },
            { freq: 523.25, duration: 0.4, delay: 8.4 },
            { freq: 587.33, duration: 0.4, delay: 8.8 },
            { freq: 659.25, duration: 0.8, delay: 9.2 },
            { freq: 587.33, duration: 0.4, delay: 10.0 },
            { freq: 523.25, duration: 0.8, delay: 10.4 },
            { freq: 493.88, duration: 0.4, delay: 11.2 },
            { freq: 440.00, duration: 0.4, delay: 11.6 },
            { freq: 392.00, duration: 1.0, delay: 12.0 },
            { freq: 329.63, duration: 0.6, delay: 13.2 },
            { freq: 349.23, duration: 0.4, delay: 13.8 },
            { freq: 392.00, duration: 0.6, delay: 14.2 },
            { freq: 440.00, duration: 0.4, delay: 14.8 },
            { freq: 523.25, duration: 1.2, delay: 15.2 },
        ];

        const chords = [
            { freqs: [261.63, 329.63, 392.00], delay: 0, duration: 4.0 },
            { freqs: [220.00, 261.63, 329.63], delay: 4.0, duration: 4.0 },
            { freqs: [174.61, 261.63, 349.23], delay: 8.0, duration: 4.0 },
            { freqs: [196.00, 246.94, 293.66], delay: 12.0, duration: 4.5 },
        ];

        const totalDuration = 17;

        function playMelodyNote(noteData) {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            const filter = audioCtx.createBiquadFilter();

            osc.type = 'sine';
            osc.frequency.value = noteData.freq;

            filter.type = 'lowpass';
            filter.frequency.value = 2000;
            filter.Q.value = 1;

            const now = audioCtx.currentTime + noteData.delay;
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.08, now + noteData.duration * 0.5);
            gain.gain.exponentialRampToValueAtTime(0.001, now + noteData.duration);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start(now);
            osc.stop(now + noteData.duration + 0.1);
        }

        function playChord(chordData) {
            chordData.freqs.forEach(freq => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                const filter = audioCtx.createBiquadFilter();

                osc.type = 'triangle';
                osc.frequency.value = freq;

                filter.type = 'lowpass';
                filter.frequency.value = 1200;

                const now = audioCtx.currentTime + chordData.delay;
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(0.04, now + 0.3);
                gain.gain.setValueAtTime(0.04, now + chordData.duration * 0.7);
                gain.gain.exponentialRampToValueAtTime(0.001, now + chordData.duration);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(audioCtx.destination);

                osc.start(now);
                osc.stop(now + chordData.duration + 0.1);
            });
        }

        melody.forEach(note => playMelodyNote(note));
        chords.forEach(chord => playChord(chord));

        function loopMelody() {
            setTimeout(() => {
                melody.forEach(note => playMelodyNote(note));
                chords.forEach(chord => playChord(chord));
                loopMelody();
            }, totalDuration * 1000);
        }
        loopMelody();

    } catch (e) {
        console.log('Synth audio error:', e);
    }
}

// ===== INITIALIZE =====
init();

