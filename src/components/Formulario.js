import React, { useEffect, useState } from "react"
import styled from "@emotion/styled"
import axios from "axios"

import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomoneda'

import Error from "./Error"

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    // STATE CRIPTO
    const [ listacripto, guardarCriptomonedas ] = useState([])
    // ERROR
    const [ error, guardarError ] = useState(false)

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'COP', nombre: 'Peso Colombiano'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'}
    ]

    // Utilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu moneda', ' ', MONEDAS)

    // Utilizar useCriptomoneda
    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto)

    // API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await axios.get(url)
            guardarCriptomonedas(resultado.data.Data)
        }
        consultarAPI()
    }, [])

    // Submit
    const handleSubmit = e => {
        e.preventDefault()

        // Validar
        if (moneda === '' || criptomoneda === '') {
            return guardarError(true)
        }
        guardarError(false)

        // Data al componente principal
        guardarMoneda(moneda)
        guardarCriptomoneda(criptomoneda)
    }
   
    return(
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <SelectMonedas 
            
            />
            <SelectCripto 
            
            />
            <Boton 
                type="submit"
                value="Calcular"
            />
        </form>
    )
}

export default Formulario