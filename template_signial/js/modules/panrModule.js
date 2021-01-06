export default function panrModule() {
	$('.animation-banner-text').each(function () {
		$(this)
			.find('span')
			.each(function () {
				const characters = $(this).text().split('');
				const $this = $(this);
				$this.empty();
				$.each(characters, function (i, el) {
					$this.append(!!el.trim() ? `<span class="char">${el}</span>` : el);
				});
			});
	});
	$('#moving-panr').panr({
		sensitivity: 50,
		scale: false,
		scaleOnHover: false,
		scaleTo: 1,
		scaleDuration: 0,
		panY: true,
		panX: true,
		moveTarget: '',
		panDuration: 1.25,
		resetPanOnMouseLeave: false,
		onEnter: function () {},
		onLeave: function () {},
	});
	$('#moving-panr .vector-logo').panr({
		sensitivity: 70,
		scale: false,
		scaleOnHover: false,
		scaleTo: 1,
		scaleDuration: 0,
		panY: true,
		panX: true,
		moveTarget: 'parent',
		panDuration: 1.25,
		resetPanOnMouseLeave: false,
		onEnter: function () {},
		onLeave: function () {},
	});
}
