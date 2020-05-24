$(document).ready(function () {
  var cardLis = document.querySelectorAll(".card_slide_inner > li");
  var cardImgs = document.querySelectorAll(".card_slide_inner img");

  cardImgs[2].style.transform = "scale(1.17)";
  cardLis[2].style.zIndex = "1000";
  var 옵션 = {
    startSlide: 1,
    infiniteLoop: true,
    pager: false,
    maxSlides: 3,
    moveSlides: 1,
    slideWidth: 240,
    onSlideBefore: function () {
      scaleCard(this.getCurrentSlide());
    },
  };
  var cardSlider = $(".card_slide_inner ").bxSlider();
  reloadCard();

  function reloadCard() {
    cardSlider.reloadSlider(옵션);
  }

  function scaleCard(num) {
    console.log(num);

    for (var i = 0; i < cardImgs.length; i++) {
      cardImgs[i].style.transform = "scale(1)";
      cardImgs[i].style.zIndex = "0";
    }
    if (num < 4) {
      cardImgs[num + 1].style.transform = "scale(1.17)";
      cardLis[num + 1].style.zIndex = "1000";
    } else if (num === 4) {
      console.log("asdf");
      cardImgs[0].style.transform = "scale(1.17)";
      cardImgs[0].style.zIndex = "1000";
    }
  }
});
