var chbox = document.getElementById("check");
chbox.addEventListener("change", function () {
  if (this.checked) {
    console.log("si");
    document.getElementById("section").classList.toggle("active");
    document.getElementById("section").classList.remove("notcked");
  } else {
    console.log("no chekeado");
    document.getElementById("section").classList.remove("active");
    document.getElementById("section").classList.toggle("notcked");
  }
});
var i = 0;
document.querySelector(".notf").addEventListener("click", () => check());
document.querySelector(".linotf").addEventListener("click", () => check());
const check = () => {
  i++;
  console.log("op", i);
  //   document.querySelector(".cont-search").classList.toggle("active");
  //   document.getElementById("section").classList.toggle("activee");
  //   document.getElementById("footer").classList.toggle("active");
  document.querySelector("body").classList.toggle("active");
  document.getElementById("carrito").classList.remove("active");
  if (i % 2 == 0) {
    document.getElementById("carrito").classList.toggle("active");
  }
};
//Agregar al carrito
const addbuttons = document.querySelectorAll(".agregar");
const ContenedorCarrito = document.querySelector(".carrito");
addbuttons.forEach((addCarButton) => {
  addCarButton.addEventListener("click", addCartClick); //obtenemos los productos
});
function addCartClick(event) {
  const button = event.target;
  const item = button.closest(".card");
  const titulo = item.querySelector(".titulo").textContent;
  const autor = item.querySelector(".autor").textContent;
  const precio = item.querySelector(".precio").textContent;
  const img = item.querySelector(".img").src;
  addItemshoppingCart(titulo, img, precio, autor);
}
function addItemshoppingCart(titulo, img, precio, autor) {
  const ElementTitulo = ContenedorCarrito.getElementsByClassName("TituloItem");
  console.log(ElementTitulo);
  for (let i = 0; i < ElementTitulo.length; i++) {
    if (ElementTitulo[i].innerText === titulo) {
      // Es mejor usar un id para cada libro ya que un autor puede tener varios libros y con el mismo precio
      let ElementoCantidad =
        ElementTitulo[i].parentElement.querySelector(".cantidad");

      ElementoCantidad.value++;
      actualizar();
      return;
    }
  }
  const NuevoConte = document.createElement("div"); //creamos un div para luego hacer un innerhtml con dicho fragmento
  const Anadir = `
  <div class="itemCart">
  <hr>
  <h4 class="TituloItem">${titulo}</h4><br>
  <h3>${autor}</h3><br>
  <img src="${img}" class="imgcard"><br>
  <p>Precio: <b class ="precioItem">${precio}</b></p>
  <span>Cantidad:</span>
  <input class="cantidad"type="number"min ="1" value="1" >
  <button type="button" class="borrar-producto" >Eliminar</button> 
  </div><br>`;
  NuevoConte.innerHTML = Anadir;
  ContenedorCarrito.append(NuevoConte);
  NuevoConte.querySelector(".borrar-producto").addEventListener(
    "click",
    removeShoppingCartItem
  ); //borrrar producto
  NuevoConte.querySelector(".cantidad").addEventListener(
    "change",
    changeCantidad
  ); //cantidad del producto
  actualizar();
}
function actualizar() {
  let total = 0;
  var p = 0;
  let capana = document.querySelector(".icon-button__badge");
console.log("campana",capana)
  const ShoppingTotal = document.querySelector(".total");
  const ShoppingItems = document.querySelectorAll(".itemCart"); //selecionamos todos los elementos

  ShoppingItems.forEach((ShoppingItem) => {
    const ShoppingItemPrecioElem = ShoppingItem.querySelector(".precioItem");
    const ShoppingPrecio = Number(
      ShoppingItemPrecioElem.textContent.replace("G", "")
    ); //reeplazamos simbolo de la monedad
    const ShoppingCartCantidadElem = ShoppingItem.querySelector(".cantidad");
    const ShoppingCartCantidad = Number(ShoppingCartCantidadElem.value);
    total = total + ShoppingCartCantidad * ShoppingPrecio; //sumanos
  });
  ShoppingItems.forEach((ShoppingItemp) => {
    const ShoppingCartCantidadElemp = ShoppingItemp.querySelector(".cantidad");
    const ShoppingCartCantidadp = Number(ShoppingCartCantidadElemp.value);
    p = p + ShoppingCartCantidadp;
  });
  capana.innerHTML=`${p}`
  document.querySelector(".respoms").innerHTML=`${p}`
  if (total <= 0) {
    ShoppingTotal.innerHTML = `  ${total} G`; //anadimos el monto al total
    document.getElementById("pagar").disabled = true;
  } else {
    ShoppingTotal.innerHTML = `  ${total.toFixed(3)} G`; //anadimos el monto al total
    document.getElementById("pagar").disabled = false;
  }
}
function removeShoppingCartItem(event) {
  //eliminar
  const buttonClicked = event.target;
  buttonClicked.closest(".itemCart").remove();
  actualizar();
}
function changeCantidad(event) {
  //cantidad
  const input = event.target;
  input.value <= 0 ? (input.value = 1) : null;
  actualizar();
}
