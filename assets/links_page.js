﻿function WindowBlank(parentId, content, color, finId) {
    const parerntName = '#' + parentId;
    return new Promise((resolve, reject) => {
        fetch('../window_blank.html')
            .then(response => response.text())
            .then(text => $(parerntName).append(text))
            .then(() => {
                $('#open').addClass(color);
                $('#open').attr('id', finId);

                var elemname = '#' + finId;
                $(elemname).addClass('window-show');
                $('#window-inside').html(content);
                resolve(); // Resolve the promise after the entire function has executed
            })
            .catch(error => {
            });
    });
}


function WindowPhoto(parentId, content, color, finId) {
    const parerntName = '#' + parentId;
    return new Promise((resolve, reject) => {
        fetch('../window.html')
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

window.onload = (event) => {

    const ins_text = $('#content_links').prop('outerHTML');

    $('#content_links').remove();
    WindowBlank('social_window', ins_text, 'yellow', 'win-links').then(function () {

        $('#linkedin').on('click', function () {
            window.location.href = 'https://www.linkedin.com/in/petra-mladšia'
        })
        $('#instagram').on('click', function () {
            window.location.href = 'https://www.instagram.com/bunn_2u'
        })
        $('#sashe').on('click', function () {
            window.location.href = 'https://www.sashe.sk/bunnucrafts'
        })

    });

    const game_img = $('#game #win-intro-photo').prop('innerHTML');
    $('#game #win-intro-photo').empty();
    WindowPhoto('game #win-intro-photo', game_img, 'blue', 'game-photo');

    const shop_img = $('#shop #win-intro-photo').prop('innerHTML');
    $('#shop #win-intro-photo').empty();
    WindowPhoto('shop #win-intro-photo', shop_img, 'yellow', 'shop-photo');

    const prog_img = $('#photo-prog #win-intro-photo').prop('innerHTML');
    $('#photo-prog #win-intro-photo').empty();
    WindowPhoto('photo-prog #win-intro-photo', prog_img, 'blue', 'ph-prog-photo');


    const prog_org = $('#photo-prog #win-example-photo').prop('innerHTML');
    $('#photo-prog #win-example-photo').empty();
    WindowPhoto('photo-prog #win-example-photo', prog_org, 'yellow', 'ex-prog-photo');

}
