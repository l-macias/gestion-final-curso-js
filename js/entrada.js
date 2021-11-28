//CABECERA DE FACTURA
//Capturamos datos de los input y guardamos sus valores
let inputRazonSocial = document.getElementById('razon-social')
let inputCuit = document.getElementById('numero-cuit')
let inputNroComprobante = document.getElementById('numero-comprobante')
let inputFechaComprobante = document.getElementById('fecha-comprobante')

class Comprobante {
  constructor(razonSocial,cuit,nroComprobante,fechaComprobante){
              this.razonSocial = razonSocial;
              this.cuit = cuit;
              this.nroComprobante = nroComprobante;
              this.fechaComprobante = fechaComprobante;
  }

}

let arrayCabecera = JSON.parse(localStorage .getItem ('cabecera')) || [];

const btnCabecera = document.getElementById('boton-cabecera')
btnCabecera.addEventListener ('click', (e) => {
  e.preventDefault()
const comprobante = new Comprobante (inputRazonSocial.value,inputCuit.value,inputNroComprobante.value,inputFechaComprobante.value)
arrayCabecera.push (comprobante)
localStorage.setItem('cabecera', JSON.stringify(arrayCabecera))
inputRazonSocial.disabled = true
inputCuit.disabled = true
inputNroComprobante.disabled = true
inputFechaComprobante.disabled = true
})

//AGREGAR PRODUCTOS//

//IMPORTAMOS LOS PRODUCTOS ALMACENADOS EN LOCALSTORAGE 
let importProductos = JSON.parse(localStorage .getItem('productos')) || [] 

// FUNCION PARA BUSCAR EN ARRAY
const buscarCodigoProductoCarga = (codigo) => {
  
  const codigoBuscado = importProductos.find(codigoBuscado => codigoBuscado.codigo === codigo)
  if (!codigoBuscado) {
      console.log("nada")
  }
      return resultadoBusqueda = codigoBuscado;
}

const buscarCodigoProductoCarga2 = (codigo) => {
  
  const codigoBuscado = cargaProductos.find(codigoBuscado => codigoBuscado.codigo === codigo)
  if (!codigoBuscado) {
      console.log("nada")
  }
      return resultadoBusqueda2 = codigoBuscado;
}


const eliminarProductoCarga = (codigo) => {
  const productoPorEliminar = buscarCodigoProductoCarga2(codigo)
  const indice = cargaProductos.indexOf(productoPorEliminar)
  cargaProductos.splice(indice, 1)
  localStorage.setItem('cargaproductos', JSON.stringify(cargaProductos))
  actualizarTablaCarga()
}


for (const cargarCodigo of importProductos){
  $('#select-codigo').append (`
                    <option id="producto-${cargarCodigo.codigo}"
                    value="${cargarCodigo.codigo}"
                    >
                    ${cargarCodigo.codigo}</option>`)
}
let cuerpoTablaCarga = document.getElementById('cuerpo-tabla-entrada')

const actualizarTablaCarga = () => {
  vaciarTablaCarga();
  cargaProductos.forEach ((carga) => {
  dibujarProductoEntrada(carga);
  })
}
//DIBUJAMOS LA TABLA DE LO CARGADO

const dibujarProductoEntrada = (carga) => {
    
  let filaProductosCarga = document.createElement('tr');
      filaProductosCarga.setAttribute("class", "carga")
      filaProductosCarga.innerHTML = `  
                            <th scope="row">${carga.cantidad} </th>
                            <td>${carga.codigo} </td>
                            <td>${carga.descripcion} </td>
                            <td>${carga.pUnitario} </td>
                            <td>$ ${carga.pTotal} </td>
                            <td> ${carga.porcentIva}
                            
                                `;
  let tdAccionesProductos = document.createElement ('td');
  let botonEliminar = document.createElement('button');
  botonEliminar.classList.add('btn','btn-danger');
  botonEliminar.innerText = 'Eliminar';
  botonEliminar.onclick = () => {
    console.log (carga.codigo)
    eliminarProductoCarga (carga.codigo)
    actualizarTablaCarga();
  
    
    
  }
  tdAccionesProductos.appendChild (botonEliminar);
  filaProductosCarga.appendChild (tdAccionesProductos);
  cuerpoTablaCarga.appendChild (filaProductosCarga);
  
  
  }
  vaciarTablaCarga = () =>{
    cuerpoTablaCarga.innerHTML ="";
  }
  
