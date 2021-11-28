//IMPORTAMOS LOS COMPROBANTES ALMACENADOS EN LOCALSTORAGE 
let importComprobantes = JSON.parse(localStorage .getItem('comprobantes')) || [] 
let importStock = JSON.parse(localStorage .getItem('productos')) || [] 
let resultadoBusqueda
const buscarCodigoProductoSalida = (codigo) => {
  
  const codigoBuscado = importStock.find(codigoBuscado => codigoBuscado.codigo === codigo)
  if (!codigoBuscado) {
      console.log("nada")
  }
  
      return resultadoBusqueda = codigoBuscado;
}
const filtrado ={
  lista:[]
}
for (let index in importComprobantes) {
  dato = importComprobantes[index]
  carga = dato.carga

  for (let codigo in carga){
  cargaIndex= carga[codigo]
  codigoCarga = cargaIndex.codigo;
  
  if (filtrado.lista.indexOf(codigoCarga.codigo) ===-1){

  }
  
}
}
