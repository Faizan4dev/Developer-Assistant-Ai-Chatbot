let body = document.querySelector(".container");
let togl = document.querySelector("#toggle");
let current = false;
togl.addEventListener("click", function () {
  if (current == false) {
    body.classList.add("dark");
    current = true;
  } else if (current == true) {
    body.classList.remove("dark");
    current = false;
  }
});

// Side bar Hamburg menu for mobile phones
let sidebar = document.querySelector(".sidebar");
let hamburg = document.querySelectorAll(".smallScreen");
let show = false;
for (btn of hamburg) {
  btn.addEventListener("click", function () {
    if (show == false) {
      sidebar.classList.add("showSidebar");
      show = true;
    } else {
      sidebar.classList.remove("showSidebar");
      show = false;
    }
  });
}
