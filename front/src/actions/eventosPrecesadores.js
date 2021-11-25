import Swal from 'sweetalert2';

import { types } from '../types/types';
import { fetchSinToken } from '../helpers/fetch';

//carga el estado de los procesadores
const procesadorLoaded = (data) => ({
    type: types.procesadorLoaded,
    payload: data
})

//fetch get y dispatch de todos los procesadores
export const procesadorStartLoading = () =>{
    return async(dispatch) => {
        try{
            
            const resp = await fetch("http://localhost:4000/api/procesadores");
            const body = await resp.json();
            dispatch( procesadorLoaded(body.procesadores));
        }
        catch(error){
            console.log("hola");
        }
    }
}

//agregar nuevos procesadores
const  procesadorAddNew = (data) =>({
    type: types.procesadorAddNew,
    payload:data
} );
//fecth y dispatch de nuevo procesador
export const procesadorStartAddNew = (data)=>{
    return async( dispatch) => {

        try{
            const respuesta = fetchSinToken('procesadores',data,'POST');
            const body = await respuesta.json();

            if(body.ok){
                dispatch( procesadorAddNew(data) );
            }

        }
        catch(error){
            console.log(error);
        }
    }
}
//anade el procesador activo en el state
export const procesadorSetActive= (data) => ({
    type:  types.procesadorSetActive,
    payload: data
});

//borra el procesador activo del state
export const procesadorClearActive = () => ({ 
    type: types.procesadorClearActive 
});

const procesadorUpdated = (data ) => ({
    type: types.procesadorUpdated,
    payload: data
}); 

//fetch y dispatch de actualizacion del procesador
export const procesadorStartUpdated = (data) => {
    return async(dispatch) => {

        try{
            const respuesta = await fetchSinToken(`procesadores/${ data.id }`, data, 'PUT');
            const body = await respuesta.json();
            
            if(body.ok){
                console.log('data update: ', body)
                dispatch( procesadorUpdated(body.evento) );
            }
        }
        catch(error){console.log(error)}
    }
}


const procesadorDeleted = () => ({ type: types.procesadorDeleted });
//borra procesador del estado y de DB
export const procesadorStartDelete = () => {
    return async ( dispatch, getState ) => {

        const { id } = getState().intel.procesadorActivo;
        try {
            const resp = await fetchSinToken(`procesadores/${ id }`, {}, 'DELETE' );
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( procesadorDeleted () );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }


        } catch (error) {
            console.log(error)
        }

    }
}

export const eventLogout =() => ({ type: types.procesadorLogout });


/////consulta de procesadores

//fecth y dispatch de procesadores filtrados
export const procesadorSearch = (data)=>{
    return async( dispatch) => {

        try{
            const respuesta = await fetchSinToken('procesadores/filtro',data,'POST');
            const body = await respuesta.json();

            if(body.ok){
                dispatch( procesadorLoaded(body.procesadores) );
            }

        }
        catch(error){
            console.log(error);
        }
    }
}