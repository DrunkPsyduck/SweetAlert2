import React, { Component } from "react";
import Swal from "sweetalert2";

export default class Modales extends Component {
  modalBasico = () => {
    Swal.fire("The Internet?", "That thing is still around?", "question");
  };

  mostrarMensaje = () => {
    alert("Ha seleccionado borrar");
  };

  mostrarModal = () => {
    Swal.fire({
      title: "¿Seguro que quiere borrar el elemento?",
      showDenyButton: true,
      confirmButtonText: `Borrar`,
      confirmButtonColor: `red`,
      denyButtonText: `Salir`,
      denyButtonColor: `grey`,
    }).then((result) => {
      /* Desde aquí se puede lanzar otra funcion */
      if (result.isConfirmed) {
        Swal.fire("Borrado", this.mostrarMensaje(), "error");
      } else if (result.isDenied) {
        Swal.fire("No Realizara ninguna accion", "", "info");
      }
    });
  };

  modalHtmlPersonalizado = () => {
    Swal.fire({
      title: "<strong>Ejemplo HTML <u> personalizado</u></strong>",
      icon: "info",
      html:
        "Puede usarse <b>negrita</b>, " +
        '<a href="//sweetalert2.github.io">links</a> ' +
        "a otras etiquetas",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Genial",
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonText: "Salir",
      cancelButtonAriaLabel: "Thumbs down",
    });
  };
  modalImagen = () => {
    Swal.fire({
      title: "test",
      text: "Imagen personalizada.",
      imageUrl: "https://unsplash.it/400/200",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
  };

  preguntas = () => {
    Swal.mixin({
      input: "text",
      confirmButtonText: "Next &rarr;",
      showCancelButton: true,
      progressSteps: ["1", "2", "3"],
    })
      .queue([
        {
          title: "Pregunta 1",
          text:
            "¿Encadenar modales de sweetAlert2 es fácil? swal2 modals is easy",
        },
        { title: "pregunta 2", text: "pregunta 2" },
        "pregunta 3",
      ])
      .then((result) => {
        if (result.value) {
          const answers = JSON.stringify(result.value);
          Swal.fire({
            title: "Terminado",
            html: `
              Tus respuestas:
              <pre><code>${answers}</code></pre>
            `,
            confirmButtonText: "Genial",
          });
        }
      });
  };

  modalAjax = () => {
    Swal.fire({
      title: "Introduzca un nombre de usuario de GitHub",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Buscar",
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            Swal.showValidationMessage(`Peticion fallida: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url,
        });
      }
    });
  };
  render() {
    return (
      <div>
        <h1> Modales con SweetAlert 2</h1>
        <button onClick={this.mostrarModal}>Eliminar</button>
        <br />
        <button onClick={this.modalBasico}>Mostrar modal basico</button>
        <br />
        <button onClick={this.modalHtmlPersonalizado}>
          Mostrar modal personalizado
        </button>
        <br />
        <button onClick={this.modalImagen}>Mostrar modal imagen</button>
        <br />
        <button onClick={this.preguntas}>preguntas</button>
        <br />
        <button onClick={this.modalAjax}>Modal con AJAX</button>
        <br />
      </div>
    );
  }
}
