import styles from './FavoriteConvertList.module.css'
import ValueInfo from "../ValueInfo/ValueInfo";

export default function FavoriteConvertList({List, Valute, click}) {
	
	return (
		<section className={styles.FavoriteWrapper}>
			<h2 className={styles.GroupName}>Избранное</h2>
			<ul className={styles.FavoriteList}>
				{Object.values(Valute).map(item => {
					if (!List.includes(item.CharCode)) return
					
					let New = (item.Value / item.Nominal)
					let Old = (item.Previous / item.Nominal)
					
					let percent = (((New - Old) / Old) * 100)
					return <ValueInfo
						key={`Favorite${item.CharCode}`}
						newCourse={New}
						oldCourse={Old}
						title={item.CharCode}
						fullTitle={item.Name}
						percent={percent}
						click={() => click(item.CharCode)}
					/>
				})}
			</ul>
		</section>
	);
}
