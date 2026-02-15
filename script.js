const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');

// Audio Elements
const bgMusic1 = document.getElementById('bgMusic1');
const bgMusic2 = document.getElementById('bgMusic2');
const bgMusic3 = document.getElementById('bgMusic3');
const clickSound = document.getElementById('clickSound');
const heartSound = document.getElementById('heartSound');
const wrongSound = document.getElementById('wrongSound');

let currentMusic = null;
let isMusicEnabled = true;

// Set volume levels
bgMusic1.volume = 0.3;
bgMusic2.volume = 0.3;
bgMusic3.volume = 0.3;
clickSound.volume = 0.4;
heartSound.volume = 0.5;
wrongSound.volume = 0.3;

canvas.width = 600;
canvas.height = 400;

let score = 0;
let timeLeft = 45; // EASY MODE: Waktu lebih lama
let gameInterval;
let timerInterval;
let hearts = [];

class Heart {
    constructor(isGood) {
        this.x = Math.random() * (canvas.width - 40);
        this.y = -40;
        this.size = 35 + Math.random() * 25; // EASY: Hati lebih besar
        this.speed = 1.5 + Math.random() * 1.5; // EASY: Jatuh lebih lambat
        this.isGood = isGood;
    }

    draw() {
        ctx.font = `${this.size}px Arial`;
        ctx.fillText(this.isGood ? '❤️' : '🖤', this.x, this.y);
    }

    update() {
        this.y += this.speed;
        this.draw();
    }

    isClicked(mouseX, mouseY) {
        return mouseX >= this.x && mouseX <= this.x + this.size &&
            mouseY >= this.y - this.size && mouseY <= this.y;
    }
}

// Audio Management Functions
function playMusic(musicElement) {
    if (!isMusicEnabled) return;

    // Stop current music
    if (currentMusic && currentMusic !== musicElement) {
        currentMusic.pause();
        currentMusic.currentTime = 0;
    }

    currentMusic = musicElement;

    // Play new music with error handling
    const playPromise = musicElement.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Audio play prevented:", error);
        });
    }
}

function stopAllMusic() {
    [bgMusic1, bgMusic2, bgMusic3].forEach(music => {
        music.pause();
        music.currentTime = 0;
    });
}

function playSound(soundElement) {
    if (!isMusicEnabled) return;

    soundElement.currentTime = 0;
    const playPromise = soundElement.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log("Sound play prevented:", error);
        });
    }
}

function toggleMusic() {
    isMusicEnabled = !isMusicEnabled;
    const toggleBtn = document.getElementById('musicToggle');

    if (isMusicEnabled) {
        toggleBtn.textContent = '🔊';
        toggleBtn.classList.remove('muted');
        if (currentMusic) {
            currentMusic.play();
        }
    } else {
        toggleBtn.textContent = '🔇';
        toggleBtn.classList.add('muted');
        stopAllMusic();
    }
}

function startGame() {
    playSound(clickSound);
    playMusic(bgMusic2); // Game music
    document.getElementById('intro-screen').classList.remove('active');
    document.getElementById('game-screen').classList.add('active');

    gameInterval = setInterval(() => {
        const isGood = Math.random() > 0.2; // EASY: 80% hati baik, 20% hati buruk
        hearts.push(new Heart(isGood));
    }, 1000); // EASY: Spawn lebih jarang (1 detik)

    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    gameLoop();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    hearts = hearts.filter(heart => heart.y < canvas.height + 50);
    hearts.forEach(heart => heart.update());

    if (timeLeft > 0) {
        requestAnimationFrame(gameLoop);
    }
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    hearts.forEach((heart, index) => {
        if (heart.isClicked(mouseX, mouseY)) {
            if (heart.isGood) {
                score++;
                scoreEl.textContent = score;
                playSound(heartSound); // Sound for good heart
            } else {
                score = Math.max(0, score - 2);
                scoreEl.textContent = score;
                playSound(wrongSound); // Sound for bad heart
            }
            hearts.splice(index, 1);
        }
    });
});

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);

    setTimeout(() => {
        playMusic(bgMusic3); // Romantic music for apology message
        document.getElementById('game-screen').classList.remove('active');
        document.getElementById('message-screen').classList.add('active');
    }, 500);
}

