$(document).ready(function() {
  function get_matcher(hash) {
    if (hash) {
      return matcher = 'a[id^="' + hash + '"], li[id^="' + hash + '"]';
    } else {
      return matcher = 'a[id], li[id]';
    }
  }

  function clear() {
    // deselect everything
    highlight(false, 'selected');

    $('body').removeClass('selection');
    history.pushState("", document.title, window.location.pathname + window.location.search);
  }

  function highlight(hash, the_class) {
    // unbind all tags
    if (!hash) {
      $('a.tag').unbind('click');
    }

    // clear selection...
    if (the_class == 'selected') {
      matcher = get_matcher(false);
      if (hash) {
        // selection is important now
        $('body').addClass('selection');
      }
      
      $(matcher).each(function(i) {
        $(this).removeClass(the_class);
        host = $(this).parents('li').slice(0, 1)
        host.removeClass(the_class);
        host.addClass('un'+the_class);
      });
    }

    matcher = get_matcher(hash);

    // explicitly set or unset
    $(matcher).each(function(i) {
      host = $(this).parents('li').slice(0, 1)
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
    
    // rebind tags
    $('a[href^="#"]').click(function(event) {
      if (!$(this).hasClass('selected')) {
        event.stopPropagation();
        hash = $(this).attr('href').slice(1);
        highlight(hash, 'selected');
      }
    });

    // bind selected tags to deselect
    if (hash) {
      $('body.selection a.tag.selected').unbind('click').bind('click', function(event) {
        event.preventDefault();
        clear();
      });
    }
  }

  hash = window.location.hash.slice(1);

  highlight(hash, 'selected');

  $('body').click(function(event) {
    clear();
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
