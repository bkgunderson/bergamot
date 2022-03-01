const express = require('express');
const router = express.Router();
const multer = require('multer');

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(`diskStorage destination`);
    cb(null, './public/data/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `up${Date.now()}.csv`);
  },
});

function filterFcn(req, file, cb) {
  if (file.mimetype.includes('csv')) {
    console.log(`filterFcn true`);
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: diskStorage,
  fileFilter: filterFcn,
  limits: { files: 10, fileSize: 3000000 },
});

module.exports = (params) => {
  router.get('/', async (request, res, next) => {
    try {
      const errors = request.session.importFile ? request.session.importFile.errors : false;

      const successMessage = request.session.importFile
        ? request.session.importFile.message
        : false;
      request.session.importFile = {};

      return res.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        errors,
        successMessage,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post('/', upload.single('import-csv'), async (req, res, next) => {
    try {
      return res.redirect('/');
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
