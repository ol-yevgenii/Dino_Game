window.addEventListener('DOMContentLoaded', () => {

    const dino = document.getElementById('dino');
    const cactus = document.getElementById('cactus');
    const info = document.getElementById('info');

    //Info

    window.addEventListener('keydown', function (e) {
        if (e.which === 32) {
          e.preventDefault();
          infoHide();
        }
    });

    function infoHide() {
        if (info.classList == 'active') {
            info.classList.add('hide');
        }
    }

    // Timer-score

    class Timer {
        constructor(node) {
            this.node = node;
        }

        stopped = false;
        lastTime = 0;
        allTime = 0;

        start() {
            this.lastTime = Date.now();
            this.timerFunc();
        }

        timerFunc = () => {
            if (this.stopped) return;
            const now = Date.now();
            const passed = now - this.lastTime;
            this.lastTime = now;
            this.allTime++;

            const format = (n) => {
                if ((n + '').length == 1) {
                    return '0000' + n;
                }
                if ((n + '').length == 2) {
                    return '000' + n;
                }
                if ((n + '').length == 3) {
                    return '00' + n;
                }
                if ((n + '').length == 4) {
                    return '0' + n;
                }
            };

            const secs = Math.floor(this.allTime);
            this.node.innerText = [secs].map(format).join('');
            setTimeout(this.timerFunc, 100);
        }

        pause = () => {
            this.stopped = true;
        }

        resume = () => {
            this.stopped = false;
            this.lastTime = Date.now();
            this.timerFunc();
        }
    }

    const timer = new Timer(document.getElementById('timer'));
    timer.start();
    window.onblur = timer.pause;
    window.onfocus = timer.resume;

    //Dino-jump 

    document.addEventListener('keydown', function (e) {
        if (e.which === 32) {
            e.preventDefault();
            jump();
          }
    });


    function jump() {
        if (dino.classList != 'jamp') {
            dino.classList.add('jump');
        }
        setTimeout(function () {
            dino.classList.remove('jump');
        }, 405);
    }

    //Alive

    let isAlaive = setInterval(function () {
        let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue('top'));
        let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue('left'));
        let cactusLargeLeft = parseInt(window.getComputedStyle(cactus_large).getPropertyValue('left'));

        if (cactusLeft < 35 && cactusLeft > 0 && dinoTop >= 45) {
            alert(`GAME OVER!\nYour score ${timer.allTime}`);
            location.reload();
        }

        if (cactusLargeLeft < 35 && cactusLargeLeft > -15 && dinoTop >= 45) {
            alert(`GAME OVER!\nYour score ${timer.allTime}`);
            location.reload();
        }

    }, 10);

});