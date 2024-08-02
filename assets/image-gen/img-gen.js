const charDict = {
    0: '@',
    1: '%',
    2: '#',
    3: '*',
    4: '+',
    5: '=',
    6: '-',
    7: ':',
    8: '.',
    9: ' '

}

function WindowBlank(parentId, content, color, finId) {
    const parerntName = '#' + parentId;
    return new Promise((resolve, reject) => {
        fetch('../../window_blank.html')
            .then(response => response.text())
            .then(text => $(parerntName).append(text))
            .then(() => {
                $('#open').addClass(color);
                $('#open').attr('id', finId);

                var elemname = '#' + finId;
                $(elemname).addClass('window-show');
                $('#window-inside').append(content);
                resolve(); // Resolve the promise after the entire function has executed
            })
            .catch(error => {
            });
    });
}


function WindowPhoto(parentId, content, color, finId) {
    const parerntName = '#' + parentId;
    return new Promise((resolve, reject) => {
        fetch('../../window.html')
            .then(response => response.text())
            .then(text => $(parerntName).append(text))
            .then(() => {
                const photo_parent = $('#settable').parent();
                photo_parent.empty();
                photo_parent.html(content);
                $('#open').addClass(color);
                $('#open').attr('id', finId);

                var elemname = '#' + finId;
                $(elemname).addClass('window-show');
                resolve(); // Resolve the promise after the entire function has executed
            })
            .catch(error => {
            });
    });
}


window.onload = (ev) => {

    var canvas = document.getElementById("input");
    var outcanvas = document.getElementById("output");
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    var outctx = outcanvas.getContext('2d');
    const form = document.getElementById('imageInfo')

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formdata = new FormData(form);
        const w = formdata.get('multi');
        const forcol = formdata.get('foreground');
        const backcol = formdata.get('background');
        var imgratio;
        var h;
        const img = new Image();
        const reader = new FileReader();
        reader.onload = function (event) {
            img.src = event.target.result;
            img.onload = function (e) {


                imgratio = img.height / img.width
                h = imgratio * w;
                img.height = h;
                img.width = w;
                canvas.height = h;
                canvas.width = w;
                const fontHeight = 15;
                outcanvas.width = fontHeight * w * 0.5;
                outcanvas.height = fontHeight * h * 0.65;




                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, w, h);

                outctx.fillStyle = backcol;
                outctx.fillRect(0, 0, outcanvas.width, outcanvas.height)



                outctx.font = `${fontHeight}px "Fixedsys"`
                outctx.fillStyle = forcol



                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;
                var textline = '';
                const offset = fontHeight * 0.65
                for (let y = 0; y < canvas.height; y++) {
                    for (let x = 0; x < canvas.width; x++) {
                        const index = (y * canvas.width + x) * 4;
                        const red = pixels[index];
                        const green = pixels[index + 1];
                        const blue = pixels[index + 2];
                        // Calculate the grayscale value
                        const gray = 0.299 * red + 0.587 * green + 0.114 * blue;
                        const charIndex = Math.trunc(gray / 28)
                        textline += charDict[charIndex];

                    }
                    outctx.fillText(textline, 0, fontHeight * y * 0.65 + offset);
                    textline = '';
                }



                const outimage = outcanvas.toDataURL('img/png')
                const outShow = document.getElementById('img-prez-out');
                outShow.src = outimage

                const inShow = document.getElementById('img-prez-in')
                inShow.src = img.src


            }
        }

        reader.readAsDataURL(document.getElementById('imageToConvert').files[0])

    })


    const cont = $('#prog-window');
    $('#prog-window').remove();

    WindowBlank('prog-border', cont, 'yellow', 'prog-content')

}