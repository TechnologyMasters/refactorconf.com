//
//
// background-images.js
//
// a javascript fallback for CSS 'object-fit' property for browsers that don't support it

function objectFit () {
  if ('objectFit' in document.documentElement.style === false) {
    $('.bg-image').each(function attachBg () {
      const img = $(this)
      const src = img.attr('src')
      const classes = img.get(0).classList
      // Replaces the default <img.bg-image> element with a <div.bg-image>
      // to attach background using legacy friendly CSS rules
      img.before($(`<div class="${classes}" style="background: url(${src}); background-size: cover; background-position: 50% 50%;"></div>`))
      // Removes original <img.bg-image> as it is no longer required
      img.remove()
    })
  }
}

//
//
//  fade-page.js
//
//

// Page Transition to fade out when clicking a link which has opted in using class 'fade-page'
function pageFade () {
  const ATTR_HREF = 'href'
  const EVENT_CLICK = 'click'
  const SELECTOR_FADE = 'fade-page'
  const EFFECT_DELAY = 500

  const fadePage = document.getElementsByClassName(SELECTOR_FADE)

  function fadePageFunction (event) {
    if (!(event.ctrlKey ||
      event.shiftKey ||
      event.metaKey ||
      (event.button && event.button === 1))) {
      event.preventDefault()
      event.stopPropagation()
      document.body.classList.add(SELECTOR_FADE)

      const href = this.getAttribute(ATTR_HREF)
      setTimeout(() => {
        if (href !== '' && href !== '#') {
          window.location.href = href
        }
      }, EFFECT_DELAY)
    }
  }
  // Bind click event
  for (let i = 0; i < fadePage.length; i += 1) {
    fadePage[i].addEventListener(EVENT_CLICK, fadePageFunction, false)
  }
}

function isIE () {
  const ua = window.navigator.userAgent
  const isIE = /MSIE|Trident/.test(ua)
  return isIE
}

function injectSVG () {
  const { SVGInjector } = window.SVGInjector

  if (isIE()) {
    window.addEventListener('load', () => {
      SVGInjector(document.querySelectorAll('[class][data-inject-svg]'))
    })
    SVGInjector(document.querySelectorAll('[data-inject-svg]'))
  } else {
    SVGInjector(document.querySelectorAll('[data-inject-svg]'))
  }
}

window.addEventListener('load', () => document.querySelector('body').classList.add('loaded'))
window.addEventListener('load', () => AOS.init({ once: true }))
window.addEventListener('load', pageFade)
window.addEventListener('load', objectFit)
window.addEventListener('load', injectSVG)
