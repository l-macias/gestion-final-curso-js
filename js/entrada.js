//IMPORTAMOS LOS PRODUCTOS ALMACENADOS EN LOCALSTORAGE 
let importProductos = JSON.parse(localStorage .getItem('productos')) || [] 

// FUNCION PARA BUSCAR EN ARRAY
const buscarCodigoProducto = (codigo) => {
  
  const codigoBuscado = importProductos.find(codigoBuscado => codigoBuscado.codigo === codigo)
  if (!codigoBuscado) {
      console.log("nada")
  }
      return resultadoBusqueda = codigoBuscado;
}

for (const cargarCodigo of importProductos){
  $('#select-codigo').append (`
                    <option id="producto-${cargarCodigo.codigo}"
                    value="${cargarCodigo.codigo}"
                    >
                    ${cargarCodigo.codigo}</option>`)
}
let cuerpoTablaCarga = document.getElementById('cuerpo-tabla-entrada')
//DIBUJAMOS LA TABLA DE LO CARGADO
dibujarProductoEntrada = (carga) => {
    
  let filaProductosCarga = document.createElement('tr');
      
      filaProductosCarga.innerHTML = `  
                            <th scope="row">${carga.cantidad} </th>
                            <td>${carga.codigo} </td>
                            <td>${carga.descripcion} </td>
                            <td>${carga.pUnitario} </td>
                            <td>$ ${carga.pTotal} </td>
                            
                            
                                `;
  let tdAccionesProductos = document.createElement ('td');
  let botonEliminar = document.createElement('button');
  botonEliminar.classList.add('btn','btn-danger');
  botonEliminar.innerText = 'Eliminar';
  botonEliminar.onclick = () => {
    console.log (carga.codigo)
    eliminarProducto (carga.codigo)
    // actualizarTabla();
    
  }
  tdAccionesProductos.appendChild (botonEliminar);
  filaProductosCarga.appendChild (tdAccionesProductos);
  cuerpoTablaCarga.appendChild (filaProductosCarga);
  
  }


//MOSTRAMOS LA DESCRIPCION
// const eliminarProducto = (codigo) => {
//   codigo=codigoSeleccionado
//   const productoPorEliminar = buscarCodigoProducto(codigo)
//   const indice = importProductos.indexOf(productoPorEliminar)
//   $(`#input-descripcion`).val( `${importProductos[indice].desc}`)
//   $(`#input-precio-unitario`).val( `${importProductos[indice].costo}`)
// }

const valorTotal = () => {
  let inputCantidad = $(`#input-cantidad`) 
  pTotal = importProductos[indice].costo * inputCantidad
}

// RECUPERAMOS DATOS DEL FORMULARIO Y ESCUCHAMOS EL CHANGE DEL SELECT  
// PARA AÑADIR LOS DATOS DEL PRODUCTO SELECCIONADO.

const formularioProductos = document.getElementById('formulario-productos')
const codigo = document.getElementById('select-codigo')
const cantidad = document.getElementById('input-cantidad')
const descripcion =document.getElementById('input-descripcion')
const precioUnitario = document.getElementById('input-precio-unitario')
const inputPrecioTotal = document.getElementById('input-precio-total')
const btnAgregar =document.getElementById('boton-agregar')



$(`#select-codigo`).change( (cod) => {
  codigoSelect = cod.target.value
    const productoPorEliminar = buscarCodigoProducto(codigoSelect)
  const indice = importProductos.indexOf(productoPorEliminar)
  $(`#input-descripcion`).val( `${importProductos[indice].desc}`)
  $(`#input-precio-unitario`).val(`${importProductos[indice].costo}`)
  preTotal = precioUnitario.value * cantidad.value;
  $(`#input-precio-total`).val (preTotal);
  //ESCUCHAMOS SI CAMBIA EL VALOR DE CANTIDAD CON CLICK O CON EL TECLADO Y REALIZAMOS EL CALCULO
  $(`#input-cantidad`).on('keyup change', function (){
    preTotal = precioUnitario.value * cantidad.value;
    $(`#input-precio-total`).val (preTotal);
  })
})
  


let cargaProductos = []
const renderizarTabla= () => {
  cargaProductos.forEach ((carga) => {
    dibujarProductoEntrada(carga)


    
})
}



//ESCUCHAMOS EL BOTON DE AGREGAR Y PUSHEAMOS LA CARGA AL ARRAY
formularioProductos.onsubmit = (e) => {
  e.preventDefault()
const detalleCarga = {
  codigo: codigo.value,
  cantidad: Number(cantidad.value),
  descripcion: descripcion.value,
  pUnitario: Number(precioUnitario.value),
  pTotal: Number(inputPrecioTotal.value),
  
};
console.log (detalleCarga)
cargaProductos.push (detalleCarga)
renderizarTabla()
}








