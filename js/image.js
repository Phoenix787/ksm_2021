//файл для работы с изображением: масштабирование, применение фильтров
(function () {

	

	let uploadEffectContainer = document.querySelector('.upload-effect__container');
	let uploadEffectLevel = document.querySelector('.upload-effect-level');
	let uploadEffectLevelLine = document.querySelector('.upload-effect-level-line');
	let uploadEffectLevelPin = document.querySelector('.upload-effect-level-pin');
	let uploadEffectLevelVal = document.querySelector('.upload-effect-level-val');
	let uploadEffectControls = document.querySelector('.upload-effect-controls');
	let imagePreview = document.querySelector('.effect-image-preview');

	const PIN_WIDTH = 18;
	const MAX_X = 455;
	const MIN_X = parseInt(uploadEffectLevel.offsetLeft);


	uploadEffectLevelPin.addEventListener('mousedown', (evt) => {

		evt.preventDefault();

		let startCoords = {
			x: evt.clientX,
			y: evt.clientY
		};


		function onMouseMove( moveEvt ) {
			moveEvt.preventDefault();

			let shift = {
				x: startCoords.x - moveEvt.clientX,
				y: startCoords.y
			};

			startCoords.x = moveEvt.clientX;

			let shifftedX = uploadEffectLevelPin.offsetLeft - shift.x;
			
			shifftedX = Math.max(shifftedX, MIN_X);
			shifftedX = Math.min(shifftedX, MAX_X);

			uploadEffectLevelPin.style.left = shifftedX + 'px';
		//	let depthOfEffect = Math.round((uploadEffectLevelLine.offsetLeft + uploadEffectLevelPin.offsetLeft - PIN_WIDTH) / 4.55);
			checkFilters(getDepthOfFilter());
			
		}

		function onMouseUp(upEvt) {
			upEvt.preventDefault();

			let depthOfEffect = getDepthOfFilter();
		  uploadEffectLevelVal.style.width = depthOfEffect + '%';
			checkFilters(depthOfEffect);

			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);

		}

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);

	})

	function checkFilters(newPercent) {
		let effects = uploadEffectControls.querySelectorAll('input[type="radio"]');
		for(let i = 0; i < effects.length; i++) {
			if (effects[i].checked) {
				let effect = effects[i].value;
				let effectValue;

				switch (effect) {
					case 'none':
						effectValue = 'none';						
						break;
					case 'chrome': 
						effectValue = 'grayscale('+ String(parseFloat(newPercent / 100).toFixed(2)) + ')';		
						break;
					case 'sepia':
						effectValue = 'sepia(' + String(parseFloat(newPercent / 100).toFixed(2)) + ')';						
						break;
					case 'marvin':
						effectValue = 'invert(' + String(newPercent) + '%)';						
						break;
					case 'phobos':
						effectValue = 'blur(' + String(Math.round((newPercent * 3) / 100)) + 'px)';						
						break;
					case 'heat':
						effectValue = 'brightness(' + String(parseFloat((newPercent * 3) / 100).toFixed(1)) + ')';						
						break;

				}
				
				imagePreview.style.filter = effectValue;
				return;
			}
		}
	}

	function getDepthOfFilter() {
		return Math.round((uploadEffectLevelLine.offsetLeft + uploadEffectLevelPin.offsetLeft - PIN_WIDTH) / 4.55);
	}

	function addImageEffect(evt) {
		// if(evt.target.className === 'effect-image-preview') {
		// 	return;
		// }
		imagePreview.className = 'effect-image-preview';

		 let str = evt.target.id;
		 str = str.substr(14);
	   console.log(str);
		 str === 'none' ?	uploadEffectLevel.classList.add('hidden') : uploadEffectLevel.classList.remove('hidden');

		 imagePreview.classList.add('effect-' + str);
		let depthOfEffect = getDepthOfFilter();
		checkFilters(depthOfEffect);
		uploadEffectLevelVal.style.width = depthOfEffect + '%';


	}

	uploadEffectControls.addEventListener('change', addImageEffect);

})();