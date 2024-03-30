function LoadImageWindow(src) {
    fetch('window.html').then(response => response.text())
        .then(text => console.log(text))
    // outputs the content of the text file
}