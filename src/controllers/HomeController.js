import Livro from '../models/Livro';

class HomeController {
  async store(req, res) {
    const novoLivro = await Livro.create(req.body);
    res.json({
      novoLivro,
    });
  }

  async index(req, res) {
    try {
      const livros = await Livro.findAll();
      return res.json(livros);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }
      const livro = await Livro.findByPk(req.params.id);
      if (!livro) {
        return res.status(400).json({
          errors: ['Livro não existe'],
        });
      }

      return res.json(livro);
    } catch (e) {
      return res.status(400).json({
        errors: e.erros.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }
      const livro = await Livro.findByPk(req.params.id);
      if (!livro) {
        return res.status(400).json({
          errors: ['Livro não existe'],
        });
      }
      const novosDados = await livro.update(req.body);
      return res.json(novosDados);
    } catch (e) {
      return res.status(400).json({
        errors: e.erros.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado'],
        });
      }
      const livro = await Livro.findByPk(req.params.id);
      if (!livro) {
        return res.status(400).json({
          errors: ['Livro não existe'],
        });
      }
      livro.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.erros.map((err) => err.message),
      });
    }
  }
}

export default new HomeController();
