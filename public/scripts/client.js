/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {

  // Function to render tweets on the page
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      if ($tweet) {
        $('#tweets-container').prepend($tweet);
      }
    }
  };

  // Function to create HTML structure for a single tweet
  const createTweetElement = function(tweet) {
    const timeStamp = timeago.format(tweet.created_at);
    let $tweet = (`
      <article class="tweet">
        <header>
          <div class="user-info">
            <div class="user-profile">
              <img src="${tweet.user.avatars}" alt="User Avatar">
              <span>${tweet.user.name}</span>
            </div>
            <span class="user-handle">${tweet.user.handle}</span>
          </div>
        </header>
        <div class="tweet-content">
          <p>${tweet.content.text}</p>
        </div>
        <footer>
          <span>${timeStamp}</span>
        </footer>
      </article>
    `)
    return $tweet;
  };

  // Function to load tweets from the server
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json', // Expect JSON response
      success: function(response) {
        renderTweets(response); // Render tweets on success
      },
      error: function(xhr, status, error) {
        console.error('Error:', error);
      }
    });
  };


  // Event listener for form submission
  $('#tweet-form').submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
  
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData
    })
    .done(function(response) {
      renderTweets([response]);
    })
    .fail(function(err) {
      console.error('Error:', err);
    });
  });

  loadTweets();

});