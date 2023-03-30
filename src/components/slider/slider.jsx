import styles from './slider.module.css'
import {useEffect, useState} from 'react'

const image = [
	'/images/slider/Armenia.jpg',
	'/images/slider/hitler.jpg',
	'/images/slider/KoshkaJena.jpg',
	'/images/slider/Shreks.jpg',
	'/images/slider/Ukrain.jpg',
	'/images/slider/viktor-korneplod.jpg',
	'/images/slider/Папич.jpg'
]

export default function Slider() {
	
	const [SlideNumber, setSlideNumber] = useState(0)
	
	//button change slide
	function changeSlide(value) {
		return setSlideNumber(value)
	}
	
	// autoslide
	useEffect(() => {
		
		const interval = setInterval(() => {
			setSlideNumber((SlideNumber) => SlideNumber + 1);
		}, 5000);
		
		return () => {
			clearInterval(interval)
		}
	}, [SlideNumber])
	
	// Check slide != 7
	if (SlideNumber == image.length) {
		setSlideNumber(0)
	}
	
	return (
		<div className={styles.sliderWrapper}>
			<div id='Slider' className={styles.slider} style={{backgroundImage: `url(${image[SlideNumber]})`}}>
			
			</div>
			<div className={styles.ButtonsWrapper}>
				<ul className={styles.points}>
					<Buttons ButtonLength={SlideNumber} ActiveNumber={SlideNumber} Changes={changeSlide}/>
				</ul>
			</div>
		</div>
	)
}

function Buttons(props) {
	
	let ButtonsArray = []
	
	//create buttons
	for (let i = 0; i < image.length; i++) {
		ButtonsArray.push(
			<li
				key={i}
				onClick={() => {
					props.Changes(i)
				}}
				className={styles.SliderButton}
				style={{background: 'rgb(179, 179, 179)'}}
			>
			
			</li>
		)
		
	}
	
	// change color button
	ButtonsArray[props.ButtonLength].props.style.background = 'black'
	
	return (ButtonsArray)
}
