const deleteButton = document.querySelector('.delete-button');
const upVote = document.querySelector('.upvote');
const downVote = document.querySelector('.downvote');
const ideaSection = document.querySelector('.idea-section');
const submitButton = document.querySelector('.submit-button');
const titleInput = document.querySelector('.title-input');
const searchInput = document.querySelector('.search');
const bodyInput = document.querySelector('.body-input');

titleInput.addEventListener('keyup', checkInputs);
bodyInput.addEventListener('keyup', checkInputs);
bodyInput.addEventListener('keydown', preventReturn);
ideaSection.addEventListener('click', masterClick);
ideaSection.addEventListener('keydown', returnUpdate);
ideaSection.addEventListener('focusout', focusOutUpdate);
submitButton.addEventListener('click', submitExecute);
searchInput.addEventListener('keyup', searchExecute);

checkInputs();
retrieveContent();

function changeQualityUp() {
  if (event.target.classList.contains('upvote') && event.target.parentNode.childNodes[5].childNodes[1].innerText === "swill") {
    event.target.parentNode.childNodes[5].childNodes[1].innerText = "plausible"
    let key = event.target.parentNode.parentNode.dataset.index;
    updateQuality(key, "plausible");
  } else if (event.target.classList.contains('upvote') && event.target.parentNode.childNodes[5].childNodes[1].innerText === "plausible") {
    event.target.parentNode.childNodes[5].childNodes[1].innerText = "genius"
    let key = event.target.parentNode.parentNode.dataset.index;
    updateQuality(key, "genius");
  }
}

function changeQualityDown() {
  if (event.target.classList.contains('downvote') && event.target.parentNode.childNodes[5].childNodes[1].innerText === "plausible") {
    event.target.parentNode.childNodes[5].childNodes[1].innerText = "swill"
    let key = event.target.parentNode.parentNode.dataset.index;
    updateQuality(key, "swill");
  } else if (event.target.classList.contains('downvote') && event.target.parentNode.childNodes[5].childNodes[1].innerText === "genius") {
    event.target.parentNode.childNodes[5].childNodes[1].innerText = "plausible"
    let key = event.target.parentNode.parentNode.dataset.index;
    updateQuality(key, "plausible");
  }
}

function checkInputs() {
  if (titleInput.value && bodyInput.value) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function clearInputs() {
  titleInput.value = '';
  bodyInput.value = '';
  checkInputs();
}

function deleteExecute() {
  if (event.target.classList.contains('delete-button')) {
    let key = event.target.parentNode.dataset.index;
    event.target.parentNode.remove();
    localStorage.removeItem(key);
  }
}

function focusOutUpdate() {
  if (event.target.classList.contains('idea-title') || event.target.classList.contains('idea-body')) {
    key = event.target.parentNode.dataset.index;
    newTitle = event.target.parentNode.childNodes[1].innerText;
    newBody = event.target.parentNode.childNodes[5].innerText;
    updateTitleBody(key, newTitle, newBody)
  }
}

function generateHTML (object) {
  let newContent = (`<article data-index="${object.id}">
    <h3 class="idea-title" contenteditable="true">${object.title}</h3>
    <div class="delete-button" aria-label="delete button"></div>
    <p class="idea-body" contenteditable="true">${object.body}</p>
    <div class="button-quality-wrapper">
      <div class="upvote"></div>
      <div class="downvote"></div>
      <p class="quality">quality: <span class="active-quality">${object.quality}</span></p>
    </div>
    <hr>
  </article>`);
  ideaSection.innerHTML = (newContent) + ideaSection.innerHTML;
}

function IdeaConstructor(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = "swill";
}

function masterClick() {
  deleteExecute();
  changeQualityUp();
  changeQualityDown();
}

function preventReturn(event) {
  if (event.keyCode == 10 || event.keyCode ==13) {
    event.preventDefault();
  }
}

function retrieveContent() {
  for (i = 0; i < localStorage.length; i++) {
    generateHTML(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }
}

function returnUpdate(event) {
  if (event.target.classList.contains('idea-title') && (event.keyCode == 10 || event.keyCode == 13)) {
    event.preventDefault();
    key = event.target.parentNode.dataset.index;
    newTitle = event.target.parentNode.childNodes[1].innerText;
    newBody = event.target.parentNode.childNodes[5].innerText;
    document.activeElement.blur()
    updateTitleBody(key, newTitle, newBody)
  } else if (event.target.classList.contains('idea-body') && (event.keyCode == 10 || event.keyCode == 13)) {
    event.preventDefault();
    key = event.target.parentNode.dataset.index;
    newTitle = event.target.parentNode.childNodes[1].innerText;
    newBody = event.target.parentNode.childNodes[5].innerText;
    document.activeElement.blur()
    updateTitleBody(key, newTitle, newBody)   
  }
}

function searchExecute() {
  let articles = document.getElementsByTagName('article');
  for (i = 0; i < articles.length; i++) {
    if (articles[i].innerText.toLowerCase().indexOf(searchInput.value.toLowerCase()) !== -1) {
      articles[i].style.display = 'grid';
    } else {
      articles[i].style.display = 'none';
    }
  }
}

function submitExecute(event) {
  event.preventDefault();
  let newIdea = new IdeaConstructor(Date.now(), titleInput.value, bodyInput.value);
  generateHTML(newIdea);
  localStorage.setItem(newIdea.id, JSON.stringify(newIdea));
  clearInputs();
}

function updateQuality(key, newQuality) {
  let object = JSON.parse(localStorage.getItem(key))
  object.quality = newQuality;
  localStorage.setItem(key, JSON.stringify(object));
}

function updateTitleBody(key, newTitle, newBody) {
  let object = JSON.parse(localStorage.getItem(key))
  object.title = newTitle;
  object.body = newBody;
  localStorage.setItem(key, JSON.stringify(object));
}