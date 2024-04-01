function MakeWin(imgsrc, color, finId, visOnStart = false) {
    return new Promise((resolve, reject) => {
        fetch('window.html')
            .then(response => response.text())
            .then(text => $('#background-elemtns').append(text))
            .then(() => {
                $('#background-elemtns > #open #settable').attr('src', imgsrc);
                $('#background-elemtns > #open').addClass(color);
                $('#background-elemtns > #open').attr('id', finId);

                if (visOnStart) {
                    //show on page load
                    var elemname = '#' + finId; $(elemname).addClass('window-show');
                } else {
                    // Add event listener for scroll event
                    window.addEventListener('scroll', function () { handleScroll(finId); });
                    var tagelem = document.getElementById(finId);
                    var elemname = '#' + finId;
                    if (isInViewport(tagelem)) {
                        $(elemname).addClass('window-show');
                    }
                }


                resolve(); // Resolve the promise after the entire function has executed
            })
            .catch(error => {
            });
    });
}

function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
function handleScroll(elemId) {
    var tagelem = document.getElementById(elemId);
    var elemname = '#' + elemId;
    if (isInViewport(tagelem)) {
        $(elemname).addClass('window-show');
        // Remove the event listener once the animation is triggered
        //window.removeEventListener('scroll', handleScroll);
    }
}

async function LoadAndStyleBackground() {
    MakeWin('./assets/images/Picture2.png', 'blue', 'bgw2', true).then(() => {
        $('#bgw2').addClass('pos-1');
    });
    MakeWin('assets/images/Picture1.png', 'yellow', 'bgw3', true).then(() => {
        $('#bgw3').addClass('pos-2');
    });
    MakeWin('./assets/images/draw1.jpg', 'yellow', 'bgw1', true).then(() => {
        $('#bgw1').addClass('pos-3')
    });

    MakeWin('./assets/images/frog.jpg', 'yellow', 'bgw4').then(() => {
        $('#bgw4').addClass('pos-4')
    });
    MakeWin('./assets/images/spaceship.png', 'yellow', 'bgw5').then(() => {
        $('#bgw5').addClass('pos-5')
    });
    MakeWin('assets/images/prog.png', 'yellow', 'bgw6', true).then(() => {
        $('#bgw6').addClass('pos-6')
    });
    MakeWin('./assets/images/bear.png', 'yellow', 'bgw7', true).then(() => {
        $('#bgw7').addClass('pos-7')
    });
    MakeWin('./assets/images/cinamoo.jpg', 'yellow', 'bgw8').then(() => {
        $('#bgw8').addClass('pos-8')
    });
}
//settable
//background-elemtns
window.onload = (event) => {
    LoadAndStyleBackground();
}
$(window).on("scroll", function () {
    if ($('.sticky').offset().top > 850) {
        $('.navbar').addClass('navbar-hide');
        $('.navbar').on('mousedown', function () { ToggleShow() })
    } else {
        if ($('.navbar').hasClass('navbar-hide'))
            $('.navbar').removeClass('navbar-hide');
    }
});


//
function ToggleShow() {
    $('.navbar').toggleClass('navbar-hide')
    $('.navbar-hide').toggleClass('navbar-show');
}