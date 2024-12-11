
/////////////////////////////////// Cadastro /////////////////////////////////// 

class novoUser {
    constructor(nome, url, senha, id, caracter) {
        this.nome = nome;
        this.url = url;
        this.senha = senha;
        this.id = id;
        this.caracter = this.nameInitial
    }

    get nameInitial() {
        return this.nome[0];
    }

    generateURL() {
        return `/indexs/index_chat.html?id=${this.id}`;
    }
}




function criarConta() {
    
    let arrayUsers = JSON.parse(localStorage.getItem("users")) || [];

    const nome = document.getElementById("nome").value;
    const urlfoto = document.getElementById("url").value;
    const senha = document.getElementById("senha").value;
    const id = gerarId(); 

    const userNovo = new novoUser(nome, urlfoto, senha, id);

    
    const link = userNovo.generateURL();

    arrayUsers.push(userNovo);
    localStorage.setItem("users", JSON.stringify(arrayUsers));

 
    document.getElementById("nome").value = "";
    document.getElementById("url").value = "";
    document.getElementById("senha").value = "";

    alert("Cadastro feito com sucesso!");


    window.location.href = link;
}



//////////////////////////////////////// usuarios ////////////////////////////////////


const usuarios = [
    new novoUser(
        "Van Gogh",
        "https://ichef.bbci.co.uk/ace/ws/640/cpsprodpb/137EA/production/_124805897_37d78f83-4382-4e95-9581-2130055f5d89.jpg.webp",
        1234,
        "001"
    ),
    new novoUser(
        "Pablo Picasso",
        "https://lh4.googleusercontent.com/proxy/sDd8-hDilTQReQ2QS4-kMmyH9WBXKxrcx9I3Hns_Lwih-GD-RY00RhydauGKRBZY5zT_Onot-cBOVuuvo5hy5oNwJ8fa-NM3BZQu-rcecQgI9ISsxLNWCvZ9-QOUVcprfJQ",
        1234,
        "002"
    ),
    new novoUser(
        "Frida Khalo",
        "https://arteatevoce.com/wp-content/uploads/2020/05/xSelf-Portrait_Dedicated_to_Dr._Eloesser_a085faf5-fec3-4461-95db-2abe58e349f5.jpg.pagespeed.ic.e_eQAUmV_w.jpg",
        1234,
        "003"
    ),
    new novoUser(
        "Leonardo Da Vinci",
        "",
        1234,
        "004"
    ),
    new novoUser(
        "Sandro Botticelli",
        "",
        1234,
        "005"
    )
];

function seEstiverVazio() {
    if(!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(usuarios))
    }
  
  }


  window.addEventListener("load", seEstiverVazio)

function gerarId() {
    const numero = Math.floor(Math.random() * 999) + 1;
    return numero.toString().padStart(3, '0');
}