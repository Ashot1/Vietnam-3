import { useEffect, useState } from 'react'
import styles from './footer.module.css'


export default function Footer() {

    const [FooterDate, setFooterDate] = useState()

    let NowDate = new Date,
        NowTime = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }

    useEffect(() => {

        const interval = setInterval(() => {
            setFooterDate(NowDate.toLocaleString("ru", NowTime))
        }, 1000);

        return () => { clearInterval(interval) }

    }, [FooterDate])

    return (
        <div className={styles.footer}>
            <span className={styles.time}>
                {FooterDate}
            </span>
        </div>
    )
}