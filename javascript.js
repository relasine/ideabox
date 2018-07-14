var deleteButton = $('.delete-button');
var upvote = $('.upvote');
var downvote = $('.downvote');


$('.delete-button').on('mouseover', deleteHover);
$('.delete-button').on('mouseout', deleteNoHover);
$('.downvote').on('mouseover', downvoteHover);
$('.downvote').on('mouseout', downvoteNoHover);
$('.upvote').on('mouseover', upvoteHover);
$('.upvote').on('mouseout', upvoteNoHover);


function deleteHover() {
  $('.delete-button').attr('src', 'images/delete-hover.svg');
}

function deleteNoHover() {
  $('.delete-button').attr('src', 'images/delete.svg');
}

function downvoteHover() {
  $('.downvote').attr('src', 'images/downvote-hover.svg');
}

function downvoteNoHover() {
  $('.downvote').attr('src', 'images/downvote.svg');
}

function upvoteHover() {
  $('.upvote').attr('src', 'images/upvote-hover.svg');
}

function upvoteNoHover() {
  $('.upvote').attr('src', 'images/upvote.svg');
}