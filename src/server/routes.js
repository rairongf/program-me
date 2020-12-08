const express = require('express');
const db = require('./db');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let results = await db.loadWorkshops();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/workshops', async (req, res) => {
    try {
        let results = await db.loadWorkshops();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/workshop/:id', async (req, res) => {
    try {
        let results = await db.loadWorkshopById(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/workshops/available/:matricula', async (req, res) => {
    try {
        let results = await db.loadAvailableWorkshops(req.params.matricula);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/workshop/update/add/:id', async (req, res) => {
    try {
        let results = await db.updateWorkshopsCapacityPlus(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/workshop/update/remove/:id', async (req, res) => {
    try {
        let results = await db.updateWorkshopsCapacityMinus(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/workshop/avaliacao', async (req, res) => {
    try {
        const idOfWorkshop = req.body.workshopId;
        const userMatricula = req.body.userMatricula;
        const notaAvaliada = req.body.notaAvaliada;
        const comentario = req.body.comentario
        let results = await db.avaliacaoWorkshop(idOfWorkshop, userMatricula, notaAvaliada, comentario);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/workshop/avaliacao/:matricula/:idOfWorkshop', async (req, res) => {
    try {
        
        let idOfWorkshop = req.params.idOfWorkshop;
        let userMatricula = req.params.matricula;
        let results = await db.avaliacaoGetNotaAtual(idOfWorkshop, userMatricula);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/workshop/delete/:id', async (req, res) => {
    try {
        let results = await db.deleteWorkshop(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.delete('/inscricoes/delete/:matricula/:id', async (req, res) => {
    try {
        let results = await db.deleteInscricao(req.params);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/workshops/names', async (req, res) => {
    try {
        let results = await db.loadWorkshopsNames();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// EXECUTA A PRIMEIRA QUERY ENCONTRADA caso tenha a mesma rota '/.../...'

router.get('/:matricula', async (req, res) => {
    try {
        let results = await db.findUserData(req.params.matricula);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/agenda/:matricula', async (req, res) => {
    try {
        let results = await db.loadUsersSubscriptions(req.params.matricula);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/inscricoes', async (req, res) => {
    try {
        let results = await db.postInscricao(req.body);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/cadastro-aluno', async (req, res) => {
    try {
        let results = await db.postUser(req.body);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.post('/admin/cadastro-workshop', async (req, res) => {
    try {
        let results = await db.postWorkshop(req.body);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/admin/load-workshop/:nome', async (req, res) => {
    try {
        let results = await db.findWorkshop(req.params.nome);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/admin/update-workshop/', async (req, res) => {
    try {
        let results = await db.updateWorkshop(req.body);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

router.get('/admin/avaliacoes-workshop/:id', async (req, res) => {
    try {
        let results = await db.buscarAvaliacoesDoWorkshop(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;