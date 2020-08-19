// btn hover 했을 때 frameTools move 이벤트
// overwork&outwork 는 헤드오픈 함수에서도 쓰이기 때문에 전역에 내놨다.
const wrap = document.querySelector('.wrap')
const btn = wrap.querySelector('button')
const frame = wrap.querySelector('.fix_collection')
const frameTools = frame.querySelectorAll('a')
const header = wrap.querySelector('header')
const conDivs = wrap.querySelectorAll('.contents > div')

// btn에 후버했을때 움직임이 나타나지만, frame이 나왔을때 커서가 frame_top 을 벗어나면 사라진다.
btn.addEventListener('mouseover', overWork)
btn.addEventListener('mouseout', outWork)
frame.addEventListener('mouseout', outWork)

// 프레임이 켜져있지 않은데 버튼에 마우스오버가 된다면, 프레임을 켜라.
function overWork(e) {

    if (!frame.classList.contains('on')) {
        if (window.innerWidth < 768) {
            return; // 767 부터는 프레임 트렌지션 효과가 나타나지 않는다.
        }
        frame.classList.add('on')
    }

}

// 프레임을 끄는 함수
function outWork(e) {
    // 만약 켜져있지도 않다면 리턴하고, 헤더가 열렸을때는 프레임이 작동하면 안되기때문에 리턴해라.
    if (!frame.classList.contains('on') || header.classList.contains('on')) return;

    if (check(e.relatedTarget)) {  // 프레임 꺼도 되는지 체크 함수.
        frame.classList.remove('on')
    }
    // 체크함수
    function check(eRT) {
        if (eRT === null) return;
        if (eRT.className === 'fix top') { // 도착한곳이 프레임 탑이라면 프레임을 끄지 마라.
            return false
        }
        return true; //도착한곳이 그 이외라면 꺼라
    }
}



// 헤드오픈 함수
headOften();
function headOften() {
    const aEl = btn.querySelector('a')
    let sections = document.querySelectorAll('.section') // main 제외한 div들
    const pictures = document.querySelectorAll('picture')

    btn.addEventListener('click', clickWork);
    function clickWork(e) {
        //헤드가 오픈되었을때는 버튼 이벤트가 지워져야 한다.
        btn.removeEventListener('mouseover', overWork)
        btn.removeEventListener('mouseout', outWork)

        e.preventDefault();

        if (!header.classList.contains('on')) { // 만약 버튼을 눌렀을때 헤드가 열려져 있지 않다면 열려라. 
            header.classList.add('on')
            aEl.innerHTML = 'HUGE'; // 열렸을때의 text가 변경되고
            aEl.style.fontFamily = 'Bebas Neue'; // 글씨체도 변경된다.
            btn.classList.add('stop', 'pink');
            if (window.innerWidth < 582) {  // 582보다 사이즈가 작을땐 프레임의 트렌지션 움직임은 없지만 프레임이 켜지긴 해야한다.
                frame.classList.add('on')
                frame.style.transition = 'none';
            }
            for (let i = 0; i < sections.length; i++) {
                if (sections[i].classList.contains('on')) {
                    // 현재 열려져있는 섹션의 탑 값이 헤더만큼 내려간다.
                    sections[i].style.top = '440px'
                    pictures[i].style.top = '440px'
                }
            }
            frameTools[3].style.height = 0;// 헤드가 오픈되면 frame_bottom 은 사라진다.
        } else { // 버튼을 눌렀을때 헤더가 열려져 있다면, 
            header.classList.remove('on')
            aEl.innerHTML = 'H';
            aEl.style.fontFamily = 'Hind';
            btn.classList.remove('stop', 'pink');

            if (window.innerWidth < 582) { // 582보다 사이즈가 크면 원래대로 프레임이 작동.
                frame.classList.remove('on')
                frame.style.transition = 'none';
            }
            for (let i = 0; i < sections.length; i++) {
                if (sections[i].classList.contains('on')) {
                    sections[i].style.top = '0'
                    pictures[i].style.top = '0'
                }
            }
            frameTools[3].style.height = '50px';
        }
        // 헤드 오픈이 끝나면 버튼에 다시 리스너를 건다.
        btn.addEventListener('mouseover', overWork)
        btn.addEventListener('mouseout', outWork)
    }
}

// 리사이즈 체크 함수
reSizeBasic();
function reSizeBasic() {

    let content = wrap.querySelector('.contents')
    let checkSize;
    let contentHeight;

    reSizeCheck(); // 로드됬을때 확인

    window.addEventListener('resize', resizeWork)

    function resizeWork() {
        clearTimeout(checkSize);
        checkSize = setTimeout(function () {
            reSizeCheck(); // checksize는 셋타임아웃 resizeCheck 가 되고 위에서 클리어타임아웃으로 잡아준다.
        }, 150);
    }

    function reSizeCheck() {

        contentHeight = `${window.innerHeight}px`;

        if (window.innerWidth < 767) { // 사이즈에따라 메인 글자가 달라진다.
            conDivs[0].querySelector('h2').innerText = 'Hi.'
        } else {
            conDivs[0].querySelector('h2').innerText = 'Hello.'
        }



        for (let i = 0; i < conDivs.length; i++) {
            // 창 크기에 따라 세로크기도 바뀐다.
            conDivs[i].style.height = contentHeight
            // 순서대로 (앱솔루트라 탑 위치가 필요함) 탑 위치를 지정해 준다.

            //메인에 on이 붙어져 있다면 
            if (conDivs[0].classList.contains('on')) { // 메인에 on 이 붙어져 있을때
                conDivs[1 * i].style.top = window.innerHeight * i + 'px' //차례대로 top값을 갖는다.
            } else if (!conDivs[0].classList.contains('on')) { // 메인 제외한 컨텐츠에 on 이 있을때
                let onSection = content.querySelector('.on');
                conDivs[i].classList.remove('on'); // 모든 condivs 에 on 을 지우고
                onSection.classList.add('on'); // 해당하는 현재의 condivs에만 on 을 준다.
                conDivs[0].style.top = - (window.innerHeight * i) + 'px'; // main은 innerheight만큼 -top값을 가지게 된다.  
            }
        }
        content.style.height = contentHeight // 리사이즈 됨에 따라 컨텐츠 사이즈가 할당된다.
    }
}


