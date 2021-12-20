const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const register = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty) {
      return res.status(400).json({
        status: res.statusCode,
        message: 'Input tidak sesuai.',
      })
    }

    const { username, name, password } = req.body;
    const oldUser = await User.findOne({ username });
    if (oldUser) {
      return res.status(409).json({
        status: res.statusCode,
        message: 'Username sudah digunakan.'
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = new User({
      username,
      name,
      hash: hashPassword,
    });

    user.save()
      .then((result) => {
        res.status(201).json({
          status: res.statusCode,
          message: 'User baru berhasil dibuat.',
          data: result,
        });
      })
      .catch((error) => {
        res.status(400).json({
          status: res.statusCode,
          message: 'Semua kolom wajib diisi.'
        })
      })
    
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      message: 'Gagal membuat akun baru.'
    })
  }
}

const login = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty) {
      return res.status(400).json({
        status: res.statusCode,
        message: 'Input tidak sesuai.',
      })
    }
  
    const { username, password } = req.body;
    await User.findOne({
      username,
    })
      .then(async (result) => {
        const user = result;

        if (!user) {
          return res.status(400).json({
            status: res.statusCode,
            message: 'username belum didaftarkan.',
          });
        }

        const validPassword = await bcrypt.compare(password, user.hash);
        if (!validPassword) {
          return res.status(401).json({
            status: res.statusCode,
            message: 'password anda salah.'
          });
        }

        const token = jwt.sign({
          id: user._id,
          username: user.username,
        }, process.env.SECRET_KEY, {
          expiresIn: '8h'
        });

        res.cookie('jwt', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        
        return res.send({
          message: 'success',
        });
      });
  } catch (error) {
    return res.status(500).json({
      message: 'gagal login',
      error,
    });
  }
}

const logout = async (req, res, next) => {
  res.cookie('jwt', '', {maxAge: 0})

  res.send({
      message: 'success'
  })
}

const getUser = async (req, res, next) => {
  try {
    const cookie = req.cookies['jwt'];
    const claims = jwt.verify(cookie, process.env.SECRET_KEY);

    if (!claims) {
      return res.status(401).send({
          message: 'token anda tidak valid.'
      });
    }

    const user = await User.findOne({ username: claims.username });
    const {hash, ...data} = await user.toJSON();

    res.send(data);
  } catch (error) {
    return res.status(401).send({
      message: 'Anda tidak memiliki token.',
  });
  }
}

module.exports = {
  register,
  login,
  logout,
  getUser,
}