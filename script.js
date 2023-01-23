// colocando o form dentro de uma variável //
const form = document.querySelector("#form-habits")

// executando a biblioteca //
const nlwSetup = new NLWSetup(form) // criando um novo objeto e colocando dentro da variável //

// criando o objeto de forma manual. mas não pode ser assim
// const data = {
//  run: ["01-01", "01-02", "01-06", "01-07", "01-08"],
//  takePills: ["01-03"],
//  journal: ["01-02"],
//}

// colocando o botão dentro de uma variável //
const button = document.querySelector("header button") // seletor do botão no header

function add() {
  // objeto que guarda o dia de hoje, em português do brasil. slice é uma funcionalidade que só funciona com string. no caso 0, -5, ele recorta 5 caracteres de trás para frente. então, a data DD/MM/AAAA ficará DD/MM.
  const today = new Date().toLocaleDateString("pt-br").slice(0, -5)

  // verificando se o dia já existe
  if (nlwSetup.dayExists(today) == false) {
    nlwSetup.addDay(today) // adiciona o dia e renderiza o layout
  } else {
    alert("Este dia já foi adicionado. Por favor, tente novamente!")
  }
}

// adicionando algo que irá ouvir o evento
button.addEventListener("click", add) // o evento nesse caso é o click. toda vez que ele ouvir o evento, ele irá executar a função add

function save() {
  localStorage.setItem("nlw@habits", JSON.stringify(nlwSetup.data)) // localStorage é um objeto que guarda informações na memória do navegador. ele precisa de uma chave, que pode ser qualquer nome, e os dados a serem guardados. dentro da biblioteca nlwSetup, existe esta propriedade data que deixa os dados na forma do objeto data exemplicado lá em cima, o qual registra as datas nos arrays conforme selecionado nos inputs. porém o localstorage não aceita objeto como argumento, então precisa-se transformar o objeto em string
}
// sempre que houver alteração no formulário, executará a função para salvar os dados
form.addEventListener("change", save)

// transformando os dados de string para objeto. o getItem carrega os dados do localStorage
const data = JSON.parse(localStorage.getItem("nlw@habits")) || {} // o operador || é "ou". isto é para quando for abrir a aplicação em outro navegador ou em outro celular, pois o localStorage é outro, então não vai haver um objeto para o setData, a não ser que se coloque um objeto vazio para começar a aplicação do zero e não dar erro

nlwSetup.setData(data) // método necessário. inserir os dados, em formato de objeto, no objeto nlwSetup //

nlwSetup.load() // carrega os dados e renderiza o layout (adiciona uma div day para cada dia no array, com os devidos inputs do tipo checkbox e cada hábito (propriedade) que estiver no objeto data terá o checked em todos os dias que estiver listado no array) //
