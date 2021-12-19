const Favorite = require('../models/favorite');
const Scholarship = require('../models/scholarship');

const createFavorite = (req, res, next) => {
  const body = req.body;
  const favorite = new Favorite({
    username: body.username,
    scholarshipId: body.scholarshipId,
  });

  favorite.save()
    .then((result) => {
      res.status(201).json({
        message: 'Berhasil menyimpan informasi beasiswa ke favorite.',
        data: result,
      });
    })
    .catch((error) => {
      res.status(400).send('Gagal menyimpan informasi beasiswa ke favorite.');
    });
};

const removeFavorite = async (req, res, next) => {
  const username = req.query.username;
  const scholarshipId = req.query.scholarshipId;

  Favorite.findOneAndDelete({
    username,
    scholarshipId,
  })
    .then(res.status(200).send('Berhasil menghapus informasi beasiswa dari favorit.'))
    .catch((error) => {
      res.status(400).send('Gagal menghapus informasi beasiswa dari favorit.');
    });
}

const getFavoritesByUsername = async (req, res, next) => {
  try {
    const username = req.params.username;
    const favorites = await Favorite.find({ username }).sort({updatedAt: -1});
  
    let scholarships = [];
  
    for (const favorite of favorites) {
      const scholarship = await Scholarship.findById(favorite.scholarshipId);
      scholarships.push(scholarship);
    }
  
    res.status(200).json({
      message: 'Berhasil mendapatkan informasi beasiswa.',
      data: scholarships,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal mendapatkan informasi beasiswa.',
      error
    });
  }
};

const getFavorite = async (req, res, next) => {
  const username = req.query.username;
  const scholarshipId = req.query.scholarshipId;

  await Favorite.findOne({
    username,
    scholarshipId,
  })
    .then((favorite) => {
      res.status(200).json({
        favorite,
      });
    })
    .catch((error) => {
      res.status(400).json({
        ok: false,
      });
    });
}

module.exports = {
  createFavorite,
  getFavoritesByUsername,
  getFavorite,
  removeFavorite,
}