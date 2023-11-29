import Usuario from '../models/Usuario';

class HomeController {
  async store(req, res) {
    const novoUsuario = await Usuario.create(req.body);
    res.json({
      novoUsuario,
    });
  }

  async index(req, res) {
    try {
      const Usuarios = await Usuario.findAll();
      return res.json(Usuarios);
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
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) {
        return res.status(400).json({
          errors: ['Usuario não existe'],
        });
      }

      return res.json(usuario);
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
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) {
        return res.status(400).json({
          errors: ['Usuario não existe'],
        });
      }
      const novosDados = await usuario.update(req.body);
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
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) {
        return res.status(400).json({
          errors: ['Usuario não existe'],
        });
      }
      usuario.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.erros.map((err) => err.message),
      });
    }
  }
}

export default new HomeController();
