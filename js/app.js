// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formContainer = document.querySelector('#enviar-mail');
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

// Cargar Listeners
loadListeners();
function loadListeners() {
    document.addEventListener('DOMContentLoaded', iniciarApp);
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Reinicia el form
    btnReset.addEventListener('click', resetForm);

    //Enviar email
    formContainer.addEventListener('submit', enviarEmail);
}



//Funciones

function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed','opacity-50');
}

function validarFormulario(e) {


    validarInput(e.target.value.length > 0, 'Todos los campos son obligatorios', e);

            // Validacion con expresion regular //Regular expression
    if(e.target.type === 'email') {
        validarInput(re.test(e.target.value),'El email no es valido', e)
    }


    if(re.test(email.value) && asunto.value !== "" && mensaje.value !== ""){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed','opacity-50');
    }
}

function mostrarError(texto) {
    const errorDiv = document.createElement('P');

    errorDiv.textContent = texto;
    errorDiv.classList.add('border','border-red-500', 'py-5', 'bg-red-500', 'text-white', 'font-bold', 'mt-5', 'error', 'text-center');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0) {

        formContainer.appendChild(errorDiv);

    }



}

function enviarEmail(e) {
    e.preventDefault();
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';
    //Despues de 3s ocultar el spinner

    setTimeout( () => {
        spinner.style.display = 'none';

        //Mensaje que dice que se envio correctamente

        const parrafo = document.createElement('P');
        parrafo.textContent = 'El mensaje se envio correctamente';
        parrafo.classList.add('text-center', 'bg-green-500','mb-3','text-white', 'font-bold','p-3')

        // Inserta el parrafo antes del spinner
        formContainer.insertBefore(parrafo, spinner);
        resetForm();

        setTimeout( () => {
            parrafo.remove(); //Eliminar el mensaje de texto
        }, 2000)
        
    },3000);


}


function resetForm() {
    probarError();
    formContainer.reset();
    iniciarApp();

}

function probarError() {
    const error = document.querySelector('p.error');
    if(error){
        error.remove();
    }
}

function validarInput(condicion,texto, e){
    if(condicion) {

        //Elimina los errores
        probarError();
        e.target.classList.add('border-green-500');
        e.target.classList.remove('border-red-500');
    } else {
        e.target.classList.add('border','border-red-500');
        e.target.classList.remove('border-green-500');
        mostrarError(texto);
    }
}