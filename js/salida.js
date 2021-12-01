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

let inputRazonSocialD = document.getElementById('razon-social')
let inputCuitD = document.getElementById('numero-cuit')
let inputNroComprobanteD = document.getElementById('numero-comprobante')
let inputFechaComprobanteD = document.getElementById('fecha-comprobante')

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
const comprobanteSalida = new ComprobanteSalida (inputRazonSocialD.value,inputCuitD.value,inputNroComprobanteD.value,inputFechaComprobanteD.value)
arrayCabeceraSalida.push (comprobanteSalida)
localStorage.setItem('cabeceraSalida', JSON.stringify(arrayCabeceraSalida))
inputRazonSocialD.disabled = true
inputCuitD.disabled = true
inputNroComprobanteD.disabled = true
inputFechaComprobanteD.disabled = true
})


//AGREGAR PRODUCTOS PARA VENDER
let descargaProductos = JSON.parse(localStorage .getItem('descargaProductos')) || []

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
const buscarCodigoProductoDescarga2 = (codigo) => {
  
  const codigoBuscado = descargaProductos.find(codigoBuscado => codigoBuscado.codigo === codigo)
  if (!codigoBuscado) {
      console.log("nada")
  }
      return resultadoBusqueda2 = codigoBuscado;
}


//FUNCION PARA ELIMINAR PRODUCTOS
const eliminarProductoDescarga = (codigo) => {
  const productoPorEliminar = buscarCodigoProductoDescarga2(codigo)
  const indice = descargaProductos.indexOf(productoPorEliminar)
  descargaProductos.splice(indice, 1)
  localStorage.setItem('descargaProductos', JSON.stringify(descargaProductos))
  actualizarTablaDescarga()
}

for (const cargarCodigo of importProductos){

  //ver si tiene stock, sino no poner****************
  buscarProductoConStock(cargarCodigo.codigo)
  
   if (resultadoStockPositivo == cargarCodigo.codigo && arrayStock[resultadoStockPositivo].cantidad >=1 ){
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
const precioUnitarioVta = document.getElementById('input-precio-unitario')
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
  cantidad.setAttribute("min", 1);
  cantidad.setAttribute("max", arrayStock[codigoSelect].cantidad );
  $(`#input-precio-unitario`).val(`${importProductos[indice].precioVta}`)
  preTotal = precioUnitarioVta.value * cantidad.value;
  $(`#input-precio-total`).val (preTotal);
  $(`#input-porcentaje-iva`).val (`${importProductos[indice].porcentajeDeIva}`)
  markup = Number(importProductos[indice].markup);
  precioConIva = Number(importProductos[indice].precioConIva);
  precioVta = Number(importProductos[indice].precioVta);
  //ESCUCHAMOS SI CAMBIA EL VALOR DE CANTIDAD CON CLICK O CON EL TECLADO Y REALIZAMOS EL CALCULO
  $(`#input-cantidad`).on('keyup change', function (){
    cantidad.setAttribute("min", 1);
  cantidad.setAttribute("max", arrayStock[codigoSelect].cantidad );
    preTotal = precioUnitarioVta.value * cantidad.value;
    $(`#input-precio-total`).val (preTotal);
    
  })
})

descargaProductos = JSON.parse(localStorage .getItem('descargaProductos')) || []

const renderizarTabla= () => {
  vaciarTablaDescarga()
  descargaProductos.forEach ((descargaProductos) => {
    
    dibujarProductoDescarga (descargaProductos)
    
    
})
}

//ESCUCHAMOS EL BOTON DE AGREGAR Y PUSHEAMOS LA CARGA AL ARRAY
btnAgregar.addEventListener('click', (e)=>{
  e.preventDefault()
  ivaTotal = porcentajedeIva.value /100 * preTotal;
const detalleDescarga = {
  codigo: codigo.value,
  cantidad: Number(cantidad.value),
  descripcion: descripcion.value,
  pUnitario: Number(precioUnitarioVta.value),
  pTotal: Number(inputPrecioTotal.value),
  porcentIva: Number(porcentajedeIva.value),
  ivaTotal: Number(ivaTotal),
  markup: Number(markup),
  precioConIva: Number(precioConIva),
  precioVta: Number(precioVta)
};
console.log (detalleDescarga)
buscarCodigoProductoDescarga2 (codigo.value)
console.log (`EL codigo de codigo en buscarreusltado es: ${codigo.value}`)
if (!resultadoBusqueda2){
  
descargaProductos.push (detalleDescarga)
localStorage.setItem('descargaProductos', JSON.stringify(descargaProductos))
}
else if (resultadoBusqueda2.codigo == codigo.value) {
  console.log (`EL resultadobusqueda2 en buscarreusltado es: ${resultadoBusqueda2}`)
  alertify.confirm(`El código: ${codigo.value} ya existe. ¿Desea Reemplazarlo con los nuevos datos ingresados?`,
        function(){
          alertify.success(`Artículo con Código: ${codigo.value} modificado correctamente.`);
          eliminarProductoDescarga(resultadoBusqueda2.codigo);
          
          descargaProductos.push (detalleDescarga)
          localStorage.setItem('descargaProductos', JSON.stringify(descargaProductos))
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
  descargaProductos.forEach ((prod) => {
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
  descargaProductos.forEach ((prod) => {
    
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

let comprobantesTotalesDescarga = JSON.parse(localStorage .getItem ('totalesDescarga')) || [];
let comprobanteGeneradoDescarga = JSON.parse(localStorage .getItem ('comprobantesDescarga')) || [];



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
comprobantesTotalesDescarga.push (comprobantesTotal);
let comprobanteGenera = {
  // cabecera: arrayCabecera,
  RazonSocial: inputRazonSocialD.value,
  Cuit: inputCuitD.value,
  NroComprobante: inputNroComprobanteD.value,
  FechaComprobante: inputFechaComprobanteD.value,
  carga: descargaProductos,
  // totales: comprobantesTotales
  subtotal: Number(subtotal.toFixed(2)),
    iva105Total: Number( iva105Total.toFixed(2)),
    iva21Total: Number(iva21Total.toFixed(2)),
    total: Number(total.toFixed(2))
}
comprobanteGeneradoDescarga.push (comprobanteGenera)
localStorage.setItem('totalesDescarga', JSON.stringify(comprobantesTotalesDescarga))
localStorage.setItem('comprobantesDescarga', JSON.stringify(comprobanteGeneradoDescarga))
localStorage.removeItem('descargaProductos');
document.location.reload();

})

//FALTA CORREGIR QUE NO PUEDAN SUPERAR LA CANTIDAD DE STOCK DISPONIBLE
//FALTARÍA QUE SE DESCUENTE EL STOCK AL FACTURAR
//Y DARLE A LA ULTIMA SECCION Y A DEJAR TODO MAS LINDO