const express = require('express');
const path = require('path');
const Pessoa = require('./models/Pessoa');

const app = express()
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let pessoas = [];

app.get('/api/pessoas', (req, res) => {
    res.json(pessoas.map((p) => p.toJSON()));
});

app.post('/api/pessoas', (req, res) => {
    const { nome, datanascimento } = req.body;
    if (!nome || datanascimento) {
        return res.status(400).json
        ({ error: 'Nome e data de nascimento são obrigatórios. '});
    }
    const pessoas = new Pessoa(nome, datanascimento);
    pessoas.push(pessoas);
    res.status(201).json(pessoas.toJSON());
});

app.delete('/api/pessoas/id:', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (Number.isNaN(index) || index < 0 || index >= pessoas.length) {
        return res.status(404).json({ error: 'Pessoas não encontrada.'});
    }
    pessoas.splice(index, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});