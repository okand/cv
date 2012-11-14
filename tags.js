$(document).ready(function() {
  function highlight(hash, the_class) {
    // clear selection
    $('a.tag').each(function(i) {
      $(this).removeClass(the_class);
      $(this).closest('li').removeClass(the_class);
    });
    
    if (hash) {
      matcher = 'a.tag:contains("' + hash + '")';

      $(matcher).each(function(i) {
        $(this).addClass(the_class);
        $(this).closest('li').addClass(the_class);
      });
    }
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
