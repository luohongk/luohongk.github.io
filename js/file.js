/*
 * @Author: Hongkun Luo
 * @Date: 2024-10-17 15:26:05
 * @LastEditors: Hongkun Luo
 * @Description: 
 * 
 * Hongkun Luo
 */
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
      m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
  })
  (window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  ga('create', 'UA-88572407-1', 'auto');
  ga('send', 'pageview');


function smoothScroll(target) {
    offset = 82; // 偏移量，可根据需要调整
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY-offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 800; // 滚动持续时间（毫秒）
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1); // 确保进度不会超过 1

        window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    requestAnimationFrame(animation);
}

function buttonClick(button) {
    button.classList.add('clicked'); // 添加点击效果类

    // 移除效果类以便下次点击时能重新应用
    setTimeout(() => {
        button.classList.remove('clicked');
    }, 200); // 200毫秒后移除
}
