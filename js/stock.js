let comprobantesEntrada = JSON.parse(localStorage .getItem('comprobantes')) || [] 
let comprobantesSalida = JSON.parse(localStorage .getItem('comprobantesDescarga')) || [] 
let comprobantesGeneral = comprobantesEntrada.concat(comprobantesSalida)
let cuerpoTablaResumen = document.getElementById('cuerpo-tabla-resumen')


//FUNCION PARA BUSCAR COMPROBANTE
let resultadoBusqueda
const  buscarComprobante = (numero) => {
  const numeroBuscado = comprobantesGeneral.find(codigoBuscado => codigoBuscado.NroComprobante === numero)
  return resultadoBusqueda = numeroBuscado;
}


const actualizarTablaResumen = () => {
  vaciarTablaResumen();
  comprobantesGeneral.forEach ((carga) => {
  dibujarProductoResumen(carga);
  
  
  cargar = document.getElementById(`tipo${carga.NroComprobante}`)
  
if (cargar.textContent !="entrada "){

cargar.setAttribute('style', 'color:green !important')
}
  else {
    cargar.setAttribute('style', 'color:red !important')
  }
  
  })
}
//DIBUJAMOS LA TABLA DE LO CARGADO


const dibujarProductoResumen = (carga) => {
    
  let filaResumen = document.createElement('tr');
      filaResumen.setAttribute("class", "carga")
      filaResumen.innerHTML = `  
                            <th id="tipo${carga.NroComprobante}" scope="row">${carga.tipo} </th>
                            <td>${carga.FechaComprobante} </td>
                            <td>${carga.RazonSocial} </td>
                            <td>${carga.NroComprobante} </td>
                            <td>$ ${carga.total} </td>
                            <td> ${carga.carga.length}</td>
                            
                                `;
  let tdDetalleProductos = document.createElement ('td');
  let botonDetalle = document.createElement('b');
    botonDetalle.innerHTML = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalDetalle"
    data-bs-whatever="detalleProductos">Detalle</button>`
  tdDetalleProductos.appendChild(botonDetalle)
  filaResumen.appendChild (tdDetalleProductos);
  cuerpoTablaResumen.appendChild (filaResumen);
  
  botonDetalle.onclick = () =>{
    
    //CAPTURAMOS MODAL DEL DOM PARA LA CABECERA
    let razonSocialDetalle = document.getElementById('razon-social-detalle')
    let nroCuitDetalle = document.getElementById('numero-cuit-detalle')
    let nroComprobanteDetalle = document.getElementById('numero-comprobante-detalle')
    let fechaComprobanteDetalle = document.getElementById('fecha-comprobante-detalle')

    razonSocialDetalle.value = carga.RazonSocial
    nroCuitDetalle.value = carga.Cuit
    nroComprobanteDetalle.value = carga.NroComprobante
    fechaComprobanteDetalle.value = carga.FechaComprobante
    
    //VAMOS A LA CARGA CON LOS VALORES DE LA CARGA
    aLaCarga = carga.carga 
    vaciarCargar()
    mostrarCarga()
    
    //MOSTRAMOS LOS TOTALES EN MODAL
    let modalTotales = document.getElementById('modal-totales-carga')
    modalTotales.innerHTML = `<p><b>Subtotal:</b> $ ${carga.subtotal.toFixed(2)}</p>
            <p><b>IVA 10.5%:</b> $ ${carga.iva105Total.toFixed(2)}</p>
            <p><b>IVA 21%:</b> $ ${carga.iva21Total.toFixed(2)}</p>
            <p><b>TOTAL:</b> $ ${carga.total.toFixed(2)}</p>`

  }
  
  }
  
  const vaciarTablaResumen = () =>{
    cuerpoTablaResumen.innerHTML ="";
    
  }
  actualizarTablaResumen()
//FUNCION PARA RELLENAR EL MODAL
const rellenarModal = (numero) =>{
  const comprobanteBuscado = buscarComprobante(numero)
  const indice = comprobantesGeneral.indexOf(comprobanteBuscado)
  
}
let cuerpoTablaResumenCarga = document.getElementById('cuerpo-carga-resumen')
const mostrarCarga = () =>{
  
  
  
  aLaCarga.forEach((indice) =>{
      
    let filaCargaResumen = document.createElement('tr');
    filaCargaResumen.setAttribute("class", "carga")
    filaCargaResumen.innerHTML = `  
                          <th scope="row">${indice.cantidad}</th>
                          <td>${indice.codigo} </td>
                          <td>${indice.descripcion} </td>
                          <td>${indice.pUnitario} </td>
                          <td>$ ${indice.pTotal} </td>
                          <td> ${indice.porcentIva}</td>`
    

    cuerpoTablaResumenCarga.appendChild (filaCargaResumen);

  })
}

const vaciarCargar = ()=>{
  cuerpoTablaResumenCarga.innerHTML =""
}