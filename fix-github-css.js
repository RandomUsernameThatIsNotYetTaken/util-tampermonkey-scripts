(function() {
    'use strict';

    appendCSS('.commit-build-statuses .status-checks-dropdown {    width: 1000px; }');
    appendCSS('.branch-action-item.open>.merge-status-list-wrapper>.merge-status-list, .branch-action-item.open>.merge-status-list { max-height: 2310px; }');
    appendCSS('.commit-build-statuses .dropdown-menu { max-width: 1544px; }');
})();
function appendCSS(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
