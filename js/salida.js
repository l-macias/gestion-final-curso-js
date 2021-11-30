//IMPORTAMOS LOS COMPROBANTES ALMACENADOS EN LOCALSTORAGE 
let importComprobantes = JSON.parse(localStorage .getItem('comprobantes')) || [] 
let importProductos = JSON.parse(localStorage .getItem('productos')) || [] 
let importStock = JSON.parse(localStorage .getItem('productosEnStock')) || [] 



//RECUPERAR EL MALDITO STOCK

  
// }
const arrayStock = {
  codigo:[]
}
let codigoEnStock = "codigo";
let agrupador ="cantidad";
for (let index in importComprobantes) {
const datazo = importComprobantes[index]
datito = datazo.carga
for (index in datito) {
dato = datito[index]
let i =0
i++
if (arrayStock.codigo.indexOf(dato[codigoEnStock]) ===-1) {
arrayStock.codigo.push(dato[codigoEnStock]);
arrayStock [dato[codigoEnStock]] = {};

arrayStock[dato[codigoEnStock]][agrupador] = 0;
}

arrayStock[dato[codigoEnStock]][agrupador] += dato[agrupador];
}
localStorage.setItem('productosEnStock', JSON.stringify(arrayStock))
}



//CABECERA DE FACTURA
//Capturamos datos de los input y guardamos sus valores

let inputRazonSocial = document.getElementById('razon-social')
let inputCuit = document.getElementById('numero-cuit')
let inputNroComprobante = document.getElementById('numero-comprobante')
let inputFechaComprobante = document.getElementById('fecha-comprobante')

class ComprobanteSalida {
  constructor(razonSocial,cuit,nroComprobante,fechaComprobante){
              this.razonSocial = razonSocial;
              this.cuit = cuit;
              this.nroComprobante = nroComprobante;
              this.fechaComprobante = fechaComprobante;
  }

}

let arrayCabeceraSalida = JSON.parse(localStorage .getItem ('cabeceraSalida')) || [];

const btnCabecera = document.getElementById('boton-cabecera')
btnCabecera.addEventListener ('click', (e) => {
  e.preventDefault()
const comprobanteSalida = new ComprobanteSalida (inputRazonSocial.value,inputCuit.value,inputNroComprobante.value,inputFechaComprobante.value)
arrayCabeceraSalida.push (comprobanteSalida)
localStorage.setItem('cabeceraSalida', JSON.stringify(arrayCabeceraSalida))
inputRazonSocial.disabled = true
inputCuit.disabled = true
inputNroComprobante.disabled = true
inputFechaComprobante.disabled = true
})


//AGREGAR PRODUCTOS PARA VENDER
let descargaProductos = JSON.parse(localStorage .getItem('descargaproductos')) || []

//FUNCION PARA BUSCAR CODIGO
let resultadoBusqueda
const buscarCodigoProductoDescarga = (codigo) => {
  
  const codigoBuscado = importProductos.find(codigoBuscado => codigoBuscado.codigo === codigo)
  if (!codigoBuscado) {
      console.log("nada")
  }
  
      return resultadoBusqueda = codigoBuscado;
}
let resultadoStockPositivo;
const buscarProductoConStock = (codigo) =>{
  const resultadoConStock = arrayStock.codigo.find (resultadoConStock => resultadoConStock ===codigo)
  if (!resultadoConStock){
    console.log ("Resultado sin Stock")

  }
    return resultadoStockPositivo = resultadoConStock;
}
//FUNCION PARA ELIMINAR PRODUCTOS
const eliminarProductoDescarga = (codigo) => {
  const productoPorEliminar = buscarCodigoProductoDescarga2(codigo)
  const indice = descargaProductos.indexOf(productoPorEliminar)
  descargaProductos.splice(indice, 1)
  localStorage.setItem('descargaproductos', JSON.stringify(descargaProductos))
  actualizarTablaDescarga()
}

for (const cargarCodigo of importProductos){

  //ver si tiene stock, sino no poner****************
  buscarProductoConStock(cargarCodigo.codigo)
  
   if (resultadoStockPositivo == cargarCodigo.codigo){
  $('#select-codigo').append (`
                    <option id="producto-${cargarCodigo.codigo}"
                    value="${cargarCodigo.codigo}"
                    >
                    ${cargarCodigo.codigo}</option>`)
   }
}
let cuerpoTablaCarga = document.getElementById('cuerpo-tabla-salida')

const actualizarTablaDescarga = () => {
  vaciarTablaDescarga();
  descargaProductos.forEach ((carga) => {
  dibujarProductoDescarga(carga);
  })

}
//DIBUJAMOS LA TABLA DE LO CARGADO

const dibujarProductoDescarga = (carga) => {
    
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
    eliminarProductoDescarga (carga.codigo)
    actualizarTablaDescarga();
  
    
    
  }
  tdAccionesProductos.appendChild (botonEliminar);
  filaProductosCarga.appendChild (tdAccionesProductos);
  cuerpoTablaCarga.appendChild (filaProductosCarga);
  
  
  }
  vaciarTablaDescarga = () =>{
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
  console.log(codigoSelect)
  const productoPorModificar = buscarCodigoProductoDescarga(codigoSelect)
  const indice = importProductos.indexOf(productoPorModificar)
  $(`#input-descripcion`).val( `${importProductos[indice].desc}`)
  $(`#input-stock`).val( `${arrayStock[codigoSelect].cantidad}`)
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

//FALTARIA SEGUIR IMITANDO A ENTRADA.JS