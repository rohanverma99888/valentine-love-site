/* =========================
   FIXED DAILY UNLOCK SYSTEM
========================= */

const sections = document.querySelectorAll(".chapter");

// get today's date ONLY (ignore time completely)
const today = new Date();
today.setHours(0,0,0,0);

sections.forEach(section => {

    const unlockDate = new Date(section.dataset.date);
    unlockDate.setHours(0,0,0,0);

    if (today.getTime() >= unlockDate.getTime()) {
        section.classList.remove("locked");
        section.style.display = "flex";
    } else {
        section.style.display = "none";
    }
});




/* =========================
   FADE IN ON SCROLL
========================= */

window.addEventListener("scroll", () => {
    document.querySelectorAll(".chapter").forEach(sec => {
        const top = sec.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
            sec.classList.add("show");
        }
    });
});


/* =========================
   MUSIC BUTTON
========================= */

const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");

if (btn && music) {
    btn.onclick = () => {
        if (music.paused) {
            music.play();
            btn.textContent = "⏸ Pause";
        } else {
            music.pause();
            btn.textContent = "🎵 Play Music";
        }
    };
}


/* =========================
   COUNTDOWN
========================= */

const countDiv = document.getElementById("countdown");

function updateCountdown() {
    const target = new Date("2026-02-14T00:00:00");
    const diff = target - new Date();

    if (diff <= 0) {
        countDiv.textContent = "Happy Valentine’s Day ❤️";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    countDiv.textContent = days + " days to Valentine’s Day";
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* =========================
   PARTICLE ANIMATIONS
========================= */

function createParticles(sectionClass, emoji, count = 15) {
    const section = document.querySelector("." + sectionClass);
    if (!section) return;

    const container = section.querySelector(".bg-animation");

    for (let i = 0; i < count; i++) {
        const span = document.createElement("span");
        span.className = "particle";
        span.innerText = emoji;

        span.style.left = Math.random() * 100 + "%";
        span.style.animationDuration = (6 + Math.random() * 6) + "s";
        span.style.fontSize = (18 + Math.random() * 10) + "px";

        container.appendChild(span);
    }
}

/* add particles per day */
createParticles("rose", "🌹");
createParticles("propose", "💍");
createParticles("chocolate", "🍫");
createParticles("teddy", "🧸");
createParticles("promise", "✨");
createParticles("hug", "🤍");
createParticles("kiss", "💋");
createParticles("finale", "❤️", 25);

// /* =========================
//    AUTO SCROLL TO FIRST UNLOCKED
// ========================= */

// const firstOpen = document.querySelector(".chapter:not(.locked)");
// if (firstOpen) {
//     setTimeout(()=>{
//         firstOpen.scrollIntoView({behavior:"smooth"});
//     },800);
// }


/* =========================
   PROGRESS BAR
========================= */

const progress = document.getElementById("progressBar");

window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;
    progress.style.width = (scrolled / height) * 100 + "%";
});


/* =========================
   HEART CURSOR TRAIL
========================= */

document.addEventListener("mousemove", (e) => {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = "❤️";
    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";

    document.body.appendChild(heart);

    setTimeout(()=>heart.remove(),1000);
});

/* =========================
   ROSE DAY GAME LOGIC
========================= */

const yesBtn = document.querySelector(".yesBtn");
const noBtn = document.querySelector(".noBtn");
const msg = document.querySelector(".responseMsg");

/* YES CLICK */
if (yesBtn) {
    yesBtn.addEventListener("click", () => {

        msg.textContent = "She said YES! 🌹❤️";

        yesBtn.classList.add("success");

        /* disable both buttons */
        yesBtn.disabled = true;
        noBtn.disabled = true;

        createHeartsBurst();

        setTimeout(() => {
            msg.textContent += "  Chapter Complete ✨";
        }, 1200);
    });
}


/* NO BUTTON RUN AWAY */
if (noBtn) {

    function moveBtn() {
        const x = Math.random() * 250 - 125;
        const y = Math.random() * 150 - 75;
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    }

    noBtn.addEventListener("mouseenter", moveBtn);

    /* mobile support */
    noBtn.addEventListener("touchstart", moveBtn);
}


/* =========================
   HEART BURST ANIMATION
========================= */

