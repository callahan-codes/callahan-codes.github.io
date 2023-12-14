// BRYCE CALLAHAN
// 12-13-2023

// variables
const body = document.querySelector('body');
const button = document.querySelector('#darkbutton');

//function
function toggleDark() {

  //light mode
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    localStorage.setItem("theme", "light");
  } else {  //dark mode
    body.classList.add('dark');
    localStorage.setItem("theme", "dark");
  }

}

//apply mode
if (localStorage.getItem("theme") === "dark") {
  body.classList.add('dark');
  document.getElementById('darkbutton').checked = true;
}

//call function on click
document.querySelector('#darkbutton').addEventListener('click', toggleDark);