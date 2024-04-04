function WindowBlank(parentId, content, color, finId) {
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
    const ins_text = $('#content_links').prop('outerHTML');

    $('#content_links').remove();
    WindowBlank('social_window', ins_text, 'yellow', 'win-links');

    // Add click event listener to the button
    $('#linkedin').on('click', function () {
        location.href = 'https://www.linkedin.com/in/petra-mladšia'

    })

}
