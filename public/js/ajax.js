window.scrollTo(0, document.body.scrollHeight);

var msgs, oldmsgs;
var msgBox = document.getElementsByClassName("messageBox")[0];
var text = document.getElementsByClassName("text")[0]; //text.value

document.querySelector(".stopForm").addEventListener("submit", (event) => {
  ajaxPost();
  event.preventDefault();
});

function ajaxGet() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      msgs = JSON.parse(this.responseText);
    }
  };
  xhttp.open("GET", "/ajax");
  xhttp.send();
}

function ajaxPost() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/ajax", true);

  //Send the proper header information along with the request
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      // Request finished. Do processing here.
    }
  };
  xhr.send(JSON.stringify({ text: text.value }));
  text.value = "";
}

var newmessage = () => {
  if (msgs) {
    if (!oldmsgs) {
      oldmsgs = msgs;
    }

    if (oldmsgs.length < msgs.length) {
      msgBox.innerHTML = "";
      msgs.forEach((msg) => {
        let div = document.createElement("div");
        div.classList.add("row");
        div.classList.add("text-success");
        let name = document.createElement("div");
        name.classList.add("col-md");
        name.innerText = msg.name;
        let message = document.createElement("div");
        message.classList.add("col-md-8");
        message.innerHTML =
          '<div><div class="alert alert-dark">' + msg.text + "</div>";
        let date = document.createElement("div");
        date.classList.add("col-md");
        date.innerText = Date.parse(msg.sent);
        div.appendChild(name);
        div.appendChild(message);
        div.appendChild(date);
        msgBox.appendChild(div);
      });
      window.scrollTo(0, document.body.scrollHeight);
      oldmsgs = msgs;
    }
  }
};
setInterval(ajaxGet, 111);
setInterval(newmessage, 111);

window.onload = () => {
  window.scrollTo(0, document.body.scrollHeight);
};
//window.onload = setTimeout(newmessage(), 0);
