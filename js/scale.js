/*
Масштаб:
1. При нажатии на кнопки .resize__control--minus и .resize__control--plus должно
изменяться значение поля .resize__control--value .
2. Значение должно изменяться с шагом в 25. Например, если значение поля установлено
в 50%, после нажатия на «+», значение должно стать равным 75%. Максимальное
значение — 100%, минимальное — 25%. Значение по умолчанию — 100%.
3. При изменении значения поля .resize__control--value изображению .imgupload__
preview должен добавляться соответствующий стиль CSS, который с помощью
трансформации scale задаёт масштаб. Например, если в поле стоит значение 75%,
то в стиле изображения должно быть написано transform: scale(0.75)
*/

(function () {

	const MIN = 25;
	const MAX = 100;

	let resizeControls = document.querySelector(".upload-resize-controls");
	let buttons = resizeControls.querySelectorAll("button");
	let resizeValue = resizeControls.querySelector("input[type='text'");
	let imagePreview = document.querySelector('.effect-image-preview');


	function changeScaleValue(initValue, step) {
		let result = initValue + step;
		result = Math.max(result, MIN);
		result = Math.min(result, MAX);
		resizeValue.value = result + '%';
		imagePreview.style.transform = "scale(" + result / 100 + ")";
	}

	buttons[0].addEventListener("click", (evt) => {
		evt.preventDefault();
		changeScaleValue(parseInt(resizeValue.value), -25);
	});

	buttons[1].addEventListener("click", (evt) => {
		evt.preventDefault();
		changeScaleValue(parseInt(resizeValue.value), 25);
	});





})();