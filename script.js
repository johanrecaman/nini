var countDownDate = new Date("Feb 17, 2025 22:30:00").getTime();
var x = setInterval(function(){
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var unlockedAreas = 0;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if(distance < 0){
        clearInterval(x);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }

    let toUnlock = Math.min(Math.floor((20 - days) / 2), 10);
    if(toUnlock > unlockedAreas){
        for(let i = unlockedAreas + 1; i <= toUnlock; i++){
            let button = document.getElementById(`btn-${i}`);
            if(button){
                button.classList.remove("locked");
                button.classList.add("unlocked");

                button.addEventListener("click", () => {
                    const overlay = document.getElementById('overlay')
                    const target = document.getElementById(button.getAttribute("target"));

                    target.classList.add('visible');
                    overlay.classList.add('visible')
                });
            }
        }
        unlockedAreas = toUnlock;
    }

}, 1000);

aboutBtn = document.getElementById("about");
aboutBtn.addEventListener("click", ()=>{
    const target = document.getElementById(aboutBtn.getAttribute("target"));
    const overlay = document.getElementById('overlay');
    if (target) {
        target.classList.add('visible');
        overlay.classList.add('visible');
    }
})

document.querySelectorAll(".close").forEach(close => {
    close.addEventListener('click', ()=>{
        document.querySelectorAll('div').forEach(div => div.classList.remove('visible'));
    })
})


document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (event) => {
        const btn = event.target.closest(".music-btn");
        if (!btn) return;

        const audioId = btn.getAttribute("data-music");
        const audio = document.getElementById(audioId);

        if (!audio || !audio.src) {
            console.error(`Áudio com ID "${audioId}" não encontrado ou sem src válido!`);
            return;
        }

        document.querySelectorAll("audio").forEach((a) => {
            if (a !== audio) {
                a.pause();
                const otherBtn = document.querySelector(`.music-btn[data-music="${a.id}"]`);
                if (otherBtn) {
                    otherBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
                }
            }
        });

        if (audio.paused) {
            audio.play();
            btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            audio.pause();
            btn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    });
});
