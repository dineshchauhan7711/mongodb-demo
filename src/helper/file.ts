
import { createWriteStream, mkdirSync, existsSync } from 'fs';
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
          let destination: string = './public/images/' + pathFolder;
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
     return `${process.env.PROJECT_PATH}/images/${pathFolder}/${fileName}`
};