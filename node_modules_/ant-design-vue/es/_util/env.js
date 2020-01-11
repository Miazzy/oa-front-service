export var inBrowser = typeof window !== 'undefined';
export var UA = inBrowser && window.navigator.userAgent.toLowerCase();
export var isIE = UA && /msie|trident/.test(UA);
export var isIE9 = UA && UA.indexOf('msie 9.0') > 0;