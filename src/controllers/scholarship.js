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

  if(!req.file) {
    const err = new Error('Poster belum dikirim');
    err.status = 422;
    
    throw err;
  }
}

const _throwScholarshipNotFoundError = () => {
  const error = new Error('Informasi beasiswa tidak ditemukan.');
  error.errorStatus = 404;

  throw error;
}

const _removeScholarshipPoster = (posterLocation) => {
  const filePath = path.resolve(__dirname, '../..', posterLocation);
  fs.unlink(filePath, (err) => console.log(err));
}

exports.createScholarship = (req, res, next) => {
  _inputValidator(req);
  
  const body = req.body;
  const poster = req.file.path;

  const scholarship = new Scholarship({
    title: body.title,
    poster: poster,
    deadline: body.deadline,
    description: body.description,
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
  Scholarship.find()
    .then((result) => {
      res.status(200).json({
        message: 'Berhasil mendapatkan semua informasi beasiswa.', 
        data: result,
      });
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
  const poster = req.file.path;

  Scholarship.findById(req.params.scholarshipId)
    .then((scholarship) => {
      if (!scholarship) {
        _throwScholarshipNotFoundError();
      }

      _removeScholarshipPoster(scholarship.poster);

      scholarship.title = body.title;
      scholarship.poster = poster;
      scholarship.deadline = body.deadline;
      scholarship.description = body.description;

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
      .catch((err) => console.log(err));
}