function createHeartsBurst() {
    for (let i = 0; i < 30; i++) {

        const heart = document.createElement("span");
        heart.textContent = "❤️";

        heart.style.position = "fixed";
        heart.style.left = "50%";
        heart.style.top = "50%";
        heart.style.fontSize = "18px";
        heart.style.pointerEvents = "none";

        document.body.appendChild(heart);

        const x = (Math.random() - 0.5) * 700;
        const y = (Math.random() - 0.5) * 500;

        heart.animate([
            { transform: "translate(0,0)", opacity: 1 },
            { transform: `translate(${x}px, ${y}px)`, opacity: 0 }
        ], {
            duration: 1200,
            easing: "ease-out"
        });

        setTimeout(() => heart.remove(), 1200);
    }
}
/* =========================
   PROPOSE DAY LOGIC
========================= */

const pYes = document.querySelector(".proposeYes");
const pNo = document.querySelector(".proposeNo");
const pMsg = document.querySelector(".proposalMsg");

/* YES */
if (pYes) {
    pYes.addEventListener("click", () => {

        pMsg.textContent = "She said YES to forever 💍❤️";

        pYes.disabled = true;
        pNo.disabled = true;

        showRing();
        confettiHearts();
    });
}

/* NO → shake */
if (pNo) {
    pNo.addEventListener("click", () => {
        pNo.classList.add("shake");

        setTimeout(() => {
            pNo.classList.remove("shake");
        }, 350);
    });
}


/* =========================
   RING POPUP
========================= */

function showRing() {
    const ring = document.createElement("div");
    ring.className = "ring";
    ring.textContent = "💍";

    document.body.appendChild(ring);

    setTimeout(() => ring.remove(), 1200);
}


/* =========================
   CONFETTI HEARTS
========================= */

function confettiHearts() {
    for (let i = 0; i < 35; i++) {

        const heart = document.createElement("span");
        heart.textContent = "💖";

        heart.style.position = "fixed";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "-10px";
        heart.style.fontSize = "18px";
        heart.style.pointerEvents = "none";

        document.body.appendChild(heart);

        heart.animate([
            { transform: "translateY(0)", opacity: 1 },
            { transform: "translateY(100vh)", opacity: 0 }
        ], {
            duration: 1800 + Math.random() * 800
        });

        setTimeout(() => heart.remove(), 2500);
    }
}

/* =========================
   CHOCOLATE DAY LOGIC
========================= */

const chocoBtn = document.querySelector(".chocoBtn");
const chocoMsg = document.querySelector(".chocoMsg");

if (chocoBtn) {

    let given = false;

    chocoBtn.addEventListener("click", () => {

        chocolateRain();

        if (!given) {
            chocoMsg.textContent = "Life is sweeter with you 🍫❤️";
            chocoBtn.textContent = "More Chocolate 😋";
            given = true;
        } else {
            chocoMsg.textContent = "Too much sweetness today 😄💕";
        }
    });
}


/* =========================
   CHOCOLATE RAIN
========================= */

function chocolateRain() {

    const emojis = ["🍫","🍬","🍩","🍪","💝"];

    for (let i = 0; i < 35; i++) {

        const piece = document.createElement("span");

        piece.className = "chocoPiece";
        piece.textContent = emojis[Math.floor(Math.random()*emojis.length)];

        piece.style.left = Math.random() * 100 + "vw";

        document.body.appendChild(piece);

        piece.animate([
            { transform: "translateY(0)", opacity: 1 },
            { transform: "translateY(100vh)", opacity: 0 }
        ], {
            duration: 1800 + Math.random() * 1000
        });

        setTimeout(() => piece.remove(), 3000);
    }
}
/* =========================
   TEDDY DAY LOGIC
========================= */

const teddyBtn = document.querySelector(".teddyBtn");
const teddyMsg = document.querySelector(".teddyMsg");

if (teddyBtn) {

    teddyBtn.addEventListener("click", () => {

        teddyMsg.textContent = "You’re my comfort place 🧸❤️";

        showBigTeddy();
        floatPlushies();

        document.body.classList.add("teddyGlow");

        setTimeout(()=>{
            document.body.classList.remove("teddyGlow");
        }, 2000);
    });
}


/* =========================
   BIG TEDDY POP
========================= */

function showBigTeddy() {

    const teddy = document.createElement("div");
    teddy.className = "bigTeddy";
    teddy.textContent = "🧸";

    document.body.appendChild(teddy);

    setTimeout(() => teddy.remove(), 1200);
}