function showValentine() {
    playSound(clickSound);
    playMusic(bgMusic1); // Sweet music for Valentine message
    document.getElementById('message-screen').classList.remove('active');
    document.getElementById('valentine-screen').classList.add('active');
}

function showFinal() {
    playSound(clickSound);
    // Keep the same romantic music for final screen
    document.getElementById('valentine-screen').classList.remove('active');
    document.getElementById('final-screen').classList.add('active');
}

// Auto-play intro music on page load (with user interaction)
window.addEventListener('load', () => {
    document.getElementById('intro-screen').addEventListener('click', () => {
        playMusic(bgMusic1);
    }, { once: true });
});

// Forgiveness Interactive System
function handleForgiveness(isForgiven) {
    const questionSection = document.getElementById('forgiveness-question');
    const notYetSection = document.getElementById('not-yet-response');
    const forgivenSection = document.getElementById('forgiven-response');

    // Hide question
    questionSection.style.display = 'none';

    if (isForgiven) {
        // Show forgiven response
        forgivenSection.style.display = 'block';
        playSound(heartSound);

        // Launch confetti!
        launchConfetti();

        // Send WhatsApp notification - DIMAAFKAN! 🎉
        sendWhatsAppNotification(true);
    } else {
        // Show not yet response
        notYetSection.style.display = 'block';
        playSound(wrongSound);

        // Send WhatsApp notification - Belum dimaafkan 😢
        sendWhatsAppNotification(false);

        // Start AI Persuasion System 🤖
        startAIPersuasion();
    }
}

// AI Persuasion System - Bujuk pacar supaya memaafkan
function startAIPersuasion() {
    const messages = [
        'ai-message-1',
        'ai-message-2',
        'ai-message-3',
        'ai-message-4',
        'ai-message-5',
        'ai-message-final'
    ];

    // Tampilkan pesan AI satu per satu dengan delay
    messages.forEach((messageId, index) => {
        setTimeout(() => {
            const messageEl = document.getElementById(messageId);
            if (messageEl) {
                messageEl.style.display = 'block';

                // Play subtle sound untuk setiap pesan
                if (index < messages.length - 1) {
                    playSound(clickSound);
                } else {
                    // Pesan terakhir dengan sound special
                    playSound(heartSound);
                }

                // Scroll ke pesan baru
                setTimeout(() => {
                    messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }, index * 3000); // Delay 3 detik per pesan
    });
}

// WhatsApp Notification System
function sendWhatsAppNotification(isForgiven) {
    const phoneNumber = '6285156553226'; // Nomor WhatsApp Anda

    let message;

    if (isForgiven) {
        // Pesan jika DIMAAFKAN ✅
        message = `🎉 KABAR BAIK! 🎉

Pacar kamu sudah MAAFIN kamu! ❤️

Dia klik tombol "Ya, Aku Maafin ❤️" di game yang kamu buat!

Sekarang waktunya:
✅ Ucapkan terima kasih langsung
✅ Kasih pelukan hangat
✅ Jangan lupa kasih kadonya! 🎁
✅ Dan yang paling penting: JANGAN ULANGI KESALAHANNYA LAGI!

Selamat ya! Pacar kamu baik banget! 💕

- Notifikasi Otomatis dari Game Minta Maaf`;
    } else {
        // Pesan jika BELUM DIMAAFKAN ❌
        message = `😢 Hmm... Belum Dimaafkan

Pacar kamu klik "Belum..." di game yang kamu buat.

Tapi jangan sedih! Ini artinya:
💝 Dia masih sayang, tapi butuh waktu
💝 Dia mau lihat perubahan nyata dari kamu
💝 Kesempatan masih ada!

Yang harus kamu lakukan:
1. Bujuk dia dengan lembut
2. Tunjukkan penyesalan yang tulus
3. Buktikan dengan TINDAKAN, bukan cuma kata-kata
4. Kasih waktu untuk dia menenangkan diri
5. Jangan lupa kasih kadonya tetap! 🎁

Semangat! Kamu pasti bisa! 💪

Tips: Coba hubungi dia, tanya apa yang bisa kamu lakukan untuk memperbaiki situasi.

- Notifikasi Otomatis dari Game Minta Maaf`;
    }

    // Encode message untuk URL
    const encodedMessage = encodeURIComponent(message);

    // Buat WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Buka WhatsApp di tab baru setelah delay 2 detik
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 2000);
}


// Confetti Animation System
const confettiCanvas = document.getElementById('confettiCanvas');
const confettiCtx = confettiCanvas.getContext('2d');

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

class Confetti {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = this.randomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }

    randomColor() {
        const colors = [
            '#ff1744', '#ff4081', '#f50057', '#ffd700',
            '#ff6b9d', '#c51162', '#ffeb3b', '#ff9800'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > confettiCanvas.height) {
            return false;
        }
        return true;
    }

    draw() {
        confettiCtx.save();
        confettiCtx.translate(this.x, this.y);
        confettiCtx.rotate(this.rotation * Math.PI / 180);
        confettiCtx.fillStyle = this.color;
        confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        confettiCtx.restore();
    }
}

let confettiParticles = [];
let confettiAnimationId;

function launchConfetti() {
    // Create initial burst
    for (let i = 0; i < 150; i++) {
        confettiParticles.push(new Confetti());
    }

    // Continue adding confetti for 3 seconds
    const confettiInterval = setInterval(() => {
        for (let i = 0; i < 10; i++) {
            confettiParticles.push(new Confetti());
        }
    }, 100);

    setTimeout(() => {
        clearInterval(confettiInterval);
    }, 3000);

    animateConfetti();
}

function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiParticles = confettiParticles.filter(confetti => {
        const isAlive = confetti.update();
        if (isAlive) {
            confetti.draw();
        }
        return isAlive;
    });

    if (confettiParticles.length > 0) {
        confettiAnimationId = requestAnimationFrame(animateConfetti);
    } else {
        cancelAnimationFrame(confettiAnimationId);
    }
}


