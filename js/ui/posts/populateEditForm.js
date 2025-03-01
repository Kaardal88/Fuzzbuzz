export default function populateEditForm(post) {
  const { title, body, media, id } = post;

  const form = document.querySelector("#editPostForm");
  form.title.value = title;
  form.body.value = body;
  form.mediaUrl.value = media?.url || ""; // optional chaining operator
  form.mediaAlt.value = media?.alt || "";
  form.id.value = id;
}
