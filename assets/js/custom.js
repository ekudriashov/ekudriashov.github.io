jQuery(document).ready(function($) {
	//Materialize scrollspy activation
	$('.scrollspy').scrollSpy();
	//SCROLL TO TOP
    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    offset_opacity = 1200,
    //duration of the top scrolling animation (in ms)
    scroll_top_duration = 700,
    //grab the "back to top" link
    $back_to_top = $('.scrollup');
    //hide or show the "back to top" link
    $(window).scroll(function(){
      ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('scrollup-is-visible') : $back_to_top.removeClass('scrollup-is-visible scrollup-fade-out');
      if( $(this).scrollTop() > offset_opacity ) { 
        $back_to_top.addClass('scrollup-fade-out');
      }
    });
    //smooth scroll to top
    $back_to_top.on('click', function(event){
      event.preventDefault();
      $('body,html').animate({
        scrollTop: 0 ,
        }, scroll_top_duration
      );
    });

    //Contact form ajax handling
    var form = $('#ajax-contact');
    var formMessages = $('#form-messages');
    $(form).submit(function(event) {
    	event.preventDefault();
    	// Serialize the form data.
		var formData = $(form).serialize();
		// Submit the form using AJAX.
		$.ajax({
			url: $(form).attr('action'),
		    method: 'POST',
		    data: formData,
		    dataType: "json"
		})
		.done(function() {
		    // Make sure that the formMessages div has the 'success' class.
		    $(formMessages).removeClass('hide');
		    $(formMessages).addClass('success');
		    // Set the message text.
		    $(formMessages).text('Thanks for message. I will respond.');
		    // Clear the form.
		    $('#name').val('');
		    $('#email').val('');
		    $('#message').val('');
		})
		.fail(function() {
		    // Make sure that the formMessages div has the 'error' class.
		    $(formMessages).removeClass('hide');
		    $(formMessages).addClass('error');
		    // Set the message text.
		    $(formMessages).text('Oops... Something wrong! Try again later pls!');		    
		});
    });
});