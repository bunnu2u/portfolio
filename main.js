function MakeWin(imgsrc, color, finId) {
    (fetch('/window.html').then(response => response.text())
        .then(text => $('#background-elemtns').append(text))
        .then(response => {
            $('#background-elemtns > #open #settable').attr('src', imgsrc)
            $('#background-elemtns > #open').addClass(color)
            $('#background-elemtns > #open').attr('id', finId)
        }))
}


//settable
//background-elemtns
window.onload = (event) => {
    MakeWin('./assets/images/draw1.jpg', 'yellow', 4);
};
