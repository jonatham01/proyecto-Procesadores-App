import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { procesadorSearch, procesadorStartLoading, procesadorStartUpdated } from '../actions/eventosPrecesadores';

import { ProcesadorEntry } from './procesadorEntry';

import Modal from "react-modal";

import { uiCloseModal } from '../actions/ui';
import { procesadorClearActive} from '../actions/eventosPrecesadores';



Modal.setAppElement('#root');



const initForm = {
    nombre:'',
    tecnologia: '',
    nucleos: '',
    subprocesos: '',
    cache: ''
}

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

const procesadorInit = {
        nombre:'ok',
        tecnologia:'ok',
        nucleos:'ok',
        subprocesos:'ok',
        cache:'ok',
        id:'ok'
};


export const ProcesadoresScreen = () =>{

    const [formValues, setFormValues] = useState( initForm );
   
    //cambio en el formulario
    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    const dispatch = useDispatch ();

    useEffect(() => {
        dispatch( procesadorStartLoading() );
       
    },[])


    //extraemos valores del state
    const { procesadores } = useSelector( state => state.intel );
    
    
    //Crea Busqueda
    const handeleSubmitNew = (e) => {
        e.preventDefault();
        dispatch( procesadorSearch (formValues) );
    }

////MODAL

const { procesadorActivo} = useSelector(state => state.intel);
console.log('procesador activo', procesadorActivo);

const {modalOpen} = useSelector(state => state.ui);
console.log('modelOpen',modalOpen);

const [procesadorState, setprocesadorState] = useState( procesadorInit );



useEffect(() => {
    if(modalOpen==false){
        setprocesadorState({procesadorInit});
    }else{
        setprocesadorState(procesadorActivo);
    }
   
   }, [modalOpen]);
 
console.log('estado:',procesadorState);

const closeModal = (e) =>{
    dispatch( uiCloseModal() );
    dispatch( procesadorClearActive() );
  }

 
    const {nombre,tecnologia,nucleos,subprocesos,cache} =  procesadorState;

    const changeModalProcesador = ({ target }) => {
        setprocesadorState({
            ...procesadorState,
            [target.name]: target.value
        });}

     const submitProcesadorEdit = (e) =>{
         e.preventDefault();
         
          dispatch(procesadorStartUpdated(procesadorState));

          closeModal();
          console.log("estado del procesadora",procesadores);
  }

    return(
        <>
         
        <div className="container"><h1>App de procesadores Intel</h1><br/> </div>
        <div className="container">
           

            <div className="row">
                <div className="col-4">
                    <form onSubmit={handeleSubmitNew}>
                    
                    
                    <input 
                     value={formValues.tecnologia}
                     name="tecnologia"
                     type="text" 
                     className="form-control"
                     onChange={handleInputChange}
                     />

                    <label for="exampleInputEmail1" className="form-label">Nucleos</label>
                    <input 
                     value={formValues.nucleos}
                     name="nucleos"
                     type="text" 
                     className="form-control"
                     onChange={handleInputChange}
                     />

                    <label for="exampleInputEmail1" className="form-label">Subprocesos</label>
                    <input 
                     value={formValues.subprocesos}
                     name="subprocesos"
                     type="text" 
                     className="form-control"
                     onChange={handleInputChange}
                     />

                    <label for="exampleInputEmail1" className="form-label">Cache</label>
                    <input 
                     value={formValues.cache}
                     name="cache"
                     type="text" 
                     className="form-control"
                     onChange={handleInputChange}
                     />

                     <button type="submit" className="btn btn-primary">Buscar</button>

                    </form>

                </div>

                <div className="col-8">
                {
                procesadores.map( data => (
                    <ProcesadorEntry                      
                        key={ data.nombre }
                        { ...data }
                    />
                    
                ))
            }
                </div>
            </div>

            
         
        </div>
        <Modal
          isOpen={ modalOpen }
          onRequestClose={ closeModal }
          style={ customStyles }
          closeTimeoutMS={ 200 }
          
          
        >

          <h1>{nombre} </h1>
          <form onSubmit={submitProcesadorEdit}>

          <label className="form-label">Nombre</label>

              <input 
              type="text" 
              className="form-control" 
              name="nombre"
              value={nombre}
              onChange={changeModalProcesador}
              />
            
            <label className="form-label">Tecnologia</label>

              <input 
              type="text" 
              name="tecnologia"
              value={tecnologia}
              onChange={changeModalProcesador}
              />

            <label className="Nucleos">Nombre</label>

              <input 
              type="text" 
              className="form-control"
              name="nucleos"
              value={nucleos}
              onChange={changeModalProcesador}
              />

            <label className="form-label">SubProcesos</label>

            <input 
              type="text" 
              className="form-control"
              name="subprocesos"
              value={subprocesos}
              onChange={changeModalProcesador}
              />

            <label className="form-label">Cache</label>
            <input 
              type="text" 
              className="form-control"
              name="cache"
              value={cache}
              onChange={changeModalProcesador}
              />

              <button type="submit" className="btn btn-primary">Buscar</button>

          </form>


        </Modal>
        </>
    )
}