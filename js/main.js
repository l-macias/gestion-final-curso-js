//Declaracion de clase Productos
class Producto {
  constructor (codigo,desc,marca,costo,markup,iva,precioVta,precioConIva){
              this.codigo = codigo;
              this.desc = desc;
              this.marca = marca;
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
  const buscarCodigoProducto = (codigo) => {
    codigo = codigo
    const codigoBuscado = arrayProductos.find(codigoBuscado => codigoBuscado.codigo === codigo)
    if (!codigoBuscado) {
        alert ("El codigo solicitado no existe")
    }
        return resultadoBusqueda = codigoBuscado;
  }

// FUNCION PARA BUSCAR MIENTRAS ESCRIBIMOS
const buscarCodigoLive = (codigo) => {
  codigo = codigo
  const codigoBuscadoLive = arrayProductos.filter(codigoBuscadoLive => codigoBuscadoLive.codigo === codigo)
  if (!codigoBuscadoLive) {
      alert ("El codigo solicitado no existe")
  }
    return resultadoBusquedaLive = codigoBuscadoLive;
  }


  //Funcion para dar de alta el producto en array arrayProductos.
  const altaProducto = (producto) => {
    arrayProductos.push(producto)
    localStorage.setItem('productos', JSON.stringify(arrayProductos))
  }
  //FUNCION PARA MODIFICAR UN PRODUCTO EN ARRAY
  const modificarProducto = (codigo, desc) => {
    const productoPorModificar = buscarCodigoProducto(codigo)
    productoPorModificar.desc = desc; //SEGUIR EDITANDO ESTE BARDO
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
  const btnEnviar = document.getElementById('boton-enviar')
  let inputBuscar = document.getElementById('input-buscar')
  const btnBuscar = document.getElementById('boton-buscar')
  
  //funcion ordenar array
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
    //ESCUCHAMOS EL BOTON ENVIAR
    btnEnviar.addEventListener('click', (e)=>{
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
  const costo =+ inputCosto.value;
  const markup =+ inputMarkup.value;
  const iva =+ radioIva[0].value;
  
  
  calcularPrecioVta()
  calcularPrecioConIva();
  
  
  formulario.reset();

  //CREAMOS EL OBJETO EN BASE A LOS VALORES OBTENIDOS DEL DOM Y LO GUARDAMOS EN ARRAY
  //LLAMANDO A LA FUNCION CORRESPONDIENTE
  const producto = new Producto (codigo,desc,marca,costo,markup,iva,precioVta,precioConIva)
  altaProducto(producto)
  ordenarArray(arrayProductos) ;
  localStorage.setItem('productos', JSON.stringify(arrayProductos))
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
                            <td>$ ${producto.costo} </td>
                            <td>${producto.markup}% </td>
                            <td>${producto.porcentajeDeIva}% </td>
                                `;
  let tdAccionesProductos = document.createElement ('td');
  let botonEditar = document.createElement('button');
  botonEditar.classList.add('btn', 'btn-primary')
  botonEditar.innerText = 'Editar';
  let botonEliminar = document.createElement('button');
  botonEliminar.classList.add('btn','btn-danger');
  botonEliminar.innerText = 'Eliminar';
  botonEliminar.onclick = () => {
    console.log (producto.codigo)
    eliminarProducto (producto.codigo)
    actualizarTabla();
    
  }
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
  }) ;
    
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