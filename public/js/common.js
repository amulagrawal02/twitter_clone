var timestamp;
async function refreshTweet() {
  $("#allTweets").empty();
  const tweets = await axios.get("/api/post");

  for (let post of tweets.data) {
    timestamp = timeDifference(new Date(), new Date(post.createdAt));
    const Html = postHtml(post);
    $("#allTweets").prepend(`<li>${Html}</li>`);
  }
}
refreshTweet();

$("#submitPostButton").click(async () => {
  const postData = $("#post-text").val();
  const newPost = await axios.post("/api/post", { content: postData });
  refreshTweet();
  $("#post-text").val("");
});

$(".postsContainer").on("click", ".likeButton", async (e) => {
  // console.log("clicked");
  var btn = $(e.target);
  btn = ButtonClick(btn);
  const postId = getPostId(btn);
  const postData = await axios.patch(`/api/posts/${postId}/like`);
  btn.find("span").text(postData.data.likedBy.length);
});

function postHtml(postData) {
  return `
    <div class = 'post' data-id='${postData._id}'>
        <div class = 'userImageContainer'>
          <img src='${postData.postedBy.profilePic}' alt = 'userImage'>
        </div>


      <div class = 'mainContentContainer'>
          <div class = 'header'>
            <a href = '#' class = "fw-bold displayName">${postData.postedBy.firstName} ${postData.postedBy.lastName}</a>
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
                    <span>${postData.likedBy.length}</span>
                </button>
            </div
          <div>

      </div>
    </div>`;
}

function ButtonClick(btn) {
  const isRoot = btn.has("button");
  const rootBtn = isRoot === true ? btn : btn.closest("button");
  return rootBtn;
}

function getPostId(btn) {
  const isRoot = btn.hasClass("post");
  const rootBtn = isRoot === true ? btn : btn.closest(".post");
  let value = rootBtn.data().id;
  return value;
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

    return Math.round(elapsed / 1000) + "s";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + "m";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + "h";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + "d";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + "m";
  } else {
    return Math.round(elapsed / msPerYear) + "y";
  }
}
