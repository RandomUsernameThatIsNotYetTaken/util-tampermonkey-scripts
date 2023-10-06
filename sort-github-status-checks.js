// ==UserScript==
// @name         Github status check sort
// @namespace    https://github.com/
// @version      1.1.2
// @description  Sort the status checks on a PR by status and then by name
// @author       Skjnldsv
// @match        https://github.com/*/*/pull/*
// @icon         https://github.githubassets.com/favicons/favicon.svg
// @grant        none
// @updateURL    https://gist.github.com/skjnldsv/eb7b894ae996affde4a7d0e00e0d80a1/raw/github-status-check-sort.user.js
// @downloadURL  https://gist.github.com/skjnldsv/eb7b894ae996affde4a7d0e00e0d80a1/raw/github-status-check-sort.user.js
// ==/UserScript==

(function() {
    'use strict';
    const targetNode = document.querySelector('.discussion-timeline-actions')
    const config = { attributes: false, childList: true, subtree: false }

    const callback = (mutationList) => {
        if ([...mutationList[0].removedNodes].length > 0) {
            const container = document.querySelector('.merge-status-list > div.merge-status-item').parentElement
            const children = Array.prototype.slice.call(container.querySelectorAll('div.merge-status-item'), 0)
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            container.append(...children.sort((a, b) => {
                const iconSelector = '.merge-status-icon svg'
                const statusCheckError = a.querySelector(iconSelector).classList.contains('octicon-x') - b.querySelector(iconSelector).classList.contains('octicon-x')
                const statusCheckSkip = a.querySelector(iconSelector).classList.contains('octicon-skip') - b.querySelector(iconSelector).classList.contains('octicon-skip')
                const statusCheckSuccess = a.querySelector(iconSelector).classList.contains('octicon-check') - b.querySelector(iconSelector).classList.contains('octicon-check')
                const statusCheckNeutral = a.querySelector(iconSelector).classList.contains('octicon-square-fill') - b.querySelector(iconSelector).classList.contains('octicon-square-fill')
                // Sort by error, success, skipper and neutral first. Then sort by name
                return statusCheckNeutral || statusCheckSkip || statusCheckSuccess || statusCheckError
                    || a.innerText.localeCompare(b.innerText)
            }))
        }
    }

    const observer = new MutationObserver(callback)
    observer.observe(targetNode, config)

})();
