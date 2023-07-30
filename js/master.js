//Local Storage
let mainColor = localStorage.getItem("mainColor");
let backgroundOption = localStorage.getItem("backgroundOption");
let backgroundImage = localStorage.getItem("backgroundImage");

window.onload = () => {
  if (mainColor) {
    document.documentElement.style.setProperty("--main-color", mainColor);
    document.querySelectorAll(".my-colors li").forEach((ele) => {
      //Remove active class from all colors

      ele.classList.remove("active");
      //Add active class to element with dataset.color = local storage item

      if (ele.dataset.color === mainColor) {
        ele.classList.add("active");
      }
    });
  }

  if (backgroundOption) {
    document.querySelectorAll(".random li").forEach((ele) => {
      ele.classList.remove("active");
    });
    if (backgroundOption === "yes") {
      changingOption = true;
      document.querySelector(".random li.yes").classList.add("active");
    } else if (backgroundOption === "no") {
      changingOption = false;
      document.querySelector(".random li.no").classList.add("active");
    } else if (backgroundOption === "choose") {
      background.backgroundImage = backgroundImage;
      changingOption = false;
      document.querySelector(".random li.choose").classList.add("active");
    }
  }
};

let background = document.querySelector(".landing-page").style;
let backgroundInterval;
//function of changing background
let changingOption = true;
function changingBackground() {
  if (changingOption) {
    //مينفعش نكتب let or var or const في السطر اللي جاي علشان نقدر نوصل لل backgroundInterval من خارج الفانكشن
    backgroundInterval = setInterval(() => {
      var random = Math.floor(Math.random() * 6);
      background.backgroundImage = `url(imgs/${random}.jpg)`;
    }, 5000);
  }
}

//opening settings-box and making the setting-icon spin
document.querySelector(".settings-icon").addEventListener("click", (e) => {
  document.querySelector(".settings-box ").classList.toggle("open");
  document.querySelector(".settings-icon i").classList.toggle("fa-spin");
});

//Looping on colors options
document.querySelectorAll(".my-colors li").forEach((ele) => {
  ele.addEventListener("click", (e) => {
    //adding class "active" to the selected color and removing this class from the other colors
    e.target.parentElement.querySelectorAll(".active").forEach((x) => {
      x.classList.remove("active");
    });
    ele.classList.add("active");

    //ركز على الخطوة دي جدا جدا
    //setting main-color to the selected color
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("mainColor", e.target.dataset.color);
  });
});

//Looping on random background options
document.querySelectorAll(".random li").forEach((ele) => {
  ele.addEventListener("click", (e) => {
    //adding class "active" to the selected option and removing it from the other option
    document.querySelectorAll(".random .active").forEach((e) => {
      e.classList.remove("active");
    });
    ele.classList.add("active");
    localStorage.setItem("backgroundOption", e.target.classList[0]);

    //change background if the selected option is yes and vice versa
    if (ele.classList.contains("yes")) {
      changingOption = true;
      changingBackground();
    } else if (ele.classList.contains("no")) {
      console.log(5656);
      changingOption = false;
      clearInterval(backgroundInterval);
      background.backgroundImage = `url(imgs/0.jpg)`;
    } else if (ele.classList.contains("choose")) {
      changingOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("backgroundImage", background.backgroundImage);
    }
  });
});

//making the selected menu from the header-area active
document.querySelectorAll(".header-area ul li a").forEach((ele) => {
  ele.addEventListener("click", (e) => {
    e.target.parentElement.parentElement
      .querySelectorAll(".active")
      .forEach((x) => {
        x.classList.remove("active");
      });
    e.target.classList.add("active");
  });
});

//moving skill-progress from 0 to its value
var skills = document.querySelector(".skills");
window.onscroll = function () {
  let windowHeight = innerHeight;
  let windowY = window.scrollY;
  let skillsHeight = skills.offsetHeight;
  let aboveSkills = skills.offsetTop;

  if (windowHeight + windowY > skillsHeight + aboveSkills) {
    document.querySelectorAll(".skills .skill-box span").forEach((ele) => {
      ele.style.width = ele.dataset.progress;
    });
  }
};

//creating popup-box for images
document.querySelectorAll(".gallery .images-box img").forEach((image) => {
  image.addEventListener("click", (e) => {
    //creating masking layer
    var layer = document.createElement("div");
    layer.className = "layer";
    document.body.appendChild(layer);

    //creating popup-box for this image
    var popup = document.createElement("div");
    popup.className = "popup";
    document.body.appendChild(popup);

    //adding heading to the image
    if (image.alt) {
      var heading = document.createElement("h2");
      heading.textContent = image.alt;
      popup.appendChild(heading);
    }

    //creating image inside popup-box
    var img = document.createElement("img");
    img.src = image.src;
    popup.appendChild(img);

    //adding closing button to the image
    var closing = document.createElement("span");
    closing.className = "closing";
    closing.textContent = "X";
    popup.appendChild(closing);

    //adding function to closing button
    closing.addEventListener("click", (e) => {
      popup.remove();
      layer.remove();
    });
  });
});

//making nav button visible when hovering
document.querySelectorAll(".nav-bullets .bullet").forEach((circle) => {
  circle.addEventListener("click", (c) => {
    var myclass = c.target.dataset.option;
    document
      .querySelector(`.${myclass}`)
      .scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll("#nav li").forEach((option) => {
  option.addEventListener("mouseout", (c) => {
    option.querySelector(".the-name").style.display = "none";
    // c.target.querySelector(".the-name").style.display = "none";
  });
});
