  const password = document.getElementById("password");
  const toggleBtn = document.getElementById("togglePassword");


  if(toggleBtn){
  toggleBtn.addEventListener("click", () => {
    if (password.type === "password") {
      password.type = "text";
      toggleBtn.textContent = "🔓"; 
    } else {
      password.type = "password";
      toggleBtn.textContent = "🔒";
    }
  })
};