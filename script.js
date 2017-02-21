const sun = document.getElementsByClassName('sun')[0];
const body = document.getElementsByTagName('body')[0];
const minute = 1000 * 60;
let pomodoro = minute * 25;
let brk = minute * 5;
let deg = 0;

const title = document.getElementsByTagName('title')[0];
title.innerText = `WORK: ${new Date(pomodoro).getMinutes()} minutes left.`

const colors = {
	morning: '#E08283',
	day: '#F5D76E',
	midday: '#C5EFF7',
	dusk: '#E08283',
	night: '#674172',
	midnight: '#333',
	moon: '#ECF0F1',
	sun: '#ffff52'
}

const setDegree = (length, deg, time) => {
	const seg = 180 / length;
	deg = deg + seg;

	const rotation = Math.floor(deg / 360);
	const baseDeg = deg - (360 * rotation)

	switch(true){
		case (baseDeg <= 30):
			body.setAttribute('style', `background-color:${colors.morning}`)
			break;
		case (baseDeg <= 45):
			body.setAttribute('style', `background-color:${colors.day}`)
			break;
		case (baseDeg <= 90):
			body.setAttribute('style', `background-color:${colors.midday}`)
			break;
		case (baseDeg <= 175):
			body.setAttribute('style', `background-color:${colors.day}`)
			break;
		case (baseDeg <= 190):
			body.setAttribute('style', `background-color:${colors.dusk}`)
			break;
		case (baseDeg <= 210 || baseDeg >= 270):
			body.setAttribute('style', `background-color:${colors.night}`)
			break;
		default:
			body.setAttribute('style', `background-color:${colors.midnight}`)

	}

	sun.style.transform = `rotate(${deg}deg)`;
	sun.style.background = deg < 180 * rotation ? colors.sun : colors.moon;
	return deg;
}


setInterval(() => {
	const rotation = Math.floor(deg / 360);
	const baseDeg = deg - (360 * rotation)

	if (baseDeg < 180) {
		pomodoro -= minute;
		title.innerText = `WORK: ${new Date(pomodoro).getMinutes()} minutes left.`
		brk = minute * 5;
		deg = setDegree(5, deg)
	} else {
		deg = setDegree(5, deg)
		brk -= minute;
		title.innerText = `Break: ${new Date(brk).getMinutes()} minutes left.`
		pomodoro = minute * 25;
	}
}, minute);

setTimeout(() => deg = setDegree(25, deg), 10);
