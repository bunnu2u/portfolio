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

window.onload = (event) => {

    history.replaceState('data to be passed', 'Title of the page', '/links');


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



}