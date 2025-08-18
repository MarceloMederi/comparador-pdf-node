document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const resultadoDiv = document.getElementById('resultado');
    const submitButton = form.querySelector('button[type="submit"]');

    submitButton.classList.add('is-loading');
    submitButton.disabled = true;
    resultadoDiv.innerHTML = 'Comparando... Por favor, aguarde.';

    try {
        const response = await fetch('/comparar', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro do servidor');
        }

        const data = await response.json();

        resultadoDiv.innerHTML = `<h3>Resultado da Comparação</h3>`;

        if (data.diferencasTexto && data.diferencasTexto.length > 0) {
            resultadoDiv.innerHTML += `
                                <p>O texto em <span style="color: red; font-weight: bold;">vermelho e tachado</span> são as informações encontradas no primeiro PDF. O texto em <span style="color: green; font-weight: bold;">verde e sublinhado</span> são as informações encontradas no segundo PDF.</p>
            `;
        }

        resultadoDiv.innerHTML += `<h4>Diferenças de Texto:</h4>`;
        if (data.diferencasTexto && data.diferencasTexto.length > 0) {
            let relatorioHTML = '<p>';
            data.diferencasTexto.forEach(part => {
                let classe = '';
                if (part.status === 'adicionado') {
                    classe = 'added';
                } else if (part.status === 'removido') {
                    classe = 'removed';
                }
                relatorioHTML += `<span class="${classe}">${part.valor}</span>`;
            });
            relatorioHTML += '</p>';

            const regexPagina = /PÁGINA: \d+\/\d+/g;
            const relatorioFormatado = relatorioHTML.replace(regexPagina, (match) => {
                return `<span class="page-number">${match}</span>`;
            });

            resultadoDiv.innerHTML += relatorioFormatado;
        } else {
            resultadoDiv.innerHTML += '<p>Nenhuma diferença de texto encontrada.</p>';
        }

        resultadoDiv.innerHTML += `<h4>Diferenças de Layout:</h4>`;
        if (data.diferencasLayout && data.diferencasLayout.length > 0) {
            let relatorioLayoutHTML = '<ul>';
            data.diferencasLayout.forEach(diff => {
                relatorioLayoutHTML += `<li>${diff}</li>`;
            });
            relatorioLayoutHTML += '</ul>';
            resultadoDiv.innerHTML += relatorioLayoutHTML;
        } else {
            resultadoDiv.innerHTML += `<p>Nenhuma diferença de layout significativa encontrada.</p>`;
        }

    } catch (error) {
        console.error('Erro:', error);
        resultadoDiv.innerHTML = `<p style="color:red;">Ocorreu um erro: ${error.message}</p>`;
    } finally {
        submitButton.classList.remove('is-loading');
        submitButton.disabled = false;
    }
});