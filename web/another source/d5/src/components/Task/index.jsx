import styles from './styles.module.css'

export function Task(props) {
    return (
        <div className={styles.container}>
            <button
                className={styles.icons}
                onClick={() => props.deleteTask(props.task.id)}
            >
                ❌
            </button>
            <p className={styles.title}>{props.task.title}</p>
            <button
                className={styles.icons}
                onClick={() => props.updateTask(props.task.id)}
            >
                {props.task.isCompleted ? '✅' : '⬜️'}
            </button>
        </div>
    )
}
