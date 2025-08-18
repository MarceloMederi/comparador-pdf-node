document.getElementById('upload-form').addEventListener('submit', async (e) => {
    // 1. Previne o comportamento padrão do formulário
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const resultadoDiv = document.getElementById('resultado');

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

        // 2. Adicionar texto informativo sobre as cores
        if (data.diferencasTexto && data.diferencasTexto.length > 0) {
            resultadoDiv.innerHTML += `
                <p>O texto em <span style="color: red; font-weight: bold;">vermelho e tachado</span> são as informações encontradas no primeiro PDF. O texto em <span style="color: green; font-weight: bold;">verde e sublinhado</span> são as informações encontradas no segundo PDF.</p>
            `;
        }

        // 3. Exibir o Relatório de Texto
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
                // Adiciona o valor da parte do diff em um span
                relatorioHTML += `<span class="${classe}">${part.valor}</span>`;
            });
            relatorioHTML += '</p>';

            // Regex para encontrar o texto da página e envolver em um span
            const regexPagina = /PÁGINA: \d+\/\d+/g;
            const relatorioFormatado = relatorioHTML.replace(regexPagina, (match) => {
                return `<span class="page-number">${match}</span>`;
            });

            resultadoDiv.innerHTML += relatorioFormatado;
        } else {
            resultadoDiv.innerHTML += '<p>Nenhuma diferença de texto encontrada.</p>';
        }

        // 4. Exibir o Relatório de Layout
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
    }
});