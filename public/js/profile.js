$(document).ready(() => {
  loadPost();
});

async function loadPost() {
  var timestamp;
  const postData = await axios.get("/api/post", {
    params: { postedBy: profileId },
  });
  for (let post of postData.data) {
    timestamp = timeDifference(new Date(), new Date(post.createdAt));
    const Html = await postHtml(post);
    $(".userPostCnt").prepend(`<li>${Html}</li>`);
  }
}
