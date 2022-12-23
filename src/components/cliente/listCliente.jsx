import axios from 'axios';
import { useState, useEffect } from 'react';
import LogPage from '../home/logPage';
import NavPage from '../home/navPage';

const ListCliente = () => {
    //url ruta del backend
    const url = 'https://mitienda-backend.onrender.com/';
    //Array para almacenar la informacion de los registros para mostrar en la tabla
    const [clientes, setClientes] = useState([]);

    /**
     * Funcion para listar los datos del cliente
     */
    const listarCliente = async () => {
        await axios.get(url + 'cliente')
            .then(res => setClientes(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        listarCliente();
    }, [])
    //l
    /**
     * Guardar
     */
    const [_id, setId] = useState('')

    const [identificacion, setIdentificacion] = useState('')
    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [celular, setCelular] = useState('')
    const [genero, setGenero] = useState('')
    const [nacimiento, setNacimiento] = useState('')


    const guardar = (event) => {
        event.preventDefault();
        if(_id.length==0){
            axios.post(url + 'cliente', {
                identificacion, nombre, correo, celular, genero, nacimiento
            })
            .then(res =>limpiar())
            .catch(err => console.log(err))
        } 
        else {
            axios.put(url + 'cliente', {
                _id,identificacion, nombre, correo, celular, genero, nacimiento
            })
            .then(res =>limpiar())
            .catch(err => console.log(err))
        }
       
    }
    /**
     * Limpiar
     */
    const limpiar = () =>{
        setIdentificacion('');
        setNombre('');
        setCorreo('');
        setCelular('');
        setGenero('');
        setNacimiento('');
        const btnClose = document.getElementById('btnClose');
        btnClose.click();
        listarCliente();
    }

    /**
     * Eliminar
     */

    const eliminar = (id) => {
        axios.delete(url + 'cliente/' + id)
            .then()
            .catch(err => console.log(err))

    }

    /**
     * Editar 
     */
    const editar = (data) => {
        setId(data._id);
        setIdentificacion(data.identificacion);
        setNombre(data.nombre);
        setCorreo(data.correo);
        setCelular(data.celular);
        setGenero(data.genero);
        setNacimiento(data.nacimiento.substring(0, 10));

        const btnNuevo = document.getElementById('btnNuevo')
        btnNuevo.click();

    }

    /**
     * Buscar
     */
    const buscar = async (nom) =>{
        if(nom.length==0){
            listarCliente()
        } 
        else{
            await axios.get(url+'cliente/nom/'+nom)
            .then( res => setClientes(res.data))
            .catch( err => console.log(err))
        }
        
    } 

    return (
        <div>
            <LogPage />
            <NavPage />
            <div className="card m-2">
                <div className="card-header text-bg-info">
                    Gestión de clientes
                </div>
                <div className="card-body">

                    <div className='row'>
                        <div className='col-5'>
                            <input type="search" onKeyUp={(e)=>buscar(e.target.value)} className="form-control" placeholder='Digite un nombre' />
                        </div>
                        <div className='col-1'>
                            <button type="button" className="btn btn-outline-primary" title='Buscar'>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button></div>
                        <div className='col-6 text-end'>
                            <button type="button" id='btnNuevo' className="btn btn-outline-primary" title='Nuevo' data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <i className="fa-solid fa-address-book"></i>
                            </button>
                        </div>
                    </div>
                    <hr />

                    <table className="table table-hover table-bordered">
                        <thead className="table-info">
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Identificación</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Celular</th>
                                <th scope="col">Opciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                clientes.map((cliente, index) => (
                                    <tr key={cliente._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{cliente.identificacion}</td>
                                        <td>{cliente.nombre}</td>
                                        <td>{cliente.correo}</td>
                                        <td>{cliente.celular}</td>
                                        <td className='text-center'>
                                            <button type="button" onClick={() => editar(cliente)} className="btn btn-outline-warning buttonOpc" title='Editar'>
                                                <i className="fa-solid fa-pen"></i>
                                            </button>

                                            <button type="button" onClick={() => eliminar(cliente._id)} className="btn btn-outline-danger buttonOpc" title='Eliminar'>
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )

                                )
                            }


                        </tbody>
                    </table>

                </div>
            </div>


            <div className="modal fade modal-lg" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Nuevo Cliente</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={guardar}>
                                <div className='row'>
                                    <div className="col mb-1">
                                        <label className="col-form-label">Identificación:</label>
                                        <input type="number" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} className="form-control" id="recipient-name" />
                                    </div>
                                    <div className="col mb-1">
                                        <label className="col-form-label">Nombre:</label>
                                        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-control" id="recipient-name" />
                                    </div>
                                </div>


                                <div className="mb-1">
                                    <label className="col-form-label">Correo:</label>
                                    <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} className="form-control" id="recipient-name" />
                                </div>

                                <div className="mb-1">
                                    <label className="col-form-label">Celular:</label>
                                    <input type="number" value={celular} onChange={(e) => setCelular(e.target.value)} className="form-control" id="recipient-name" />
                                </div>

                                <div className="mb-1">
                                    <label className="col-form-label">Fecha nacimiento:</label>
                                    <input type="date" value={nacimiento} onChange={(e) => setNacimiento(e.target.value)} className="form-control" id="recipient-name" />
                                </div>

                                <div className="mb-1">
                                    <label className="col-form-label">Genero:</label>
                                    <select className='form-select' onChange={(e) => setGenero(e.target.value)}>
                                        <option>Femenino</option>
                                        <option>Masculino</option>
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" id='btnClose' data-bs-dismiss="modal">Cerrar</button>
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default ListCliente