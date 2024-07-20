import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const ENCRYPTION_IV = process.env.ENCRYPTION_IV; // Must be 128 bits (16 characters)

const algorithm = "aes-256-cbc";

export const encrypt = (obj) => {
  const jsonString = JSON.stringify(obj);

  console.log("jsonString", jsonString);

  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(ENCRYPTION_KEY, "hex"),
    Buffer.from(ENCRYPTION_IV, "hex"),
  );
  let encrypted = cipher.update(jsonString);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
};

export const decrypt = (encryptedText) => {
  try {
    const encryptedBuffer = Buffer.from(encryptedText, "hex");
    const decipher = crypto.createDecipheriv(
      algorithm,
      Buffer.from(ENCRYPTION_KEY, "hex"),
      Buffer.from(ENCRYPTION_IV, "hex"),
    );
    let decrypted = decipher.update(encryptedBuffer);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    const jsonString = decrypted.toString();
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Decryption failed:", error.message);
    throw new Error("Failed to decrypt data");
  }
};
