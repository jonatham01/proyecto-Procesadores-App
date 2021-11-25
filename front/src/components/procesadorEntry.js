import React from 'react';
import { procesadorSetActive } from '../actions/eventosPrecesadores';
import { uiOpenModal } from '../actions/ui';
import { useDispatch } from 'react-redux';


export const ProcesadorEntry= ({ nombre,tecnologia,nucleos,subprocesos,cache,_id }) =>{

    const ProcesadorInicial = {
        nombre,
        tecnologia,
        nucleos,
        subprocesos,
        cache,
        id: _id
    }

    const dispatch = useDispatch ();

    const ClickActive = (e) => {
        e.preventDefault();
        dispatch( procesadorSetActive (ProcesadorInicial) );
        dispatch( uiOpenModal() );
    }

    /*const activeModal = () =>{
        dispatch(uiOpenModal());
        dispatch(procesadorSetActive({ nombre,tecnologia,nucleos,subprocesos,cache }) );
    }*/

    return(
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{nombre}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Tecnologia: {tecnologia} </h6>
                <p className="card-text">Tiene {nucleos} nucleos, {subprocesos} subprocesos, y cuenta con cache de {cache} .</p>
                <button onClick={ClickActive}>Ver mas</button>               
            </div>
     </div>
    )
}