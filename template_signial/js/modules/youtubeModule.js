// VARIABLES
let player;
const $videoHolder = $('.video-holder');
const $videoYoutube = $('#video-youtube');
const $playBtn = $('#toogleVideo');
const $playPauseBtn = $('#playpause');
const $volumeBtn = $('#mutetoggle');
const $fullscreenBtn = $('#fullscreen');
const $currentTime = $('#current-time');
const $durationTime = $('#duration');
// METHOD PLAYER VIDEO
const playerMethod = {
	play: () => {
		player.playVideo();
	},
	pause: () => {
		player.pauseVideo();
	},
	mute: () => {
		player.mute();
	},
	unmute: () => {
		player.unMute();
	},
	stop: () => {
		player.stopVideo();
	},
};
// GET ID YOUTUBE
function getIdYoutube() {
	return $('.feature-videofullscreen').attr('data-ytb-id');
}
// FIRST LOAD YOUTUBE API
function loadYoutubeScript() {
	if (typeof YT == 'undefined' || typeof YT.Player == 'undefined') {
		var tag = document.createElement('script');
		tag.src = 'https://www.youtube.com/iframe_api';
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		window.onYouTubePlayerAPIReady = function () {
			onYouTubePlayer();
		};
	}
}
loadYoutubeScript();
// CONFIG YOUTUBE API
function onYouTubePlayer() {
	player = new YT.Player('video-youtube', {
		videoId: getIdYoutube(),
		playerVars: {
			enablejsapi: 1,
			disablekb: 1,
			controls: 0,
			mute: 1,
			rel: 0,
			loop: 1,
			// showsearch: 0,
			modestbranding: 1,
		},
		events: {
			onReady: renderTime,
			onStateChange: onPlayerStateChange,
			onError: catchError,
		},
	});
}
/**
 * STATE YOUTUBE
 * -1 (unstarted)
 * 0 (ended) - YT.PlayerState.ENDED
 * 1 (playing) - YT.PlayerState.PLAYING
 * 2 (paused) - YT.PlayerState.PAUSED
 * 3 (buffering) - YT.PlayerState.BUFFERING
 * 5 (video cued) - YT.PlayerState.CUED
 */
// WHEN YOUTUBE CHANGE STATE
function onPlayerStateChange(event) {
	switch (event.data) {
		case 0:
			console.log('end');
			break;
		case 1:
			console.log('play');
			break;
		case 2:
			console.log('pause');
			break;
		case 3:
			console.log('end');
			break;
	}
}
// CATCH ERROR OF YOUTUBE
function catchError(event) {
	if (event.data == 100) console.log('De video bestaat niet meer');
}
// function formatTime(e) {
// 	e = Math.round(e);
// 	var t = Math.floor(e / 60),
// 		a = e - 60 * t;
// 	return (a = 10 > a ? '0' + a : a), t + ':' + a;
// }
// formatTime(129);

// RENDER TIME VIDEO
function renderTime(event) {
	const sti = setInterval(() => {
		const curTime = Math.round(player.getCurrentTime());
		const durTime = Math.round(player.getDuration());
		$currentTime.html(curTime);
		$durationTime.html(durTime);
		if (curTime >= durTime) {
			console.log(curTime);
			clearInterval(sti);
		}
	}, 500);
}
// CHANGE ICON STATE
function changeIconState(i, s) {
	console.log(i, s);
	if (s === 'pause') {
		// $videoHolder.trigger('click');
		playerMethod.pause();
		pauseVideoOutside();
		i.attr('data-state', 'play');
	}
	if (s === 'play') {
		playerMethod.play();
		playVideo();
		// $playBtn.trigger('click');
		i.attr('data-state', 'pause');
	}
	if (s === 'mute') {
		playerMethod.mute();
		i.attr('data-state', 'unmute');
	}
	if (s === 'unmute') {
		playerMethod.unmute();
		i.attr('data-state', 'mute');
	}
	if (s === 'go-fullscreen') {
		// playerMethod.mute();
		i.attr('data-state', 'cancel-fullscreen');
	}
	if (s === 'cancel-fullscreen') {
		// playerMethod.mute();
		i.attr('data-state', 'go-fullscreen');
	}
}
function iconClick() {
	const state = $(this).attr('data-state');
	changeIconState($(this), state);
}
function fullScreen() {
	const e = document.getElementById('video-youtube');
	const requestFullScreen =
		e.requestFullScreen || e.mozRequestFullScreen || e.webkitRequestFullScreen;
	console.log(requestFullScreen);
	if (requestFullScreen) {
		requestFullScreen.bind(e)();
	}
}
function pauseVideoOutside() {
	$videoHolder.addClass('hide');
	$playBtn.removeClass('hide');
	playerMethod.pause();
}
function playVideo() {
	$playBtn.addClass('hide');
	$videoHolder.removeClass('hide');
	playerMethod.play();
}
function youtubeModule() {
	// PAUSE VIDEO WHEN CLICK OUTSIDE
	$videoHolder.on('click', function () {
		changeIconState($playPauseBtn, 'pause');
		pauseVideoOutside();
	});
	// BIG BUTTON PLAY VIDEO
	$playBtn.on('click', function () {
		changeIconState($playPauseBtn, 'play');
		playVideo();
	});
	// PLAY PAUSE BUTTON
	$playPauseBtn.bind('click', iconClick);
	$volumeBtn.bind('click', iconClick);
	$fullscreenBtn.bind('click', iconClick);
}

export {
	playerMethod,
	changeIconState,
	playVideo,
	$playBtn,
	$videoHolder,
	$playPauseBtn,
};
export default youtubeModule;
