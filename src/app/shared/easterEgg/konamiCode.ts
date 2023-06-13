const konamiCode = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'B',
    'A',
];

let konamiIndex = 0;

document.onkeyup = (event: KeyboardEvent) => {
    if (konamiCode[konamiIndex].toLowerCase() === event.key.toLowerCase()) {
        if (konamiIndex < konamiCode.length - 1) {
            konamiIndex++;
        } else {
            const body = document.getElementById('root');
            if (body) {
                body.style.transform = 'rotate(180deg)';
                body.style.transitionDuration = '4s';
            }
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
};
