$(function(){
  //  Accordion Panels
  $(".accordion div").show();
  setTimeout ("$('.accordion div').slideToggle('slow');", 1000);
  $(".accordion h3").click(function(){
      $(this).next(".pane").slideToggle("slow").siblings(".pane:visible").slideUp("slow");
    $(this).toggleClass("current");
    $(this).siblings("h3").removeClass("current");
  });
});