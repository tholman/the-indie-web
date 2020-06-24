(function () {
  
  // Close buttons close
  const closeButtons = document.querySelectorAll(".close");
  for (const button of closeButtons) {
    button.addEventListener("click", (e) => {
      e.target.closest('article').classList.add('closed')
    });
  }

})();
