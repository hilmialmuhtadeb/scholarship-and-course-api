const {validationResult} = require('express-validator');

exports.createScholarship = (req, res, next) => {
  const body = req.body;

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    const err = new Error('Invalid Value');
    err.status = 400;
    err.data = errors.array();
    
    throw err;
  }
  
  const result = {
    message: "scholarship information has been added successfully",
    data: {
      scholarship_id: 1,
      title: body.title,
      poster: "imagefile.jpg",
      deadline: body.deadline,
      description: body.description,
      created_at: "12/11/2021",
      author: {
        user_id: 1,
        name: "windayani",
      }
    },
  };

  res.status(201).json(result);
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