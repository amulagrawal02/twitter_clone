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

$("#tab-1").click(async (e) => {
  $(".userPostCnt").empty();
  $("#Liked").removeClass("active");
  $("#tab-1").addClass("active");
  loadPost();
});

$("#Liked").click(async (e) => {
  console.log("Clicked");
  $("#tab-1").removeClass("active");
  $("#Liked").addClass("active");
  $(".userPostCnt").empty();
  const profileData = await axios.get(`/profile/Liked/${profileId}`);
  const likedPost = profileData.data.likedPost;

  for (let post of likedPost) {
    const postData = await axios.get(`/api/post/${post}`);
    console.log(postData);
    timestamp = timeDifference(new Date(), new Date(postData.data.createdAt));
    const Html = await postHtml(postData.data);
    $(".userPostCnt").prepend(`<li>${Html}</li>`);
  }
});