/* =========================
   FLOATING PLUSH TOYS
========================= */

function floatPlushies() {

    const toys = ["🧸","🤍","✨"];

    for (let i = 0; i < 25; i++) {

        const toy = document.createElement("span");
        toy.className = "plush";
        toy.textContent = toys[Math.floor(Math.random()*toys.length)];

        toy.style.left = Math.random() * 100 + "vw";
        toy.style.top = Math.random() * 100 + "vh";

        document.body.appendChild(toy);

        toy.animate([
            { transform: "translateY(0)", opacity: 1 },
            { transform: "translateY(-120px)", opacity: 0 }
        ], {
            duration: 2000 + Math.random()*1000
        });

        setTimeout(() => toy.remove(), 3000);
    }
}
/* =========================
   PROMISE DAY LOGIC
========================= */

const promiseBtn = document.querySelector(".promiseBtn");
const promiseMsg = document.querySelector(".promiseMsg");

if (promiseBtn) {

    promiseBtn.addEventListener("click", () => {

        promiseMsg.textContent = "No matter what, we walk together 🤝❤️";

        promiseBtn.disabled = true;
        promiseBtn.classList.add("lockedForever");

        showHandshake();
        sparkleEffect();

        document.body.classList.add("promiseGlow");

        setTimeout(()=>{
            document.body.classList.remove("promiseGlow");
        }, 1500);
    });
}


/* =========================
   HANDSHAKE POP
========================= */

function showHandshake() {

    const hand = document.createElement("div");
    hand.className = "handshake";
    hand.textContent = "🤝";

    document.body.appendChild(hand);

    setTimeout(() => hand.remove(), 1200);
}


/* =========================
   SPARKLES
========================= */

function sparkleEffect() {

    for (let i = 0; i < 30; i++) {

        const star = document.createElement("span");
        star.className = "sparkle";
        star.textContent = "✨";

        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";

        document.body.appendChild(star);

        star.animate([
            { transform: "scale(1)", opacity: 1 },
            { transform: "scale(0)", opacity: 0 }
        ], {
            duration: 1200 + Math.random()*800
        });

        setTimeout(() => star.remove(), 2000);
    }
}
/* =========================
   HUG DAY LOGIC
========================= */

const hugBtn = document.querySelector(".hugBtn");
const hugMsg = document.querySelector(".hugMsg");

if (hugBtn) {

    hugBtn.addEventListener("click", () => {

        hugMsg.textContent = "In your arms, I feel home 🤗❤️";

        hugBtn.disabled = true;

        mergeHearts();
        floatMiniHearts();

        document.body.classList.add("hugGlow");

        setTimeout(()=>{
            document.body.classList.remove("hugGlow");
        }, 1500);
    });
}


/* =========================
   MERGING HEARTS ANIMATION
========================= */

function mergeHearts() {

    const left = document.createElement("div");
    const right = document.createElement("div");

    left.className = "hugHeart";
    right.className = "hugHeart";

    left.textContent = "❤️";
    right.textContent = "❤️";

    left.style.left = "20%";
    right.style.right = "20%";

    left.style.top = right.style.top = "50%";

    document.body.append(left, right);

    left.animate([
        { transform: "translateX(0)" },
        { transform: "translateX(40vw)" }
    ], { duration: 800, fill: "forwards" });

    right.animate([
        { transform: "translateX(0)" },
        { transform: "translateX(-40vw)" }
    ], { duration: 800, fill: "forwards" });

    setTimeout(() => {
        left.remove();
        right.remove();

        const big = document.createElement("div");
        big.className = "hugHeart";
        big.textContent = "💞";
        big.style.left = "50%";
        big.style.top = "50%";
        big.style.transform = "translate(-50%,-50%) scale(1.6)";
        document.body.appendChild(big);

        setTimeout(()=>big.remove(),1000);

    }, 800);
}


/* =========================
   FLOATING MINI HEARTS
========================= */

function floatMiniHearts() {

    for (let i = 0; i < 25; i++) {

        const heart = document.createElement("span");
        heart.className = "miniHeart";
        heart.textContent = "🤍";

        heart.style.left = Math.random()*100 + "vw";
        heart.style.top = Math.random()*100 + "vh";

        document.body.appendChild(heart);

        heart.animate([
            { transform: "translateY(0)", opacity: 1 },
            { transform: "translateY(-100px)", opacity: 0 }
        ], {
            duration: 1500 + Math.random()*800
        });

        setTimeout(()=>heart.remove(), 2200);
    }
}
/* =========================
   KISS DAY LOGIC
========================= */

