const UploadMedia = require('../../api/v1/media/model');
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require('firebase/storage');
const { storage } = require('../../firebase.config');
const { BadRequestError, NotFoundError } = require('../../errors');

const uploadToFirebase = async (file) => {
  const fileName = `${file.originalname}`;
  const storageRef = ref(storage, `uploads/${fileName}`);

  const metadata = {
    contentType: file.mimetype,
  };

  const snapshot = await uploadBytesResumable(
    storageRef,
    file.buffer,
    metadata
  );
  const downloadURL = await getDownloadURL(snapshot.ref);

  return { fileName, downloadURL };
};

const createUploadMedia = async (file) => {
  const { fileName, downloadURL } = await uploadToFirebase(file);

  const newUploadMedia = new UploadMedia({
    fileName,
    fileUrl: downloadURL,
    fileType: file.mimetype,
  });

  return newUploadMedia.save();
};

module.exports = { createUploadMedia };
