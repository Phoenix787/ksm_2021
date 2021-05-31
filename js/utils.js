(function () {

	let KEY_CODE = {
		ESC_KEYCODE: 'Escape',
		ENTER_KEYCODE: 'Enter'
	}
	/**
 * генерация случайного числа в заданном интервале
 * @param {*} min начальное число интервала
 * @param {*} max конечное число интервала
 * @returns 
 */
let getRandom = function(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
let  isEscEvent = function(evt, action) {
	if(evt.key === KEY_CODE.ESC_KEYCODE) {
		action();
	}
};

window.utils = {
	getRandom: getRandom,
	isEscEvent: isEscEvent
};

})();