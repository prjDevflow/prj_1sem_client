function baixarPDF() {
    const element = document.querySelector("#grade");
    const botao = document.querySelector('#btnBaixarPDF');

    if (!element) {
        alert('Elemento da grade não encontrado!');
        return;
    }

    const estavaOculto = element.classList.contains('hidden');
    if (estavaOculto) {
        element.classList.remove('hidden');
    }

    if (botao) {
        botao.style.display = 'none'; // oculta botão
    }

    element.style.transform = 'scale(0.8)';

    window.scrollTo(0, 0);

    const opt = {
        filename: 'grade.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' }
    };

    html2pdf().set(opt).from(element).save().then(() => {
        element.style.transform = '';
        element.style.transformOrigin = '';

        if (botao) {
            botao.style.display = ''; // mostra botão
        }
        if (estavaOculto) {
            element.classList.add('hidden');
        }
    });
}
