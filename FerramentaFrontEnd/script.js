const modificaProd = () => {
  let mod_nome = $("#mod-nome").val()
  let mod_desc = $("#mod-descrizione").val()
  let mod_prez = $("#mod-prezzo").val()
  let mod_cat = $("#mod-cat").val()
  $.ajax({
    url: "http://localhost:5203/api/prodotti",
    type: "PUT",
    data: JSON.stringify({
      nome: mod_nome,
      codice: tempProd.codice,
      dataCreazione: tempProd.dataCreazione,
      categoria: mod_cat,
      descrizione: mod_desc,
      prezzo: mod_prez,
      quantita: tempProd.quantita,
    }),
    contentType: "application/json",
    success: function () {
      printTable()
      $("#modaleModifica").modal("hide")
    },
    error: function (errore) {
      console.log(errore)
    },
  })
}
const modifica = (codice) => {
  tempProd = getProd(codice)
}

const getProd = (codice) => {
  $.ajax({
    url: "http://localhost:5203/api/prodotti/" + codice,
    type: "GET",
    success: function (risultato) {
      tempProd = risultato
      let mod_nome = $("#mod-nome").val(tempProd.nome)
      let mod_desc = $("#mod-descrizione").val(tempProd.descrizione)
      let mod_prez = $("#mod-prezzo").val(tempProd.prezzo)
      let mod_cat = $("#mod-cat").val(tempProd.categoria)
    },
    error: function (errore) {
      alert("ERRORE")
      console.log(errore)
    },
  })
}

const salva = () => {
  let nome = $("#input-nome").val()
  let desc = $("#input-descrizione").val()
  let prez = $("#input-prezzo").val()
  let cat = $("#input-cat").val()
  let qt = $("#input-qt").val()

  $.ajax({
    url: "http://localhost:5203/api/prodotti",
    type: "POST",
    data: JSON.stringify({
      nome: nome,
      categoria: cat,
      descrizione: desc,
      prezzo: prez,
      quantita: qt,
    }),
    contentType: "application/json",
    success: function () {
      printTable()
      $("#modaleInserimento").modal("hide")
    },
    error: function (errore) {
      console.log(errore)
      printTable()
      $("#modaleInserimento").modal("hide")
    },
  })
}

const elimina = (id) => {
  $.ajax({
    url: "http://localhost:5203/api/prodotti/codice/" + id,
    type: "POST",
    success: function () {
      alert("Eliminato")
      printTable()
    },
    error: function (errore) {
      alert("Errore")
      console.log(errore)
    },
  })
}
const printTable = () => {
  $.ajax({
    url: "http://localhost:5203/api/prodotti",
    type: "GET",
    success: function (risultato) {
      let contenuto = ""

      for (let [idx, item] of risultato.entries()) {
        contenuto += `
                            <tr>
                                <td>${item.nome}</td>
                                <td>${item.descrizione}</td>
                                <td>${item.categoria}</td>
                                <td>${item.prezzo}</td>
                                <td><button class="btn btn-danger" onclick="getProdToMod(${false},'${
          item.codice
        }')">-</button>&nbsp;${
          item.quantita
        }&nbsp;<button class="btn btn-success" onclick="getProdToMod(${true},'${
          item.codice
        }')">+</button></td>
                                <td>${item.dataCreazione}</td>
                                <td>
                                    <button class="btn btn-danger" onclick="elimina('${
                                      item.codice
                                    }')">Elimina</button>
                                    <button class="btn btn-warning" onclick="modifica('${
                                      item.codice
                                    }')" data-toggle="modal" data-target="#modaleModifica">Modifica</button>
                                </td>
                            </tr>
                        `
      }

      $("#table-body").html(contenuto)
    },
    error: function (errore) {
      alert("ERRORE")
      console.log(errore)
    },
  })
}

const modificaQt = (trigger, obj) => {
  let toMod = obj
  if (trigger) {
    toMod.quantita += 1
  } else if (!trigger) {
    toMod.quantita -= 1
  }
  $.ajax({
    url: "http://localhost:5203/api/prodotti",
    type: "PUT",
    data: JSON.stringify({
      prodottoId: toMod.prodottoId,
      nome: toMod.nome,
      codice: toMod.codice,
      dataCreazione: toMod.dataCreazione,
      categoria: toMod.categoria,
      descrizione: toMod.descrizione,
      prezzo: toMod.prezzo,
      quantita: toMod.quantita,
    }),
    contentType: "application/json",
    success: function () {
      alert("Aggiornata")
      printTable()
    },
    error: function (errore) {
      console.log(errore)
    },
  })
}
const getProdToMod = (trigger, codice) => {
  $.ajax({
    url: "http://localhost:5203/api/prodotti/" + codice,
    type: "GET",
    success: function (risultato) {
      let obj = risultato
      modificaQt(trigger, obj)
    },
    error: function (errore) {
      alert("ERRORE")
      console.log(errore)
    },
  })
}
const getFiltered = (filtro) => {
  $.ajax({
    url: "http://localhost:5203/api/prodotti",
    type: "GET",
    success: function (risultato) {
      let contenuto = ""
      let filtered = risultato.filter(
        (item) => item.categoria.toLower() == filtro.toLower()
      )
      for (let [idx, item] of filtered.entries()) {
        contenuto += `
                            <tr>
                                <td>${item.nome}</td>
                                <td>${item.descrizione}</td>
                                <td>${item.categoria}</td>
                                <td>${item.prezzo}</td>
                                <td><button class="btn btn-danger" onclick="getProdToMod(${false},'${
          item.codice
        }')">-</button>&nbsp;${
          item.quantita
        }&nbsp;<button class="btn btn-success" onclick="getProdToMod(${true},'${
          item.codice
        }')">+</button></td>
                                <td>${item.dataCreazione}</td>
                                <td>
                                    <button class="btn btn-danger" onclick="elimina('${
                                      item.codice
                                    }')">Elimina</button>
                                    <button class="btn btn-warning" onclick="modifica('${
                                      item.codice
                                    }')" data-toggle="modal" data-target="#modaleModifica">Modifica</button>
                                </td>
                            </tr>
                        `
      }

      $("#table-body").html(contenuto)
    },
    error: function (errore) {
      alert("ERRORE")
      console.log(errore)
    },
  })
}
$(document).ready(printTable())

/*<select name="garden" multiple="multiple">
  <option>Flowers</option>
  <option selected="selected">Shrubs</option>
  <option>Trees</option>
  <option selected="selected">Bushes</option>
  <option>Grass</option>
  <option>Dirt</option>
</select>
<div></div>
 
<script>
$( "select" )
  .on( "change", function() {
    var str = "";
    $( "select option:selected" ).each(function() {
      str += $( this ).text() + " ";
    } );
    $( "div" ).text( str );
  } )
  .trigger( "change" );*/
