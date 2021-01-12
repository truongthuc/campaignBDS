import {changeIconState} from './youtubeModule.js';
export default function swiperModule() {
	var homeSwiper = new Swiper('.swiper-container', {
		init: false,
		effect: 'flip',
		grabCursor: true,
		flipEffect: {
			// slideShadows: true,
		},

		// effect: "cube",
		// grabCursor: true,
		// cubeEffect: {
		//   shadow: false,
		//   slideShadows: true,
		//   shadowOffset: 20,
		//   shadowScale: 0.94,
		// },

		direction: 'vertical',
		slidesPerView: 1,
		spaceBetween: 0,
		mousewheel: true,
		speed: 1000,
		loop: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});
	const headerElement = document.getElementById('header');
	const footerElement = document.getElementById('footer');
	homeSwiper.on('slideChangeTransitionStart', function (sp) {
		return swiperChangedBegin(sp);
	});
	homeSwiper.on('slideChangeTransitionEnd', function (sp) {
		return swiperChangedEnd(sp);
	});

	//event handler
	const swiperChangedBegin = function (slider) {
		const currentIndex = !!homeSwiper.params.loop
			? slider.activeIndex
			: slider.realIndex;
		const currentElement = slider.slides[currentIndex];
		//1
		if (currentElement.querySelector('.sec-hometopbanner')) {
			headerElement.classList.add('hidelogo');
		} else {
			headerElement.classList.remove('hidelogo');
		}
		// VIDEO SLIDE
		if (currentElement.querySelector('.feature-videofullscreen')) {
			changeIconState($('#playpause'), 'play');
		} else {
			changeIconState($('#playpause'), 'pause');
			changeIconState($('#mutetoggle'), 'mute');
		}

		//2
		footerElement.classList.remove('comup');
		//3
		currentElement.classList.remove('comeout');
		//4
		try {
			const animationChars = currentElement
				.querySelector('.animation-banner-text')
				.querySelectorAll('.char');
			Array.from(animationChars).forEach(function (thisv, index) {
				thisv.classList.remove('fade');
			});
		} catch (error) {}
	};
	const swiperChangedEnd = function (slider) {
		const currentIndex = !!homeSwiper.params.loop
			? slider.activeIndex
			: slider.realIndex;
		const currentElement = slider.slides[currentIndex];
		//1
		//2
		if (!currentElement.querySelector('.feature-videofullscreen')) {
			footerElement.classList.add('comup');
		}

		// if (!currentElement.querySelector('.feature-videofullscreen')) {
		// 	slideOut();
		// }
		//3
		currentElement.classList.add('comeout');
		//4

		try {
			const animationChars = currentElement
				.querySelector('.animation-banner-text')
				.querySelectorAll('.char');
			$(animationChars).removeClass('fade');
			Array.from(animationChars).forEach(function (thisv, index) {
				let value = thisv;
				setTimeout(() => {
					value.classList.add('fade');
					// (function (value) {
					//  value.classList.add("fade");
					// })(value);
				}, 100 * index);
			});
		} catch (error) {}
	};
	if (!!document.querySelector('.swiper-container') && !!homeSwiper)
		homeSwiper.init();
}
