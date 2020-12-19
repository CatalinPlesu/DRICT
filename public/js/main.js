window.scrollTo(0, document.body.scrollHeight);

var msg, lastMsg;
var msgBox = document.getElementsByClassName("message_box")[0];
var text = document.getElementsByClassName("text")[0]; //text.value
var send = document.getElementsByClassName("send")[0];

function ajaxGet() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      msg = JSON.parse(this.responseText);
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
}

var newmessage = () => {
  if (lastMsg != msg) {
    let p = document.createElement("p");
    p.innerHTML =
      '<a class="user" href="#">' +
      msg.name +
      ":</a><br>" +
      msg.text +
      "<br><span>" +
      msg.sent +
      "</span><hr>";
    msgBox.appendChild(p);
    window.scrollTo(0, document.body.scrollHeight);
    lastMsg = msg;
  }
};

window.onload = ajaxGet();
window.onload = () => {
  window.scrollTo(0, document.body.scrollHeight);
};
window.onload = setTimeout(newmessage(), 0);
