'use strict';
jQuery(document).ready(function(){
	// delegate all clicks on "a" tag (links)
	$(document).on("click", "#back", function () {

	    // get the href attribute
	    var newUrl = $(this).attr("href");

	    // veryfy if the new url exists or is a hash
	    if (!newUrl || newUrl[0] === "#") {
	        // set that hash
	        location.hash = newUrl;
	        return;
	    }
	    // prevent the default browser behavior.
	    return false;
	});
});

/*---------------------------------------------------------*/
/*  DOCUMENT READY                                         */
/*---------------------------------------------------------*/

jQuery(document).ready(function () {

	/*---------------------------------------------------------*/
	/*  MAILCHIMP SUBSCRIPTION                                 */
	/*---------------------------------------------------------*/

	$('#subscription').ajaxChimp({
		callback: callbackFunction,
		url: MailChimpUrl
	});

	function callbackFunction (resp) {

		if(resp.result === 'success') {
			$('.subscription-success')
				.html('Please check your e-mail to confirm your subscription')
				.fadeIn(500);
			$('.subscription-failed').fadeOut(500);
      $("#email").val('');

		} else if(resp.result === 'error') {

			$('#subscription').addClass('animated-error pulse');
			setTimeout(function () {
				$('#subscription').removeClass('animated-error pulse');
			}, 1000);
			$('.spam').fadeOut('300', function () {
				$('.subscription-failed')
				.html('Please enter unsubscribed or valid e-mail address')
				.fadeIn(1000);
			});
			$('.subscription-success').fadeOut(500);
		}
	}
}); //END DOCUMENT READY
