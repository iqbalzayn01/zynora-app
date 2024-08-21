const UploadMedia = require('../../api/v1/media/model');
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require('firebase/storage');
const { storage } = require('../../firebase.config');
const { BadRequestError, NotFoundError } = require('../../errors');

const uploadToFirebase = async (file) => {
  const fileName = `${Date.now()}_${file.originalname}`;
  let folderPath;

  if (file.mimetype.startsWith('image/')) {
    folderPath = 'uploads/images';
  } else if (file.mimetype.startsWith('video/')) {
    folderPath = 'uploads/videos';
  } else {
    throw new BadRequestError(
      'Invalid file format. Only images and videos are allowed.'
    );
  }

  const storageRef = ref(storage, `${folderPath}/${fileName}`);

  const metadata = {
    contentType: file.mimetype,
  };

  const snapshot = await uploadBytesResumable(
    storageRef,
    file.buffer,
    metadata
  );
  const downloadURL = await getDownloadURL(snapshot.ref);

  return { fileName, downloadURL, filePath: `${folderPath}/${fileName}` };
};

const createUploadMedia = async (file) => {
  const { fileName, downloadURL, filePath } = await uploadToFirebase(file);

  const newUploadMedia = new UploadMedia({
    fileName,
    fileUrl: downloadURL,
    fileType: file.mimetype,
    filePath: filePath,
  });

  return newUploadMedia.save();
};

module.exports = { createUploadMedia };
