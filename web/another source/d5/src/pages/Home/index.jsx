import React, { useState } from 'react'

import styles from './styles.module.css'

import { Task } from '../../components/Task';

export function Home() {
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState([]);
    const [id, setId] = useState(1);

    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    const createTask = (event) => {
        event.preventDefault();
        const newTasks = [...tasks, {
            id,
            title,
            isCompleted: false
        }];
        setId(id + 1);
        setTasks(newTasks);
        setTitle('');
    };

    const deleteTask = (taskId) => {
        const newTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(newTasks);
    };

    const updateTask = (taskId) => {
        const newTasks = tasks.filter((task) => {
            if (task.id === taskId) {
                task.isCompleted = !task.isCompleted
            }
            return tasks;
        })
        setTasks(newTasks);
    };

    return (
        <div>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    Crie sua lista de tarefas!
                </h1>
            </header>
            <form className={styles.form} onSubmit={createTask}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Insira sua tarefa..."
                    value={title}
                    onChange={handleChange}
                    maxLength={20}
                />
                <button
                    type="submit"
                    className={styles.button}>
                    Adicionar tarefa
                </button>
            </form>
            <div>
                {tasks.map((task, index) => (
                    <Task key={index} task={task} deleteTask={deleteTask} updateTask={updateTask} />
                ))}
            </div>
        </div>
    );
}
