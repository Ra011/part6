const toggleNav = () => {
  document.getElementById("nav-items").classList.toggle("hide-small");
};

const goToBookingsPage = () => {
  console.log("button pressed");
  window.location.href = "bookings.html";
};




window.onload = () => {
  document.getElementById("hamburger").onclick = toggleNav;
  document.getElementById("button-book").onclick = goToBookingsPage;

}
