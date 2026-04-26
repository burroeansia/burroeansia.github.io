// Mobile menu toggle + sticky nav on scroll
(function () {
    var btn = document.querySelector('.mobile-menu-btn');
    var menu = document.querySelector('.mobile-menu-container');
    if (btn && menu) {
        btn.addEventListener('click', function () {
            menu.classList.toggle('open');
            var ul = menu.querySelector('#mobile-menu');
            if (ul) ul.classList.toggle('open');
        });
    }

    // Slider auto-advance scroll on horizontal overflow (simple fallback — no slick)
    var slider = document.getElementById('featured-slider');
    if (slider) {
        // Expose overlay hover on tap for touch devices
        slider.querySelectorAll('.slider-item').forEach(function (el) {
            el.addEventListener('touchstart', function () { el.classList.toggle('tapped'); });
        });
    }
})();
