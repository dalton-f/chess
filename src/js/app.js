const loadPositionForm = document.getElementById("loadPositionForm");

loadPositionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(loadPositionForm);
  const positionInput = formData.get("positionInput");

  console.log(positionInput);
});
