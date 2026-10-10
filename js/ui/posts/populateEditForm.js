export default function populateEditForm(post) {
  const { title, body, tags, media, id } = post;

  const form = document.querySelector("#editPostForm");
  form.title.value = title;
  form.body.value = body;
  form.tags.value = tags?.join(", ") || "";
  form.mediaUrl.value = media?.url || ""; // optional chaining operator
  form.mediaAlt.value = media?.alt || "";
  form.id.value = id;
}
