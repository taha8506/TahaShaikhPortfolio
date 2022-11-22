const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controlls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');
const analysis = document.querySelector('.analysis-btn');

function PageTransitions() {
    //Button click active class
    for (let i = 0; i < sectBtn.length; i++) {
        sectBtn[i].addEventListener('click', function () {
            let currentBtn = document.querySelectorAll('.active-btn');
            currentBtn[0].className = currentBtn[0].className.replace('active-btn', '');
            this.className += ' active-btn';
        })
    }

    //Sctions Active 
    allSections.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        if (id) {
            //resmove selected from the other btns
            sectBtns.forEach((btn) => {
                btn.classList.remove('active')
            })
            e.target.classList.add('active')

            //hide other sections
            sections.forEach((section) => {
                section.classList.remove('active')
            })

            const element = document.getElementById(id);
            element.classList.add('active');

        }
    })

    analysis.addEventListener('click', function () {


        sectBtns.forEach((btn) => {
            btn.classList.remove('active')
        })


        sections.forEach((section) => {
            section.classList.remove('active')
        })

        const element = document.getElementById('analysis');
        element.classList.add('active');

    })

}






PageTransitions();



/// SMOOTH SCROLLING CREDIT TO
/// https://stackoverflow.com/questions/47011055/smooth-vertical-scrolling-on-mouse-wheel-in-vanilla-javascript

function init() {
    new SmoothScroll(document, 120, 10)
}

function SmoothScroll(target, speed, smooth) {
    if (target === document)
        target = (document.scrollingElement
            || document.documentElement
            || document.body.parentNode
            || document.body) // cross browser support for document scrolling

    var moving = false
    var pos = target.scrollTop
    var frame = target === document.body
        && document.documentElement
        ? document.documentElement
        : target // safari is the new IE

    target.addEventListener('mousewheel', scrolled, { passive: false })
    target.addEventListener('DOMMouseScroll', scrolled, { passive: false })

    function scrolled(e) {
        e.preventDefault(); // disable default scrolling

        var delta = normalizeWheelDelta(e)

        pos += -delta * speed
        pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)) // limit scrolling

        if (!moving) update()
    }

    function normalizeWheelDelta(e) {
        if (e.detail) {
            if (e.wheelDelta)
                return e.wheelDelta / e.detail / 40 * (e.detail > 0 ? 1 : -1) // Opera
            else
                return -e.detail / 3 // Firefox
        } else
            return e.wheelDelta / 120 // IE,Safari,Chrome
    }

    function update() {
        moving = true

        var delta = (pos - target.scrollTop) / smooth

        target.scrollTop += delta

        if (Math.abs(delta) > 0.5)
            requestFrame(update)
        else
            moving = false
    }

    var requestFrame = function () { // requestAnimationFrame cross browser
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (func) {
                window.setTimeout(func, 1000 / 50);
            }
        );
    }()
}

SmoothScroll(document, 120, 50)