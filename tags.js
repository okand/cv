$(document).ready(function() {
  function get_matcher(hash) {
    if (hash) {
      return matcher = 'a[id^="' + hash + '"], li[id^="' + hash + '"]';
    } else {
      return matcher = 'a[id], li[id]';
    }
  }

  function highlight(hash, the_class) {
    // clear selection...
    if (the_class == 'selected') {
      matcher = get_matcher(false);
      if (hash) {
        // selection is important now
        $('body').addClass('selection');
      }
      
      $(matcher).each(function(i) {
        $(this).removeClass(the_class);
        host = $(this).parentsUntil('div', 'li').slice(-2, -1)
        host.removeClass(the_class);
        host.addClass('un'+the_class);
      });
    }

    matcher = get_matcher(hash);

    // explicitly set or unset
    $(matcher).each(function(i) {
      host = $(this).parentsUntil('div', 'li').slice(-2, -1)
      if (hash) {
        $(this).addClass(the_class);
        host.addClass(the_class);
        host.removeClass('un'+the_class);
      } else {
        $(this).removeClass(the_class);
        host.removeClass(the_class);
        host.addClass('un'+the_class);
      }
    });
  }

  hash = window.location.hash.slice(1);

  highlight(hash, 'selected');

  $('body').click(function(event) {
    // deselect everything
    highlight(false, 'selected');
    // selection is not important
    $(this).removeClass('selection');
  });

  $('a[href^="#"]').click(function(event) {
    event.stopPropagation();
    hash = $(this).attr('href').slice(1);
    highlight(hash, 'selected');
  });

  $('a[href^="#"]').hover(
      function() {
        hash = $(this).attr('href').slice(1);
        highlight(hash, 'hover');
      },
      function() {
        hash = $(this).attr('href').slice(1);
        highlight(false, 'hover');
      }
  );
});
