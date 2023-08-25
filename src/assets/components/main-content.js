let startIndex = 0;
const batchSize = 10;

createMainSection();
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
      createNewsCards(batchResults)
    } catch (error) {
      console.error(`Errore durante l'elaborazione della batch: ${error}`);
    }
  } else {
    console.log('Elaborazione completata.');
  }
}

//funzione per la creazione della sezione main
function createMainSection() {
  const mainElement = document.createElement('main');
  mainElement.classList.add('bg-dark', 'px-2', 'px-sm-0');

  const titleElement = document.createElement('h2');
  titleElement.textContent = 'Catching Up with the Tech World!';
  titleElement.classList.add('h2', 'fw-bold', 'fst-italic', 'text-center', 'text-danger', 'mb-5');

  mainElement.appendChild(titleElement);

  const header = document.querySelector('header');
  document.body.insertBefore(mainElement, header.nextSibling);
}

//funzione per generare le cards
function createNewsCards(newsArray) {
  const container = document.createElement('div');
  container.classList.add('container', 'mt-4');

  const row = document.createElement('div');
  row.classList.add('row', 'row-cols-1', 'row-cols-md-2', 'g-4');

  newsArray.forEach(news => {
    const col = document.createElement('div');
    col.classList.add('col');

    const card = document.createElement('div');
    card.classList.add('card', 'h-100', 'bg-secondary', 'p-3');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-between', 'p-2');

    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card-title', 'text-danger-emphasis', 'fw-bold', 'mb-3');
    cardTitle.textContent = news.title;

    const cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer', 'bg-transparent', 'border-0', 'text-start', 'text-danger-emphasis', 'fw-bold', 'd-flex', 'align-items-center', 'justify-content-between', 'p-2');

    const cardDetails = document.createElement('div');
    cardDetails.classList.add('d-flex', 'flex-column', 'gap-1');

    const cardAuthor = document.createElement('p');
    cardAuthor.classList.add('m-0');
    cardAuthor.textContent = `Autore: ${news.by}`;

    const cardDate = document.createElement('p');
    cardDate.classList.add('m-0');
    cardDate.textContent = `Data: ${news.time}`;

    const cardLink = document.createElement('a');
    cardLink.classList.add('btn', 'btn-danger');
    cardLink.href = news.url;
    cardLink.textContent = 'Read more';

    cardDetails.appendChild(cardAuthor);
    cardDetails.appendChild(cardDate);

    cardFooter.appendChild(cardDetails);
    cardFooter.appendChild(cardLink);

    cardBody.appendChild(cardTitle);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    col.appendChild(card);
    row.appendChild(col);
  });

  container.appendChild(row);

  const mainElement = document.querySelector('main');
  mainElement.appendChild(container);
}
