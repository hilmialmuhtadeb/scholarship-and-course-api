const { validationResult } = require('express-validator');
const Scholarship = require('../models/scholarship');
const path = require('path');
const fs = require('fs');

const _inputValidator = (req) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()) {
    const error = new Error('Input tidak sesuai');
    error.status = 400;
    error.data = errors.array();
    
    throw error;
  }
}

const _throwScholarshipNotFoundError = () => {
  const error = new Error('Informasi beasiswa tidak ditemukan.');
  error.status = 404;

  throw error;
}

const _removeScholarshipPoster = (posterLocation) => {
  const filePath = path.resolve(__dirname, '../..', posterLocation);
  fs.unlink(filePath, (err) => console.log(err));
}

const createScholarship = async (req, res, next) => {
  _inputValidator(req);
  
  const body = req.body;
  const poster = req.file.path;

  const scholarship = new Scholarship({
    title: body.title,
    poster: poster,
    deadline: body.deadline,
    description: body.description,
    category: body.category,
    author: {
      user_id: body.user_id,
      name: body.user_name,
    },
  });

  scholarship.save()
    .then((result) => {
      res.status(201).json({
        message: 'Berhasil menambahkan informasi beasiswa.',
        data: result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: res.statusCode,
        message: 'Semua kolom wajib diisi.'
      })
    });
}

const getAllScholarships = (req, res, next) => {
  const currentPage = +req.query.page || 1;
  const perPage = +req.query.perPage || 9;
  const category = +req.query.category || 1;

  Scholarship.find({
    category: category,
  })
    .countDocuments()
    .then((count) => {
      const totalItems = count;
      return Scholarship.find({
        category: category,
      })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .sort({
          updatedAt: -1,
        })
        .then((result) => {
          res.status(200).json({
            message: 'Berhasil mendapatkan semua informasi beasiswa.', 
            data: result,
            total_data: totalItems,
            per_page: perPage,
            current_page: currentPage,
          });
        })
    })
    .catch((err) => {
      next(err);
    });
}

const getScholarshipById = (req, res, next) => {
  Scholarship.findById(req.params.scholarshipId)
    .then((scholarship) => {
      if (!scholarship) {
        _throwScholarshipNotFoundError();
      }

      res.status(200).json({
        message: 'Berhasil mendapatkan informasi beasiswa.',
        data: scholarship,
      });
    })
    .catch((error) => {
      next(error);
    });
}

const updateScholarship = (req, res, next) => {
  _inputValidator(req);
  
  const body = req.body;
  let poster;
  if (req.file !== undefined) {
    poster = req.file.path;
  }

  Scholarship.findById(req.params.scholarshipId)
    .then((scholarship) => {
      if (!scholarship) {
        _throwScholarshipNotFoundError();
      }

      if(!!poster) {
        _removeScholarshipPoster(scholarship.poster);
        scholarship.poster = poster;
      }

      if (!!body.title) {
        scholarship.title = body.title;
      }

      if (!!body.deadline) {
        scholarship.deadline = body.deadline;
      }

      if (!!body.category) {
        scholarship.category = body.category;
      }

      if (!!body.description) {
        scholarship.description = body.description;
      }

      return scholarship.save();
    })
    .then((result) => {
      res.status(200).json({
        message: 'Informasi beasiswa berhasil diperbarui',
        data: result,
      });
    })
    .catch((error) => {
      next(error);
    });
}

const deleteScholarship = (req, res, next) => {
  Scholarship.findById(req.params.scholarshipId)
    .then((scholarship) => {
      if (!scholarship) {
        _throwScholarshipNotFoundError();
      }

      _removeScholarshipPoster(scholarship.poster);
      return Scholarship.findByIdAndRemove(req.params.scholarshipId)
    })
      .then((result) => {
        res.status(200).json({
          message: 'Beasiswa berhasil dihapus.',
          data: result,
        });
      })
      .catch((err) => next(err));
}

module.exports =  {
  createScholarship,
  getAllScholarships,
  getScholarshipById,
  updateScholarship,
  deleteScholarship,
}