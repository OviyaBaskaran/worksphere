import multer from "multer";
import path from "path";


// Storage configuration

const storage = multer.diskStorage({

  destination: function(req, file, cb){

    cb(
      null,
      "uploads/employees"
    );

  },


  filename: function(req, file, cb){

    const uniqueName =
      Date.now() +
      "-" +
      file.originalname;


    cb(
      null,
      uniqueName
    );

  }

});



// File validation

const fileFilter = (req, file, cb) => {


  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg"
  ];



  if(
    allowedTypes.includes(file.mimetype)
  ){

    cb(null, true);

  }
  else{

    cb(
      new Error(
        "Only JPG and PNG images are allowed"
      ),
      false
    );

  }

};




// Multer upload

const upload = multer({

  storage,

  fileFilter,

  limits:{
    fileSize: 2 * 1024 * 1024 // 2MB
  }

});


export default upload;