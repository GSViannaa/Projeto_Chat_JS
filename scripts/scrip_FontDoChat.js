function mensagemToLocalStorage() {

    let mensagemInput = document.getElementById("mensagem").value;

    if(mensagemInput.length == 0) {
        return
    }
  
    const mensagensSalvas = JSON.parse(localStorage.getItem("mensagens")) || [];

    const agora = new Date();
    const dataEnvio = `${agora.getDate()}/${agora.getMonth() + 1}/${agora.getFullYear()} ${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}:${String(agora.getSeconds()).padStart(2, '0')}`;

    

    const urlAtual = window.location.href;
    const authorId = urlAtual.slice(-3); 

    class Mensagem {

        constructor(textoMensagem, authorId, createdAt) 
        {
            this.textoMensagem = textoMensagem;
            this.authorId = authorId;
            this.createdAt = createdAt;
        }
    }

    const novaMensagem = new Mensagem(mensagemInput, authorId, dataEnvio);

    mensagensSalvas.push(novaMensagem);

    localStorage.setItem("mensagens", JSON.stringify(mensagensSalvas));

    mensagemInput = document.getElementById("mensagem").value = ""

exibirMensagens()

}

const mensagemInput = document.getElementById("mensagem")
mensagemInput.addEventListener("keydown", function(event) {
    if(event.key ==="Enter") {
        mensagemToLocalStorage()
    }
})



function exibirMensagens() {
   
    const mensagensSalvas = JSON.parse(localStorage.getItem("mensagens")) || [];
   
    const usuariosSalvos = JSON.parse(localStorage.getItem("users")) || [];
    
 
    const chat = document.getElementById("chat");
    
    chat.innerHTML = "";
    
    mensagensSalvas.sort((a, b) => new Date(a.dataEnvio) - new Date(b.dataEnvio));
    
    
    mensagensSalvas.forEach(mensagem => {
        const isMensagemEnviada = mensagem.authorId === window.location.href.slice(-3);

        if (isMensagemEnviada) {
           
            const mensagemDiv = document.createElement("div");
            mensagemDiv.classList.add("mensagemEnviada");
            mensagemDiv.textContent = mensagem.textoMensagem;

          
            chat.appendChild(mensagemDiv);
        } else {
          
            const usuario = usuariosSalvos.find(user => user.id === mensagem.authorId);
            const urlImagemPerfil = usuario ? usuario.url : ""; 

            const mensagemBloco = document.createElement("div");
            mensagemBloco.classList.add("mensagemBloco");

            const infoMensagem = document.createElement("section");
            infoMensagem.classList.add("infoMensagem");

            if(urlImagemPerfil !== "") {
                
            const fotoPerfil = document.createElement("img");
            fotoPerfil.id = "fotoPerfil";
            fotoPerfil.src = urlImagemPerfil; 

            infoMensagem.appendChild(fotoPerfil);

            } else {
                const initial = document.createElement("p")
                const bortaInitial = document.createElement("div")

                initial.textContent = usuario.caracter

                bortaInitial.classList.add("bordaInital")

                bortaInitial.appendChild(initial)
                initial.classList.add("intial")

                infoMensagem.appendChild(bortaInitial)
            }

            const nome = document.createElement("p");
            nome.textContent = usuario.nome

           
            infoMensagem.appendChild(nome);

          
            const mensagemDiv = document.createElement("div");
            mensagemDiv.classList.add("mensagemRecebida");
            mensagemDiv.textContent = mensagem.textoMensagem;

       
            mensagemBloco.appendChild(infoMensagem);
            mensagemBloco.appendChild(mensagemDiv);

       
            chat.appendChild(mensagemBloco);
        }
    });
}

function visualChanges() {

    const usuariosSalvos = JSON.parse(localStorage.getItem("users")) || [];
    const imgInfo = document.getElementById("imgInfo")

    const info = document.getElementById("info")

    usuariosSalvos.forEach(user => {
        const userAtual = window.location.href.slice(-3) === user.id

        if(userAtual) {
            imgInfo.src = user.url
            const p = document.createElement("p")
            p.textContent = user.nome


            info.appendChild(p)

            if(user.url == "") {
                info.innerHTML = ""  
                
                info.innerHTML = `

                <div class="borda"> <div class="initial">${user.caracter}</div> </div>
                <p>${user.nome}</p>

                
                `
                
              
            }
        }

        
    })

}

window.addEventListener("beforeunload", (event) => {
    if (!confirm("Tem certeza? Você será deslogado")) {
        event.preventDefault(); 
    }
});
window.addEventListener("storage", () => {
    exibirMensagens();
});

window.addEventListener("load", () => {
    visualChanges() 
});


window.addEventListener("load", () => {
    exibirMensagens();
});


