var art = document.getElementsByClassName("card").length
var arti = document.getElementById("msm")
console.log("art",art)
var filtro 

console.log(document.querySelectorAll(".content"))
document.addEventListener("keyup", e=>{
  if (e.target.matches("#search")){
    console.log(e.key)
      if (e.key ==="Escape")e.target.value = ""
      document.querySelectorAll(".card").forEach(fruta =>{
       console.log( fruta.textContent)
       fruta.textContent.toLowerCase().includes(e.target.value.toLowerCase())
       ?fruta.classList.remove("filtro")
       :fruta.classList.add("filtro") 
       
       
       filtro = document.getElementsByClassName("filtro").length
       console.log("filtro",filtro)
       if(art === filtro){
       console.log("vacio")
       arti.innerHTML=`No se obtuvo resultado`
       }else{
         arti.innerHTML=` `
       }
      })
 
  }
})

 