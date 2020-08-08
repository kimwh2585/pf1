console.clear();

// 지정되지 않은 a 링크 return false
$('a').click(function (e) {
    if ($(this).attr('href') == '#') {
        //return false;
        e.preventDefault();
    }
});

$(window).on('beforeunload', function () {
    $(window).scrollTop(0);
});

// 시작 커튼 액티브
$(document).ready(function () {
    $('.start-curtain').addClass('active');
});

// 시작시 스크롤 제한
$('html, body').addClass('scrollOff');

setTimeout(function () {
    $('html, body').removeClass('scrollOff');
}, 2000);

// 스크롤시 바뀌는 헤더 아이콘 색
function NotScrollTop0__init() {
    var scrollTop = $(window).scrollTop();

    if (scrollTop > 0) {
        $('.header').addClass('not-scroll-top-0');
    } else {
        $('.header').removeClass('not-scroll-top-0');
    };
};

$(window).scroll(NotScrollTop0__init);
NotScrollTop0__init();



// 상단 메인 배너 내부 텍스트
function mainBnStart() {
    $('.main-bn > .inner-txt').addClass('active');
}

setTimeout(mainBnStart, 800);

// 내부 텍스트 타자 타이핑 효과
function typingActive() {
    var typingBool = false;
    var typingIdx = 0;
    var typingTxt = $(".typing-txt").text(); // 타이핑될 텍스트를 가져온다

    typingTxt = typingTxt.split(""); // 한글자씩 자른다.
    if (typingBool == false) { // 타이핑이 진행되지 않았다면
        typingBool = true;

        var tyInt = setInterval(typing, 100); // 반복동작 
    }

    function typing() {
        if (typingIdx < typingTxt.length) { // 타이핑될 텍스트 길이만큼 반복
            $(".typing").append(typingTxt[typingIdx]); // 한글자씩 이어준다. 
            typingIdx++;
        } else {
            clearInterval(tyInt); //끝나면 반복종료
        }
    }
}

setTimeout(typingActive, 1800);

// aos 플러그인 적용
AOS.init({
    once: true,
    duration: 1200,
    easing: 'ease',
});

// 화면에 보여질때 발생하는 이벤트
function ActiveOnVisible__init() {
    $(window).resize(ActiveOnVisible__initOffset);
    ActiveOnVisible__initOffset();

    $(window).scroll(ActiveOnVisible__checkAndActive);
    ActiveOnVisible__checkAndActive();
}

function ActiveOnVisible__initOffset() {
    $('.active-on-visible').each(function (index, node) {
        var $node = $(node);

        var offsetTop = $node.offset().top;
        $node.attr('data-active-on-visible-offsetTop', offsetTop);

        if (!$node.attr('data-active-on-visible-diff-y')) {
            $node.attr('data-active-on-visible-diff-y', '0');
        }

        if (!$node.attr('data-active-on-visible-delay')) {
            $node.attr('data-active-on-visible-delay', '0');
        }
    });

    ActiveOnVisible__checkAndActive();
}

function ActiveOnVisible__checkAndActive() {
    $('.active-on-visible:not(.actived)').each(function (index, node) {
        var $node = $(node);

        var offsetTop = $node.attr('data-active-on-visible-offsetTop') * 1;
        var diffY = parseInt($node.attr('data-active-on-visible-diff-y'));
        var delay = parseInt($node.attr('data-active-on-visible-delay'));

        var callbackFuncName = $node.attr('data-active-on-visible-callback-func-name');

        if ($(window).scrollTop() + $(window).height() + diffY > offsetTop) {
            $node.addClass('actived');

            setTimeout(function () {
                $node.addClass('active');
                if (window[callbackFuncName]) {
                    window[callbackFuncName]($node);
                }
            }, delay);
        }
    });
}

function count($node) {
    NumAni__start('.num');
}

ActiveOnVisible__init();

// 포트폴리오 카테고리 변경
$('.pf-con > .pf > .coding > .pf-category > ul > li').click(function () {
    var index = $(this).index();

    $(this).addClass('active');
    $(this).siblings('li.active').removeClass('active');

    var $pfCon = $(this).closest('.pf-con');
    var $current = $pfCon.find('.pf-list-box > .pf-list.active');
    var $post = $pfCon.find('.pf-list-box > .pf-list').eq(index);

    $current.removeClass('active');
    $post.addClass('active');

    // 탭을 옮길때마다 애니메이션 효과를 주기위해
    $current.find(' > .pf-list-inner.active').removeClass('active');
    setTimeout(function () {
        $post.find(' > .pf-list-inner').addClass('active');
    }, 10);
});

// gnb 클릭시 해당 컨텐츠로 이동
$('.header > .header-con > .gnb > ul > li > a').click(function (e) {
    var href = $(this).attr('href');

    var targetTop = $(href).offset().top;

    /*
    // 한번에 가도록 하는 방법
    $(window).scrollTop(targetTop);
    */

    $('html').stop().animate({
        scrollTop: targetTop
    }, 500);

    e.preventDefault();
});

function Page__updateIndicatorActive() {
    var scrollTop = $(window).scrollTop();

    // 역순으로 검색해야 편하다
    $($('.page').get().reverse()).each(function (index, node) {
        var $node = $(this);
        var offsetTop = parseInt($node.attr('data-offset-top'));

        if (scrollTop >= offsetTop) {
            // 기존 녀석에게 활성화 풀고
            $('.header > .header-con > .gnb > ul > li.active').removeClass('active');
            // 해당하는 녀석에게 활성화 넣고

            var currentPageIndex = $node.index();
            $('.header > .header-con > .gnb > ul > li').eq(currentPageIndex).addClass('active');

            $('html').attr('data-current-page-index', currentPageIndex);

            return false; // 더 이상 다른 페이지를 검사하지 않는다.
        }
    });
}

// 각 페이지의 offsetTop 속성을 업데이트
function Page__updateOffsetTop() {

    $('.page').each(function (index, node) {
        var $page = $(node);
        var offsetTop = $page.offset().top;

        $page.attr('data-offset-top', offsetTop);
    });

    // 계산이 바뀌었으니까, 다시 상태 업데이트
    Page__updateIndicatorActive();
}

function Page__init() {
    Page__updateOffsetTop();
}

// 초기화
Page__init();

// 화면이 리사이즈 할 때 마다, offsetTop을 다시계산
$(window).resize(Page__updateOffsetTop);

// 스크롤이 될 때 마다, 인디케이터의 상태를 갱신
$(window).scroll(Page__updateIndicatorActive);


// 위로가는 버튼
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $(".top-btn").fadeIn();
        } else {
            $(".top-btn").fadeOut();
        }
    });
    $(".top-btn").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 400);
        return false;
    });
});
