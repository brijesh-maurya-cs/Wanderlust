  document.getElementById("scroll-left").addEventListener("click", () => {
    document.getElementById("filter-icons").scrollBy({ left: -200, behavior: "smooth" });
  });

  document.getElementById("scroll-right").addEventListener("click", () => {
    document.getElementById("filter-icons").scrollBy({ left: 200, behavior: "smooth" });
  });

  let taxSwitch = document.getElementById("switchCheckDefault")
  taxSwitch.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info")
    for (info of taxInfo) {
      if (info.style.display != "inline") {
        info.style.display = "inline"
      } else {
        info.style.display = "none"
      }
    }
  })