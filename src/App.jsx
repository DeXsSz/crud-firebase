import React, { useEffect, useState } from 'react';
import { firebase } from './firebase';

function App() {
    const db = firebase.firestore();

    const [tareas, setTareas] = useState([]);
    const [tarea, setTarea] = useState('');
    const [modoEdicion, setModoEdicion] = useState(false);
    const [id, setId] = useState('');
    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const db = firebase.firestore();
                const data = await db.collection('tareas').get();
                const arrayData = await data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setTareas(arrayData);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerDatos();
    }, []);

    const agregarTarea = async e => {
        e.preventDefault();
        if (!tarea.trim()) {
            console.log('Campo Vacio');
            return;
        }
        try {
            const nuevaTarea = {
                name: tarea,
                fecha: Date.now(),
            };
            const data = await db.collection('tareas').add(nuevaTarea);
            setTareas([...tareas, { ...nuevaTarea, id: data.id }]);
            setTarea('');
        } catch (error) {
            console.log(error);
        }
    };
    const eliminar = async id => {
        try {
            await db.collection('tareas').doc(id).delete();
            const arrayFiltrado = await tareas.filter(item => item.id !== id);
            setTareas(arrayFiltrado);
        } catch (error) {
            console.log(error);
        }
    };
    const activarEdicion = item => {
        setModoEdicion(true);
        setTarea(item.name);
        setId(item.id);
    };
    const editar = async e => {
        e.preventDefault();
        if (!tarea.trim()) {
            console.log('Campo Vacio');
            return;
        }
        try {
            await db.collection('tareas').doc(id).update({
                name: tarea,
            });
            const arrayEditado = tareas.map(item =>
                item.id === id ? { id: item.id, fecha: item.fecha, name: tarea } : item
            );
            setTareas(arrayEditado);
            setTarea('');
            setModoEdicion(false);
            setId('');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="container mb-2">
            <div className="row">
                <div className="col-md-6">
                    <h3>Listado Tareas</h3>
                    <ul className="list-group">
                        {tareas.map(item => (
                            <li className="list-group-item" key={item.id}>
                                <span>{item.name}</span>
                                <button
                                    className="btn btn-danger btn-sm float-right "
                                    onClick={() => eliminar(item.id)}>
                                    Eliminar
                                </button>
                                <button
                                    className="btn btn-warning btn-sm float-right mr-2"
                                    onClick={() => activarEdicion(item)}>
                                    Editar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    <h3>{modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'}</h3>
                    <form onSubmit={modoEdicion ? editar : agregarTarea}>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Ingese tu tarea aqui"
                            onChange={e => setTarea(e.target.value)}
                            value={tarea}
                        />
                        <button
                            className={
                                modoEdicion
                                    ? 'btn btn-warning btn-block btn-sm'
                                    : 'btn btn-dark btn-block btn-sm'
                            }
                            type="submit">
                            {modoEdicion ? 'Editar' : 'Agregar'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
