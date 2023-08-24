let startIndex = 0;
const batchSize = 10;

loadNews();

async function loadNews() {
  try {
    const jsonIds = await fetchNewsIds();
    await iterateThroughIds(jsonIds, startIndex, batchSize);
  } catch (error) {
    console.error(`Errore durante l'esecuzione principale: ${error}`);
  }
}

//Funzione per effettuare la chiamata API ed ottenere gli id delle varie notizie
async function fetchNewsIds() {
  try {
    const response = await fetch(process.env.API_URL_ID);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`Impossibile ottenere gli id delle notizie. Errore: ${error}`);
    throw error;
  }
}

//Funzione per effettuare la chiamata per ottenere una singola notizia
async function fetchNewsById(id) {
  try {
    const response = await fetch(`${process.env.API_URL_NEWS}${id}.json`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(`Errore nella chiamata per la notizia con id ${id.split('.')}: ${error}`);
    throw error;
  }
}

//Funzione che prende le notizie selezionate ed effettua tutte le chiamate
async function processJsonBatch(ids) {
  const promises = ids.map(id => fetchNewsById(id));
  return await Promise.all(promises);
}

//Funzione che crea la batch e richiama la funzione per effettuare le varie chiamate
async function iterateThroughIds(jsonIds, startIndex, batchSize) {
  const endIndex = startIndex + batchSize - 1;
  const batchIds = jsonIds.slice(startIndex, endIndex + 1);

  if (batchIds.length > 0) {
    try {
      const batchResults = await processJsonBatch(batchIds);
      console.log('Risultati della batch:', batchResults);
    } catch (error) {
      console.error(`Errore durante l'elaborazione della batch: ${error}`);
    }
  } else {
    console.log('Elaborazione completata.');
  }
}
