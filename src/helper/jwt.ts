import { sign, verify } from "jsonwebtoken";
import { config } from "../config";

/**
 * Generate JWT token (Algorithm RS256)
 * @param { object:{payload:{}, expiry_time}} object 
 * @returns 
 */
export function generateJWTToken(object: { payload: object, expiry_time?: string }) {
     let response: { success: boolean, token: string } = {
          success: false,
          token: null
     };
     try {
          const token = sign(object.payload, config.jwt.secret_key, { ...(object.expiry_time) && { expiresIn: object.expiry_time } });

          response = {
               success: true,
               token
          };
     } catch (error) {
          console.log('error in createJWTToken :>> ', error);
          response.success = false;
     } finally {
          return response;
     }
};

/**
 * Verify JWT token (Algorithm RS256)
 * @param {token} string
 */
export async function verifyJWTToken(token) {
     let response: { success: boolean, data: any } = {
          success: false,
          data: null
     };
     try {
          const data = await verify(token, config.jwt.secret_key);
          response.success = true;
          response.data = data;
     } catch (error) {
          console.log('error in verifyJWTToken :>> ', error);
          response.success = false;
     } finally {
          return response;
     }
};