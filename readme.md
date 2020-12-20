# a new web app project

## should be an (social media)-chat-andsomethingelse like website

- IDEAS
  - friends or some kind of contacts
  - messaging +-
  - notifications
  - this time user should be able to upload the image directly || to more links to images
  - _voice_

---

- Things to implement
- [ ] routes
  - [x] /
  - [x] /lgoin
  - [x] /signup
  - [ ] profile route
  - [ ] dm route
  - [ ] group route
  - /users
- [ ] db models
  - [x] 1 place were all messages go done
  - [x] users
- [x] pug in the db into the server
  - [ ] route for each individual chats
- [x] login / sign up page
  - [x] make them work
    - [ ] profiles with avatars, etc
- [ ] appearence
  - [ ] home page
    - [ ] navbar
  - [ ] authentification
    - [ ] css
- [x] ajax
  - [x] request message upload
  - [x] request posting + no page refresh

---

### <p style="color:green">done things<p>

- possibiliy to write in a common chat while logged or as anonim
- authentification
- AJAX requests which allow loading messages withot refreshing the page
- stoped the form from refreshing the page

---

### <p style="color:red">issues<p>

- awful css
- awful frontend
- should refresh the page to see new messages
- AJAX I think is to slow band uneficient because it make requests to the server every 0.1 seconds
- time is displaied as seconds

### <p style="color:orange">bug fixes<p>

- no more messages that were sent from idk where

### for me to remember

- run this to opetn localshot to the internet
  >        lt --subdomain cat-s-server --port 3333
