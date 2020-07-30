function populatesUF() {
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`

            }
        } )
    }

populatesUF()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufvalue = event.target.value


    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`


    citySelect.innerHTML = "<option value>Selecione a Cidade<option>"
    citySelect.disabled = true

fetch(url)
    .then( res => res.json() )
    .then( cities => {
        

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })
    }

document
 .querySelector("select[name=uf]")
 .addEventListener("change" , getCities)


 // Itens de coleta
 //pegar todos os li's
 const itensToCollect = document.querySelectorAll(".ítens-grid li")
 
 for (const item of itensToCollect) {
     item.addEventListener("click", handleSelectedItem)
 }

  const collectedItems = document.querySelector("input[name=items]")

 //criar uma variavel para seleção
 let selectedItems = [] 

 function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover uma class com o JS
    itemLi.classList.toggle("selected")

     const itemId = itemLi.dataset.id

     

    // verificar se existem ítens selecionados, se sim
    // pegar os ítens selecionados 

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // isso será true ou false
        return  itemFound
    })

    // se ja tiver selecionado tirar da seleção
    if(alreadySelected >= 0 ) {
        // tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else {
        // se não tiver selecionado
        // adicionar à seleção

        selectedItems.push(itemId)
    }
    
    // atualizar o campo escondido com os ítens selecionados
    collectedItems.value = selectedItems
    
 }


