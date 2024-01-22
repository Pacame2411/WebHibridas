const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs'); // Importar el módulo de sistema de archivos

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta para obtener los datos de los productos
app.get('/productos', (req, res) => {
    fs.readFile('productos.JSON', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo', err);
            res.status(500).send('Error al leer el archivo');
            return;
        }

        let productos = JSON.parse(data);
        console.log('Datos del archivo JSON:', productos);
        res.json(productos);
    });
});

// Ruta para obtener el feed RSS
app.get('/rss', async (req, res) => {
    const RSS_URL = "https://www.bbc.com/mundo/ultimas_noticias/index.xml";

    try {
        // Importación dinámica de node-fetch
        const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
        const response = await fetch(RSS_URL);
        const data = await response.text();
        res.send(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error al obtener el RSS');
    }
});

app.get('/rss', async (req, res) => {
    const RSS_URL = "https://www.bbc.com/mundo/ultimas_noticias/index.xml";

    try {
        const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
        const response = await fetch(RSS_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const feedparser = new FeedParser();
        const noticias = [];

        response.body.pipe(feedparser);

        feedparser.on('readable', function () {
            let item;
            while (item = this.read()) {
                noticias.push({
                    titulo: item.title,
                    resumen: item.summary,
                    publicado: item.pubDate || item.date,
                    enlace: item.link,
                    imagen: item.image ? item.image.url : null
                });
            }
        });

        feedparser.on('end', function () {
            res.json(noticias);
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send(`Error al obtener el RSS: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
