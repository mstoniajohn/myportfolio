// wrapper function

function init() {
	const slides = document.querySelectorAll('.slide');
	const pages = document.querySelectorAll('.page');
	const backgrounds = [
		`radial-gradient(#2b3760, #0b1023)`,
		`radial-gradient(#4e3022, #161616)`,
		`radial-gradient(#4e43042, #161616)`,
	];
	//  tracker for current page
	let current = 0;
	let scrollSlide = 0;
	slides.forEach((slide, index) => {
		// use normal function to bind the this keyword
		slide.addEventListener('click', function () {
			changdeDot(this);
			nextSlide(index);
			scrollSlide = index;
		});
	});
	function changdeDot(dot) {
		slides.forEach((slide) => {
			slide.classList.remove('active');
		});
		dot.classList.add('active');
	}
	function nextSlide(pageNumber) {
		const nextPage = pages[pageNumber];
		const currentPage = pages[current];

		const nextLeft = nextPage.querySelector('.hero .model-left');
		const nextRight = nextPage.querySelector('.hero .model-right');

		const currentLeft = currentPage.querySelector('.hero .model-left');
		const currentRight = currentPage.querySelector('.hero .model-right');

		const nextText = nextPage.querySelector('.details');
		const portfolio = document.querySelector('.portfolio');
		const tl = new TimelineMax({
			onStart: function () {
				slides.forEach((slide) => {
					slide.style.pointerEvents = 'none';
				});
			},
			onComplete: function () {
				slides.forEach((slide) => {
					slide.style.pointerEvents = 'all';
				});
			},
		});
		// add starting and ending value, time
		tl.fromTo(currentLeft, 0.3, { y: '-10%' }, { y: '-100%' })
			.fromTo(currentRight, 0.3, { y: '10%' }, { y: '-100%' }, '-=0.2')
			.to(portfolio, 0.3, { backgroundImage: backgrounds[pageNumber] })
			.fromTo(
				currentPage,
				0.3,
				{ opacity: 1, pointerEvents: 'all' },
				{ opacity: 0, pointerEvents: 'none' }
			)
			.fromTo(
				nextPage,
				0.3,
				{ opacity: 0, pointerEvents: 'none' },
				{ opacity: 1, pointerEvents: 'all' },
				'-=0.6'
			)
			.fromTo(nextLeft, 0.3, { y: '-100%' }, { y: '-10%' }, '-=0.6')
			.fromTo(nextRight, 0.3, { y: '-100%' }, { y: '10%' }, '-=0.8')
			.fromTo(nextText, 0.3, { opacity: 0, y: 0 }, { opacity: 1, y: 0 })
			.set(nextLeft, { clearProps: 'all' })
			.set(nextRight, { clearProps: 'all' }); //start at 0.2 secs
		current = pageNumber;
	}

	document.addEventListener('wheel', throttle(scrollChange, 1500));
	document.addEventListener('touchmove', throttle(scrollChange, 1500));

	function switchDot(dotNumber) {
		const activeDot = document.querySelectorAll('.slide')[dotNumber];
		slides.forEach((slide) => {
			slide.classList.remove('active');
		});
		activeDot.classList.add('active');
	}
	function scrollChange(e) {
		if (e.deltaY > 0) {
			scrollSlide += 1;
		} else {
			scrollSlide -= 1;
		}

		if (scrollSlide > 2) {
			scrollSlide = 0;
		}
		if (scrollSlide < 0) {
			scrollSlide = 2;
		}
		switchDot(scrollSlide);
		nextSlide(scrollSlide);
	}
	const hamburger = document.querySelector('.menu');
	const hamburgerLines = document.querySelectorAll('.menu line');
	const navOpen = document.querySelector('.nav-open');
	const contact = document.querySelector('.contact');
	const social = document.querySelector('.social');
	const logo = document.querySelector('.logo');

	const tl = new TimelineMax({ paused: true, reversed: true });
	tl.to(navOpen, 0.5, { y: 0 })
		.fromTo(contact, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, '-=0.1')
		.fromTo(social, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, '-=0.5')
		.fromTo(logo, 0.2, { color: 'white' }, { color: 'black' }, '-=1')
		.fromTo(
			hamburgerLines,
			0.2,
			{ stroke: 'white' },
			{ stroke: 'black' },
			'-=1'
		);
	hamburger.addEventListener('click', () => {
		tl.reversed() ? tl.play() : tl.reverse();
	});
}
function throttle(func, limit) {
	let inThrottle;
	return function () {
		const args = arguments;
		const context = this;
		if (!inThrottle) {
			func.apply(context, args);
			inThrottle = true;
			setTimeout(() => (inThrottle = false), limit);
		}
	};
}

init();
