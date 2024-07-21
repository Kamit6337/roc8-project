import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const ENCRYPTION_IV = process.env.ENCRYPTION_IV; // Must be 128 bits (16 characters)

const algorithm = "aes-256-cbc";

if (!ENCRYPTION_KEY || !ENCRYPTION_IV) {
  throw new Error(
    "Encryption key and IV must be defined in environment variables",
  );
}

export const encrypt = (obj: object): string => {
  const jsonString = JSON.stringify(obj);

  const cipher = crypto.createCipheriv(
    algorithm,
    Buffer.from(ENCRYPTION_KEY, "hex"),
    Buffer.from(ENCRYPTION_IV, "hex"),
  );
  let encrypted = cipher.update(jsonString);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString("hex");
};

export const decrypt = (encryptedText: string): string => {
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
    return jsonString;
  } catch (error) {
    throw new Error("Failed to decrypt data");
  }
};
