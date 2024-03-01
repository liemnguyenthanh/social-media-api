import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  constructor(private readonly serviceConfig: ConfigService) {}

  s3 = new S3({
    accessKeyId: this.serviceConfig.get('awsAccessKeyId'),
    secretAccessKey: this.serviceConfig.get('awsSecretAccessKey'),
    region: this.serviceConfig.get('awsRegion'),
  });

  async upload(file) {
    try {
      const bucketName = 'socials-files';
      const fileKey = uuidv4();
      const params = {
        Bucket: bucketName,
        Key: fileKey,
        Body: file.buffer,
        ACL: 'public-read',
      };

      const response = await this.s3
        .upload(params, (err, data) => {
          if (err) {
            throw new BadRequestException(err);
          } else {
            return data.Location;
          }
        })
        .promise();

      return { link: response.Location };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
