var timestamp;

// for fetching old posts
async function refreshTweet() {
  $("#allTweets").empty();
  const tweets = await axios.get("/api/post");
  for (let post of tweets.data) {
    timestamp = timeDifference(new Date(), new Date(post.createdAt));
    const Html = await postHtml(post);
    $("#allTweets").prepend(`<li>${Html}</li>`);
  }
}
refreshTweet();

// for new post
$("#submitPostButton").click(async () => {
  const postData = $("#post-text").val();
  const newPost = await axios.post("/api/post", { content: postData });
  refreshTweet();
  $("#post-text").val("");
});

// For like functionality
$(".postsContainer").on("click", ".likeButton", async (e) => {
  // console.log("clicked");
  var btn = $(e.target);
  btn = ButtonClick(btn);
  const postId = getPostId(btn);
  const postData = await axios.patch(`/api/posts/${postId}/like`);
  btn.find("span").text(postData.data.likedBy.length);
});

// create post Html
async function postHtml(postData) {
  let replyEmail = "";
  let replyData = "";
  let starter = "";
  if (postData.replyTo && postData.replyTo.length > 0) {
    replyEmail = await getReplyName(postData.replyTo);
    replyEmail = `${replyEmail}`;
    starter = "@";
    replyData = "Replying to ";
  }

  return `
    <div class = 'post' data-id='${postData._id}'>
        <div class = 'userImageContainer'>
          <img src='${postData.postedBy.profilePic}' alt = 'userImage'>
        </div>


      <div class = 'mainContentContainer'>
          <div class = 'header'>
            <a href = '/profile/${postData.postedBy.username}' class = "fw-bold displayName">${postData.postedBy.firstName} ${postData.postedBy.lastName}</a>
            <span class = "username">@${postData.postedBy.username}</span>
            <span class = "date">${timestamp}</span>
          </div>

          <div class = "replyArea">
          <span>${replyData}</span>
          <span><a href = "/profile/${replyEmail}">${starter}${replyEmail}</a></span>
          </div>

          <div class = 'postBody'>
          <span>${postData.content}</span>
          </div>
          <div class='postFooter'>
            <div class='postButtonContainer'>
                 <button type="button" class = 'reply' data-bs-toggle="modal" data-bs-target="#replyModal">
                    <i class='far fa-comment'></i>
                    <span class= "mt-small">${postData.ctnReply.length}</span>
                  </button>
            </div>
            <div class='postButtonContainer'>
                <button class='retweet'>
                    <i class='fas fa-retweet'></i>
                    
                </button>
            </div>
            <div class='postButtonContainer '>
                <button class='likeButton'>
                    <i class='far fa-heart'></i>
                    <span class= "mt-small">${postData.likedBy.length}</span>
                </button>
            </div
          <div>

      </div>
    </div>`;
}

// open modal when user click on reply button
$(".postsContainer").on("click", ".reply", async (e) => {
  console.log("clicked");
  var btn = $(e.target);
  btn = ButtonClick(btn);
  const postId = getPostId(btn);
  console.log(postId);
  const postData = await axios.get(`/api/post/${postId}`);
  const html = await postHtml(postData.data);
  $(".modal-body").attr("data-id", `${postId}`);
  $("#originalPostContainer").empty();
  $("#originalPostContainer").append(html);
});

// Submit reply post;
$("#submitReplyButton").click(async (e) => {
  const postText = $("#reply-text-container").val();
  const replyTo = $(".modal-body").attr("data-id");
  if (postText && postText.length > 0) {
    const postData = await axios.post("/api/post", {
      content: postText,
      replyTo: replyTo,
    });
    console.log(postData.data);
    const data = await axios.post(`/api/post/${replyTo}/${postData.data._id}`);
    const html = postHtml(postData.data);
    $("#reply-text-container").val("");
  }

  console.log("start");
  // await loadPost();
  refreshTweet();
  console.log("end");
});

// for like ButtonHandler
function ButtonClick(btn) {
  const isRoot = btn.has("button");
  const rootBtn = isRoot === true ? btn : btn.closest("button");
  return rootBtn;
}

// for get postId of any post
function getPostId(btn) {
  const isRoot = btn.hasClass("post");
  const rootBtn = isRoot === true ? btn : btn.closest(".post");
  let value = rootBtn.data().id;
  return value;
}

// get the name of the person who reply on a particular post
async function getReplyName(replyTo) {
  const replyData = await axios.get(`/api/post/reply/${replyTo}`);
  const replyName = replyData.data.postedBy.username;
  return replyName;
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
