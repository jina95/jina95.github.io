$(document).ready(function () {
    const msInner = document.querySelector('.inner')
    const 옵션 = {
        startSlide: 0,
        infiniteLoop: true,
        moveSlides: 1,
        autoControls: true,
        auto: true,
        maxSlides: 1,
        onSlideBefore: function () {
            checkSlide(this.getCurrentSlide());
        }
    }

    const msSlider = $('.m_vs_slide').bxSlider();
    reloadCard();

    function reloadCard() {
        msSlider.reloadSlider(옵션)
    }

    // 슬라이드 화면에 따라 on 에 따른 큐
    function checkSlide(num) {
        if (num === 0) {
            msInner.classList.add('on');
        } else {
            msInner.classList.remove('on');
        }
    }
})