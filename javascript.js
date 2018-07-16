var deleteButton = $('.delete-button');
var upvote = $('.upvote');
var downvote = $('.downvote');
var ideaSection = $('.idea-section');
var submitButton = $('.submit-button');
var titleInput = $('.title-input');
var bodyInput = $('.body-input');


$('.idea-section').on('mouseover', deleteHover);
$('.idea-section').on('mouseout', deleteNoHover);
$('.idea-section').on('mouseover', downvoteHover);
$('.idea-section').on('mouseout', downvoteNoHover);
$('.idea-section').on('mouseover', upvoteHover);
$('.idea-section').on('mouseout', upvoteNoHover);


function deleteHover(e) {
  if ($(e.target).hasClass('delete-button')){
    $(e.target).attr('src', 'images/delete-hover.svg');
  // $('.delete-button').attr('src', 'images/delete-hover.svg');
}};

function deleteNoHover(e) {
  if ($(e.target).hasClass('delete-button')){
    $(e.target).attr('src', 'images/delete.svg');
  // $('.delete-button').attr('src', 'images/delete.svg');
}};

function downvoteHover(e) {
  if ($(e.target).hasClass('downvote')){
    $(e.target).attr('src', 'images/downvote-hover.svg');
  // $('.downvote').attr('src', 'images/downvote-hover.svg');
}};

function downvoteNoHover(e) {
  if ($(e.target).hasClass('downvote')){
    $(e.target).attr('src', 'images/downvote.svg');
  // $('.downvote').attr('src', 'images/downvote.svg');
}};

function upvoteHover(e) {
  if ($(e.target).hasClass('upvote')){
    $(e.target).attr('src', 'images/upvote-hover.svg');
  // $('.upvote').attr('src', 'images/upvote-hover.svg');
}};

function upvoteNoHover(e) {
    if ($(e.target).hasClass('upvote')){
    $(e.target).attr('src', 'images/upvote.svg');
  // $('.upvote').attr('src', 'images/upvote.svg');
}};

// $('.delete-button').on('click', function(e)) {
//   $('.idea-section')
// }

//delete button

ideaSection.on('click', function(e){
  if ($(e.target).hasClass('delete-button')){
    $(e.target.closest('article').remove());
  }
  });


//create new idea article

submitButton.on('click', function(e) {
  e.preventDefault();
  var titleValue = titleInput.val();
  var bodyValue = bodyInput.val();
  ideaSection.append(`<article class="">
    <div class="wrapper-div">
       <img class="delete-button" aria-label="delete button" src="images/delete.svg">
      <h3>${titleValue}</h3>
    </div>
    <p class="idea-body">${bodyValue}</p>
    <div class="button-quality-wrapper clearfix">
      <img class="upvote" src="images/upvote.svg">
      <img class="downvote" src="images/downvote.svg">
      <p class="quality">quality: <span class="active-quality">swill</span></p>
    </div>
    <hr>
  </article>`);
  titleInput.val('');
  bodyInput.val('');
});
