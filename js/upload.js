(function () {
/*
Выбор изображения для загрузки осуществляется с помощью стандартного контрола
загрузки файла #upload-file , который стилизован под букву «О» в логотипе. После
выбора изображения (изменения значения поля #upload-file ), показывается форма
редактирования изображения.
*/

	let FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

	let fileChooser = document.querySelector('#upload-file');
	let uploadOverlay = document.querySelector('.upload-overlay');
	let uploadForm = document.querySelector('#upload-select-image');
	let uploadFormDescription = uploadForm.querySelector('.upload-form-description');
	let uploadCloseButton = uploadOverlay.querySelector('.upload-form-cancel');
	let uploadSubmitButton = uploadOverlay.querySelector('.upload-form-submit');
	let uploadFormPreview = uploadOverlay.querySelector('img[class="effect-image-preview"]');

	fileChooser.addEventListener('change', () => {
		let file = fileChooser.files[0];
		console.log(fileChooser.files);
		//console.log(fileChooser.value);
		let fileName = file.name.toLowerCase();
		let matches = FILE_TYPES.some( (it) => fileName.endsWith(it));

		if(matches) {
		//	let reader = new FileReader();
		//	reader.addEventListener('load', () => {
		//		uploadFormPreview.src = reader.result;
				uploadOverlay.classList.remove('hidden');
				document.addEventListener('keydown', closeOnEscHandle);
	//		});
		//	reader.readAsDataURL(file);
		}
	});

	uploadCloseButton.addEventListener('click', closeHandle);

	function closeHandle() {
		uploadOverlay.classList.add('hidden');
		uploadForm.reset();
		document.removeEventListener('keydown', closeOnEscHandle);
	}

	function closeOnEscHandle(evt) {
		if(hashtagsInput === document.activeElement) {
			return evt;
		}

		if(uploadDescription === document.activeElement) {
			return evt;
		}
		window.utils.isEscEvent(evt, closeHandle);
	}

	let uploadDescription = uploadForm.querySelector('.upload-form-description');

	//обработка поля хэштег
	let hashtagsInput = uploadForm.querySelector('.upload-form-hashtags');
	
	// let isUnique = function(item, arr) {
	// 	return !arr.some(el => el === item);
	// }

	let isUnique = function (arr) {
		return !(arr.length > arr.filter((item) => arr.indexOf(item) === arr.lastIndexOf(item)).length);
	}

	// function validityHashTag(evt) {
	// 	let message;
	// 	if(hashtagsInput.validity.patternMismatch) {
	// 		message = "Хэштеги должны начинаться с #";
	// 	} else {
	// 		message = "";
	// 	}

	// 	hashtagsInput.setCustomValidity(message);
	// }

	function isValidHashtag(str) {
		let hashtags = str.split(' ');
		console.log(hashtags);
		let pattern = /(#[А-Яа-яЁёA-Za-z]{1,20}$)/gi;
		for(let item of hashtags) {
			if(item.match(pattern) === null) {
				return false;
			}
		}
		return true;
	}

	//вернёт true если в массиве есть хотябы одно слово больше 20 символов
	function isBiggerTwenty(arr) {
		return arr.some(el => el.length > 20);
	}

	function validityInput(input) {
		let hashtags = input.value.toLowerCase().split(" ");
		let result = [];
		//console.log(hashtags);
		 if(hashtags.length > 5) {
			result.push("Должно быть только 5 хэштегов");
		} else if(!isUnique(hashtags)) {
			result.push("Хэштеги должны быть уникальными");
		} else if(!isValidHashtag(input.value)) {
			result.push("Хэштег должен состоять из # и символов кириллицы, латиницы и не более 20 символов");
		}
		return result;
	}

	// FIXME: пересмотреть функцию-колбэк может стоит выделить её  в отдельную функцию и возвращать из нее какой-либо результат, 
	// который потом использовать в submit
	hashtagsInput.addEventListener('input', (evt) => {
		let target = evt.target;
		let validity = validityInput(target);
		if(validity.length > 0) {
			target.setCustomValidity(validity.join(' \n'));
		} else {
			target.setCustomValidity('');
		}
		
	});

	hashtagsInput.addEventListener('invalid', () => {
		hashtagsInput.style.outline = "3px solid rgb(255, 0, 0)";
	});
	
	
uploadForm.addEventListener('submit', (evt) => {
	evt.preventDefault();

		// if(hashtagsInput.checkValidity() == false) {		
			
		// 		let inputCustomValidation = new CustomValidation();
		// 		inputCustomValidation.checkValidity(hashtagsInput);
		// 		let customValidationMessage = inputCustomValidation.getInvalidities();
		// 		console.log(customValidationMessage);
		// 		hashtagsInput.setCustomValidity(customValidationMessage);
								

		// 		// // Добавим ошибки в документ
		// 		// let customValidityMessageForHTML = inputCustomValidation.getInvaliditiesForHTML();
		// 		// hashtagsInput.insertAdjacentHTML('afterend', '<p class="error-message">' + customValidityMessageForHTML + '</p>')
		// 		// stopSubmit = true;
				
		// 	}
		// // else {
		// // 	evt.preventDefault();
		
		//  }
		
		
		//неверно заполненные поля подсвечиваются красной рамкой
		//		}
		
		
		
		// window.backend.save(data, onSuccess,	onError);
		let formData = new FormData(uploadForm);	
		console.log(convertFormDataToJson(formData));
		closeHandle();
		uploadForm.reset();
		
				
		
			// 
			//evt.preventDefault();
	});

	function CustomValidation() {	};

	CustomValidation.prototype = {
		invalidities: [],

		checkValidity: function(input) {
			let validity = input.validity;
			
			if(validity.patternMismatch) {
				this.addInvalidity('Неправильно набран текст для этого поля');
			}
			if(validity.rangeOverflow) {
				let max = getAttributeValue(input, 'max');
				this.addInvalidity('Превышено количество букв. Оно не должно превышать ' + max);
			}

			if(!isValidHashtag(input.value)) {
				this.addInvalidity('Хэштег должен состоять из # и символов кириллицы, латиницы и не более 20 символов');
			}
			if(input.value.split(' ').length > 5) {
				this.addInvalidity('Количество хэштегов привышает 5');
			}
			if(!isUnique(input.value.split(' '))) {
				this.addInvalidity('Хэштеги должны быть уникальны');
			}
			//остальные проверки			
		},
		addInvalidity: function(message) {
			this.invalidities.push(message);
		},

		getInvalidities: function() {
			return this.invalidities.join('. \n');
		}
	};
	CustomValidation.prototype.getInvaliditiesForHTML = function() {
		return this.invalidities.join('. <br>');
	}

	function onSuccess(message, data) {
		let divSuccess = document.createElement('div');
		let pSuccess = document.createElement('p');
		divSuccess.classList.add("upload-message");
		pSuccess.textContent = message;
		divSuccess.appendChild(pSuccess);
		document.body.appendChild(divSuccess);
		console.log(data);

		setTimeout(() => {
			document.body.removeChild(divSuccess);
		}, 3000);
	}

	function onError(message) {
		let uploadErrorMessage = document.querySelector('.upload-message');
		
		// let divError = document.createElement('div');
		let pError = document.createElement('p');
		pError.textContent = message;
		uploadErrorMessage.children[0].appendChild(pError);
		uploadErrorMessage.classList.remove('hidden');

		setTimeout(() => {
			uploadErrorMessage.classList.add('hidden');
		}, 3000);
	}
//for check in development mode
	function convertFormDataToJson(formData) {
		let object = {};
		formData.forEach((key, value) => {
			value === "filename" ? object[value] = URL.createObjectURL(fileChooser.files[0]) : object[value] = key;
		});

		return JSON.stringify(object);
	}


})();