(function () {
	let renderPictures = function(list, action) {
		let picturesContainer = document.querySelector('.pictures');
		let template = document.querySelector('#picture-template').content.querySelector('.picture');
		let fragment = document.createDocumentFragment();
	
		for(let i = 0; i < list.length; i++) {
			let element = template.cloneNode(true);
			element.children[0].src = list[i].url;
			element.children[1].children[0].textContent = list[i].comments.length;
			element.children[1].children[1].textContent = list[i].likes;
			element.data = list[i];
	
			element.addEventListener('click', action);
	
			fragment.appendChild(element);
		}
			picturesContainer.appendChild(fragment);
	}

	window.render = {
		renderPictures: renderPictures
	};
})();
