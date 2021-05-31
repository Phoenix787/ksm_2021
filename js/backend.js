(function () {

	const Code = {
		SUCCESS: 200,
		BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		NOT_FOUND: 404,
		SERVER_ERROR: 500
	};

	const Url = {
		LOAD: 'http://localhost:3000/photos',
		UPLOAD: 'http://localhost:3000/photos'
	}

	function createXMLHttpRequest(onSuccess, onError) {
		let xhr = new XMLHttpRequest();

		xhr.responseType = 'json';

		xhr.addEventListener('load', () => {
			switch(xhr.status) {
				case Code.SUCCESS: 
					onSuccess(xhr.response);
					break;
				case Code.BAD_REQUEST: 
					onError('Неправильный запрос');
					break;
				case Code.UNAUTHORIZED: 
					onError('Пользователь не авторизован');
					break;
				case Code.NOT_FOUND:
					onError('Ничего не найдено');
					break;
				case Code.SERVER_ERROR:
					onError('Ошибка сервера');
					break;
				default:
					onError("Статус ответа: " + xhr.status + ' ' + xhr.statusText);
			}

		});
		return xhr;
	}

		function load(onSuccess, onError) {
			let xhr = createXMLHttpRequest(onSuccess, onError);

			xhr.open('GET', Url.LOAD);
			xhr.send();
		}

		function loadMock(onSuccess, onError, flag=1) {

			if(flag === 1) {
				onSuccess('Данные загружены успешно');
			};
			if(flag === 0) {
				onError('Ошибка загрузки данных');
			}
		}

		function save(data, onSuccess, onError) {
			let xhr = createXMLHttpRequest(onSuccess, onError);
			
			xhr.open('POST', Url.UPLOAD);
			xhr.send(data);
		}

		function saveMock(data, onSuccess, onError, flag=1) {
			if(flag === 1) {
				onSuccess('Данные отправлены успешно', data);
			}
			if(flag === 0) {
				onError('Ошибка отправки данных');
			}
		}




	window.backend = {
		load: load,
		save: save		
	}
})();