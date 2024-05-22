/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


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
          <span>${formatDate(tweet.created_at)}</span>
        </footer>
      </article>
    `)
    return $tweet;
  };

  // Function to format the date from timestamp
  const formatDate = function(timestamp) {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

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

  renderTweets(data);

});