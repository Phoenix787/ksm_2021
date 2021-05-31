/**
 * Это файл, в котором вы будете вести работу с фотографиями, 
 * размещенными другими участниками
 */
(function () {

	let clickedPicture = null;
	let currentPicture = null;
	let loadedPhotos = null;
	
	let picturePreviewClose = document.querySelector('.gallery-overlay-close');
	
	picturePreviewClose.addEventListener('click', closePicturePreview);
	
	
	function closePicturePreview() {
		hideBigPicture();
		document.removeEventListener('keydown', closePicturePreviewOnESC);
	}
	
	function closePicturePreviewOnESC(evt) {
		window.utils.isEscEvent(evt, closePicturePreview);
	}
	
	
	let generateSocialComment = function(comment) {
		let commentElement = document.createElement('li');
		commentElement.classList.add('social__comment', 'social__comment--text');
		commentElement.innerHTML = 
		 `<img class="social__picture" src="img/avatar-${window.utils.getRandom(1, 7)}.svg"
		 alt="Аватар комментатора фотографии"
		 width="35" height="35">
		 <p class="social__text">${comment}</p> `;
	
		return commentElement;
	}
	
	let bigPictureElement = document.querySelector('.gallery-overlay-preview');
	
	let showBigPicture = function(evt) {
		let likesCount = bigPictureElement.querySelector('.likes-count');
		let commentsCount = bigPictureElement.querySelector('.comments-count');
		clickedPicture = evt.currentTarget;
		currentPicture = clickedPicture.data;
		
	
		bigPictureElement.children[0].src = currentPicture.url;
		likesCount.textContent = currentPicture.likes;
		commentsCount.textContent = currentPicture.comments.length;
		let commentsContainer = document.createElement('ul');
		commentsContainer.classList.add('social__comments');
	
		let fragment = document.createDocumentFragment();
		 for (let i = 0; i < currentPicture.comments.length; i++) {
			 let element = generateSocialComment(currentPicture.comments[i]);
			 fragment.appendChild(element);		
		}
	
		commentsContainer.appendChild(fragment);
		bigPictureElement.appendChild(commentsContainer);
	
		bigPictureElement.parentElement.classList.remove('hidden');
		document.addEventListener('keydown', closePicturePreviewOnESC);
		
	
		evt.preventDefault();
	}
	
	function hideBigPicture () {
		bigPictureElement.parentElement.classList.add('hidden');
		bigPictureElement.removeChild(bigPictureElement.querySelector('ul'));
		clickedPicture = null;
	}
	
	
	/**
	 * parameterFromBackendLoadFunction - это то, что берется из 
	 * xhr.addEventListener('load', () => {
				switch(xhr.status) {
					case Code.SUCCESS: 
	--------->> onSuccess(xhr.response);
						break;
	 */
	// window.backend.load((parameterFromBackendLoadFunction) => {
	// 	console.log('загрузка с помощью loadMock', parameterFromBackendLoadFunction);
	// 	window.render.renderPictures(window.data.getPictures(), showBigPicture);
	// }, 
	// onError
	// );

	let clearPhotos = () => {
		let picturesContainer = document.querySelector('.pictures');
		let photosElements = picturesContainer.querySelectorAll('.picture');
		photosElements.forEach(elem => elem.parentNode.removeChild(elem));
	}

	window.backend.load((list) => {
		console.log('загрузка с помощью real load', list);
		loadedPhotos = list;
		window.render.renderPictures(loadedPhotos, showBigPicture);
		window.filter.showFilters();
	
		
	}, 
	onError
	);
	
	window.filter.setCallback((currentTarget) => {
		let el = currentTarget.previousElementSibling;
		el.checked = true;	
		let filtered = window.filter.filterPictures(el.value, loadedPhotos);
		console.log(currentTarget.textContent, filtered)
		clearPhotos();
		window.render.renderPictures(filtered, showBigPicture);
	});
	
	
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

	// window.pictures = {
	// 	generateComments: generateComments
	// }
})();


