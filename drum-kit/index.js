(async function () {
    const keysContainer = document.querySelector('.keys-container');
    const res = await fetch('./assets/data/data.json');
    const data = await res.json();

    keysContainer.innerHTML = data.map(({ key, kbd, sound }) => {
        return `<div data-key="${key}"class="key">
            <kbd>${kbd}</kbd>
            <span class="sound">${sound}</span>
        </div>`;
    }).join('');

    const keys = Array.from(document.querySelectorAll('.key'));
    keys.forEach(key => key.addEventListener('transitionend', removeTransition));
    window.addEventListener('keydown', playSound);
})();

function removeTransition(evt) {
    if (evt.propertyName !== 'transform') {
        return;
    }
    evt.target.classList.remove('playing');
}

function playSound(evt) {
    const audio = document.querySelector(`audio[data-key="${evt.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${evt.keyCode}"]`);

    if (!audio) {
        return;
    }

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
}