
function gerarListaUsers () {

    let arrayUsers = JSON.parse(localStorage.getItem("users")) || []

    const container = document.getElementById("paraCards")
    const divLogin = document.getElementById("paraLogin")
    const nomeUser = document.getElementById("nome")
    const bordaFotoPerfil = document.getElementById("bordaFotoPerfil")


    arrayUsers.forEach(user=> {
        const divUser = document.createElement("div")
        divUser.classList.add("cardUser") 
        divUser.setAttribute("id", `${user.nome}`)


        if(user.url === "") {       
        divUser.innerHTML = `
         <div class="borda"> <div class="initial">${user.caracter}</div> </div>
                <p>${user.nome}</p>
    `
        } 
         else {          
        divUser.innerHTML = `
        <img src="${user.url}" alt="">
                <p>${user.nome}</p>
    `
        }

        divUser.addEventListener("click", () => {
          divLogin.style.display = "grid"
          nomeUser.value = `${user.nome}`

          if(user.url === "") {
            bordaFotoPerfil.innerHTML =
            `<div class="initial" styel="font-size: 40px;">${user.caracter}</div>`

          } else {
            bordaFotoPerfil.innerHTML = 
            ` <img id="fotoPerfil" src="${user.url}" alt="">
            `   
          }

        })

         container.appendChild(divUser)
    });
}
function pesquisar() {

    const digitado = document.getElementById("pesquisa").value.toLowerCase()
    const cards = document.querySelectorAll(".cardUser")
  
    
  cards.forEach(function(card) {
      const cardId = card.id.toLocaleLowerCase()
  
      if(cardId.includes(digitado)) {
        card.style.display =""
        card.style.visibility = "visible"
      } else {
        card.style.display ="none"
        card.style.visibility = "hidden"
      }
  
  })
  
  }


  const digitado = document.getElementById("pesquisa").addEventListener("keydown", function(event) {
    if(event.key ==="Enter") {
        pesquisar()
    }
})


window.addEventListener("load", gerarListaUsers)


function fazerLogin() {
  const nomeUser = document.getElementById("nome").value
  const senha = document.getElementById("senha").value

  let arrayUsers = JSON.parse(localStorage.getItem("users"))

  const dadosCorretos = arrayUsers.find(user => user.senha == senha && user.nome === nomeUser)

 !dadosCorretos ? alert("Senha incorreta") :alert("Bem-Vindo de Volta")

 if(dadosCorretos) {
    const urlChat = `/indexs/index_chat.html?id=${dadosCorretos.id}`
    window.location.href = urlChat;
 }


}


function loginShow() {
  const divLogin = document.getElementById("paraLogin")

  if(divLogin.style.display === "grid") {
    divLogin.style.display = "none"
  }

}