// Love Counter Configuration - Tanggal Jadian: 17 Juni 2025
const relationshipStartDate = new Date('2025-06-17T00:00:00'); // 17 Juni 2025

let counterInterval;

function showLoveCounter() {
    playSound(clickSound);
    document.getElementById('valentine-screen').classList.remove('active');
    document.getElementById('love-counter-screen').classList.add('active');

    // Update counter setiap detik
    updateCounter();
    counterInterval = setInterval(updateCounter, 1000);
}

function updateCounter() {
    const now = new Date();
    const diff = now - relationshipStartDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

function showPromises() {
    playSound(clickSound);
    clearInterval(counterInterval);
    document.getElementById('love-counter-screen').classList.remove('active');
    document.getElementById('promise-screen').classList.add('active');
}

function showGallery() {
    playSound(clickSound);
    document.getElementById('promise-screen').classList.remove('active');
    document.getElementById('gallery-screen').classList.add('active');

    // Initialize D3 Photo Gallery
    initPhotoGallery();
}

function initPhotoGallery() {
    const svg = d3.select('#photoGallery');
    const width = 800;
    const height = 500;

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    // Data foto kenangan (emoji sebagai placeholder)
    const photos = [
        { emoji: '💑', label: 'Kencan Pertama', x: 150, y: 150, color: '#ff1744' },
        { emoji: '🌹', label: 'Bunga Untukmu', x: 400, y: 100, color: '#ff4081' },
        { emoji: '🎂', label: 'Ulang Tahun', x: 650, y: 150, color: '#f50057' },
        { emoji: '🌟', label: 'Momen Spesial', x: 250, y: 350, color: '#ffd700' },
        { emoji: '💝', label: 'Hadiah Cinta', x: 550, y: 350, color: '#ff1744' }
    ];

    // Create groups for each photo
    const photoGroups = svg.selectAll('.photo-group')
        .data(photos)
        .enter()
        .append('g')
        .attr('class', 'photo-group')
        .attr('transform', d => `translate(${d.x}, ${d.y})`)
        .style('cursor', 'pointer');

    // Add circles as photo frames
    photoGroups.append('circle')
        .attr('r', 0)
        .attr('fill', d => d.color)
        .attr('opacity', 0.3)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 200)
        .attr('r', 60);

    // Add emoji as photo content
    photoGroups.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.3em')
        .attr('font-size', '0px')
        .text(d => d.emoji)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 200)
        .attr('font-size', '50px');

    // Add labels
    photoGroups.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', 85)
        .attr('fill', '#fff0f5')
        .attr('font-size', '14px')
        .attr('opacity', 0)
        .text(d => d.label)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 200)
        .attr('opacity', 0.8);

    // Add hover effects
    photoGroups.on('mouseover', function () {
        d3.select(this).select('circle')
            .transition()
            .duration(300)
            .attr('r', 70)
            .attr('opacity', 0.6);

        d3.select(this).select('text')
            .transition()
            .duration(300)
            .attr('font-size', '60px');
    })
        .on('mouseout', function () {
            d3.select(this).select('circle')
                .transition()
                .duration(300)
                .attr('r', 60)
                .attr('opacity', 0.3);

            d3.select(this).select('text')
                .transition()
                .duration(300)
                .attr('font-size', '50px');
        })
        .on('click', function (event, d) {
            playSound(heartSound);
            // Pulse animation on click
            d3.select(this).select('circle')
                .transition()
                .duration(200)
                .attr('r', 80)
                .transition()
                .duration(200)
                .attr('r', 60);
        });

    // Add connecting lines with animation
    const connections = [
        [0, 1], [1, 2], [0, 3], [2, 4], [3, 4]
    ];

    connections.forEach((conn, i) => {
        svg.append('line')
            .attr('x1', photos[conn[0]].x)
            .attr('y1', photos[conn[0]].y)
            .attr('x2', photos[conn[0]].x)
            .attr('y2', photos[conn[0]].y)
            .attr('stroke', '#ff4081')
            .attr('stroke-width', 2)
            .attr('opacity', 0.2)
            .lower()
            .transition()
            .duration(1000)
            .delay(i * 300)
            .attr('x2', photos[conn[1]].x)
            .attr('y2', photos[conn[1]].y);
    });
}

