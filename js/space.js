// Esperamos a que el documento HTML se cargue completamente
document.addEventListener("DOMContentLoaded", function () {
    
    const inputBuscar = document.getElementById("inputBuscar"); // Input de búsqueda
    const btnBuscar = document.getElementById("btnBuscar"); // Botón de búsqueda
    const contenedor = document.getElementById("contenedor"); // Contenedor de resultados
  
    // Realiza la solicitud a la API de la NASA y muestra los resultados
    async function buscarImagenes() {
      // Acá aparece el término de búsqueda ingresado por el usuario
      const terminoBusqueda = inputBuscar.value;
  
      // Realiza la solicitud a la API de la NASA
      try {
        // Realiza una solicitud HTTP GET a la API de la NASA
        const response = await fetch(`https://images-api.nasa.gov/search?q=${terminoBusqueda}`);
  
        // Acá se ve si la solicitud funcionó
        if (response.ok) {
          // Parseamos la respuesta JSON
          const data = await response.json();
  
          // Limpia el contenedor
          contenedor.innerHTML = "";
  
          // Iteramos a través de los resultados de la API
          data.collection.items.forEach((item) => {
            // Información de cada imagen
            const titulo = item.data[0].title;
            const descripcion = item.data[0].description;
            const fecha = item.data[0].date_created;
            const imagenUrl = item.links[0].href;
  
            // Creamos elementos HTML para mostrar la información
            const divImagen = document.createElement("div");
            divImagen.innerHTML = `
              <h3>${titulo}</h3>
              <p>${descripcion}</p>
              <p>Fecha: ${fecha}</p>
              <img src="${imagenUrl}" alt="${titulo}" />
            `;
  
            // Agrega el elemento al contenedor
            contenedor.appendChild(divImagen);
          });
        } else {
          // Muestra error si la solicitud no fue exitosa
          console.error("Error al realizar la solicitud. Código de estado:", response.status);
        }
      } catch (error) {
        // Manejar errores de red u otros errores de solicitud
        console.error("Error al realizar la solicitud:", error);
      }
    }
  
    // Agregar un evento click al botón de búsqueda
    btnBuscar.addEventListener("click", buscarImagenes);
  });
  