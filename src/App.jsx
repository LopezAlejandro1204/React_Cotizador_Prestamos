import {useState, useEffect} from 'react'
import Header from "./components/Header";
import Button from './components/Button';

import {formatearDinero ,calcularTotalPagar} from './helpers/index.js'

function App() {
  //state para la cantidad
  const [cantidad, setCantidad] = useState(10000);
  const MIN =0;
  const MAX = 20000;
  const STEP = 100
  //sate para el plazo de pagos
  const [meses, setMeses] = useState(6);
  //state para el total a pagar
  const [total, setTotal] = useState(0)
  //
  const [pago,setPago] = useState(0)


  //cada que algo cambie - ESTO SE EJCUTA
  useEffect(()=>{
    const resultadoTotalPagar = calcularTotalPagar(cantidad,meses);
    setTotal(resultadoTotalPagar);

  }, [cantidad, meses])//aqui arreglo de dependencias

  //useEffect para el total a pagar
  useEffect(()=>{
    //Calcular el pago mensual
    setPago(total/meses);
  }, [total])

  //handle
  function handleChange(e){
      //Para escribir indirectamente en el State
      setCantidad(parseInt(e.target.value));
  }
  function handleClickDecremento(e){
      const valor = cantidad -STEP;
      if(valor < MIN){
        alert('Cantidad no valida');
        return
      }
      setCantidad(valor);
  }
  function handleClickIncremento(e){
      const valor = cantidad+STEP;
      if(valor > MAX){
        alert('Cantidad no valida');
        return
      }
      setCantidad(valor);
  }
  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
        <Header />
        <div className='flex justify-between my-6'>
          <Button
            operador='-'
            fn={handleClickDecremento}
          />
          <Button
            operador='+'
            fn={handleClickIncremento}
          />

        </div>


        <input
          type="range"
          className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"

          onChange={handleChange}
          min={MIN}
          max={MAX}
          step={STEP}
          value={cantidad}
        />

        <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>
          {formatearDinero(cantidad)}</p>

        <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
          Elige un <span className='text-indigo-600'>Plazo</span> a pagar
          <select
          className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center
          text-xl font-bold text-gray-500'
          value={meses}
          onChange={e=>setMeses(+e.target.value)} //funcion para detectaar cambio
          >
            <option value="6">6 meses</option>
            <option value="12">12 meses</option>
            <option value="24">24 meses</option>
          </select>

          <div className='my-5 space-y-3 bg-gray-50 p-5'>
            <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
            Resumen <span className='text-indigo-600'>de pagos</span>
            </h2>

            <p className='text-xl text-gray-500 text-center font-bold'>{meses} Meses</p>
            <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(total)} Total a pagar</p>
            <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(pago)} Mensuales</p>
          </div>

        </h2>
    </div>
  )
}

export default App
