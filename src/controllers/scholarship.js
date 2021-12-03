const {validationResult} = require('express-validator');
const Scholarship = require('../models/scholarship');
const { post } = require('../routes/scholarship');

const inputValidator = (req) => {
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

exports.createScholarship = (req, res, next) => {
  inputValidator(req);
  
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
    .then((result) => {
      if (!result) {
        const error = new Error('Beasiswa tidak ditemukan.');
        error.errorStatus = 404;
        
        throw error;
      }

      res.status(200).json({
        message: 'Berhasil mendapatkan informasi beasiswa.',
        data: result,
      })
    })
    .catch((error) => {
      next(error);
    })
}

exports.updateScholarship = (req, res, next) => {
  inputValidator(req);
  
  const body = req.body;
  const poster = req.file.path;

  Scholarship.findById(req.params.scholarshipId)
    .then((scholarship) => {
      if (!scholarship) {
        const error = new Error('Informasi beasiswa tidak ditemukan.');
        error.errorStatus = 404;

        throw error;
      }

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