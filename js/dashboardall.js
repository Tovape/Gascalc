$(document).ready(function() {
	$('.filter').click(function() {
		const value = $(this).attr('data-filter');
		if (value == 'all') {
			$('.project').show();
		} else {
			$('.project').not('.' + value).hide();
			$('.project').filter('.' + value).show();
		}

	})

	$('.filter').click(function() {
		$(this).addClass('companyactive').siblings().removeClass('companyactive');
	})

})

$(document).ready(function() {
	$('#startid').trigger('click');
});
