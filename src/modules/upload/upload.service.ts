import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
// const credentials = {
//   "client_email": "socials@ecom-liemnt.iam.gserviceaccount.com",
//   "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCxl0tZXk1WHm9/\nQ63Bb/lIH4iFsD3IraA9lhyrwCPhgWj074Tsow6V36IokKyC6jvXeILdSgJ4tN5g\nG3BIoFW00M4QVdJRQEjmRK5B8MYFIo6Rja1toLb3Tal5sbyOqJxvSYDejXEmc1Kw\niSpCiMbCMcbqT6BqIzFHW9LLV2FN8jVkEU6lSfNx5revVZXUHPfjfOhZlSMAdYcK\nIJH52tlD8/D6sn9oigCUo8/gTpJOX/3y4bvJnFO89hiOAi0byLoSEaiWvX7oI39B\n5T0snDJdQPNRc6OM3QjZZr8bQuOl95rv8RyxQSERV2cyzGvjE8qWtWtjBBayijWE\nX4oKnCn/AgMBAAECggEANjELSqmWot1lu6mM15bSNFp/AACgUeD9oV1xwU1ABbvG\nKdv/LXCybjSQWJ2RLt/IQ/+fu2QurePPafdlg5v9m1AOWXi+1ZFuzWmO3UtaOc3q\nQGtBzU66FmwJ97svZT75gZIl84Oo0Aln5bvte+Ed+btTzkNfGZREoNhZ0jgHVs+7\nWuYL65XqAPmfSDB2GZcfS+klyDFAYSk/WDt/XWIIyMZuqy/ku8uuxNen4ODpAJQj\n93EkJB0YiLhdDF45nner5I7xLD8ODJIQ0PQhfO7CwjH79bEVVHOug/EV713yD9B6\npatoVbwIrcyElynDpCuE78EegYqCWjn8oHCxB7hWXQKBgQD17uK1rU/DMaNbv/x6\n/mC7cxxRZ6OW6oYotJujPT8edGcKrbY5xCPc9PO9h5dhxf5f5nbcIuIHMKga6OD1\nEa1g1zlqVD1z2NNGT1m/iJYE7lBSypfxWGjr9mYMcksD9Rr8fAp0k0PxD8oDczWQ\n3Ezc5vy1l1lr6KQTXHexSCL9SwKBgQC43EGxRqd0aUGvcCKqP/LLlDHyZa7YzY6J\nGjH7KV962MbwnEEsmeCukkyHUJvftSad/woB+Up3ysSr5SgbIegQNC8U+wx3SK+Q\nwWCIEPhMfTJ13YbLIL8QGNRYGam81kC8WpfCB+cTMXhdkC7K7HgSvDvW/8xi4FJn\n49oHSS+ZnQKBgCPvS+EP+d+jmSMG4nV2Rdwd7b1XT2f1zLSV70fi4x4oFAZTa5T1\nO+hFQngnH8+BhrGskyGHV0+FpIqKDJTCiHrl99W5iWEsBXL4lTyPUJxX1hTC1YDG\nUk5oKnEXIi7p2Y+a8EwoWH0YuYPXibQo/HIqrjI6cy55R8AserDEwZgRAoGAfktM\nPjcNFIUMsTUlGbdSwy7d6ML7b3cQGC7jUrpzVtRfJec6x6PhUqL00cWKmI2EcpDZ\nX3vXGnxXXTDT86V4jAl62RSi8aOg/n5+2rbtTCSEou3Tt1cJ8Y9lE0OFKVQfKg+i\nepc3kW9M0m886LohVntvTnW4Rx0Gb5/FRxEDCikCgYEAt1H41XvcL2taqR8Ghwj1\nAVCyCSvHMQD5+txTEiP6ddok4I9q7WLpuVL+fXJGh/TpNYlXyDv9ZUa/K7fHVi7Y\nDQMSc6bUXvFbqp1Pn/y0fb96B3mhLRIlX8cPXB3nVWQSiNruo0GkojOeeMvS7WkX\nysagtu5nkIMfRZOMQHiBExU=\n-----END PRIVATE KEY-----\n",
// }
const parentIdFolder = '1J-oohZO0st7eOWQj2io2HcdG176rRgf9';

@Injectable()
export class UploadService {
  async upload(file) {
    try {
      const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/drive',
      });
      const service = google.drive({ version: 'v3', auth });

      const fileMetadata = {
        name: 'photo.jpg',
        parents: [parentIdFolder],
      };
      console.log(fileMetadata);

      const media = {
        mimeType: 'image/jpeg',
        body: file,
      };

      try {
        const response: any = await service.files.create({
          // resource: fileMetadata,
          media: media,
          fields: 'id',
        });
        console.log('File Id:', response.data.id);
        return response.data.id;
      } catch (err) {
        // TODO(developer) - Handle error
        throw err;
      }
    } catch (error) {
      // Handle error
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
