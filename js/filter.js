(function () {

	let filtersForm = document.querySelector('.filters');

	let showFilters = function() {
		filtersForm.classList.remove('hidden');
	}

	let filterPictures = function(value, data) {
		switch (value) {
			case "recommend":
				return data;
			case "popular":
				return data.slice().sort((a, b) => b.likes - a.likes);
			case "discussed":
				return data.slice().sort((a, b) => b.comments.length - a.comments.length);
			case "random":
				return data.slice().sort(() => Math.random() - 0.5).slice(0, 10);
		}
	}

	let externalCallbackFunction = null;
		
//добавляем слушателей события на инпуты
	filtersForm.addEventListener('click', (evt) => {
				evt.preventDefault();

				if(typeof externalCallbackFunction === 'function') {
					externalCallbackFunction(evt.target);
				}				
	});
	
	
			let setCallback = function (cb) {
			externalCallbackFunction = cb;
	}



	window.filter = {
		showFilters: showFilters,
		filterPictures: filterPictures,
		setCallback: setCallback
	}
})();