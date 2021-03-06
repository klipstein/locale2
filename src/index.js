var formatLocale = require('./utils').formatLocale

function getLocale(locale) {
  if (locale) return locale

  if (global.Intl && typeof global.Intl.DateTimeFormat === 'function') {
    return global.Intl.DateTimeFormat().resolvedOptions && global.Intl.DateTimeFormat().resolvedOptions().locale
  }

  if (global.chrome && global.chrome.app && typeof global.chrome.app.getDetails === 'function') {
    return global.chrome.app.getDetails().current_locale
  }

  locale = (global.clientInformation || global.navigator || Object.create(null)).language ||
           (global.navigator &&
             (global.navigator.userLanguage ||
             (global.navigator.languages && global.navigator.languages[0]) ||
             (global.navigator.userAgent && global.navigator.userAgent.match(/;.(\w+\-\w+)/i)[1])))

  if (!locale && ['LANG', 'LANGUAGE'].some(Object.hasOwnProperty, process.env)) {
    return (process.env.LANG ||
            process.env.LANGUAGE ||
            String()).replace(/[.:].*/, '')
                     .replace('_', '-')
  }

  return locale
}

var locale2 = function(locale) {
  return formatLocale(getLocale(locale))
}

exports.locale2 = locale2