const valorTotal = () => {
  let inputCantidad = $(`#input-cantidad`) 
  pTotal = importProductos[indice].costo * inputCantidad
}



// RECUPERAMOS DATOS DEL FORMULARIO Y ESCUCHAMOS EL CHANGE DEL SELECT  
// PARA AÑADIR LOS DATOS DEL PRODUCTO SELECCIONADO.

const formularioProductos = document.getElementById('formulario-productos')
const codigo = document.getElementById('select-codigo')
const cantidad = document.getElementById('input-cantidad')
const descripcion = document.getElementById('input-descripcion')
const precioUnitario = document.getElementById('input-precio-unitario')
const inputPrecioTotal = document.getElementById('input-precio-total')
const btnAgregar = document.getElementById('boton-agregar')
const porcentajedeIva = document.getElementById('input-porcentaje-iva')

let markup;
$(`#select-codigo`).change( (cod) => {
  codigoSelect = cod.target.value
    const productoPorModificar = buscarCodigoProductoCarga(codigoSelect)
  const indice = importProductos.indexOf(productoPorModificar)
  $(`#input-descripcion`).val( `${importProductos[indice].desc}`)
  $(`#input-precio-unitario`).val(`${importProductos[indice].costo}`)
  preTotal = precioUnitario.value * cantidad.value;
  $(`#input-precio-total`).val (preTotal);
  $(`#input-porcentaje-iva`).val (`${importProductos[indice].porcentajeDeIva}`)
  markup = Number(importProductos[indice].markup);
  precioConIva = Number(importProductos[indice].precioConIva);
  precioVta = Number(importProductos[indice].precioVta);
  //ESCUCHAMOS SI CAMBIA EL VALOR DE CANTIDAD CON CLICK O CON EL TECLADO Y REALIZAMOS EL CALCULO
  $(`#input-cantidad`).on('keyup change', function (){
    preTotal = precioUnitario.value * cantidad.value;
    $(`#input-precio-total`).val (preTotal);
    
  })
})

let cargaProductos = JSON.parse(localStorage .getItem('cargaproductos')) || []

const renderizarTabla= () => {
  vaciarTablaCarga()
  cargaProductos.forEach ((cargaproductos) => {
    
    dibujarProductoEntrada(cargaproductos)
    
    
})
}

//ESCUCHAMOS EL BOTON DE AGREGAR Y PUSHEAMOS LA CARGA AL ARRAY
btnAgregar.addEventListener('click', (e)=>{
  e.preventDefault()
  ivaTotal = porcentajedeIva.value /100 * preTotal;
const detalleCarga = {
  codigo: codigo.value,
  cantidad: Number(cantidad.value),
  descripcion: descripcion.value,
  pUnitario: Number(precioUnitario.value),
  pTotal: Number(inputPrecioTotal.value),
  porcentIva: Number(porcentajedeIva.value),
  ivaTotal: Number(ivaTotal),
  markup: Number(markup),
  precioConIva: Number(precioConIva),
  precioVta: Number(precioVta)
};
console.log (detalleCarga)
buscarCodigoProductoCarga2(codigo.value)
console.log (`EL codigo de codigo en buscarreusltado es: ${codigo.value}`)
if (!resultadoBusqueda2){
  
cargaProductos.push (detalleCarga)
localStorage.setItem('cargaproductos', JSON.stringify(cargaProductos))
}
else if (resultadoBusqueda2.codigo == codigo.value) {
  console.log (`EL resultadobusqueda2 en buscarreusltado es: ${resultadoBusqueda2}`)
  alertify.confirm(`El código: ${codigo.value} ya existe. ¿Desea Reemplazarlo con los nuevos datos ingresados?`,
        function(){
          alertify.success(`Artículo con Código: ${codigo.value} modificado correctamente.`);
          eliminarProductoCarga(resultadoBusqueda2.codigo);
          
          cargaProductos.push (detalleCarga)
          localStorage.setItem('cargaproductos', JSON.stringify(cargaProductos))
          renderizarTabla()
        },
        function(){
          alertify.error('Modificación Cancelada');
        });
      }
renderizarTabla()
})
const btnCalcular = document.getElementById('boton-calcular')
const btnGenerar = document.getElementById('boton-generar')
let subtotal;
let iva105Total;
let iva21Total;
let total;
//FUNCION QUE CALCULA CADA IVA DISCRIMINADO

