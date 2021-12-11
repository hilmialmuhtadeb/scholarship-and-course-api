const {validationResult} = require('express-validator');
const Scholarship = require('../models/scholarship');
const path = require('path');
const fs = require('fs');

const _inputValidator = (req) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()) {
    const err = new Error('Input tidak sesuai');
    err.status = 400;
    err.data = errors.array();
    
    throw err;
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

exports.createScholarship = (req, res, next) => {
  _inputValidator(req);
  
  const body = req.body;
  console.log(req.body);
  const poster = req.file.path;

  const scholarship = new Scholarship({
    title: body.title,
    poster: poster,
    deadline: body.deadline,
    description: body.description,
    category: body.category,
    author: {
      user_id: 1,
      name: 'windayani',
    },
  });

  scholarship.save()
    .then((result) => {
      res.status(201).json({
        message: 'Berhasil menambahkan informasi beasiswa.',
        data: result,
      });
    })
    .catch((err) => console.log(err));
}

exports.getAllScholarships = (req, res, next) => {
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

exports.getScholarshipById = (req, res, next) => {
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

exports.updateScholarship = (req, res, next) => {
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

exports.deleteScholarship = (req, res, next) => {
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