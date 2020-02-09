//
//
//  fade-page.js
//
//

// Page Transition to fade out when clicking a link which has opted in using class 'fade-page'
function pageFade () {
  var ATTR_HREF = 'href'
  var EVENT_CLICK = 'click'
  var SELECTOR_FADE = 'fade-page'
  var EFFECT_DELAY = 500

  var fadePage = document.getElementsByClassName(SELECTOR_FADE)

  function fadePageFunction (event) {
    if (!(event.ctrlKey ||
      event.shiftKey ||
      event.metaKey ||
      (event.button && event.button === 1))) {
      event.preventDefault()
      event.stopPropagation()
      document.body.classList.add(SELECTOR_FADE)

      var href = this.getAttribute(ATTR_HREF)
      setTimeout(function () {
        if (href !== '' && href !== '#') {
          window.location.href = href
        }
      }, EFFECT_DELAY)
    }
  }
  // Bind click event
  for (var i = 0; i < fadePage.length; i += 1) {
    fadePage[i].addEventListener(EVENT_CLICK, fadePageFunction, false)
  }
}

function isIE () {
  var ua = window.navigator.userAgent
  var isIE = /MSIE|Trident/.test(ua)
  return isIE
}

function injectSVG () {
  var SVGInjector = window.SVGInjector.SVGInjector

  if (isIE()) {
    window.addEventListener('load', function () {
      SVGInjector(document.querySelectorAll('[class][data-inject-svg]'))
    })
    SVGInjector(document.querySelectorAll('[data-inject-svg]'))
  } else {
    SVGInjector(document.querySelectorAll('[data-inject-svg]'))
  }
}

function userAgent () {
  console.log(navigator.userAgent)
  document.documentElement.setAttribute('data-useragent', navigator.userAgent)
}

window.addEventListener('load', userAgent)
window.addEventListener('load', function () { document.querySelector('body').classList.add('loaded') })
window.addEventListener('load', function () { AOS.init({ once: true }) })
window.addEventListener('load', pageFade)
window.addEventListener('load', injectSVG)
