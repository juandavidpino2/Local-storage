// Variables
const listaTweets = document.getElementById('lista-tweets');



// Event Listeners

eventListeners();

function eventListeners() {
    // Cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit',
        agregarTweet);

    // Borrar tweets
    listaTweets.addEventListener('click', borrarTweet)

    // Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);

}




// FUnciones

// Añadir tweet del formulario 
function agregarTweet(e) {
    e.preventDefault();
    // Leer el valor de test area
    const tweet = document.getElementById('tweet').value;

    // Crear boton de eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    // Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet
        // Añade el boton de borrar al tweet
    li.appendChild(botonBorrar);
    // Añade el tweet ala lista
    listaTweets.appendChild(li);

    // Añadir al local storage
    agregarTweetLocalStorage(tweet);

}
// Eliminar el tweet del DOM
function borrarTweet(e) {
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
        console.log();
    }
}

// Mostrar datos de local storage en la lista
function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet) {

        // Crear boton de eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        // Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet
            // Añade el boton de borrar al tweet
        li.appendChild(botonBorrar);
        // Añade el tweet ala lista
        listaTweets.appendChild(li);
    });
}

// Agrega tweet a local storage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();

    // Añadir elnuevo tweet
    tweets.push(tweet);

    // Convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets));

}

// Comprobar que tenga elementos en local storage, retorna un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;

    // Revisamos los valores del local storage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;

}

// Eliminar tweet de local storage
function borrarTweetLocalStorage(tweet) {
    let tweets, tweetsBorrar;

    // Elimina la X del tweet
    tweetsBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet, index) {
        if (tweetsBorrar === tweet) {
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}