if (!localStorage.getItem('nightImage')) {
    const img = new Image();
    img.src = 'night-2.jpg'; // Ganti dengan URL gambar Anda
    img.onload = () => {
        localStorage.setItem('nightImage', img.src); // Simpan gambar di localStorage
        document.body.style.backgroundImage = `url(${img.src})`; // Gunakan gambar dari URL
    };
} else {
    // Jika gambar sudah ada di localStorage, gunakan gambar tersebut
    document.body.style.backgroundImage = `url(${localStorage.getItem('nightImage')})`;
}
// Script.js
const container = document.getElementById("container");

// Daftar URL gambar
const images = [];


for (i = 1; i <= 18; i++){
    images.push(i + '.jpg');
}

// Fungsi untuk membuat bubble
function createBubble(imageUrl) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    // Tentukan ukuran bubble secara acak
    const size = Math.random() * 150 + 75; // Ukuran antara 50px dan 150px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Tentukan posisi awal dan akhir secara acak di luar layar
    const { startX, startY, endX, endY } = getRandomStartEnd(size);
    bubble.style.setProperty("--start-x", `${startX}px`);
    bubble.style.setProperty("--start-y", `${startY}px`);
    bubble.style.setProperty("--end-x", `${endX}px`);
    bubble.style.setProperty("--end-y", `${endY}px`);

    // Tambahkan animasi
    const duration = Math.random() * 10 + 10; // Durasi animasi antara 5-10 detik
    bubble.style.animation = `move ${duration}s linear`;

    // Tambahkan gambar ke dalam bubble
    const img = document.createElement("img");
    img.src = imageUrl;
    bubble.appendChild(img);

    // Hapus bubble setelah animasi selesai
    bubble.addEventListener("animationend", () => {
        bubble.remove();
    });

    return bubble;
}

// Fungsi untuk mendapatkan posisi awal dan akhir secara acak di luar layar
function getRandomStartEnd(size) {
    const sides = ["top", "right", "bottom", "left"];
    const startSide = sides[Math.floor(Math.random() * sides.length)];
    const endSide = sides[Math.floor(Math.random() * sides.length)];

    const startX = startSide === "left" ? -size : startSide === "right" ? window.innerWidth + size : Math.random() * window.innerWidth;
    const startY = startSide === "top" ? -size : startSide === "bottom" ? window.innerHeight + size : Math.random() * window.innerHeight;

    const endX = endSide === "left" ? -size : endSide === "right" ? window.innerWidth + size : Math.random() * window.innerWidth;
    const endY = endSide === "top" ? -size : endSide === "bottom" ? window.innerHeight + size : Math.random() * window.innerHeight;

    return { startX, startY, endX, endY };
}

// Fungsi untuk menghasilkan bubble secara berkala
function generateBubbles() {
    const imageUrl = images[Math.floor(Math.random() * images.length)];
    const bubble = createBubble(imageUrl);
    container.appendChild(bubble);
}

function runTheWebsite() {
    document.querySelector('.content').style.display = 'flex';
    setInterval(generateBubbles, 800);

    var i = 0;
    var txt_1 = 'Hi Sayang, kamu sedang lelah ya?';
    var txt_2 = 'Aku tahu kamu sedang berjuang disana, dan aku ingin kamu tahu bahwa aku selalu ada disini untuk mendukung kamu. Maaf disaat kamu sedang berjuang, aku malah membuatmu merasa tidak nyaman. Tapi percayalah, cinta dan sayangku untuk kamu tidak pernah hilang. Aku akan selalu ada untuk kamu, apapun yang terjadi.'
    var speed = 100;

    // Fungsi typeWriter dengan callback untuk melanjutkan ke txt_2
    function typeWriter(txt, elementId, callback) {
        if (i < txt.length) {
            document.getElementById(elementId).innerHTML += txt.charAt(i);
            i++;
            setTimeout(function () {
                typeWriter(txt, elementId, callback);
            }, speed);

            if (elementId == 'typing2' && i >= txt.length) {
                document.querySelector('.gif-container').style.bottom = '15%';
            }
        } else if (callback) {
            callback();
        }
    }

    // Mulai mengetik txt_1
    typeWriter(txt_1, "typing1", function () {
        // Setelah txt_1 selesai, reset index i dan mulai mengetik txt_2
        i = 0; // Reset indeks untuk txt_2
        typeWriter(txt_2, "typing2", null);
    });
}

document.querySelector('.click-me').addEventListener('click', function(){
    // Jalankan fungsi generateBubbles setiap 1 detik

    this.style.display = 'none';

    async function playAudio(){
        var audio = new Audio('tulus-jatuh_suka.mp3');
        audio.loop = true;
        audio.play();
        setTimeout(runTheWebsite, 300);
    };

    playAudio();

});

