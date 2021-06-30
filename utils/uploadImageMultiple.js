export const uploadImageMultiple = async (files, maxFileNbr, maxSize) => {
  let images = [];
  let arrFiles = Array.from(files);

  if (typeof arrFiles === "undefined" || arrFiles.length === 0) {
    throw new Error("you did not upload a file ");
  } else {
    let finalArrayFiles = arrFiles.slice(0, maxFileNbr);

    for (const file of finalArrayFiles) {
      if (/\.(jpe?g|png|gif|jfif|tiff|WebP|SVG|PPM)$/i.test(file.name)) {
        let blob = await resizeImage(file, maxSize);
        images.push(blob);
      }
    }
  }

  return images;
};

const resizeImage = function (image, maxSize) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();

    // Read the file
    reader.readAsDataURL(image);

    // Manage the `load` event
    reader.onload = function (e) {
      // Create new image element
      const ele = new Image();
      ele.onload = function () {
        // Create new canvas
        const canvas = document.createElement("canvas");

        // Draw the image that is scaled to `ratio`
        const context = canvas.getContext("2d");
        let width = ele.width;
        let height = ele.height;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }
        canvas.width = width;
        canvas.height = height;
        context.drawImage(ele, 0, 0, width, height);

        // Get the data of resized image

        canvas.toBlob(function (blob) {
          resolve(blob);
        }, "image/jpeg");
      };

      // Set the source
      ele.src = e?.target.result;
    };

    reader.addEventListener("error", function (e) {
      reject();
    });
  });
};

export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};
