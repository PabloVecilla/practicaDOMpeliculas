# Movie Manager

Aplicación web desarrollada con **HTML, CSS y JavaScript** para gestionar un pequeño catálogo de películas mediante un formulario y una tabla dinámica.

El proyecto permite:

- añadir películas
- validar los datos introducidos
- filtrar por género
- buscar por texto en tiempo real
- editar películas existentes
- borrar películas concretas

---

## Objetivo de la práctica

La práctica consistía en crear una aplicación que solicitase películas mediante un formulario y las mostrase en una tabla.

### Fase 1
- Crear un formulario para añadir una nueva película:
  - título
  - año
  - descripción
  - URL de la foto
  - género
- Validar los campos del formulario
- Validar que el año tenga 4 cifras y esté entre **1800** y el año actual
- Crear un filtro para mostrar las películas por género
- Almacenar las películas en un array
- Mostrar todas las películas en una tabla usando etiquetas HTML semánticas:
  - `<table>`
  - `<tr>`
  - `<td>`
  - `<th>`

### Fase 2
- Añadir un segundo filtro de texto
- Filtrar películas mientras el usuario escribe
- Editar una película concreta
- Borrar una película concreta
- Subir la solución a GitHub

---

## Funcionalidades implementadas

### Gestión de películas
La aplicación trabaja con un array llamado `arrayPelis`, que almacena objetos con esta estructura:

```js
{
  titulo: "Forrest Gump",
  anio: 1994,
  desc: "Descripción de la película",
  url: "https://...",
  gen: "Drama"
}