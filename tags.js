$(document).ready(function() {
  function highlight(hash) {
    // clear selection
    $('a.tag').each(function(i) {
      $(this).removeClass('selected');
    });

    matcher = 'a.tag:contains("' + hash + '")';

    $(matcher).each(function(i) {
      $(this).addClass('selected');
    });
  }

  hash = window.location.hash.slice(1);

  highlight(hash);

  $('a[href^="#"]').click(function(event) {
    hash = $(this).attr('href').slice(1);
    highlight(hash);
  });
});
