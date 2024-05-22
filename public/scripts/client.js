/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {

  // Function to render tweets on the page
  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      if ($tweet) {
        $('#tweets-container').prepend($tweet);
      }
    }
  };


  // Function to create HTML structure for a single tweet
  const createTweetElement = function (tweet) {

    const timeAgo = timeago.format(tweet.created_at);

    const $header = $('<header>');
    const $userInfo = $('<div class="user-info">');
    const $userProfile = $('<div class="user-profile">');
    const $avatar = $('<img>').attr('src', tweet.user.avatars).attr('alt', 'User Avatar');
    const $name = $('<span>').text(tweet.user.name);
    const $handle = $('<span class="user-handle">').text(tweet.user.handle);

    $userProfile.append($avatar, $name);
    $userInfo.append($userProfile, $handle);
    $header.append($userInfo);

    const $content = $('<div class="tweet-content">');
    const $text = $('<p>').text(tweet.content.text);
    $content.append($text);

    const $footer = $('<footer>');
    const $time = $('<span>').text(timeAgo);
    $footer.append($time);

    const $tweet = $('<article class="tweet">');
    $tweet.append($header, $content, $footer);

    return $tweet;
  };


  // Function to load tweets from the server
  const loadTweets = function () {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json'
    })
      .done(function (response) {
        renderTweets(response);
      })
      .fail(function (xhr, status, error) {
        console.error('Error:', error);
      });
  };


  // Event listener for form submission
  $('#tweet-form').submit(function (event) {
    event.preventDefault();
    const formData = $(this).serialize();

    const tweetContent = formData.trim().slice(5);
    if (!tweetContent) {
      alert('Error: Tweet cannot be empty.');
      return;
    } else if (tweetContent.length > 140) {
      alert('Error: Tweet cannot exceed 140 characters.');
      return;
    }
    
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData
    })
      .done(function (response) {
        renderTweets([response]);
      })
      .fail(function (err) {
        console.error('Error:', err);
      });
  });

  loadTweets();

});