import { S3 } from 'aws-sdk'

const s3Client = new S3({ region: process.env.S3_BUCKET_REGION })

export { s3Client }
