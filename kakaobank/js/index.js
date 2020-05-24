// 준비
const html = document.querySelector("html");
const mainHead = html.querySelector("header");
const logo = mainHead.querySelectorAll(".inner > h1");

// 헤더 화이트 블랙 함수 준비.
function headerWhite() {
  mainHead.classList.add("on");
  logo[1].style.display = "block";
  logo[0].style.display = "none";
}
function headerBlack() {
  mainHead.classList.remove("on");
  logo[0].style.display = "block";
  logo[1].style.display = "none";
}

// 마우스 오버 이벤트
overMenu();
function overMenu() {
  let openedMenu;
  mainHead.addEventListener("mouseover", overWork);
  mainHead.addEventListener("mouseout", outWork);

  function overWork(e) {
    if (e.target.tagName !== "A") return;
    // 헤더에 마우스오버 되면 헤더를 화이트로 만들어라.
    headerWhite();
    // 자식이 있다면 온을 줘라.
    var chMenu = e.target.parentNode.querySelector("div");
    if (chMenu) {
      chMenu.classList.add("on");
      openedMenu = chMenu;
    }
  }

  function outWork(e) {
    // 헤더가 열리지 않은 상태라면 리턴해라.
    if (openedMenu === undefined || e.relatedTarget === null) return;
    // 도착한 곳이 옆 메뉴라면 쌓이면 안되기때문에 지워라.
    if (e.relatedTarget.className === "sub") {
      openedMenu.classList.remove("on");
    }
    // 헤더의 자식인지 확인해라.
    if (!isHeaderChild(openedMenu, e.relatedTarget)) {
      openedMenu.classList.remove("on");
      if (html.scrollTop > 50) headerWhite();
      if (html.scrollTop < 50) headerBlack();
    }

    function isHeaderChild(openedMenu, arriveMenu) {
      if (arriveMenu === null) return;
      while (arriveMenu.tagName !== "HTML") {
        if (arriveMenu.tagName === "HEADER") {
          return true; // 도착한애의 부모가 헤더라면 닫히지 말아라.
        }
        arriveMenu = arriveMenu.parentNode;
      }
      return false;
    }
  }
}
// 스크롤 이벤트
window.addEventListener("scroll", scrollActive);

function scrollActive() {
  const savingPhoto = html.querySelector(".saving_photo");
  const abroadPhotos = html.querySelector(".abroad_photos");
  const mainLoan = html.querySelector(".main_loan");
  if (html.scrollTop > 50) {
    headerWhite();
  }
  if (html.scrollTop < 50) {
    headerBlack();
  }
  if (html.scrollTop > 1144) {
    savingPhoto.classList.add("on");
  }
  if (html.scrollTop > 3698) {
    abroadPhotos.classList.add("on");
  }
  if (html.scrollTop > 4075) {
    mainLoan.classList.add("on");
  } else if (html.scrollTop < 2975) {
    mainLoan.classList.remove("on");
  }
}
