import { Router } from 'express';
import homeController from '../controllers/HomeController';
import Livro from '../models/Livro';

const Sequelize = require('sequelize');

const { Op } = Sequelize;

const router = new Router();

// router.post('/add', homeController.store);
// Get gig list
// router.get('/', homeController.index);
// router.get('/', (req, res) => Livro.findAll()
// .then((livros) => res.render('livros', {
//  livros,
// }))
// .catch((err) => res.render('error', { error: err })));
// Add a gig
router.post('/add', (req, res) => {
  const {
    name, author, gender, data,
  } = req.body;
  const errors = [];

  // Validate Fields
  if (!name) {
    errors.push({ text: 'Por favor coloque o nome do livro' });
  }
  if (!author) {
    errors.push({ text: 'Por favor coloque o autor' });
  }
  if (!gender) {
    errors.push({ text: 'Por favor coloque o gênero' });
  }
  if (!data) {
    errors.push({ text: 'Por favor coloque o ano de publicação' });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render('add', {
      errors,
      name,
      author,
      gender,
      data,
    });
  } else {
    // Make lowercase and remove space after comma
    // technologies = technologies.toLowerCase().replace(/,[ ]+/g, ',');

    // Insert into table
    Livro.create({
      name,
      author,
      gender,
      data,
    })
      .then((livro) => res.redirect('/livros'))
      .catch((err) => res.render('error', { error: err.message }));
  }
});

router.get('/', (req, res) => Livro.findAll()
  .then((livros) => {
  // create context Object with 'usersDocuments' key
    const context = {
      usersDocuments: livros.map((document) => ({
        id: document.id,
        name: document.name,
        gender: document.gender,
        author: document.author,
        data: document.data,
      })),
    };
    // rendering usersDocuments from context Object
    res.render('livros', {
      usersDocuments: context.usersDocuments,
    });
  })
  .catch((error) => res.status(500).send(error)));

// Procure por livros
router.get('/search', (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Livro.findAll({ where: { name: { [Op.like]: `%${term}%` } } })
    .then((livros) => {
      // create context Object with 'usersDocuments' key
      const context = {
        usersDocuments: livros.map((document) => ({
          id: document.id,
          name: document.name,
          gender: document.gender,
          author: document.author,
          data: document.data,
        })),
      };
        // rendering usersDocuments from context Object
      res.render('livros', {
        usersDocuments: context.usersDocuments,
      });
    })
    .catch((err) => res.render('error', { error: err }));
});

router.put('/update1', (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Livro.findAll({ where: { id: { [Op.like]: `%${term}%` } } })
    .then((livros) => {
      // create context Object with 'usersDocuments' key
      const context = {
        usersDocuments: livros.map((document) => ({
          id: document.id,
          name: document.name,
          gender: document.gender,
          author: document.author,
          data: document.data,
        })),
      };
        // rendering usersDocuments from context Object
      res.render('livros', {
        usersDocuments: context.usersDocuments,
      });
    })
    .catch((err) => res.render('error', { error: err }));
});

router.get('/deletar_livro/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.params.id) {
      res.status(400).json({
        errors: ['ID não enviado'],
      });
    }
    const livro = await Livro.findOne({ where: { id } });
    if (!livro) {
      res.status(400).json({
        errors: ['Livro não existe'],
      });
    }
    livro.destroy({ where: { id } });
    res.render('livros');
  } catch (e) {
    res.status(400).json({
      errors: e.erros.map((err) => err.message),
    });
  }
});
// Display add livros
router.get('/add', (req, res) => res.render('add'));
// router.get('/', homeController.show);
// router.put('/:id', homeController.update);
// router.delete('/:id', homeController.delete);

router.get('/editar_livro', (req, res) => {
  res.render('editar_livro');
});
router.post('/editar_livro', (req, res) => {
  const {
    id, name, author, gender, data,
  } = req.body;
  const errors = [];

  // Validate Fields
  if (!name) {
    errors.push({ text: 'Entre com o nome' });
  }
  if (!author) {
    errors.push({ text: 'Entre com o e-mail' });
  }
  if (!gender) {
    errors.push({ text: 'Entre com o nome do livro' });
  }
  if (!data) {
    errors.push({ text: 'Entre com o código do livro' });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render('editar_livro', {
      errors,
      id,
      name,
      author,
      gender,
      data,
    });
  } else {
    Livro.update({
      name, author, gender, data,
    }, { where: { id } }).then(res.render('livros'));
  }
});

export default router;
