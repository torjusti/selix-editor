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