function showMemoryGame() {
    playSound(clickSound);
    document.getElementById('gallery-screen').classList.remove('active');
    document.getElementById('memory-game-screen').classList.add('active');

    // Initialize Memory Game
    initMemoryGame();
}

// Memory Game Variables
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

function initMemoryGame() {
    const board = document.getElementById('memoryBoard');
    board.innerHTML = '';

    // Emoji pairs untuk memory game (momen spesial)
    const cardEmojis = ['💑', '💝', '🌹', '💖', '🎁', '⭐'];
    const cardPairs = [...cardEmojis, ...cardEmojis];

    // Shuffle cards
    cardPairs.sort(() => Math.random() - 0.5);

    memoryCards = [];
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;

    document.getElementById('moves').textContent = '0';
    document.getElementById('matches').textContent = '0';
    document.getElementById('finalBtn').style.display = 'none';

    // Create cards
    cardPairs.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.emoji = emoji;
        card.dataset.index = index;

        card.innerHTML = `
            <div class="memory-card-inner">
                <div class="memory-card-back">❓</div>
            </div>
        `;

        card.addEventListener('click', () => flipCard(card));
        board.appendChild(card);
        memoryCards.push(card);
    });
}

function flipCard(card) {
    if (flippedCards.length >= 2 || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }

    playSound(clickSound);
    card.classList.add('flipped');
    card.querySelector('.memory-card-back').textContent = card.dataset.emoji;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;

        setTimeout(checkMatch, 600);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.emoji === card2.dataset.emoji) {
        // Match!
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        document.getElementById('matches').textContent = matchedPairs;
        playSound(heartSound);

        if (matchedPairs === 6) {
            setTimeout(() => {
                document.getElementById('finalBtn').style.display = 'inline-block';
            }, 500);
        }
    } else {
        // No match
        playSound(wrongSound);
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.querySelector('.memory-card-back').textContent = '❓';
        card2.querySelector('.memory-card-back').textContent = '❓';
    }

    flippedCards = [];
}

