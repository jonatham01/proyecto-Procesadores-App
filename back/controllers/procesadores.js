const { response } = require('express');

const Procesador = require('../models/procesador');

const getProcesadores =async(req, res =response) => {

    const procesadores = await Procesador.find();

    res.json({
        ok:true,
        procesadores
    })
}

const getProcesadoresFiltrados =async(req, res =response) => {

    const {tecnologia,nucleos,subprocesos,cache}=req.body;

    const procesadores = await Procesador.find({ tecnologia: tecnologia,nucleos,subprocesos,cache  });

    res.json({

        ok:true,

        procesadores
    })
}

const CrearProcesador= async(req, res = response) => {

    const procesador =new Procesador( req.body);

    try{

        const procesadorGuardado = await procesador.save();

        res.json({ok:true,  procesador:procesadorGuardado})

    }

    catch(error){
        res.status(500).json({
            ok: false,
            msg: 'Mensaje de error'
        });
    }
}

const actualizarProcesador =async (req, res=response) => {

    const procesadorId = req.params.id;

    try{
        const procesador = await Procesador.findById(procesadorId);//corregir

        if(!procesador){
            return res.status(400).json({
                ok:false,
                msg: 'no existe procesador'
            })
        }

        const nuevoProcesador ={
            ...req.body
        }

        const procesadorActualizado= await Procesador.findByIdAndUpdate( procesadorId, nuevoProcesador, { new: true } );

        res.json({
            ok: true,
            evento: procesadorActualizado
        });

    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar'
        });
    }
}

const eliminarProcesador = async( req, res = response ) => {

    const procesadorId = req.params.id;
    

    try {

        const procesador = await Procesador.findById( procesadorId );

        if ( !procesador ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        await Procesador.findByIdAndDelete( procesadorId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error al borrar procesador'
        });
    }

}

module.exports={
    getProcesadores,
    CrearProcesador,
    actualizarProcesador,
    eliminarProcesador,
    getProcesadoresFiltrados

}