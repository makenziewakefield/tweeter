/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {

  // Function to render tweets on the page
  const renderTweets = function (tweets) {
    const $container = $('tweets-container');
    $container.empty();
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

    const $header = $('<div class="tweet-header">');
    const $userProfile = $('<div class="user-profile">');
    const $avatar = $('<img>').attr('src', tweet.user.avatars).attr('alt', 'User Avatar');
    const $name = $('<span class="user-name">').text(tweet.user.name);
    const $handle = $('<span class="user-handle">').text(tweet.user.handle);

    $userProfile.append($avatar, $name);
    $header.append($userProfile, $handle);

    const $content = $('<div class="tweet-content">');
    const $text = $('<p>').text(tweet.content.text);
    $content.append($text);

    const $footer = $('<div class="tweets-footer">');
    const $time = $('<span>').text(timeAgo);
    const $icons = $('<div>').append(
      $('<i>').addClass('fa-solid fa-flag'),
      $('<i>').addClass('fa-solid fa-retweet'),
      $('<i>').addClass('fa-solid fa-heart')
    );
    $footer.append($time, $icons);

    const $tweet = $('<article class="tweets-container">');
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


  // Function to validate tweet content
  const isTweetValid = function (tweetContent) {
    if (!tweetContent) {
      alert('Error: Tweet cannot be empty.');
      return;
    } else if (tweetContent.length > 140) {
      alert('Error: Tweet cannot exceed 140 characters.');
      return;
    }
    return true;
  };


  // Event listener for form submission
  $('#tweet-form').submit(function (event) {
    event.preventDefault();
    const formData = $(this).serialize();
    const tweetContent = formData.trim().slice(5);

    if (!isTweetValid(tweetContent)) {
      return;
    }

    $.post('/tweets', formData)
      .done(function (data) {
        $('#tweet-text').val('');
        $('#tweet-container').empty();
        loadTweets();
      })
      .fail(function (err) {
        console.error('Error:', err);
      });
  });

  loadTweets();

});