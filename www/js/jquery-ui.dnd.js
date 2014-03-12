$(".drag").draggable({
  helper: 'clone',
  containment: 'map',
  start: function(evt, ui) {
      $('#sidebar').fadeTo('fast', 0.6, function() {});
  },
  stop: function(evt, ui) {
      $('#sidebar').fadeTo('fast', 1.0, function() {});

      // INSERT Point
  }
});