import { Router } from 'express';
import userController from '../controllers/UsuarioController';
import Usuario from '../models/Usuario';

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
// router.post('/add', userController.store);
// Add a gig
// router.post('/add_users', userController.store);
router.post('/add_users', (req, res) => {
  const {
    name, email, book, code,
  } = req.body;
  const errors = [];

  // Validate Fields
  if (!name) {
    errors.push({ text: 'Entre com o nome' });
  }
  if (!email) {
    errors.push({ text: 'Entre com o e-mail' });
  }
  if (!book) {
    errors.push({ text: 'Entre com o nome do livro' });
  }
  if (!code) {
    errors.push({ text: 'Entre com o código do livro' });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render('add_users', {
      errors,
      name,
      email,
      book,
      code,
    });
  } else {
    // Make lowercase and remove space after comma
    // technologies = technologies.toLowerCase().replace(/,[ ]+/g, ',');

    // Insert into table
    Usuario.create({
      name,
      email,
      book,
      code,
    })
      .then((usuarios) => res.render('index', { layout: 'landing' }))
      .catch((err) => res.render('error', { error: err.message }));
  }
});
router.get('/add_users', (req, res) => res.render('add_users'));
router.get('/', (req, res) => Usuario.findAll()
  .then((usuarios) => {
  // create context Object with 'usersDocuments' key
    const context = {
      usersDocuments: usuarios.map((document) => ({
        id: document.id,
        name: document.name,
        email: document.email,
        book: document.book,
        code: document.code,
      })),
    };
    // rendering usersDocuments from context Object
    res.render('usuarios', {
      usersDocuments: context.usersDocuments,
    });
  })
  .catch((error) => res.status(500).send(error)));

router.get('/usuarios', (req, res) => res.render('usuarios', { layout: 'main' }));
// Display add livros
router.get('/add', (req, res) => res.render('add_users'));

// Procure por livros
router.get('/search1', (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Usuario.findAll({ where: { name: { [Op.like]: `%${term}%` } } })
    .then((usuarios) => {
      // create context Object with 'usersDocuments' key
      const context = {
        usersDocuments: usuarios.map((document) => ({
          id: document.id,
          name: document.name,
          email: document.email,
          book: document.book,
          code: document.code,
        })),
      };
        // rendering usersDocuments from context Object
      res.render('usuarios', {
        usersDocuments: context.usersDocuments,
      });
    })
    .catch((err) => res.render('error', { error: err }));
});

// router.get('/', homeController.show);
// router.put('/:id', homeController.update);
router.get('/deletar_usuario/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (!req.params.id) {
      res.status(400).json({
        errors: ['ID não enviado'],
      });
    }
    const usuario = await Usuario.findOne({ where: { id } });
    if (!usuario) {
      res.status(400).json({
        errors: ['Usuario não existe'],
      });
    }
    usuario.destroy({ where: { id } });
    res.render('usuarios');
  } catch (e) {
    res.status(400).json({
      errors: e.erros.map((err) => err.message),
    });
  }
});

router.get('/editar_usuario', (req, res) => {
  res.render('editar_usuario');
});
router.post('/editar_usuario', (req, res) => {
  const {
    id, name, email, book, code,
  } = req.body;
  const errors = [];

  // Validate Fields
  if (!name) {
    errors.push({ text: 'Entre com o nome' });
  }
  if (!email) {
    errors.push({ text: 'Entre com o e-mail' });
  }
  if (!book) {
    errors.push({ text: 'Entre com o nome do livro' });
  }
  if (!code) {
    errors.push({ text: 'Entre com o código do livro' });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render('editar_usuario', {
      errors,
      id,
      name,
      email,
      book,
      code,
    });
  } else {
    Usuario.update({
      name, email, book, code,
    }, { where: { id } }).then(res.render('usuarios'));
  }
});

export default router;
