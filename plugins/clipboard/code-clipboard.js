function addCopyToClipboardButtons() {
    const containers = document.querySelectorAll('pre');

    containers.forEach(container => {
        container.insertAdjacentHTML('afterbegin', '<button class="code-copy-button" data-toggle="tooltip"><i class="ti-layers"></i></button>');
    });

    // 初始化 tooltip
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'click',
        placement: 'left'
    });

    // 初始化 Clipboard.js
    const clipboard = new ClipboardJS('.code-copy-button', {
        target: function(trigger) {
            return trigger.nextElementSibling;
        }
    });

    clipboard.on('success', (e) => {
        e.clearSelection();
        setTooltip(e.trigger, '複製成功!');
        hideTooltip(e.trigger);
    });

    clipboard.on('error', (e) => {
        console.error('ClipboardJS Error:', e.action, e.trigger);
        setTooltip(e.trigger, 'Failed!');
        hideTooltip(e.trigger);
    });
}

function setTooltip(btn, message) {
    $(btn).tooltip('hide')
        .attr('data-original-title', message)
        .tooltip('show');
}

function hideTooltip(btn) {
    setTimeout(function() {
        $(btn).tooltip('hide');
    }, 1000);
}
