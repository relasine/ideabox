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
$('.idea-section').on('mouseover', deleteHover);
$('.idea-section').on('mouseout', deleteNoHover);
$('.idea-section').on('mouseover', downvoteHover);
$('.idea-section').on('mouseout', downvoteNoHover);
$('.idea-section').on('mouseover', upvoteHover);
$('.idea-section').on('mouseout', upvoteNoHover);
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

function deleteHover(e) {
  if ($(e.target).hasClass('delete-button')){
    $(e.target).attr('src', 'images/delete-hover.svg');
  }
}

function deleteNoHover(e) {
  if ($(e.target).hasClass('delete-button')){
    $(e.target).attr('src', 'images/delete.svg');
  } 
}

function downvoteHover(e) {
  if ($(e.target).hasClass('downvote')){
    $(e.target).attr('src', 'images/downvote-hover.svg');
  }
}

function downvoteNoHover(e) {
  if ($(e.target).hasClass('downvote')){
    $(e.target).attr('src', 'images/downvote.svg');
  } 
}

function upvoteHover(e) {
  if ($(e.target).hasClass('upvote')){
    $(e.target).attr('src', 'images/upvote-hover.svg');
  }
}

function upvoteNoHover(e) {
  if ($(e.target).hasClass('upvote')){
    $(e.target).attr('src', 'images/upvote.svg');
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
    <div class="wrapper-div">
       <img class="delete-button" aria-label="delete button" src="images/delete.svg">
      <h3 class="idea-title" contenteditable="true" onkeydown="enterTitleUpdate()" onfocusout="updateTitle()">${object.title}</h3>
    </div>
    <p class="idea-body" contenteditable="true" onkeydown="enterBodyUpdate()" onfocusout="updateBody()">${object.body}</p>
    <div class="button-quality-wrapper clearfix">
      <img class="upvote" src="images/upvote.svg">
      <img class="downvote" src="images/downvote.svg">
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


