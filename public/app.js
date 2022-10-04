// toggle button
const toggleBtn = document.querySelector(".toggle-btn");
const linkContainer = document.querySelector(".links-container");

console.log(toggleBtn)
toggleBtn.addEventListener("click", () => {
  toggleBtn.classList.toggle("active");
  linkContainer.classList.toggle("show");
})

// links
const links = document.querySelectorAll(".link");

links.forEach(link => {
  link.addEventListener("click", () => {
    links.forEach(ele => ele.classList.remove("active"));
    link.classList.add("active");
  })
})

// create dynamic project card
const projectContainer = document.querySelector(".project-container");

projects.forEach(project => {
  projectContainer.innerHTML += `
    <div class="project-card" data-tags="#all, ${project.tags}">
      <img src="img/${project.image}" alt="" />
      <div class="content">
        <h1 class="project-name">${project.name}</h1>
        <span class="tags">${project.tags}</span>
      </div>
    </div>
  `
})

// filters
const filters = document.querySelectorAll(".filter-btn");

filters.forEach(filterBtn => {
  filterBtn.addEventListener("click", () => {
    let id = filterBtn.getAttribute("id");
    let projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach(card => {
      if(card.getAttribute("data-tags").includes(id)){
        card.classList.remove("else");
      } else {
        card.classList.add("hide");
      }
    })

    filter.forEach(btn => btn.classList.remove("active"));
    filterBtn.classList.add("active");
  })
})

// contact form
const contactBtn = document.querySelector(".contact-btn");
const firstName = document.querySelector(".first-name");
const lastName = document.querySelector(".last-name");
const email = document.querySelector(".email");
const msg = document.querySelector(".message");

contactBtn.addEventListener("click", () => {
  const firstLen = firstName.value.length;
  const lastLen = lastName.value.length;
  const emailLen = email.value.length;
  const msgLen = msg.value.length;
  if (firstLen && lastLen && emailLen && msgLen) {
    fetch("/mail", {
      method: "post",
      header: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify({
        firstname: firstName.value,
        lastname: lastName.value,
        email: email.value,
        msg: msg.value,
      })
    })
      .then(res => res.json())
      .then(data => {
        alert(data);
      })
  }
})