// ========================================
// NEW PREMIUM FEATURES FUNCTIONS
// ========================================

// Love Letter Functions
function openLetter() {
    const envelope = document.getElementById('envelope');
    const letterContent = document.getElementById('letter-content');
    const nextButton = document.getElementById('next-after-letter');

    envelope.classList.add('opening');
    playSound(heartSound);

    setTimeout(() => {
        envelope.style.display = 'none';
        letterContent.style.display = 'block';
        nextButton.style.display = 'inline-block';
    }, 800);
}

function showLetter() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('letter-screen').classList.add('active');
    playMusic(bgMusic1);
}

// Virtual Gift Box Functions
function openGiftBox() {
    const giftBox = document.getElementById('gift-box');
    const giftReveal = document.getElementById('gift-reveal');
    const nextButton = document.getElementById('next-after-gift');

    giftBox.classList.add('opening');
    playSound(heartSound);

    setTimeout(() => {
        giftBox.style.display = 'none';
        giftReveal.style.display = 'block';
        nextButton.style.display = 'inline-block';
        launchConfetti(); // Bonus confetti!
    }, 800);
}

function showGiftBox() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('giftbox-screen').classList.add('active');
    playSound(clickSound);
}

// Guest Book Functions with LocalStorage
function saveGuestBook() {
    const messageInput = document.getElementById('guestbook-message');
    const message = messageInput.value.trim();

    if (!message) {
        alert('Tulis pesan dulu ya sayang! 💕');
        return;
    }

    // Get existing messages from localStorage
    let messages = JSON.parse(localStorage.getItem('guestBookMessages') || '[]');

    // Add new message
    const newMessage = {
        text: message,
        date: new Date().toLocaleString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    };

    messages.push(newMessage);
    localStorage.setItem('guestBookMessages', JSON.stringify(messages));

    // Clear input
    messageInput.value = '';

    // Reload messages
    loadGuestBookMessages();

    // Play sound
    playSound(heartSound);

    // Show success message
    alert('Pesan berhasil disimpan! 💌');
}

function loadGuestBookMessages() {
    const messagesList = document.getElementById('messages-list');
    const messages = JSON.parse(localStorage.getItem('guestBookMessages') || '[]');

    if (messages.length === 0) {
        messagesList.innerHTML = '<p style="opacity: 0.7; text-align: center;">Belum ada pesan tersimpan</p>';
        return;
    }

    messagesList.innerHTML = messages.map(msg => `
        <div class="message-item">
            <div class="message-date">📅 ${msg.date}</div>
            <div class="message-text">${msg.text}</div>
        </div>
    `).reverse().join(''); // Reverse to show newest first
}

function showGuestBook() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('guestbook-screen').classList.add('active');
    loadGuestBookMessages();
    playSound(clickSound);
}

// Achievement Functions
function showAchievements() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('achievement-screen').classList.add('active');
    playSound(heartSound);

    // Animate badges one by one
    const badges = document.querySelectorAll('.badge-item');
    badges.forEach((badge, index) => {
        setTimeout(() => {
            badge.style.animation = 'fadeInUp 0.6s ease-out, bounce 2s ease-in-out infinite';
            playSound(clickSound);
        }, index * 200);
    });

    // Launch confetti for achievement!
    setTimeout(() => {
        launchConfetti();
    }, badges.length * 200);
}

function showFinal() {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('final-screen').classList.add('active');
    playMusic(bgMusic1);
    playSound(heartSound);
}

// Update the "Show Final Message" button in memory game
function showFinalFromMemory() {
    showLetter(); // Go to Love Letter instead of Final
}
