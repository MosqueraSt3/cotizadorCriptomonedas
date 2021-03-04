import React, { Fragment, useState } from "react"
import styled from '@emotion/styled'

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1.2rem;
`

const useCriptomoneda = (label, stateInicial, opts) => {

    const [ state, actualizarState ] = useState(stateInicial)

    const SelectCripto = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => actualizarState(e.target.value)}
                value={state}
            >
                <option value="#">-- Seleccione una Moneda --</option>
                {opts.map((opt) => (
                    <option key={opt.CoinInfo.Id} value={opt.CoinInfo.Name}>{opt.CoinInfo.FullName}</option>
                ))}
            </Select>
        </Fragment>
    )

    // Retornar state, interfaz y func que modifica el state
    return [state, SelectCripto, actualizarState]
}

export default useCriptomoneda