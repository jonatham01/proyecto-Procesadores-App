import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {procesadorSearch, procesadorStartLoading} from '../actions/eventosPrecesadores';

initForm={
    nombre:'',
    tecnologia: '',
    nucleos: '',
    subprocesos: '',
    cache: ''
};

export const ff = () => {

    const [state, setstate] = useState(initForm);

    const changeForm = ({target}) =>{
        setstate({
            ...state,
            [target.name]:target.value,
        }
        )
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(procesadorStartLoading());
        
    }, [dispatch]);

    const {procesadores} = useSelector(state => state.intel);

    const submitForm= (e) => {
        e.preventDefault();
        dispatch(procesadorSearch());
    }


    return(
        <>
        <div className="container"><h1>App de procesadores Intel</h1><br/> </div>
        <div className="container">
           

            <div className="row">
                <div className="col-4">
                    <form onSubmit={handeleSubmitNew}>
                    <label for="exampleInputEmail1" className="form-label">Tecnologia</label>
                    
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
        </>
    )
}
