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

//Funcion para dar de alta el producto en array.
const altaProducto = (producto) => {
  arrayProductos.push(producto)
  localStorage.setItem('productos', JSON.stringify(arrayProductos))
}
//Funcion para ver los productos
const VER_TODOS =() => {
  return arrayProductos; }


const formulario = document.getElementById('formulario-productos')
const btnEnviar =document.getElementById('boton-enviar')
btnEnviar.addEventListener('click', (e)=>{
  e.preventDefault()

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
console.log (precioVta)
console.log (precioConIva)
//CREAMOS EL OBJETO EN BASE A LOS VALORES OBTENIDOS DEL DOM Y LO GUARDAMOS EN ARRAY
//LLAMANDO A LA FUNCION CORRESPONDIENTE
const producto = new Producto (codigo,desc,marca,costo,markup,iva,precioVta,precioConIva)
altaProducto(producto)

})