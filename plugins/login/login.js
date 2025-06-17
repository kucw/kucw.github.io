function initLoginBtn() {
    const onPopupOpen = () => {
        document.body.style.overflow = 'hidden';
        document.querySelector('#login-pop-overlay').classList.add('login-active');
    };

    const onPopupClose = () => {
        document.body.style.overflow = '';
        document.querySelector('#login-pop-overlay').classList.remove('login-active');
    };

    // Handle and trigger popup window
    document.querySelector('#login-btn')?.addEventListener('click', onPopupOpen);

    // Handle and trigger popup close
    document.querySelector('#login-pop-overlay')?.addEventListener('click', event => {
        if (event.target === document.querySelector('#login-pop-overlay')) {
            onPopupClose();
        }
    });
    document.querySelector('#login-popup-btn-close')?.addEventListener('click', onPopupClose);

    window.addEventListener('pjax:success', onPopupClose);
    window.addEventListener('keyup', event => {
        if (event.key === 'Escape') {
            onPopupClose();
        }
    });
}