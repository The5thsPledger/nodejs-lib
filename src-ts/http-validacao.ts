import chalk from "chalk";

function extraiLinks (arrLinks) {
  return arrLinks.map((objetoLink) => Object.values(objetoLink).join())
}

async function checaStatus (listaURLs) {
  const arrStatus = await Promise
  .all(
    listaURLs.map(async (url) => {
      try {
        const response = await fetch(url)
        return response.status;
      } catch (erro) {
        return manejaErros(erro);
      }
    })
  )
  return arrStatus;
}

function manejaErros (erro) {
  if (erro.cause.code === 'ENOTFOUND') {
    return {
        color: 'yellow',
        msg: 'Link não encontrado'
    };
  } 
  else if (erro.cause.code === 'ECONNREFUSED') {
    return {
        color: 'red',
        msg: 'Conexão recusada'
    };
  }
  else if (erro.cause.code === 'ETIMEDOUT') {
    return {
        color: 'black',
        msg: 'Tempo limite excedido'
    };
  }
  else {
    return {
        color: 'redBright',
        msg: 'ocorreu o seguinte erro: ' + erro.cause.code
    }
  }
}

export default async function listaValidada (listaDeLinks) {
  const links = extraiLinks(listaDeLinks.links);
  const status = await checaStatus(links);

  const lista = listaDeLinks.links.map((objeto, indice) => ({
    ...objeto,
    status: status[indice] === 200 || status[indice] === 404 ? 
        status[indice] :  chalk.reset() + chalk[status[indice].color](status[indice].msg) + chalk.reset()
  }))
  return lista;
}