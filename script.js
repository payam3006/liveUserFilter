const q = console.log;

//use 100vh for mobile responsive
//COP!!!
const documentHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", documentHeight);
documentHeight();
///////////////////////////////////////////

const data = [];

function setData(array) {
  array.forEach((member) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add("result");
    newDiv.innerHTML = `<div class="img" style="background-image: url(${member.imgUrl});">
    </div>
    <div>
        <h4>${member.name}</h4>
        <h6>${member.location}</h6>
    </div>`;
    document.getElementById("results").appendChild(newDiv);
  });
}

async function getData() {
  const response = await fetch(`https://randomuser.me/api/?results=500`);
  const result = await response.json();
  result.results.forEach((element) => {
    let member = {
      name: `${element.name.first} ${element.name.last}`,
      location: `${element.location.city}, ${element.location.country}`,
      imgUrl: `${element.picture.medium}`,
    };
    data.push(member);
  });
  document.getElementById("search").disabled = false;
  setData(data);
}

getData();

document.getElementById("search").addEventListener("input", (ev) => {
  searchInData(ev.target.value);
});

function searchInData(text) {
  const check = (member) => {
    return (
      member.name.toLowerCase().indexOf(text.toLowerCase()) >= 0 ||
      member.location.toLowerCase().indexOf(text.toLowerCase()) >= 0
    );
  };

  const result = data.filter(check);

  document.getElementById("results").innerHTML = "";
  setData(result);
}
