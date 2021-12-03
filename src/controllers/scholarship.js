const {validationResult} = require('express-validator');
const Scholarship = require('../models/scholarship');

exports.createScholarship = (req, res, next) => {
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
        message: 'scholarship information has been added successfully',
        data: result,
      });
    })
    .catch((err) => console.log(err));
}

exports.getAllScholarships = (req, res, next) => {
  res.json(
    {
      message: "Get all scholarship success", 
      data: {
        id: 1,
        title: "Beasiswa Djarum Mahasiswa 2022",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus facere sit exercitationem natus, nisi possimus itaque recusandae veritatis impedit. Totam?"
      }
    }
  );
  next();
}