(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// @license MIT - http://github.com/bilde/rainbow
!function(){var o=function(r,t){if(o.colors[t])return this.color=o.colors[t].toRgb(r),this;throw new Error("No color handler "+t)};o.prototype.get=function(r){if(o.colors[r])return o.colors[r].fromRgb(this.color);throw new Error("No color handler "+r)},o.prototype.blend=function(o,r){return this.color=[Math.round(r*this.color[0]+(1-r)*o.color[0]),Math.round(r*this.color[1]+(1-r)*o.color[1]),Math.round(r*this.color[2]+(1-r)*o.color[2])],this},o.prototype.darken=function(r){return this.blend(new o([0,0,0],"rgb"),r),this},o.prototype.lighten=function(r){return this.blend(new o([255,255,255],"rgb"),r),this},o.colors={},o.colors.rgb={fromRgb:function(o){return o},toRgb:function(o){return o}},o.colors.hsl={toRgb:function(o){function r(o,r,t){return 0>t&&(t+=1),t>1&&(t-=1),1/6>t?o+(r-o)*t*6:.5>t?r:2/3>t?o+(r-o)*(2/3-t)*6:o}var t=o[0]/360,n=o[1]/100,e=o[2]/100;return m2=.5>=e?e*(n+1):e+n-e*n,m1=2*e-m2,[Math.round(255*r(m1,m2,t+1/3)),Math.round(255*r(m1,m2,t)),Math.round(255*r(m1,m2,t-1/3))]},fromRgb:function(o){var r,t,n=o[0]/255,e=o[1]/255,u=o[2]/255,i=Math.max(n,e,u),c=Math.min(n,e,u),l=Math.round(.5*(i+c)*100);return i===c?[0,0,l]:(i===n&&e>=u?r=60*(e-u)/(i-c):i===n&&u>e?r=60*(e-u)/(i-c)+360:i===e?r=60*(u-n)/(i-c)+120:i===u&&(r=60*(n-e)/(i-c)+240),.5>=l?t=(i-c)/2*l:l>.5&&(t=(i-c)/(2-2*l)),[Math.round(360*r),Math.round(100*t),l])}},o.colors.hex={fromRgb:function(o){return"#"+((1<<24)+(o[0]<<16)+(o[1]<<8)+o[2]).toString(16).slice(1)},toRgb:function(o){var r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(o);return[parseInt(r[1],16),parseInt(r[2],16),parseInt(r[3],16)]}},"undefined"!=typeof module&&"undefined"!=typeof module.exports?module.exports=o:window.RainbowColor=o}();
},{}],2:[function(require,module,exports){
/* @license selix - github.com/bilde - MIT License */
(function(){var e,t,n,a,r,o,c;n=function(e,t){return e.value.slice(0,t).split("\r\n").length-1},e=function(e){var t,a,r,o;return"number"==typeof e.selectionStart&&"number"==typeof e.selectionEnd?{start:e.selectionStart,end:e.selectionEnd}:document.selection&&document.selection.createRange&&e.createTextRange?(t=e.createTextRange(),t.moveToBookmark(document.selection.createRange().getBookmark()),r=e.createTextRange(),r.collapse(!1),t.compareEndPoints("StartToEnd",r)>=0?o=a=e.value.length:(o=-t.moveStart("character",-e.value.length),o+=n(e,o),t.compareEndPoints("EndToEnd",r)>=0?a=e.value.length:(a=-t.moveEnd("character",-e.value.length),a+=n(e,a))),{start:o,end:a}):void 0},r=function(e,t,a){var r;return null==a&&(a=t),"number"==typeof e.selectionStart&&"number"==typeof e.selectionEnd?(e.selectionStart=t,e.selectionEnd=a):document.selection&&document.selection.createRange&&e.createTextRange?(r=e.createTextRange(),r.collapse(!0),r.moveEnd("character",a-n(e,a)),r.moveStart("character",t-n(e,t)),r.select()):void 0},t=function(t){var n;return n=e(t),t.value.slice(n.start,n.end)},o=function(t,n){var a;return a=e(t),t.value=t.value.slice(0,a.start)+n+t.value.slice(a.end)},c=function(n,a,c){var l,i,u;return l=e(n),u=t(n),o(n,a+u+c),i=l.start+a.length,r(n,i,i+u.length)},a={getCaret:e,setCaret:r,getText:t,setText:o,wrap:c},"undefined"!=typeof exports?module.exports=a:"undefined"!=typeof window&&(window.selix=a)}).call(this);
},{}],3:[function(require,module,exports){
// Forum post editor using Selix
// Copyright 2014 bilde (github.com/bilde) <torjusti@gmail.com>
// Released under the MIT license

var picker = require('./picker');
var RainbowColor = require('rainbowcolor');
var selix = require('selix');

var $overlay = $('#editor-overlay');
var $main = $('#editor-overlay-main');
var $window = $(window);

function positionOverlay() {
  $main.css({
    top: $window.height() / 2 - $main.height() / 2,
    left: $window.width() / 2 - $main.width() / 2
  });
}

function showOverlay() {
  $window.bind('resize', positionOverlay);
  $overlay.show().addClass('editor-overlay-animate');
  $main.addClass('editor-main-animate');
}

function hideOverlay() {
  $window.unbind('resize', positionOverlay);
  $overlay.hide().removeClass('editor-overlay-animate')
  $main.removeClass('editor-main-animate');
}

function showOverlayElement(elem) {
  $main.children().hide();
  $(elem).show();
  showOverlay();
  positionOverlay();
}

var canClose = true;

$overlay.click(function() {
  if (canClose) {
    hideOverlay();
  } else {
    canClose = true;
  }
});

$main.click(function(e) {
  e.stopPropagation();
});

$main.mousedown(function(e) {
  canClose = false;
});

$main.mouseup(function(e) {
  canClose = true;
});

var $popup = $('#editor-popup');

// We store the last clicked button and use it later to close the
// popup window when the button is pressed a second time.
var lastClicked = false;

function positionPopup(base) {
  var $base = $(base), pos = $base.position();
  $popup.css({
    display: 'block',
    top: pos.top + $base.height() + 20,
    left: pos.left,
    maxWidth: $('#editor-main').width() - pos.left - parseInt($('#editor-main').css('paddingRight'), 10)
  });
}

function showPopup() {
  $popup.show().addClass('editor-popup-animate');
}

function hidePopup() {
  $popup.hide().removeClass('editor-popup-animate');
  lastClicked = false;
}

function showPopupElement(elem, base) {
  if (lastClicked === base) {
    hidePopup();
    lastClicked = false;
    return;
  }

  lastClicked = base;
  $popup.children().hide();
  $(elem).css('display', 'inline-block');
  showPopup();
  positionPopup(base);
}

var editor = document.getElementById('editor-main');

var handlers = {
  // We can safely ignore the current element here.
  wrap: function(curElem, code) {
    selix.wrap(editor, code[0], code[1]);
  },

  color: function(curElem) {
    showPopupElement(document.getElementById('editor-popup-color'), curElem);
  },

  link: function(curElem) {
    showPopupElement(document.getElementById('editor-popup-link'), curElem);
  },

  smiley: function(curElem) {
    showPopupElement(document.getElementById('editor-popup-smiley'), curElem);
  },

  image: function(curElem) {
    showPopupElement(document.getElementById('editor-popup-image'), curElem);
  }
};

$('.editor-button').each(function() {
  $(this).click(function() {
    var data = this.getAttribute('data-editor').split(',');
    handlers[data[0]](this, [data[1], data[2]]);
  });
});

var colorPickerShow = document.getElementById('editor-picker-value');

new ColorPicker(document.getElementById('editor-picker-main')).update(function(hsl) {
  var hexValue = new RainbowColor(hsl, 'hsl').get('hex');
  colorPickerShow.value = hexValue;
  colorPickerShow.style.color = hexValue;
});

$('#editor-picker-add').click(function() {
  if (colorPickerShow.value) {
    selix.wrap(editor, '[color=' + colorPickerShow.value + ']', '[/color]');
    hideOverlay();
  }
});

$('#editor-popup-color-open').click(function() {
  hidePopup();
  showOverlayElement(document.getElementById('editor-picker'));
});

var colorPickerPopupInput = document.getElementById('editor-popup-color-choose');

$('#editor-popup-color-add').click(function() {
  if (colorPickerPopupInput.value) {
    selix.wrap(editor, '[color=' + colorPickerPopupInput.value + ']', '[/color]');
    hidePopup();
  }
});

var linkPopupInput = document.getElementById('editor-popup-link-choose');
var linkPopupText = document.getElementById('editor-popup-link-text');

$('#editor-popup-link-add').click(function() {
  if (linkPopupInput.value) {
    selix.setText(editor, '[url=' + linkPopupInput.value + ']' + (linkPopupText.value || linkPopupInput.value) + '[/url]', editor);
    hidePopup();
  }
});

$('.editor-smiley').click(function() {
  selix.setText(editor, this.getAttribute('data-editor'), true);
  hidePopup();
});

var imagePopupInput = document.getElementById('editor-popup-image-choose');

$('#editor-popup-image-add').click(function() {
  if (imagePopupInput.value) {
    editor.focus();
    selix.setText(editor, '[img]' + imagePopupInput.value + '[/img]', true);
    hidePopup();
  }
});
},{"./picker":4,"rainbowcolor":1,"selix":2}],4:[function(require,module,exports){
// ColorPicker
// Copyright 2014 bilde (github.com/bilde) <torjusti@gmail.com> 
// Released under the MIT license

(function() {
  // The ColorPicker function.
  // Container should be an empty container to use for the ColorPicker.
  function ColorPicker(container) {
    // Alias this so that we can use it in functions with a different scope.
    var self = this;

    // Updates the hsl value and calls all listeners.
    function update() {
      self.hsl = [self.hue, 100, self.lightness];
      var listeners = self.listeners;
      for (var i = 0, j = listeners.length; i < j; i++) {
        self.listeners[i](self.hsl);
      }
    }

    function updatePosition(indicator, elem, leftOffset) {
      $(indicator).css({
        display: 'block',
        position: 'absolute',
        // We need to account for the top border width to prevent the indicator from being
        // one pixel too far up, overlapping with the top border.
        // We also add the top margin because I have no idea what is going on if we do not do it.
        top: $(elem).position().top + parseInt($(elem).css('margin-top'), 10) + parseInt($(elem).css('border-top-width'), 10),
        // Warning: Horrible hack below. We add 1 to the left offset, because if we do not,
        // the current position indicator element will stay behind the cursor, thus preventing the
        // mouse up event from being called, causing us to perpetually drag the cursor around.
        left: $(elem).position().left + leftOffset,
        height: $(elem).height()
      });
    }

    // Set the data now so that we can use it later witout
    // any danger of it not existing.
    self.hue = 360;
    self.lightness = 50;

    // Create the hue selector.
    var hueImage = document.createElement('img');
    hueImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAAyCAIAAAD+5danAAAAx0lEQVR42u3UywqAIBBA0THq/z/YoCIoInoSIcI5uJjMjS5uGiKiXVZXzZwj+nmtw+7zj/2z+cn5aW0uUM9b51Tgob/s9/fXO/tV8Hx6crHjucz5JgBeEg5AOADhAIQDEA5AOACEAxAOQDgA4QCEA0A4AOEAhAMQDkA4AIQDEA5AOADhAIQDEA4A4QCEAxAOQDgA4QAQDkA4AOEAhAMQDgDhAIQDEA5AOADhABAOQDgA4QCEAxAOQDgAhAMQDkA4AOEAhAPg2gjgMbRnviAoFQAAAABJRU5ErkJggg==';
    container.appendChild(hueImage);

    // Make sure we only update when the mouse is being held down.
    // Important note: We are binding events to the body, because if we do not, 
    // the user can simply drag the cursor out of the picker and be perpetually dragging.
    var hueDragging = false;

    $(document.body).mousedown(function(e) {
      hueDragging = true;
    });

    $(document.body).mouseup(function() {
      hueDragging = false;
    });

    $(hueImage).bind('mousedown mouseup mousemove', function(e) {
      e.preventDefault();
    });

    // Update our data when the hue changes.
    $(hueImage).mousemove(function(e) {
      if (hueDragging) {
        var pos = e.pageX - $(hueImage).offset().left;
        self.hue = pos;
        update(this);
        updatePosition(huePosition, hueImage, pos);
      }
    });

    // Create the lightness selector.
    var lightnessImage = document.createElement('img');
    lightnessImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAAyCAAAAABU7B4sAAABCElEQVR42u2awY6DMBDFWP//P9PL7rVU1cpkgqseOFiidWaUCbyf8zz+vu+vLoHQdyjH7+c8Lq4ugVXQY0mUVX/Y9+iaFcFmlpdFyYeDkg8HJR8Oyj7TxtqDCY+svxuWmbrcQcmHg5IPByUfDsqjpo0bBxOqP+e2ZNnpELLsoOTDQRl2kh2LMuwkO/YxCNWfsyBk2elmUueg5MNBGbq3jEMZureMQzkKYyjdTF3uFA/5cFDy4aDkw0HpKYSDMuc/zB5MqMsdtNiuhBbbLbb7tNhur0f+BaWYgINSlztosV0JLbZbbHcvlH0PvVNiu5vW313LXGxXQovtSmixXQkttjshtttg8jn6ArzSpiCLmzRdAAAAAElFTkSuQmCC';
    container.appendChild(lightnessImage);

    // Make sure we only update when the mouse is being held down.
    var lightnessDragging = false;

    $(document.body).mousedown(function(e) {
      lightnessDragging = true;
    });

    $(document.body).mouseup(function() {
      lightnessDragging = false;
    });

    $(lightnessImage).bind('mousedown mouseup mousemove', function(e) {
      e.preventDefault();
    });

    // Update our data when the lightness changes.
    $(lightnessImage).mousemove(function(e) {
      if (lightnessDragging) {
        var pos = e.pageX - $(lightnessImage).offset().left;
        self.lightness = 100 - Math.min(Math.floor(pos / 360 * 100), 100);
        update(this);
        updatePosition(lightnessPosition, lightnessImage, pos);
      }
    });

    // Create and insert the hue position elements.
    var huePosition = document.createElement('div');
    var lightnessPosition = document.createElement('div');
    huePosition.className = lightnessPosition.className = 'color-picker-position';
    container.appendChild(huePosition);
    container.appendChild(lightnessPosition);
  }

  // Contains all update listeners.
  ColorPicker.prototype.listeners = [];

  // Registers an update listener.
  ColorPicker.prototype.update = function(fn) {
    this.listeners.push(fn);
  };

  // Expose ColorPicker to the global object.
  window.ColorPicker = ColorPicker;
})();
},{}]},{},[3])