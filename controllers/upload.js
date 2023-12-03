const multer = require('multer');
const uploadImage = require('../helpers/helpers');

module.exports = {
    upload: async (req, res, next) => {
    try {
    const multerMid = multer({
        storage: multer.memoryStorage(),
        limits: {
          fileSize: 5 * 1024 * 1024, // no larger than 5mb.
        },
    });

    if (typeof multerMid.on === 'function') {
        multerMid.on('error', (error, req, res, next) => {
        console.error(error);
            res.status(500).json({
            error: error,
            message: 'Internal server error!',
            });
        });
    }

    multerMid.single('file')(req, res, async (err) => {
        if (err) {
            return next(err);
        }

        const myFile = req.file;
        const imageUrl = await uploadImage(myFile);

        res.status(200).json({
            message: 'Upload was successful',
            data: imageUrl,
        });
    });
    } catch (error) {
        next(error);
    }
    },
};