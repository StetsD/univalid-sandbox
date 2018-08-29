let {
	Observable
} = require('rxjs');

const locations = new Observable((observer) => {
	const {
		next,
		error
	} = observer;
	let watchId;

	if ('geolocation' in navigator) {
		watchId = setInterval(()=>{
			navigator.geolocation.getCurrentPosition(pos => {
				observer.next(pos);
			}, error);
		}, 1000);
	} else {
		error('Geolocation not available');
	}

	return {
		unsubscribe() {
			clearInterval(watchId);
		}
	};
});


const locationsSubscription = locations.subscribe(
	function(position) {
		console.log('Current Position: ', position);
		document.title = position.coords.latitude.toFixed(3)
	},
	function(msg) {
		console.log('Error Getting Location: ', msg);
	},
	function(){
		console.log('done')
	}
);


setTimeout(() => {
	locationsSubscription.unsubscribe();
}, 10000);
