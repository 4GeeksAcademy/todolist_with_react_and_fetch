import React, { useState, useEffect } from "react";

const Home = () => {
    const [newEntry, setNewEntry] = useState('');
    const [taskList, setNewList] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "label": newEntry,
                "is_done": false
            })
        };
        fetch("https://playground.4geeks.com/todo/todos/diegovega", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                getTasks()
                console.log(result)
                setNewEntry("")
            })
            .catch((error) => console.error(error));
    }

    const createUser = () => {
        const requestOptions = {
            method: "POST",
            redirect: "follow"
        };

        fetch("https://playground.4geeks.com/todo/users/diegovega", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                getTasks()
                console.log(result)
            })
            .catch((error) => console.error(error));
    }

    const getTasks = () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("https://playground.4geeks.com/todo/users/diegovega", requestOptions)
            .then((response) => {
                console.log(response);
                if (response.ok === false) {
                    createUser()
                } else { return response.json() }
            })
            .then((result) => setNewList(result.todos))
            .catch((error) => console.error(error));
    }

    const deleteTask = (id) => {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };

        fetch("https://playground.4geeks.com/todo/todos/" + id, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                getTasks()
                console.log(result)
            })
            .catch((error) => console.error(error));
    }

    const deleteAllTasks = () => {
        const requestOptions = {
            method: "DELETE",
            redirect: "follow"
        };

        fetch("https://playground.4geeks.com/todo/users/diegovega", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                setNewList([]);  
                createUser();
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <div className="container w-50">
            <h1 className="text-center">Lista de Tareas</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail" className="from-label"></label>
                    <input
                        className="form-control text-left"
                        placeholder="Escriba aqui su tarea..."
                        onChange={(event) => setNewEntry(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSubmit(event)
                            }
                        }}
                        value={newEntry}
                    />
                </div>
            </form>
            <h2 style={{ color: 'white' }}>Tareas Pendientes:</h2>
            <ul className="todos">{
                    taskList.map((task, index) => {
                        return (
                            <li key={index} style={{ color: 'white', fontSize: '1.5em' }}>
								<span style={{ fontStyle: 'italic'}}>{task.label}</span>{'    '}
                                <i 
                                    onClick={() => { deleteTask(task.id)}}
                                    className="fa-solid fa-trash">
                                </i>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="text-center">
                <button onClick={deleteAllTasks} className="btn btn-warning mb-3">Borrar todas las tareas!!</button>
            </div>
            <p style={{ color: 'white' }}>{taskList.length} tareas pendientes de ejecutar!</p>
        </div>
    );
};

export default Home;
