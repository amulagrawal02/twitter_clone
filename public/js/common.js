console.log("Inside the js file");
var timestamp;
async function refreshTweet() {
  $("#allTweets").empty();
  const tweets = await axios.get("/api/post");

  for (let post of tweets.data) {
    console.log(post);
    timestamp = timeDifference(new Date(), new Date(post.createdAt));
    console.log("timestamp", timestamp);
    const Html = postHtml(post);
    $("#allTweets").append(`<li>${Html}</li>`);
  }
}
refreshTweet();

$("#submitPostButton").click(async () => {
  const postData = $("#post-text").val();
  console.log(postData);
  const newPost = await axios.post("/api/post", { content: postData });
  // console.log(newPost);
  refreshTweet();
  $("#post-text").val("");
});
function postHtml(postData) {
  return `
    <div class = 'post'>
      <div class = 'mainContentContainer'>
        <div class = 'userImageContainer'>
          <img src='${postData.postedBy.profilePic}' alt = 'userImage'>
        </div>
        <div class = "postContentContainer">
          <div class = 'header'>
          <a href = '#' class = "displayName">${postData.postedBy.firstName} ${postData.postedBy.lastName}</a>
          <span class = "username">@${postData.postedBy.username}</span>
          <span class = "date">${timestamp}</span>
          </div>
          <div class = 'postBody'>
          <span>${postData.content}</span>
          </div>
          <div class='postFooter'>
            <div class='postButtonContainer'>
                <button>
                    <i class='far fa-comment'></i>
                </button>
            </div>
            <div class='postButtonContainer green'>
                <button class='retweet'>
                    <i class='fas fa-retweet'></i>
                </button>
            </div>
            <div class='postButtonContainer red'>
                <button class='likeButton'>
                    <i class='far fa-heart'></i>
                   
                </button>
            </div
        <div>
      </div>
    </div>`;
}

function timeDifference(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    if (elapsed / 1000 < 30) {
      return "Just now";
    }

    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
}
