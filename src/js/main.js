window.addEventListener('DOMContentLoaded', () => {
	// Declaration for Nav & Hero
	const body = document.querySelector('body')
	const hamburgerButton = document.querySelector('.hamburger-button')
	const navMobile = document.querySelector('.nav-mobile')
	const header = document.querySelector('header')
	const downArrow = document.querySelector('.hero-section__shadow__arrowbox-wrapper')

	const liArray = document.querySelectorAll('.nav-mobile__right-container > ol > li')
	const allleftMenuItems = document.querySelectorAll('.nav-mobile__left-container__content')

	// Declaration for Offer Tabs
	const slickSlide = $('.offer-tabs__tab')
	const categoryBoxes = document.querySelectorAll('.offer-menu__category-boxes__box')
	const offerTabs = document.querySelectorAll('.offer-tabs__tab')
	const arrOfOfferTabItems = document.querySelectorAll('.offer-tabs__tab__item')
	const singUpButtonsOnTabs = document.querySelectorAll('.offer-tabs__tab__item__signUp-btn')
	const singUpPanel = document.querySelector('.sing-up')
	const selectedCourseSingUpPanelLabel = document.getElementById('selectedCourseDisplay')
	const arrOfClickedButtons = []

	// Declaration for Form

	const singUpCircle = document.querySelector('.sing-up__circle__shape')
	const aboveFormTexts = document.querySelectorAll('.sing-up__form__texts')
	const singUpForm = document.getElementById('form')
	const formResult = document.getElementById('form-results')

	// Declaration for About

	const arrOfPersonImages = document.querySelectorAll('.opinions__image-shape__box__person-data')
	const arrOfPersonOpinions = document.querySelectorAll('.opinions__opinions-set__slick__text')
	let prevImage = arrOfPersonImages[0]
	let prevOpinion = arrOfPersonOpinions[0]
	let opinionNumber = 1

	// Current Year for Footer

	const currentYearSpan = document.getElementById('currentYear')

	//  ----------- Nav & Hero -----------

	const toggleMobileNav = () => {
		navMobile.classList.toggle('nav-mobile--opened')
		header.classList.toggle('mobile-nav-opened')
		body.classList.toggle('mobile-nav-opened_change-body')
	}

	hamburgerButton.addEventListener('click', e => {
		toggleMobileNav()

		const targetButton = e.target.closest('button')

		targetButton.classList.toggle('opened')
		navMobile.setAttribute('aria-expanded', navMobile.classList.contains('nav-mobile--opened'))
	})

	liArray.forEach(el => {
		;['focus', 'mouseenter', 'touchstart'].forEach(evnt => {
			el.addEventListener(evnt, e => {
				allleftMenuItems.forEach(el => {
					el.classList.remove('nav-mobile__left-container__content--enabled')
				})

				const selectedLi = e.target.closest('li')
				const liNumber = selectedLi.getAttribute('tabindex')
				const leftMenuItem = document.querySelector(`[data-item='${liNumber}']`)
				leftMenuItem.classList.add('nav-mobile__left-container__content--enabled')
			})
		})

		el.addEventListener('click', () => {
			toggleMobileNav()
			setTimeout(() => {
				hamburgerButton.classList.toggle('opened')
				clearTimeout()
			}, 200)
		})
	})

	downArrow.addEventListener('click', () => {
		document.getElementById('about').scrollIntoView()
	})

	// Reset sing-up after click into offer tab or offer box (BEFORE SLICK CHANGES!)

	const hideSingUp = () => {
		singUpPanel.classList.remove('animate-visibility-visible-sign-up')
		singUpButtonsOnTabs.forEach(btn => {
			btn.classList.remove('activated-singup-panel')
			btn.childNodes[1].dataset.rotate = '270deg'
		})
	}

	arrOfOfferTabItems.forEach(item => {
		item.addEventListener('click', () => {
			if (
				item.classList.contains('slick-current') &&
				item.closest('ul').classList.contains('animate-visibility-visible-offers')
			) {
			} else {
				hideSingUp()
			}
		})
	})

	categoryBoxes.forEach(box => {
		box.addEventListener('click', () => {
			hideSingUp()
		})
	})

	//  ----------- Slick JS -----------

	$(document).ready(function () {
		//Slick for offers
		slickSlide.slick({
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			// adaptiveHeight: true,
			centerMode: true,
			arrows: false,
			dots: true,
			variableWidth: true,
			focusOnSelect: true,
		})
	})

	// ----------- Offer Tabs -----------

	//Select Tabs Group
	let activeBoxMemory = categoryBoxes[1]
	categoryBoxes.forEach(box => {
		// Set Box Active
		box.addEventListener('click', () => {
			categoryBoxes.forEach(box => {
				box.dataset.active = 'false'
				box.classList.remove('active-box')
			})
			box.dataset.active = 'true'
			box.classList.add('active-box')
			activeBoxMemory = box

			//Enable Offer Tabs assigned to selected Box
			offerTabs.forEach(tab => {
				tab.classList.remove('animate-visibility-visible-offers')
				if (box.dataset.categoryGroup === tab.dataset.categoryGroup) {
					tab.classList.add('animate-visibility-visible-offers')
				}
			})

			document.getElementById('offerTabs').scrollIntoView({block: 'center'})

			slickSlide.slick('setPosition').slick('slickGoTo', 0)
		})

		box.addEventListener('mouseenter', () => {
			activeBoxMemory.classList.remove('active-box')
		})
		box.addEventListener('mouseleave', () => {
			activeBoxMemory.classList.add('active-box')
		})
	})

	//Sing Up
	const toggleFormVisibility = () => {
		const elementsToChangeVisibility = [...aboveFormTexts, singUpForm]
		elementsToChangeVisibility.forEach(el => el.classList.toggle('toggledVisibility'))
	}

	const formStateDisplay = state => {
		state === 'submitted' ? singUpCircle.classList.toggle('submitted') : singUpCircle.classList.toggle('failed')
	}

	singUpButtonsOnTabs.forEach(button => {
		const resetForm = state => {
			toggleFormVisibility()
			formStateDisplay(state)
		}
		button.addEventListener('click', e => {
			singUpCircle.classList.contains('submitted') ? resetForm('submitted') : undefined
			singUpCircle.classList.contains('failed') ? resetForm('failed') : undefined

			const selectedButton = e.target.closest('button')
			const buttonArrow = selectedButton.childNodes[1]
			const selectedTab = e.target.closest('li')
			const selectedCourse = selectedTab.firstElementChild.childNodes[3].innerText

			selectedCourseSingUpPanelLabel.innerText = selectedCourse

			selectedButton.classList.toggle('activated-singup-panel')

			if (selectedButton.classList.contains('activated-singup-panel')) {
				buttonArrow.dataset.rotate = '0deg'
				singUpPanel.classList.add('animate-visibility-visible-sign-up')
			} else {
				buttonArrow.dataset.rotate = '270deg'
				singUpPanel.classList.remove('animate-visibility-visible-sign-up')
			}

			if (!arrOfClickedButtons.includes(selectedButton)) {
				arrOfClickedButtons.push(selectedButton)
			}
			document.getElementById('singup').scrollIntoView({block: 'center'})
		})
	})

	form.addEventListener('submit', function (e) {
		e.preventDefault()
		const formData = new FormData(form)
		const object = Object.fromEntries(formData)
		object.access_key = '79232321-9239-4616-803f-b8b9e527b434'
		object.subject = 'Nowe zlecenie wynajmu ze strony internetowej'
		object.from_name = 'Formularz Strona'
		object.category = selectedCourseSingUpPanelLabel.innerText
		const json = JSON.stringify(object)

		toggleFormVisibility()
		formResult.innerHTML = '<p>Przetwarzanie formularza...</p>'

		fetch('https://api.web3forms.com/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: json,
		})
			.then(async response => {
				let json = await response.json()
				if (response.status == 200) {
					formResult.innerHTML = `
					<p>Udało się!</p>
					<p>Wybrałeś samochód kategorii <span class="accentColor" id="selectedCourseDisplay">${selectedCourseSingUpPanelLabel.innerText}</span>.</p>
					<p>Czujesz ekscytacje na myśl o swoim nowym samochodzie? Nie musisz długo czekać! Skontaktujemy się z Tobą w przeciągu najbliższych dni. Do usłyszenia!</p>`
					formStateDisplay('submitted')
				} else {
					console.log(response)
					formResult.innerHTML = `
					<p>Niestety wystąpił błąd :(</p>
					<p>${json.message}</p>
					<p>Jeśli problem będzie się powtarzał, prosimy o kontakt z naszym działem obsługi klienta. Przepraszamy za niedogodności!</p>`
					formStateDisplay('failed')
				}
			})
			.catch(error => {
				console.log(error)
				formResult.innerHTML = `
				<p>Niestety wystąpił błąd :(</p>
            	<p>Prosimy spróbować ponownie później.</p>
				<p>Jeśli problem będzie się powtarzał, prosimy o kontakt z naszym działem obsługi klienta. Przepraszamy za niedogodności!</p>`
				formStateDisplay('failed')
			})
			.then(function () {
				form.reset()
			})
	})

	// formSubmitButton.addEventListener('click', correctFormStateDisplay)

	let changeOpinion = () => {
		prevOpinion.classList.remove('animate-visibility-visible')
		prevImage.classList.remove('animate-visibility-visible')

		arrOfPersonOpinions[opinionNumber - 1].classList.add('animate-visibility-visible')
		arrOfPersonImages[opinionNumber - 1].classList.add('animate-visibility-visible')

		prevImage = arrOfPersonImages[opinionNumber - 1]
		prevOpinion = arrOfPersonOpinions[opinionNumber - 1]

		opinionNumber++

		if (opinionNumber === arrOfPersonOpinions.length + 1) {
			opinionNumber = 1
		}
	}

	window.setInterval(changeOpinion, 4000)

	// set footer current year

	let setFooterCurrentYear = () => {
		currentYearSpan.innerText = new Date().getFullYear()
	}
	setFooterCurrentYear()
})
