let arrayPelis = [
    {
        titulo: "Forrest Gump",
        anio: 1994,
        desc: "Forrest Gump (Tom Hanks) sufre desde pequeño un cierto retraso mental. A pesar de todo, gracias a su tenacidad y a su buen corazón será protagonista de acontecimientos cruciales de su país durante varias décadas.",
        url: "https://pics.filmaffinity.com/Forrest_Gump-212765827-large.jpg",
        gen: "Drama"
    },
    {
        titulo: "El padrino",
        anio: 1972,
        desc: "América, años 40. Don Vito Corleone (Marlon Brando) es el respetado y temido jefe de una de las cinco familias de la mafia de Nueva York. Michael no quiere saber nada de los negocios de su padre. Cuando Corleone se niega a participar en el negocio de las drogas, empieza la guerra entre familias mafiosas.",
        url: "https://pics.filmaffinity.com/El_padrino-590289523-large.jpg",
        gen: "Drama"
    },
    {
        titulo: "Ali-G",
        anio: 2002,
        desc: "El Centro de Ocio John Nike en West Staines va a cerrar por falta de fondos. A Ali G le preocupa el destino del club alternativo de boy scouts que ha estado dirigiendo hasta ese momento. Decidido a salvar el centro se encadena a una estación de autobuses de Staines.",
        url: "https://m.media-amazon.com/images/I/81bOLxwoUaL._AC_UF894,1000_QL80_.jpg",
        gen: "Comedia"
    },
    {
        titulo: "Rambo",
        anio: 2002,
        desc: "Cuando John Rambo, un veterano boina verde, va a visitar a un viejo compañero de armas, se entera de que ha muerto víctima de las secuelas de la guerra.",
        url: "https://upload.wikimedia.org/wikipedia/commons/a/a0/John_Rambo.jpg",
        gen: "Accion"
    }
];

const addMovieButton = document.getElementById("boton-anadir-peli");
const tbody = document.querySelector("#tabla-peliculas tbody");
const filtroTexto = document.getElementById("filtro-texto");
const filtroGenero = document.getElementById("filtro-genero");
const formulario = document.querySelector("form");

let editIndex = null;

pintaTabla(arrayPelis);

const validateYear = (year) => {
    const currentYear = new Date().getFullYear();
    const inputYear = parseInt(year, 10);

    if (isNaN(inputYear) || inputYear < 1800 || inputYear > currentYear) {
        alert("por favor, introduce un año entre 1800 y la actualidad");
        return null;
    }

    return String(inputYear);
};

const validateText = (text) => {
    const cleanText = text.trim();
    const regexText = /^[a-zA-Z0-9Á-ÿ\s:,'"\-!?.]{1,100}$/;

    if (!regexText.test(cleanText)) {
        alert("por favor, escribe un título válido (1-100 caracteres)");
        return null;
    }

    return cleanText;
};

const validateLongText = (text) => {
    const cleanText = text.trim();
    const regexText = /^[a-zA-Z0-9Á-ÿ\s:,'"\-!?.()\r\n]{10,500}$/;

    if (!regexText.test(cleanText)) {
        alert("por favor, escribe una sinopsis válida (10-500 caracteres)");
        return null;
    }

    return cleanText;
};

const validateUrl = (url) => {
    const cleanUrl = url.trim();
    const regexUrl = /^https:\/\/[^\s?#]+\.(jpg|jpeg|png|webp)(\?[^\s#]*)?(#[^\s]*)?$/i;

    if (!regexUrl.test(cleanUrl)) {
        alert("por favor, escribe una url válida (https://...url.jpg/jpeg/png/)");
        return null;
    }

    return cleanUrl;
};

function aplicarFiltros() {
    const textoBuscado = filtroTexto.value.trim().toLowerCase();
    const generoBuscado = filtroGenero.value.trim().toLowerCase();

    const peliculasFiltradas = arrayPelis.filter((peli) => {
        const coincideTexto =
            textoBuscado === "" ||
            peli.titulo.toLowerCase().includes(textoBuscado) ||
            peli.desc.toLowerCase().includes(textoBuscado) ||
            String(peli.anio).includes(textoBuscado);

        const coincideGenero =
            generoBuscado === "" ||
            peli.gen.toLowerCase() === generoBuscado;

        return coincideTexto && coincideGenero;
    });

    pintaTabla(peliculasFiltradas);
}

filtroTexto.addEventListener("input", aplicarFiltros);
filtroGenero.addEventListener("change", aplicarFiltros);

addMovieButton.addEventListener("click", (event) => {
    event.preventDefault();

    const titulo = validateText(document.getElementById("titulo").value);
    const anio = validateYear(document.getElementById("anio").value);
    const desc = validateLongText(document.getElementById("desc").value);
    const url = validateUrl(document.getElementById("url").value);
    const gen = document.getElementById("gen").value.trim();

    if (!titulo || !anio || !desc || !url || !gen) {
        alert("datos de la película incompletos o erróneos");
        return;
    }

    const peli = {
        titulo,
        anio,
        desc,
        url,
        gen
    };

    if (editIndex !== null) {
        arrayPelis[editIndex] = peli;
        editIndex = null;
        addMovieButton.textContent = "Añadir película";
    } else {
        const exists = arrayPelis.some(
            (item) => item.titulo.toLowerCase().trim() === peli.titulo.toLowerCase().trim()
        );

        if (exists) {
            const duplicate = confirm(`La película "${peli.titulo}" ya existe en el array. ¿Quieres duplicarla?`);
            if (!duplicate) return;
        }

        arrayPelis.push(peli);
    }

    formulario.reset();
    aplicarFiltros();
});

function pintaTabla(array) {
    let filas = "";

    array.forEach((peli) => {
        const realIndex = arrayPelis.findIndex(
            (item) =>
                item.titulo === peli.titulo &&
                String(item.anio) === String(peli.anio) &&
                item.desc === peli.desc &&
                item.url === peli.url &&
                item.gen === peli.gen
        );

        filas += `
            <tr>
                <td>${peli.titulo}</td>
                <td>${peli.anio}</td>
                <td><div class="desc-box">${peli.desc}</div></td>
                <td><img src="${peli.url}" alt="${peli.titulo}" width="80"></td>
                <td>${peli.gen}</td>
                <td><button class="button-edit" data-index="${realIndex}"><i class="fa-solid fa-pen-to-square"></i></button></td>
                <td><button class="button-delete" data-index="${realIndex}"><i class="fa-solid fa-delete-left"></i></button></td>
            </tr>`;
    });

    tbody.innerHTML = filas;

    const deleteButtons = document.querySelectorAll(".button-delete");
    const editButtons = document.querySelectorAll(".button-edit");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const index = Number(event.currentTarget.dataset.index);

            if (isNaN(index) || index < 0) return;

            arrayPelis.splice(index, 1);

            if (editIndex === index) {
                editIndex = null;
                formulario.reset();
                addMovieButton.textContent = "Añadir película";
            }

            aplicarFiltros();
        });
    });

    editButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            document.getElementById("titulo").focus(); 
            const index = Number(event.currentTarget.dataset.index);

            if (isNaN(index) || index < 0) return;

            const peli = arrayPelis[index];

            document.getElementById("titulo").value = peli.titulo;
            document.getElementById("anio").value = peli.anio;
            document.getElementById("desc").value = peli.desc;
            document.getElementById("url").value = peli.url;
            document.getElementById("gen").value = peli.gen;

            editIndex = index;
            addMovieButton.textContent = "Guardar cambios";
        });
    });
}
