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