* 判断ios https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
```javascript
function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}
function iOSversion() {

  if (iOS) { // <-- Use the one here above
    if (window.indexedDB) { return 'iOS 8 and up'; }
    if (window.SpeechSynthesisUtterance) { return 'iOS 7'; }
    if (window.webkitAudioContext) { return 'iOS 6'; }
    if (window.matchMedia) { return 'iOS 5'; }
    if (window.history && 'pushState' in window.history) { return 'iOS 4'; }
    return 'iOS 3 or earlier';
  }

  return 'Not an iOS device';
}
```
