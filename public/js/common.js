console.log("Inside the js file");

async function refreshTweet() {
  $("#allTweets").empty();
  const tweets = await axios.get("/api/post");

  for (let post of tweets.data) {
    $("#allTweets").append(`<li>${post.content} by ${post.postedBy} </li>`);
  }
}
refreshTweet();

$("#submitPostButton").click(async () => {
  const postData = $("#post-text").val();
  console.log(postData);
  const newPost = await axios.post("/api/post", { content: postData });
  console.log(newPost);
  refreshTweet();
  $("#post-text").val("");
});
