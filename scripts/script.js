// realizar o consumo de nossa API

// GET
document.addEventListener('DOMContentLoaded',(e) => {
    e.preventDefault();

const url = "http://localhost:8801/series"

async function getSeries() {
  try{
    const response = await fetch(url)
    console.log(response);

    const dados = await response.json()
    console.log(dados);

        
dados.forEach(series =>{
    const listaSeries = document.getElementById('listaSeries');
    
    const tr = document.createElement('tr');
    const div= document.createElement('div');
    
    // realizar a criação das celulas de nossa tabela
    const nomeSerie= document.createElement('td')
    nomeSerie.textContent = series.nomeSerie

    const numTemporada = document.createElement('td')
    numTemporada.textContent = series.numTemporada

    const anoLancamento = document.createElement('td')
    anoLancamento.textContent = series.anoLancamento

    const nomeEstudio = document.createElement('td')
    nomeEstudio.textContent = series.nomeEstudio



    const tdEdit = document.createElement('img')
    tdEdit.src = './assets/icons/pencil-fill.svg'
    

    tdEdit.addEventListener('click', () => {
       const id = series.id
       alert(id);

       document.getElementById('title-form').textContent = "Atualizar Série"
       document.getElementById('btnCadastrar').textContent = "Atualizar"

       document.getElementById('nomeSerie').value = series.nomeSerie
       document.getElementById('numTemporada').value = series.numTemporada
       document.getElementById('nomeEstudio').value = series.nomeEstudio
       document.getElementById('anoLancamento').value = series.anoLancamento


        if (window.confirm("Você deseja atualizar a série?")){
            document.getElementById('btnCadastrar').removeEventListener('click')

            document.getElementById('btnCadastrar').addEventListener('click', AtualizarSerie)

            async function AtualizarSerie(){
                try {
                    const dadosEnviadosAtualizados ={
                        'nomeSerie' : document.getElementById('nomeSerie').value
                        'numTemporada': document.getElementById('numTempodara').value
                        'nomeEstudio': document.getElementById('nomeEstudio').value
                        'anoLancamento': document.getElementById('anoLancamento').value
                    }
                    const retorno = await fetch(`${url}/${id}`, {
                      method : 'PUT',
                      headers: {
                        'Content-Type': 'application/json'
                      },  
                      body: JSON.stringify(dadosEnviadosAtualizados)
                    });
                    if(retorno.ok){
                        alert("Série atualizada com sucesso!")
                    }else{
                        alert(`A série não pode ser atualizada ${ retorno.status}`)
                    }
                    window.location.reload();
                } catch (error) {
                    console.log(error);
                }
            }

        }
    });

    tdDelete.addEventListener('click', async () => {
        const id = series.id

        if (window.confirm("Você deseja realmente apagar essa série?")) {

            try {
                const retorno = await fetch(`${url}/${id}`, {
                    method: 'DELETE'
                })

                if (retorno.ok) {
                    alert('A série foi deletada com sucesso!')
                } else {
                    alert(`Erro ao deletar série ${retorno.status}`)
                }
                
            } catch (error) {
                console.log(error);
            }

        }
    })

    tr.appendChild(nomeSerie)
    tr.appendChild(numTemporada)
    tr.appendChild(anoLancamento)
    tr.appendChild(nomeEstudio)
    tr.appendChild(div)
    div.appendChild(tdEdit)
    div.appendChild(tdDelete)


    listaSeries.appendChild(tr)
});

}
 catch(error){
    console.error(error);
    console.log(error);
}
}
getSeries()
})