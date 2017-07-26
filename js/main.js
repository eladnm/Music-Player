jQuery(function openPlayer ($) {
$('.album').append($('<button <ng-cl></ng-click="showme=true"></button>').addClass('fa fa-play'));
});
jQuery(function toogleBtn ($) {
$('.album').click(function(){
    $(this).find('button').toggleClass('fa-play fa-pause');
  });
});