// 휠 함수
wheelWork();
function wheelWork() {
    window.onmousewheel = wheelMove; // 마우스 휠 이벤트

    const pictures = wrap.querySelectorAll('picture')
    const imgs = wrap.querySelectorAll('img')

    let check;

    function wheelMove(e) {
        clearTimeout(check);
        check = setTimeout(function () {
            if (header.classList.contains('on')) return;
            if (e.wheelDelta < 0) { // 휠이 내려가면 네임다운함수를 실행
                nameDown(e.wheelDelta);
            } else if (e.wheelDelta > 0) { // 휠이 올라가면 네임업 함수를 실행.
                nameUp(e.wheelDelta);
            }
        }, 50);
    }


    function nameDown(e) { // 휠을 내렸을때 on을 주는 함수.
        let on = wrap.querySelector('.contents>.on')
        const footer = wrap.querySelector('footer')

        if (on.nextElementSibling === null) { // 다음자매가 없다면 풋터를 실행시키고 리턴해라.
            footer.classList.add('on')
            wrap.style.overflow = 'visible'
            return;
        }

        let onNextEl = on.nextElementSibling
        let picNum = onNextEl.classList[0]


        if (!on.classList.contains('first')) { // main 이 아니라면 버튼이 핑크색이면 안된다.
            btn.classList.remove('pink');
        }

        reOn(on, onNextEl, picNum) // 다시 온을 주는 함수.
        downWheelSections();
        lineNew();
    }


    function nameUp(e) { // 휠을 올렸을때 on을 주는 함수.
        let on = wrap.querySelector('.contents>.on')
        const footer = wrap.querySelector('footer')

        if (on.previousElementSibling === null) return; // 이전 자매가 없다면 돌아가라.

        let onPreEl = on.previousElementSibling
        let picNum = onPreEl.classList[0]

        if (on.nextElementSibling === null) { // 풋터가 열려있는 상태에서 다음 자매가 없다면 풋터를 지워라.
            // footer.classList.remove('on')
            wrap.style.overflow = 'hidden'
        }

        if (on.classList.contains('first')) { //main일때만 버튼이 pink 가 되어야 한다.
            btn.classList.add('pink');
        }

        reOn(on, onPreEl, picNum); // 다시 on 을 주는 함수
        upWheelSections();
        lineNew();
    }



    function reOn(on, onEl, picNum) {
        for (let i = 0; i < pictures.length; i++) { // 모든사진에 온을 지운다.
            pictures[i].classList.remove('on')
        }

        if (on) {
            on.classList.remove('on') // 현재에 on 을 지우고
            onEl.classList.add('on'); // 이전,다음의 자매에게 on 을 준다.

            for (let i = 0; i < pictures.length; i++) {
                if (pictures[i].classList.contains(picNum)) { // 해당하는 picnum class를 가진 픽쳐에게도 온을 준다.
                    pictures[i].classList.add('on')
                }
            }
        }
    }



    function downWheelSections() { // 내렸을때 
        for (let i = 0; i < conDivs.length; i++) {
            if (conDivs[i].classList.contains('on')) {
                conDivs[i - 1].style.top = - window.innerHeight + 'px'; // 해당 이전꺼는 그만큼 올라가야한다.
                conDivs[i].style.top = 0; // 현재에 해당 div가 탑 0 이어야 한다.

            }
        }
    }

    function upWheelSections() { // 올렸을때
        for (let i = 0; i < conDivs.length; i++) {
            if (conDivs[i].classList.contains('on')) {
                conDivs[i + 1].style.top = window.innerHeight + 'px'; // 해당 다음꺼는 그만큼 내려가야 한다.
                conDivs[i].style.top = 0; // 현재에 해당 div가 탑 0 이어야 한다.

            }
        }
    }


    function lineNew() { // 라인 함수.
        // 밑에가 새로만든 라인
        let on = document.querySelector('.contents>.on')
        let num = on.classList[0] // 클래스리스트 중 첫번째 이름을 picNum에 담는다.
        const line = document.querySelector('.line')

        if (on.classList.contains('white')) { // 섹션에 따른 라인 색깔 변경
            line.style.color = 'white'
        } else {
            line.style.color = 'black'
        }

        if (num === 'first') {
            line.innerText = '01.'
        } else if (num === 'second') {
            line.innerText = '02.';
        } else if (num === 'third') {
            line.innerText = '03.'
        } else if (num === 'fourth') {
            line.innerText = '04.'
        } else if (num === 'fifth') {
            line.innerText = '05.'
        }
        // 현재 on 이 되어있는 컨텐츠에 맞춰 라인의 숫자를 수정한다.
    }
}


