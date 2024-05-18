// Update character counter on the page
$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    const counterElement = $(this).closest('form').find('.counter');

    const maxChars = 140;
    const charCount = $(this).val().length;
    const charsLeft = maxChars - charCount;

    counterElement.text(charsLeft);

    if (charsLeft < 0) {
      counterElement.addClass('invalid');
    } else {
      counterElement.removeClass('invalid');
    }
  });
});
