const { join } = require("path");
const fs = require("fs/promises");
async function deletingTempFiles() {
  // now we have to delete the files inside the temp folder
  try {
    const files = await fs.readdir(join(process.cwd(), `/temp/`));
    for (let i in files) {
      fs.unlink(join(process.cwd(), `/temp/${files[i]}`), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("DELETED files -> " + files[i]);
        }
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
module.exports = deletingTempFiles;
