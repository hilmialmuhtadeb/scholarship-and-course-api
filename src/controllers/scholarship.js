exports.createScholarship = (req, res, next) => {
  res.json(
    {
      message: "scholarship has been added successfully",
      data: {
        id: 1,
        title: "Beasiswa Djarum Mahasiswa 2022",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus facere sit exercitationem natus, nisi possimus itaque recusandae veritatis impedit. Totam?"
      },
    }
  )
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