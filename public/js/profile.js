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

$("#Liked").click(async (e) => {
  console.log("Clicked");
  console.log($(e.target).attr());
  $(".userPostCnt").empty();
  const profileData = await axios.get(`/profile/Liked/${profileId}`);
  const likedPost = profileData.data.likedPost;

  for (let post of likedPost) {
    console.log(post);
    const postData = await axios.get(`/api/post/${post}`);
    timestamp = timeDifference(new Date(), new Date(postData.data.createdAt));
    const Html = await postHtml(postData.data);
    $(".userPostCnt").prepend(`<li>${Html}</li>`);
  }
});
