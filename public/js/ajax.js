window.scrollTo(0, document.body.scrollHeight);

var msgs, oldmsgs;
var msgBox = document.getElementsByClassName("messageBox")[0];
var text = document.getElementsByClassName("text")[0]; //text.value
function beep() {
  var frog = new Audio("../assets/frog.mp3");
  var droplet = new Audio("../assets/droplet.mp3");
  droplet.play();
}
var form = document.querySelector(".stopForm");
form.addEventListener("submit", (event) => {
  ajaxPost();
  form.reset();
  event.preventDefault();
});

function ajaxGet() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      msgs = JSON.parse(this.responseText);
      if (msgs) {
        if (!oldmsgs) {
          oldmsgs = msgs.length == 1 ? 0 : msgs.length;
        }
        if (oldmsgs != msgs.length) {
          newmessage();
          oldmsgs = msgs.length;
        }
      }
    }
  };
  xhttp.open("GET", "/ajax");
  xhttp.send();
}

function ajaxPost() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/ajax", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      // Request finished. Do processing here.
    }
  };
  xhr.send(
    JSON.stringify({ anonim: anonim, avatar: avatar, text: text.value })
  );
}

var newmessage = () => {
  for (let i = oldmsgs; i < msgs.length; i++) {
    let div = document.createElement("div");
    div.classList.add("row");
    div.classList.add("text-success");
    let t = new Date(msgs[i].sent);
    div.innerHTML =
      '<div class="col-lg"><div class="row"> <div class="col-lg-4"> <img src="' +
      msgs[i].uav +
      '" alt="" width="50px" style="border-radius: 45px;"> </div><div class="col-lg"><b style="text-decoration:underline;">' +
      msgs[i].name +
      "</b><br>" +
      t.getDate() +
      "D " +
      t.getMonth() +
      "M  " +
      t.getHours() +
      "H " +
      t.getMinutes() +
      "M " +
      t.getSeconds() +
      "S" +
      ' </div></div></div> <div class="col-lg-10">' +
      msgs[i].text +
      "</div>  ";
    msgBox.appendChild(div);
  }
  window.scrollTo(0, document.body.scrollHeight);
  beep();
};
setInterval(ajaxGet, 111);

window.onload = () => {
  window.scrollTo(0, document.body.scrollHeight);
};
