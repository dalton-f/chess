const loadPositionForm = document.getElementById("loadPositionForm");

loadPositionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(loadPositionForm);

  console.log("Form Data:", Object.fromEntries(formData.entries()));
});
