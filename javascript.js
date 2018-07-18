var deleteButton = $('.delete-button');
var upvote = $('.upvote');
var downvote = $('.downvote');
var ideaSection = $('.idea-section');
var submitButton = $('.submit-button');
var titleInput = $('.title-input');
var bodyInput = $('.body-input');
var searchInput = $('.search');
var ideasArray = JSON.parse(localStorage.getItem("storedIdeasArray")) || [];

ideasArray.forEach(function(idea) {
  ideaSection.append(`<article data-index="${idea.id}">
    <div class="wrapper-div">
       <img class="delete-button" aria-label="delete button" src="images/delete.svg">
      <h3>${idea.title}</h3>
    </div>
    <p class="idea-body">${idea.body}</p>
    <div class="button-quality-wrapper clearfix">
      <img class="upvote" src="images/upvote.svg">
      <img class="downvote" src="images/downvote.svg">
      <p class="quality">quality: <span class="active-quality">${idea.quality}</span></p>
    </div>
    <hr>
  </article>`);
})

$('.title-input').on('keyup', saveButtonEnable);
$('.body-input').on('keyup', saveButtonEnable);
$('.idea-section').on('mouseover', deleteHover);
$('.idea-section').on('mouseout', deleteNoHover);
$('.idea-section').on('mouseover', downvoteHover);
$('.idea-section').on('mouseout', downvoteNoHover);
$('.idea-section').on('mouseover', upvoteHover);
$('.idea-section').on('mouseout', upvoteNoHover);
$('.idea-section').on('click', deleteExecute);
$('.submit-button').on('click', submitExecute);
$('.search').on('keyup', searchExecute);

function saveButtonEnable() {
  if(titleInput.val().length > 0 && bodyInput.val().length > 0) {
    submitButton.prop("disabled", false);
    console.log('true');
  } else {
    submitButton.prop("disabled", true);;
    console.log('false)')
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
  e.preventDefault();
  var titleValue = titleInput.val();                                            
  var bodyValue = bodyInput.val();
  var newIdea = new IdeaConstructor(Date.now(), titleValue, bodyValue);         //run the constructor function
  ideasArray.push(newIdea);                                                     //put the new object in the storage array
  localStorage.setItem('storedIdeasArray', JSON.stringify(ideasArray));         //stringify and put the array in local storage                                                    
  generateHTML(newIdea);                                                        //run the template-literal HTML injection
  titleInput.val('');                                                           //clear out the title and body fields
  bodyInput.val('');
};

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
      <h3>${object.title}</h3>
    </div>
    <p class="idea-body">${object.body}</p>
    <div class="button-quality-wrapper clearfix">
      <img class="upvote" src="images/upvote.svg">
      <img class="downvote" src="images/downvote.svg">
      <p class="quality">quality: <span class="active-quality">${object.quality}</span></p>
    </div>
    <hr>
  </article>`);
}

// function searchExecute() {             working sort of
//   var searchText = searchInput.value
//   var searchResultsArray = ideasArray.filter(function(query) {
//     return Object.values(query).indexOf(searchText) > -1;
//   });
//   console.log(searchResultsArray);
// }

function searchExecute(searchInput) {
 var query = $(this).val();                                           //store the search field text.value as a variable.
 $('article').each(function() {                                       //use the callback function each() on all article elements
   if($(this).text().search(new RegExp(query, 'i')) !== -1) {         //search the article for the search field text.value
     $(this).fadeIn();                                                //if it does contain the text, fadeIN()
   } else {
     $(this).fadeOut();                                               //if not, fadeOut();
   }
 });
}


