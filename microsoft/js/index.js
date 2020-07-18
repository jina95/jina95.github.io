// 준비
var wrap = document.querySelector('.wrap')
var header = document.querySelector('header')

// header ms open & close
msOverMenu();
function msOverMenu() {
    const headMs = header.querySelector('.head_ms');
    const msSub = header.querySelector('.head_ms ul');

    headMs.addEventListener('click', headMsBtn);
    wrap.addEventListener('click', headMsClose);


    function headMsBtn(e) {
        e.preventDefault();
        // 누른애의 부모중 .ms_inner 를 가지고 있지 않다면 리턴해라. 왜냐면 열렸을때 메뉴의 a 를 누르면 닫히기때문에 예외처리함.
        const selectMsInner = e.target.parentNode.querySelector('.ms_inner')
        if (!selectMsInner) return;
        if (msSub.className !== 'ms_inner on') {
            msSub.classList.add('on')
        } else if (selectMsInner.classList.contains('on')) {
            msSub.classList.remove('on')
        }
        // 페런츠노드가 헤더라면 닫히지 않고, 헤더가 아니라면 닫히고, 사이트맵이라면 닫히고 사이트맵이 아니라면 닫히지 않고를 해결해야 한다.
    }
    function headMsClose(e) {
        let targetMother = e.target.parentNode;
        // 만약 안열린 상태라면 닫히지도 마라.
        if (e.target.parentNode.querySelector('.ms_inner')) return;
        // 리무브체크함수 
        if (removeCheck()) {
            msSub.classList.remove('on')
        }

        function removeCheck() {
            // html 까지 패런츠노드로 올라가서 확인한다.
            while (targetMother.tagName !== 'HTML') {
                // 만약 패런츠노드가 헤더의 자식이라면 닫히지 마라.
                if (targetMother.tagName === 'HEADER') {
                    return false
                }
                // 하지만 사이트맵 항목에서는 닫아라.
                if (targetMother.classList.contains('sitemap')) {
                    return true
                }
                targetMother = targetMother.parentNode
            }
            // 그 이외에는 다 닫아라.
            return true
        }
    }


}

searchOverMenu();
function searchOverMenu() {

    const search = header.querySelector('.icon_search');
    const textBox = search.querySelector('input');
    search.addEventListener('click', searchOpen);
    wrap.addEventListener('click', searchWork);

    function searchOpen(e) {
        e.preventDefault();
        // 만약 너가 누른애가 돋보기 모양이거나, '검색' 글자이거나, 인풋텍스트 창이라면 'on' 을 줘라.
        if (e.target.classList.contains('bx-search-alt-2') || e.target.textContent === '검색' || e.target.tagName === 'INPUT') {
            search.className = 'icon_search on'
        }
        // input 창을 누르면 글자가 사라져라.
        textBox.onclick = function () {
            textBox.value = ''
        }
    }

    function searchWork(e) {
        e.preventDefault();
        let targetMother = e.target.parentNode;
        // 만약 누른애가 돋보기 모양이거나, 그애의 부모 이름중에 아이콘서치가 있다면 (검색글자라면) 빠져나가라.
        if (e.target.classList.contains('bx-search-alt-2') || targetMother.classList.contains('icon_search')) return
        // 리무브체크함수 
        if (removeCheck()) {
            search.classList.remove('on');
            textBox.value = 'Microsoft.com 검색' // on 을 지울때는 벨류값도 다시 원래처럼 넣어줘야 하기때문에.
        }
        function removeCheck() {
            // html 까지 패런츠노드로 올라가서 확인한다.
            while (targetMother.tagName !== 'HTML') {
                // 지금 누른애가 인풋인것을 제외하고는 어떤 부분을 누르던 다 지워라.
                if (e.target.tagName === 'INPUT') {
                    return false
                }
                targetMother = targetMother.parentNode
            }
            return true
        }
    }

}

hamburgerWork();
function hamburgerWork() {
    const hamburger = document.querySelector('nav > a')
    const hamUl = document.querySelector('nav > ul')
    const hamLis = document.querySelectorAll('nav > ul > li')
    // 햄버거 메뉴 클릭 리스너
    hamburger.addEventListener('click', navClickWork);

    function navClickWork(e) {
        e.preventDefault();
        // 만약 햄버거버튼을 눌렀을때 on 이 있다면 지워라
        if (hamburger.classList.contains('on')) {
            hamburger.classList.remove('on')
            hamUl.style.display = 'none'

        } else { // 온이 없을때 on을 추가해줌.
            hamburger.classList.add('on')
            hamUl.style.display = 'block'
            for (let i = 0; i < hamLis.length; i++) {
                // 자식을 가진 li에게만 리스너를 붙인다.
                if (hamLis[i].children.length === 2) {
                    hamLis[i].addEventListener('click', navLiWork)
                }
            }
        }
    }


    function navLiWork(e) {
        // 만약 눌린 아이가 on 의 자식인 a 라면 닫히지 말고 리턴해라.
        if (e.target.children.length === 0) return;
        // 이름이 있다면 닫고 없다면 on을 줘라.
        if (this.className === 'on') {
            this.className = ''
        } else {
            this.className = 'on'
        }
    }


}
