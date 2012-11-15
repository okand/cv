$(document).ready(function() {
  function get_matcher(hash) {
    if (hash) {
      return matcher = '*[id^="' + hash + '"]';
    } else {
      return matcher = 'a, li';
    }
  }

  function highlight(hash, the_class) {
    // clear selection...
    if (the_class == 'selected') {
      matcher = get_matcher(false);
      
      $(matcher).each(function(i) {
        $(this).removeClass(the_class);
        $(this).parents('div', 'li').slice(0, 1).removeClass(the_class);
      });
    }

    matcher = get_matcher(hash);

    // explicitly set or unset
    $(matcher).each(function(i) {
      if (hash) {
        $(this).addClass(the_class);
        $(this).parentsUntil('div', 'li').slice(0, 1).addClass(the_class);
      } else {
        $(this).removeClass(the_class);
        $(this).parentsUntil('div', 'li').slice(0, 1).removeClass(the_class);
      }
    });
  }

  hash = window.location.hash.slice(1);

  highlight(hash, 'selected');

  $('a[href^="#"]').click(function(event) {
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
