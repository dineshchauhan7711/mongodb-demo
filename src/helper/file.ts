
import { createWriteStream, mkdirSync, existsSync, unlinkSync } from 'fs';
import { extname } from "path";
import { uid } from "rand-token";

/**
 * Upload file on server
 */
export async function uploadFiles(fileObjArray: object, pathFolder: string = "") {
     let response = {
          success: true,
          fileName: null
     }
     try {
          // Check if the directory exists, and create it if it doesn't
          let destination: string = './public/uploads/' + pathFolder;
          if (!existsSync(destination)) {
               mkdirSync(destination, { recursive: true });
          };

          const fileName: string = uid(16) + extname(fileObjArray[0].originalname);
          const uploadPath = destination + '/' + fileName;

          const outStream = createWriteStream(uploadPath);
          outStream.write(fileObjArray[0].buffer);
          outStream.end();

          response.fileName = fileName;
     } catch (error) {
          console.log('error :>> ', error);
          response.success = false
     } finally {
          return response
     }
};

/**
 * Get file path
 */
export function getFilePath(fileName: string, pathFolder: string = "") {
     return `${process.env.PROJECT_PATH}/uploads/${pathFolder}/${fileName}`
};

/**
 * Unlink file from server - delete file 
 */
export async function deleteFileFromServer(fileName: string, pathFolder: string = "") {
     let unlinkPath = `public/uploads/${pathFolder}/${fileName}`
     if (existsSync(unlinkPath)) {
          unlinkSync(`public/uploads/${pathFolder}/${fileName}`)
     };
     return;
};