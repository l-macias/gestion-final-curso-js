 //Declaración de URL para exportar las categorías desde el JSON
const URL_CAT_JSON = "./json/categorias.json"
//Declaracion de clase Productos
class Producto {
  constructor (codigo,desc,marca,categoria,costo,markup,iva,precioVta,precioConIva){
              this.codigo = codigo;
              this.desc = desc;
              this.marca = marca;
              this.categoria = categoria;
              this.costo = costo
              this.markup = markup;
              this.porcentajeDeIva = iva;
              this.precioVta = precioVta;
              this.precioConIva = precioConIva;
              }
  }
  //CONVIERTE A OBJETO LO ALMACENADO EN STRING O CREA ARREGLO VACIO 
  let arrayProductos = JSON.parse(localStorage .getItem('productos')) || [] 
  
  // FUNCION PARA BUSCAR EN ARRAY
  const  buscarCodigoProducto = (codigo) => {
        const codigoBuscado = arrayProductos.find(codigoBuscado => codigoBuscado.codigo === codigo)
        return resultadoBusqueda = codigoBuscado;
  }

// FUNCION PARA BUSCAR MIENTRAS ESCRIBIMOS
  const buscarCodigoLive = (codigo) => {
  
  const codigoBuscadoLive = arrayProductos.filter(codigoBuscadoLive => codigoBuscadoLive.codigo === codigo)
  return resultadoBusquedaLive = codigoBuscadoLive;
  }


  //Funcion para dar de alta el producto en array arrayProductos.
  const altaProducto = (producto) => {
    arrayProductos.push(producto)
    localStorage.setItem('productos', JSON.stringify(arrayProductos))
  }

  const btnConfirmar = document.getElementById('confirmar-editar')
  //FUNCION PARA MODIFICAR UN PRODUCTO EN ARRAY (EN DESARROLLO, CAMBIA SOLO LOS INPUT Y DEJA SIN CATEGORIA E IVA)
  const modificarProducto = (codigo) => {
    const productoPorModificar = buscarCodigoProducto(codigo)
    const indice = arrayProductos.indexOf(productoPorModificar)
    let inputCodigo = document.getElementById('editar-codigo')
    inputCodigo.value = arrayProductos[indice].codigo;
    inputCodigo.disabled = true;
    let inputDesc = document.getElementById('editar-desc')
    inputDesc.value =arrayProductos[indice].desc;
    let inputMarca = document.getElementById('editar-marca')
    inputMarca.value = arrayProductos[indice].marca
    //SECCION CATEGORIA (LLAMAR CATEGORIAS)
    let inputCategoria = document.getElementById('editar-categoria')
    
    $.getJSON (URL_CAT_JSON, (categ, estado) => {
      if ( estado !== 'success') {
        throw new Error('No se realizó el get correctamente')
      }
      for ( const categoria of categ ) {
        $('#editar-categoria').append(`
                <option  
                    id="editar-categoria-${categoria.idCategoria}"
                    value="${categoria.nombreCategoria}"
                    > 
                    ${ categoria.nombreCategoria }
                </option>
        `)
    } 
  })
    inputCategoria.innerHTML = "";
    inputCategoria.value = arrayProductos[indice].categoria
    let inputCosto = document.getElementById('editar-costo')
    inputCosto.value =+ arrayProductos[indice].costo
    let inputMarkup = document.getElementById('editar-margen')
    inputMarkup.value =+ arrayProductos[indice].markup;
    let editarIva;

    //****PARA VALIDAR PODRÍA HACER UN IF SI IVA ES 21% CHECK OPT 1 
    //****SI ES 10.5 CHECK OPTION */
    
       //CUANDO HACEMOS CLICK EN EL GUARDAR DEL MODAL REALIZA LOS CAMBIOS. ELIMINA EL ANTERIOR CODIGO
    //Y LO REEMPLAZA POR EL NUEVO EDITADO.
    btnConfirmar.onclick = () => {
      if (document.getElementById('editar-iva21').checked) {
        editarIva = 21
        }
        else if (document.getElementById('editar-iva105').checked) {
          editarIva = 10.5
        }
      buscarCodigoProducto(inputCodigo.value)
      eliminarProducto(resultadoBusqueda.codigo);
      
      const producto = new Producto (inputCodigo.value,inputDesc.value,inputMarca.value,inputCategoria.value,inputCosto.value,inputMarkup.value,editarIva)
      altaProducto(producto)
      ordenarArray(arrayProductos) ;
      localStorage.setItem('productos', JSON.stringify(arrayProductos))
      vaciarTabla()
    }
  }
  //FUNCION PARA ELIMINAR UN PRODUCTO EN ARRAY
  const eliminarProducto = (codigo) => {
    const productoPorEliminar = buscarCodigoProducto(codigo)
    const indice = arrayProductos.indexOf(productoPorEliminar)
    arrayProductos.splice(indice, 1)
    localStorage.setItem('productos', JSON.stringify(arrayProductos))
    actualizarTabla()
  }
  const formulario = document.getElementById('formulario-productos')
  const btnAgregar = document.getElementById('boton-agregar')
  let inputBuscar = document.getElementById('input-buscar')
  const btnBuscar = document.getElementById('boton-buscar')
  
  //FUNCION ORDENAR ARRAY
  ordenarArray = ((array) => {
    array.sort ((a,b)=> {
      if (a.codigo < b.codigo) {
        return -1;
    }
      if (a.codigo > b.codigo) {
        return 1;
    }
      return 0;
    })
  })
    //JSON CATEGORIAS
  $.getJSON (URL_CAT_JSON, (categ, estado) => {
    if ( estado !== 'success') {
      throw new Error('No se realizó el get correctamente')
    }
    for ( const categoria of categ ) {
      $('#categoria').append(`
              <option  
                  id="categoria-${categoria.idCategoria}"
                  value="${categoria.nombreCategoria}"
                  > 
                  ${ categoria.nombreCategoria }
              </option>
      `)
  } 
})
// FUNCION DONDE ESCUCHAMOS EL CHANGE DEL SELECT CATEGORIA Y LO DEVOLVEMOS 
let categoriaSeleccionada= ""
const escucharCategoria = () =>{
  $(`#categoria`).change( (cat) => {
    categoriaSelect = cat.target.value
    return categoriaSeleccionada = categoriaSelect;
  })
}
escucharCategoria()
//ESCUCHAMOS EL BOTON AGREGAR
    btnAgregar.addEventListener('click', (e)=>{
      e.preventDefault()
      vaciarTabla()

//FUNCIONES DE CALCULOS
let precioVta;
calcularPrecioVta =  () =>{
  precioVta = (costo * markup /100) +(costo)
  return precioVta;
}
let precioConIva;
calcularPrecioConIva = () => {
return precioConIva = (precioVta*iva/100) + (precioVta);
}
  
  //Capturamos información del DOM
  let inputCodigo = document.getElementById('codigo')
  let inputDesc = document.getElementById('desc')
  let inputMarca = document.getElementById('marca')
  let inputCosto = document.getElementById('costo')
  let inputMarkup = document.getElementById('markup')
  let radioIva = document.querySelectorAll('input[type=radio]:checked')
  const codigo = inputCodigo.value;
  const desc = inputDesc.value;
  const marca = inputMarca.value;
  const categoria = categoriaSeleccionada;
  const costo =+ inputCosto.value;
  const markup =+ inputMarkup.value;
  const iva =+ radioIva[0].value;
  
  calcularPrecioVta()
  calcularPrecioConIva();
  
  //VALIDAMOS QUE NO EXISTA EL CÓDIGO Y SINO LO PISAMOS
  buscarCodigoProducto (codigo)
  // SI NO EXISTE RESULTADOBUSQUEDA, QUE PROCEDA A DAR DE ALTA
  // SINO QUE ELIMINE  EL ANTERIOR Y CREE UNO NUEVO
  // Y LE AÑADI ALERTIFY PARA CONFIRMAR QUE ESTAMOS MODIFICANDO.
      if (!resultadoBusqueda){
        const producto = new Producto (codigo,desc,marca,categoria,costo,markup,iva,precioVta,precioConIva)
        altaProducto(producto)
        ordenarArray(arrayProductos) ;
        localStorage.setItem('productos', JSON.stringify(arrayProductos))
        }
      else if (resultadoBusqueda.codigo == codigo) {
        alertify.confirm(`El código: ${codigo} ya existe. ¿Desea Reemplazarlo con los nuevos datos ingresados?`,
        function(){
          alertify.success(`Artículo con Código: ${codigo} modificado correctamente.`);
          eliminarProducto(resultadoBusqueda.codigo);
          vaciarTabla()
          const producto = new Producto (codigo,desc,marca,categoria,costo,markup,iva,precioVta,precioConIva)
          altaProducto(producto)
          ordenarArray(arrayProductos) ;
          localStorage.setItem('productos', JSON.stringify(arrayProductos))
      },
      function(){
        alertify.error('Modificación Cancelada');
      });
    }
  })
  
  let cuerpoTabla = document.getElementById('cuerpo-tabla')
  const btnMostrarTodos = document.getElementById('boton-mostrar-todo')
  //FUNCION QUE VACIA LA TABLA PARA QUE NO SE DUPLIQUE
  vaciarTabla = ()=> {
    cuerpoTabla.innerHTML = "";
  }
  //funcion DIBUJAR AL PRODUCTO EN LA TABLA
  dibujarProducto = (producto) => {
    let filaProductos = document.createElement('tr');
    filaProductos.innerHTML = `  
                            <th scope="row">${producto.codigo} </th>
                            <td>${producto.desc} </td>
                            <td>${producto.marca} </td>
                            <td>${producto.categoria} </td>
                            <td>$ ${producto.costo} </td>
                            <td>${producto.markup}% </td>
                            <td>${producto.porcentajeDeIva}% </td>
                              `;
    let tdAccionesProductos = document.createElement ('td');
    //CREAMOS BOTON ASIGNADO EN EL MODAL.
    let botonEditar = document.createElement('b');
    botonEditar.innerHTML = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEditar"
    data-bs-whatever="editarProductos">Editar</button>
                            `
    //CREAMOS BOTON ELIMINAR
    let botonEliminar = document.createElement('button');
    botonEliminar.classList.add('btn','btn-danger');
    botonEliminar.innerText = 'Eliminar';
    //CUANDO SE HACE CLICK EN ELIMINAR LLAMAMOS A LA FUNCION ELIMINARPRODUCTO
    botonEliminar.onclick = () => {
    eliminarProducto (producto.codigo)
    actualizarTabla();
  }
  //LLAMADA A BOTON EDITAR.
  botonEditar.onclick = () => {
    modificarProducto(producto.codigo)
  }
  //UBICAMOS LOS BOTONES 
  tdAccionesProductos.appendChild (botonEditar);
  tdAccionesProductos.appendChild (botonEliminar);
  filaProductos.appendChild (tdAccionesProductos);
  cuerpoTabla.appendChild (filaProductos);
  }

  //FUNCION QUE ACTUALIZA LA TABLA Y MUESTRA TODO
  const actualizarTabla = () => {
    vaciarTabla();
    arrayProductos.forEach ((producto) => {
    dibujarProducto(producto);
    })
  }
  
  //ESCUCHAMOS EL EVENTO KEYUP DEL INPUT BUSCAR  (ANTES USABA EL BOTON, TENGO QUE BORRAR Y PONER LABEL)
    const Buscar = inputBuscar;
    Buscar.addEventListener ('keyup', (e) => {
      e.preventDefault();
      vaciarTabla();
      buscarCodigoLive(inputBuscar.value);
      resultadoBusquedaLive.forEach((resultadoBusquedaLive) => {
      dibujarProducto(resultadoBusquedaLive);
      })
    })
    
  // ESCUCHAMOS BOTON MOSTRAR TODOS 
    btnMostrarTodos.addEventListener('click',(e) => {
      e.preventDefault();
      actualizarTabla()
  })