const calcularIvaTotal = () =>{
  iva105Total=0;
  iva21Total=0;
  cargaProductos.forEach ((prod) => {
    if (prod['porcentIva'] == 21) {
      iva21Total += prod['ivaTotal'];
        
  
    }
    else {
      iva105Total += prod['ivaTotal'];
  }
  })
  }


//FUNCION QUE CALCULA SUBTOTAL
const calcularSubtotal = () =>{
  subtotal=0;
  cargaProductos.forEach ((prod) => {
    
    subtotal += prod["pTotal"];
    
  })
  }
//FUNCION QUE SUMA LOS TOTALES
const calcularTotal = () => {
  total=0;
  total = subtotal+iva105Total+iva21Total;
}

let modalBody = document.getElementById('modal-totales-body')
btnCalcular.addEventListener('click', (e)=>{
  e.preventDefault();

  calcularSubtotal();
  calcularIvaTotal();
  calcularTotal();
  modalBody.innerHTML = `<p><b>Subtotal:</b> $ ${subtotal.toFixed(2)}</p>
            <p><b>IVA 10.5%:</b> $ ${iva105Total.toFixed(2)}</p>
            <p><b>IVA 21%:</b> $ ${iva21Total.toFixed(2)}</p>
            <p><b>TOTAL:</b> $ ${total.toFixed(2)}</p>`
    
})
let comprobantesTotales = JSON.parse(localStorage .getItem ('totales')) || [];
let comprobanteGenerado = JSON.parse(localStorage .getItem ('comprobantes')) || [];



btnGenerar.addEventListener('click', ()=>{
  
  calcularSubtotal();
  calcularIvaTotal();
  calcularTotal();
comprobantesTotal = [
  { subtotal: subtotal.toFixed(2),
    iva105Total: iva105Total.toFixed(2),
    iva21Total: iva21Total.toFixed(2),
    itotal: total.toFixed(2)
}]
comprobantesTotales.push (comprobantesTotal);
let comprobanteGenera = {
  // cabecera: arrayCabecera,
  RazonSocial: inputRazonSocial.value,
  Cuit: inputCuit.value,
  NroComprobante: inputNroComprobante.value,
  FechaComprobante: inputFechaComprobante.value,
  carga: cargaProductos,
  // totales: comprobantesTotales
  subtotal: Number(subtotal.toFixed(2)),
    iva105Total: Number( iva105Total.toFixed(2)),
    iva21Total: Number(iva21Total.toFixed(2)),
    total: Number(total.toFixed(2))
}
comprobanteGenerado.push (comprobanteGenera)
localStorage.setItem('totales', JSON.stringify(comprobantesTotales))
localStorage.setItem('comprobantes', JSON.stringify(comprobanteGenerado))
localStorage.removeItem('cargaproductos');
document.location.reload();

})


//**NOTAS**//

//HACER QUE CARGAPRODUCTOS SEA 1 ARRAY POR CADA CARGA, Y NO CADA PRODUCTO CARGADO. 
//TAL VEZ CONVENGA CREAR UN NUEVO ARRAY CON TODO JUNTO O VER DOCUMENTACION
//PONER FUNCIONES DE CALCULOS TOTALES EN BOTON GENERAR FACTURA Y GENERAR NUEVO ARRAY
// Y EN LOCALSTORAGE CON TODOS LOS TOTALES ADEMAS... SERÍAN 3 ARRAYS EN UNO CARAMBA.
//Hacer que cuando la factura se guarde, se vacie el localstorage

//VALIDAR QUE INGRESEN POR INPUT LOS DATOS CORRESPONDIENTES 
//FIJARSE QUE LA CANTIDAD NO SEA NEGATIVA NI CERO

//LUEGO HACER FACTURAR PEDIDOS DESDE CERO <<ALTO BARDO>>
//POR ULTIMO EL BONUS DE STOCK: JUGAR CON ESTADISTICAS SEGUN PUEDA.

