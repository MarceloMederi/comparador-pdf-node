const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const Diff = require('diff');

const app = express();
const port = 3000;

const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, 'public')));

app.post('/comparar', upload.fields([{ name: 'pdf1', maxCount: 1 }, { name: 'pdf2', maxCount: 1 }]), async (req, res) => {
    if (!req.files || !req.files['pdf1'] || !req.files['pdf2']) {
        return res.status(400).json({ error: 'Por favor, envie dois arquivos PDF.' });
    }

    const pdf1Path = req.files['pdf1'][0].path;
    const pdf2Path = req.files['pdf2'][0].path;

    try {
        const dataBuffer1 = fs.readFileSync(pdf1Path);
        const dataBuffer2 = fs.readFileSync(pdf2Path);

        const pdf1Data = await pdfParse(dataBuffer1);
        const pdf2Data = await pdfParse(dataBuffer2);
        
        const pdf1Text = pdf1Data.text.trim();
        const pdf2Text = pdf2Data.text.trim();

        const diffs = Diff.diffChars(pdf1Text, pdf2Text);
        let diferencasTexto = [];

        if (diffs.length > 1) {
            diffs.forEach((part) => {
                diferencasTexto.push({
                    valor: part.value,
                    status: part.added ? 'adicionado' : part.removed ? 'removido' : 'igual'
                });
            });
        }
        
        let diferencasLayout = [];
        if (pdf1Data.numpages !== pdf2Data.numpages) {
            diferencasLayout.push(`Número de páginas é diferente: PDF 1 tem ${pdf1Data.numpages} páginas, PDF 2 tem ${pdf2Data.numpages} páginas.`);
        }
        
        res.json({
            diferencasTexto: diferencasTexto.length > 0 ? diferencasTexto : null,
            diferencasLayout: diferencasLayout.length > 0 ? diferencasLayout : null
        });

    } catch (error) {
        console.error('Erro ao comparar PDFs:', error);
        res.status(500).json({ error: 'Erro ao processar os arquivos.' });
    } finally {
        fs.unlink(pdf1Path, (err) => {
            if (err) console.error(`Erro ao remover arquivo temporário ${pdf1Path}:`, err);
        });
        fs.unlink(pdf2Path, (err) => {
            if (err) console.error(`Erro ao remover arquivo temporário ${pdf2Path}:`, err);
        });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});