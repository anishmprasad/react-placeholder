
var test = document.createElement('input');
var isPlaceHolderSupported = ('placeholder' in test);

// Helpers
function extend(obj1, obj2) {
    var obj = {};
    for (var key in obj1) {
        obj[key] = obj2[key] === undefined ? obj1[key] : obj2[key];
    }
    return obj;
}

var defaults = {
    letterDelay: 100, //milliseconds
    sentenceDelay: 1000, //milliseconds
    loop: false,
    startOnFocus: true,
    shuffle: false,
    showCursor: true,
    cursor: '|',
};
var timeouts = [];

// Constructor: PlaceHolder
function PlaceHolder(el, texts, options) {
    this.el = el;
    this.texts = texts;
    options = options || {};
    this.options = extend(defaults, options);
    this.timeouts = [];
    begin.call(this);
}

function begin() {
    var self = this,
        temp,
        randomIndex;
    self.originalPlaceholder = self.el.getAttribute('placeholder');
    if (self.options.shuffle) {
        for (var i = self.texts.length; i--;) {
            randomIndex = ~~(Math.random() * i);
            temp = self.texts[randomIndex];
            self.texts[randomIndex] = self.texts[i];
            self.texts[i] = temp;
        }
    }

    if (true) {
        self.el.addEventListener('focus', function () {
            // processText.call(this,0);
            cleanUp.call(this);
        }.bind(this));
        self.el.addEventListener('blur', function () {
            // cleanUp.call(this);
            processText.call(this, 0);
        }.bind(this));
    }
    else {
        processText.call(this, 0);
    }
};

function cleanUp() {
    // Stop timeouts
    for (var i = timeouts.length; i--;) {
        clearTimeout(timeouts[i]);
    }
    this.el.setAttribute('placeholder', this.originalPlaceholder);
    timeouts.length = 0;
};

function typeString(str, t, callback) {
    var self = t,
        timeout;

    if (!str) { return false; }
    function setTimeoutCallback(index) {
        // Add cursor `|` after current substring unless we are showing last
        // character of the string.
        self.el.setAttribute('placeholder', str.substr(0, index + 1) + (index === str.length - 1 || !self.options.showCursor ? '' : self.options.cursor));
        if (index === str.length - 1) {
            callback();
        }
    }
    for (var i = 0; i < str.length; i++) {
        timeout = setTimeout(setTimeoutCallback, i * self.options.letterDelay, i);
        timeouts.push(timeout);
    }
};

function processText(index) {
    var self = this,
        timeout;

    typeString(self.texts[index], this, function () {
        timeout = setTimeout(function () {
            processText.call(this, self.options.loop ? ((index + 1) % self.texts.length) : (index + 1));
        }.bind(this), self.options.sentenceDelay);
        timeouts.push(timeout);
    }.bind(this));
};

export function reactplaceholder(params) {
    if (!isPlaceHolderSupported) { return; }
    new PlaceHolder(params.el, params.sentences, params.options);
};

// open to the world.
// commonjs
if (typeof exports === 'object') {
    module.exports = reactplaceholder;
}
// AMD module
else if (typeof define === 'function' && define.amd) {
    define(function () {
        return searchPlaceholder;
    });
}
// Browser global
else {
    window.reactplaceholder = reactplaceholder;
}

