(function () {

	let comments = [
		'Всё отлично!',
		'В целом всё неплохо. Но не всё.',
		'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
		'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
		'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
		'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
	];
	
	let descriptions = [
		'Тестим новую камеру!',
		'Затусили с друзьями на море',
		'Как же круто тут кормят',
		'Отдыхаем...',
		'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
		'Вот это тачка!'
	];

	let generateComments = function(list) {
		let result = [];
		let num = window.utils.getRandom(1, 6);
		for(let i = 0; i < num; i++) {
			result.push(list[window.utils.getRandom(0, list.length-1)]);
		}
	
		return result;
	}

	let getPictures = function() {
		let listOfObjects = [];
	
		for(let i = 0; i < 25; i++) {
			let index = i+1;
			listOfObjects.push({
				url: 'photos/'+ index + '.jpg',
				likes: window.utils.getRandom(15, 200),
				comments: generateComments(comments),
				description: descriptions[window.utils.getRandom(0, 5)]
			});
		}
	
		return listOfObjects;
	}

	window.data = {
		getPictures: getPictures
	};

})();
