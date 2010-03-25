/**
 * jQuery Maxlength plugin
 *
 * @author     Emil Stjerneman <emil@anon-design.se>
 * @author     Javier Zapata <javierzapata82@gmail.com>
 * @copyright  2009-2010 Emil Stjerneman / http://www.anon-design.se
 * @license    http://www.gnu.org/licenses/gpl-2.0.txt
 * @version    Git: $Id$
 * @link       http://www.anon-design.se/demo/maxlength-with-jquery
 */
(function($)
{
	$.fn.maxlength = function(options)
	{
		var settings = jQuery.extend(
		{
			events:				[], // Array of events to be triggerd
			maxCharacters:		10, // Characters limit
			status:				true, // True to show status indicator below the element
			statusElement:		"span", // Status element type
			statusClass:		"status", // The class on the status element
			statusText:			"character left", // The status text
			notificationClass:	"notification", // Will be added to the emement when maxlength is reached
			showAlert:			false, // True to show a regular alert message
			alertText:			"You have typed too many characters.", // Text in the alert message
			slider:				false // Use counter slider
		}, options);

		// Add the default event
		$.merge(settings.events, ['keyup']);

		return this.each(function()
		{
			var item = $(this);
			var charactersLength = $(this).val().length;

			// Update the status text
			function updateStatus()
			{
				var charactersLeft = settings.maxCharacters - charactersLength;

				if(charactersLeft < 0)
				{
					charactersLeft = 0;
				}

				item.next(settings.statusElement).html(charactersLeft + " " + settings.statusText);
			}

			function checkChars()
			{
				var valid = true;

				// Too many chars?
				if(charactersLength >= settings.maxCharacters)
				{
					// Too may chars, set the valid boolean to false
					valid = false;
					// Add the notifycation class when we have too many chars
					item.addClass(settings.notificationClass);
					// Cut down the string
					item.val(item.val().substr(0,settings.maxCharacters));
					// Show the alert dialog box, if its set to true
					showAlert();
				}
				else
				{
					// Remove the notification class
					if(item.hasClass(settings.notificationClass))
					{
						item.removeClass(settings.notificationClass);
					}
				}

				if(settings.status)
				{
					updateStatus();
				}
			}

			// Shows an alert msg
			function showAlert()
			{
				if(settings.showAlert)
				{
					alert(settings.alertText);
				}
			}

			// Check if the element is valid.
			function validateElement()
			{
				var ret = false;

				if(item.is('textarea')) {
					ret = true;
				} else if(item.filter("input[type=text]")) {
					ret = true;
				} else if(item.filter("input[type=password]")) {
					ret = true;
				}

				return ret;
			}

			// Validate
			if(!validateElement())
			{
				return false;
			}

			// Loop through the events and bind them to the element
			$.each(settings.events, function (i, n) {
				item.bind(n, function(e) {
					charactersLength = item.val().length;
					checkChars();
				});
			});

			// Insert the status element
			if(settings.status)
			{
				item.after($("<"+settings.statusElement+"/>").addClass(settings.statusClass).html('-'));
				updateStatus();
			}

			// Remove the status element
			if(!settings.status)
			{
				var removeThisElement = item.next(settings.statusElement+"."+settings.statusClass);

				if(removeThisElement) {
					removeThisElement.remove();
				}
			}

			// Slide counter
			if(settings.slider) {
				item.next().hide();

				item.focus(function(){
					item.next().slideDown('fast');
				});

				item.blur(function(){
					item.next().slideUp('fast');
				});
			}

		});
	};
})(jQuery);