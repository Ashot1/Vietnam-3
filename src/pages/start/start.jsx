import styles from './start.module.css'

export default function StartPage(props) {

    return (
        <main className={styles.main}>
            <div className={styles.content}>
                {props.children}
            </div>
        </main>
    );
}