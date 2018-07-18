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

// function saveButtonEnable() {
//   if(titleInput.val().length > 0 && bodyInput.val().length > 0) {
//     submitButton.prop("disabled", false);
//   } else {
//     submitButton.prop("disabled", true);;
//   }
// }

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
}};

function deleteNoHover(e) {
  if ($(e.target).hasClass('delete-button')){
    $(e.target).attr('src', 'images/delete.svg');
}};

function downvoteHover(e) {
  if ($(e.target).hasClass('downvote')){
    $(e.target).attr('src', 'images/downvote-hover.svg');
}};

function downvoteNoHover(e) {
  if ($(e.target).hasClass('downvote')){
    $(e.target).attr('src', 'images/downvote.svg');
}};

function upvoteHover(e) {
  if ($(e.target).hasClass('upvote')){
    $(e.target).attr('src', 'images/upvote-hover.svg');
}};

function upvoteNoHover(e) {
    if ($(e.target).hasClass('upvote')){
    $(e.target).attr('src', 'images/upvote.svg');
}};

function deleteExecute(e) {
  if($(e.target).hasClass('delete-button')) {                                   //target the clicked element by class
    $(e.target.closest('article').remove());                                    //remove the clicked element's parent.parent element
    var dataId = e.target.parentNode.parentNode.dataset.index;                  //assign the parent element's unique id to a variable - need to convert to jQuery
    var ideaObject = ideasArray.find(function(idea) {                           //find the cooresponding object on the storage array and assign to a variable
      return idea.id === parseInt(dataId);                        
    });
    var index = ideasArray.indexOf(ideaObject);                                 //identify the object's index and assign to a variable
    if(index === 0) {                                                           //If the object's index is 0    
      ideasArray.shift();                                                       //Use shift to remove it
    } else {                      
      ideasArray.splice(index, 1);                                              //Otherwise, use splice to remove the object 
    }                                                               
    localStorage.setItem('storedIdeasArray', JSON.stringify(ideasArray));       //stringify and put the updated array in local storage
  }
}

//create new idea article

function submitExecute(e) {
  if(titleInput.val().length > 0 && bodyInput.val().length > 0) {
    e.preventDefault();
    var titleValue = titleInput.val();                                            
    var bodyValue = bodyInput.val();
    var newIdea = new IdeaConstructor(Date.now(), titleValue, bodyValue);         //run the constructor function
    ideasArray.push(newIdea);                                                     //put the new object in the storage array
    localStorage.setItem('storedIdeasArray', JSON.stringify(ideasArray));         //stringify and put the array in local storage                                                    
    generateHTML(newIdea);                                                        //run the template-literal HTML injection
    titleInput.val('');                                                           //clear out the title and body fields
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
  ideaSection.append(`<article data-index="${object.id}">
    <div class="wrapper-div">
       <img class="delete-button" aria-label="delete button" src="images/delete.svg">
      <h3 class="idea-title" contenteditable="true" onfocusout="updateTitle()">${object.title}</h3>
    </div>
    <p class="idea-body" contenteditable="true" onfocusout="updateBody()">${object.body}</p>
    <div class="button-quality-wrapper clearfix">
      <img class="upvote" src="images/upvote.svg">
      <img class="downvote" src="images/downvote.svg">
      <p class="quality">quality: <span class="active-quality">${object.quality}</span></p>
    </div>
    <hr>
  </article>`);
}

function searchExecute() {
 $('article').each(function() {                                       //use the callback function each() on all article elements
   if($(this).text().search(new RegExp($(searchInput).val(), 'i')) !== -1) {         //search article(s) for the search field text.value - "i" indicates not case-sensitive
     $(this).slideDown();                                                //if it does contain the text, slideDown()
   } else {
     $(this).slideUp();                                               //if not, slideUp();
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

function updateBody(e) { 
  var workingID = event.target.parentNode.parentNode.dataset.index;
    var workingObject = ideasArray.find(function(idea){ 
      return idea.id === parseInt(workingID);  
   });
      workingObject.title = event.target.innerText;
      localStorage.setItem('storedIdeasArray', JSON.stringify(ideasArray)); 
} 

function populateContent() {
  ideasArray.forEach(function(idea) {
    generateHTML(idea);
  });
}


