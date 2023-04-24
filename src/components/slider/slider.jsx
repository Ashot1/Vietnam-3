import styles from './slider.module.css'
import {useEffect, useMemo, useState} from 'react'


export default function Slider() {
	
	const [TouchX, setTouchX] = useState(0),
		[TouchX2, setTouchX2] = useState(0),
		[SlideNumber, setSlideNumber] = useState(0),
		image = useMemo(() => [
			{url: '/images/slider/Подкрадули.jpg'},
			{url: '/images/slider/Wensday.jpeg'},
			{url: '/images/slider/viktor-korneplod.jpg'},
			{url: '/images/slider/Папич.jpg'},
			{url: '/images/slider/Armenia.jpg'},
			{url: '/images/slider/KoshkaJena.jpg'},
			{url: '/images/slider/Shreks.jpg'},
			{url: '/images/slider/hitler.jpg'},
			{url: '/images/slider/Ukrain.jpg'},
			{url: ''}
		], [])
	
	// auto-slide
	useEffect(() => {
		if (SlideNumber >= image.length - 1) setSlideNumber(0)
		
		const interval = setInterval(() => {
			setSlideNumber((SlideNumber) => SlideNumber + 1);
		}, 5000);
		
		return () => clearInterval(interval)
	}, [SlideNumber])
	
	return (
		<div className={styles.sliderWrapper}>
			<div id='Slider' className={styles.slider} style={{backgroundImage: `url(${image[SlideNumber].url})`}}
			     onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
			     onTouchMove={(e) => {
				     setTouchX2(TouchX - e.touches[0].clientX > 0 ? SlideNumber + 1 : SlideNumber - 1)
			     }}
			     onTouchEnd={() => {
				     if (!TouchX || 0 === TouchX.length) return;
				     if (TouchX2 < 0) return setSlideNumber(image.length - 1)
				     setSlideNumber(TouchX2)
			     }}></div>
			<div className={styles.ButtonsWrapper}>
				<ul className={styles.points}>
					<Buttons ButtonID={SlideNumber}
					         ActiveNumber={SlideNumber}
					         Changes={(value) => setSlideNumber(value)}
					         image={image}/>
				</ul>
			</div>
		</div>
	)
}

function Buttons({image, Changes, ButtonID}) {
	
	return (
		image.map((item, index) => {
				return <li
					key={index}
					onClick={() => Changes(index)}
					className={index === image.length - 1 ? null : styles.SliderButton}
					style={{background: ButtonID === index ? 'var(--HeaderLogo)' : 'var(--SliderUnactiveButtonColor)'}}
				></li>
			}
		))
	
}
