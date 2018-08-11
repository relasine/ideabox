var deleteButton = $('.delete-button');
var upvote = $('.upvote');
var downvote = $('.downvote');
var ideaSection = $('.idea-section');
var submitButton = $('.submit-button');
var titleInput = $('.title-input');
var bodyInput = $('.body-input');
var searchInput = $('.search');
var ideasArray = JSON.parse(localStorage.getItem("storedIdeasArray")) || [];

$(window).on('load', populateContent);
$('.title-input').on('keyup', saveButtonEnable);
$('.body-input').on('keyup', saveButtonEnable);
$('.body-input').on('keydown', preventReturn);
$('.idea-section').on('click', deleteExecute);
$('.submit-button').on('click', submitExecute);
$('.search').on('keyup', searchExecute);
$('.idea-section').on('click', upVoteExecute);
$('.idea-section').on('click', downVoteExecute);

function preventReturn(event) {
  if (event.keyCode == 10 || event.keyCode == 13) {
    event.preventDefault();
  }
}

function saveButtonEnable() {
  if(titleInput.val().length > 0 && bodyInput.val().length > 0) {
  submitButton.css('backgroundColor', '#00a79d');
  } else {
  submitButton.css('backgroundColor', '#CCCCCC');
  }
}

function deleteExecute(e) {
  if($(e.target).hasClass('delete-button')) {                                   
    $(e.target.closest('article').remove());                                    
    var dataId = e.target.parentNode.parentNode.dataset.index;                  
    var ideaObject = ideasArray.find(function(idea) {                           
      return idea.id === parseInt(dataId);                        
    });
    var index = ideasArray.indexOf(ideaObject);                                 
    if(index === 0) {                                                              
      ideasArray.shift();                                                       
    } else {                      
      ideasArray.splice(index, 1);                                              
    }                                                               
    localStorage.setItem('storedIdeasArray', JSON.stringify(ideasArray));       
  }
}

//create new idea article

function submitExecute(e) {
  if(titleInput.val().length > 0 && bodyInput.val().length > 0) {
    e.preventDefault();
    var titleValue = titleInput.val();                                            
    var bodyValue = bodyInput.val();
    var newIdea = new IdeaConstructor(Date.now(), titleValue, bodyValue);         
    ideasArray.push(newIdea);                                                     
    localStorage.setItem('storedIdeasArray', JSON.stringify(ideasArray));                                                         
    generateHTML(newIdea);                                                        
    titleInput.val('');                                                           
    bodyInput.val('');
    submitButton.css('backgroundColor', '#CCCCCC');
  } else {
    alert('Please enter text in the title and body fields.');
  }
}

function IdeaConstructor(id, title, body) {
  this.id = id;
  this.title = title;
  this.body = body;
  this.quality = "swill";
}

function generateHTML (object){
  ideaSection.prepend(`<article data-index="${object.id}">
    <h3 class="idea-title" contenteditable="true" onkeydown="enterTitleUpdate()" onfocusout="updateTitle()">${object.title}</h3>
    <div class="delete-button" aria-label="delete button"></div>
    <p class="idea-body" contenteditable="true" onkeydown="enterBodyUpdate()" onfocusout="updateBody()">${object.body}</p>
    <div class="button-quality-wrapper clearfix">
      <div class="upvote"></div>
      <div class="downvote"></div>
      <p class="quality">quality: <span class="active-quality">${object.quality}</span></p>
    </div>
    <hr>
  </article>`);
}

function searchExecute() {
  $('article').each(function() {
    if($(this).text().toLowerCase().indexOf($(searchInput).val().toLowerCase()) !== -1) {
      $(this).slideDown();
    } else {
      $(this).slideUp();
    }
  });
}

function upVoteExecute(e) {
  if($(e.target).hasClass('upvote')) {  
    var workingID = e.target.parentNode.parentNode.dataset.index;
    var workingObject = ideasArray.find(function(idea){ 
      return idea.id === parseInt(workingID);  
    });
    if(workingObject.quality === "swill") {
      workingObject.quality = "plausible";
      localStorage.setItem('storedIdeasArray', JSON.stringify(ideasArray)); 
      e.target.parentNode.childNodes[5].childNodes[1].innerText = "plausible";
    } else if (workingObject.quality === "plausible") {
      workingObject.quality = "genius";
      localStorage.setItem('storedIdeasArray', JSON.stringify(ideasArray)); 
      e.target.parentNode.childNodes[5].childNodes[1].innerText = "genius";
    }
  }
}

function downVoteExecute(e) {
  if($(e.target).hasClass('downvote')) {  
    var workingID = e.target.parentNode.parentNode.dataset.index;
    var workingObject = ideasArray.find(function(idea){ 
      return idea.id === parseInt(workingID);  
    });
    if(workingObject.quality === "genius") {
      workingObject.quality = "plausible";
      localStorage.setItem('storedIdeasArray', JSON.stringify(ideasArray)); 
      e.target.parentNode.childNodes[5].childNodes[1].innerText = "plausible";
    } else if (workingObject.quality === "plausible") {
      workingObject.quality = "swill";
      localStorage.setItem('storedIdeasArray', JSON.stringify(ideasArray)); 
      e.target.parentNode.childNodes[5].childNodes[1].innerText = "swill";
    }
  }
}

function updateTitle(e) { 
  var workingID = event.target.parentNode.parentNode.dataset.index;
  var workingObject = ideasArray.find(function(idea){ 
    return idea.id === parseInt(workingID);  
  });
    workingObject.title = event.target.innerText;
    localStorage.setItem('storedIdeasArray', JSON.stringify(ideasArray)); 
} 

function enterTitleUpdate(e) { 
  if (event.keyCode == 10 || event.keyCode == 13) {
    event.preventDefault();
    var workingID = event.target.parentNode.parentNode.dataset.index;
    var workingObject = ideasArray.find(function(idea){ 
      return idea.id === parseInt(workingID);  
    });
      workingObject.title = event.target.innerText;
      localStorage.setItem('storedIdeasArray', JSON.stringify(ideasArray)); 
      document.activeElement.blur()
  }
} 

function updateBody(e) { 
  var workingID = event.target.parentNode.dataset.index;
  var workingObject = ideasArray.find(function(idea){ 
      return idea.id === parseInt(workingID);  
  });
      workingObject.body = event.target.innerText;
      localStorage.setItem('storedIdeasArray', JSON.stringify(ideasArray)); 
} 

function enterBodyUpdate(e) { 
  if (event.keyCode == 10 || event.keyCode == 13) {
    event.preventDefault();
    var workingID = event.target.parentNode.dataset.index;
    var workingObject = ideasArray.find(function(idea){ 
      return idea.id === parseInt(workingID);  
    });
      workingObject.body = event.target.innerText;
      localStorage.setItem('storedIdeasArray', JSON.stringify(ideasArray)); 
      document.activeElement.blur()
  }
} 

function populateContent() {
  ideasArray.forEach(function(idea) {
    generateHTML(idea);
  });
}


