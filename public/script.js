window.onload = function() {
    fetch('/productos')
        .then(response => response.json())
        .then(productos => {
            const container = document.getElementById('productos-container');
            Object.values(productos).forEach(producto => {
                const div = document.createElement('div');
                div.className = 'producto';
                div.innerHTML = `<h2>${producto.TEXTO}</h2>
                                 <img src="${producto['FOTO-src']}" alt="${producto.TEXTO}">
                                 <p>Precio: ${producto.PRECIO}</p>`;
                container.appendChild(div);
            });

        });
};