const kissBtn = document.querySelector(".kissBtn");
const kissMsg = document.querySelector(".kissMsg");

if (kissBtn) {

    kissBtn.addEventListener("click", () => {

        kissBtn.disabled = true;

        cinematicOverlay();
        kissPop();
        sparkleTrail();

        setTimeout(() => {
            kissMsg.textContent = "I love you ❤️";
            kissMsg.style.opacity = 1;
        }, 1200);
    });
}


/* =========================
   DARK OVERLAY
========================= */

function cinematicOverlay() {

    const overlay = document.createElement("div");
    overlay.className = "kissOverlay";

    document.body.appendChild(overlay);

    setTimeout(() => overlay.remove(), 2000);
}


/* =========================
   KISS MARK POP
========================= */

function kissPop() {

    const kiss = document.createElement("div");
    kiss.className = "kissMark";
    kiss.textContent = "💋";

    document.body.appendChild(kiss);

    setTimeout(() => kiss.remove(), 1500);
}


/* =========================
   SPARKLE TRAIL
========================= */

function sparkleTrail() {

    for (let i = 0; i < 30; i++) {

        const star = document.createElement("span");
        star.className = "kissSparkle";
        star.textContent = "✨";

        star.style.left = Math.random()*100 + "vw";
        star.style.top = Math.random()*100 + "vh";

        document.body.appendChild(star);

        star.animate([
            { transform: "scale(1)", opacity: 1 },
            { transform: "scale(0)", opacity: 0 }
        ], {
            duration: 1400 + Math.random()*800
        });

        setTimeout(()=>star.remove(), 2200);
    }
}
/* =========================
   FINALE DAY LOGIC
========================= */

const finalBtn = document.querySelector(".finalBtn");

if (finalBtn) {

    finalBtn.addEventListener("click", () => {
        openLetter();
    });
}


/* =========================
   OPEN LOVE LETTER
========================= */

function openLetter() {

    const letter = document.createElement("div");
    letter.className = "loveLetter";

    letter.innerHTML = `
        <h2>💌 My Love</h2>
        <p>
        From one simple good morning…  
        to forever together.  
        Every day with you feels special.
        </p>

        <h3>Will you stay with me forever?</h3>

        <div class="letterBtns">
            <button class="foreverYes">Yes ❤️</button>
            <button class="foreverNo">No 🙈</button>
        </div>
    `;

    document.body.appendChild(letter);

    const yes = letter.querySelector(".foreverYes");
    const no = letter.querySelector(".foreverNo");

    /* YES */
    yes.onclick = () => {
        letter.innerHTML = "<h2>Forever begins… ❤️✨ New Chapter Loading</h2>";
        document.body.classList.add("finalGlow");
        fireHearts();
    };

    /* NO runs away */
    no.onmouseenter = () => {
        no.style.transform =
            `translate(${Math.random()*120-60}px, ${Math.random()*80-40}px)`;
    };
}


/* =========================
   FIREWORK HEARTS
========================= */

function fireHearts() {

    setInterval(() => {

        for (let i = 0; i < 8; i++) {

            const heart = document.createElement("span");
            heart.className = "fireHeart";
            heart.textContent = "❤️";

            heart.style.left = Math.random()*100 + "vw";
            heart.style.top = Math.random()*100 + "vh";

            document.body.appendChild(heart);

            heart.animate([
                { transform: "scale(1)", opacity: 1 },
                { transform: "scale(2.5)", opacity: 0 }
            ], {
                duration: 1200
            });

            setTimeout(()=>heart.remove(),1200);
        }

    }, 600);
}
window.addEventListener("load", ()=>{
    document.body.style.opacity = 0;
    setTimeout(()=> document.body.style.opacity = 1, 200);
});
setInterval(()=>{
    const h = document.createElement("span");
    h.innerText = "🤍";
    h.className = "bgHeart";
    h.style.left = Math.random()*100+"vw";
    document.body.appendChild(h);

    setTimeout(()=>h.remove(),6000);
}, 600);
toggle.onclick = ()=> document.body.classList.toggle("dark");



