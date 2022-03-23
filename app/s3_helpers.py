import boto3
import botocore
import os
import uuid

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

s3 = boto3.client(
  "s3",
  aws_access_key_id=os.environ.get("S3_KEY"),
  aws_secret_access_key=os.environ.get("S3_SECRET")
)


def allowed_file(filename):
  # print(filename)
  # print("." in filename)
  return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
  ext = filename.rsplit(".", 1)[1].lower()
  unique_filename = uuid.uuid4().hex
  return f"{unique_filename}.{ext}"


def upload_file_to_s3(file, acl="public-read"):
  try:
    s3.upload_fileobj(
      file,
      BUCKET_NAME,
      file.filename,
      ExtraArgs={
        "ACL": acl,
        "ContentType": file.content_type
      }
    )
  except Exception as e:
    # in case the our s3 upload fails
    return {"errors": str(e)}

  return {"url": f"{S3_LOCATION}{file.filename}"}

""" 
For deleting from s3 bucket (external)
usage in CRUD-route:
delete_in_s3(<thing.media_url>[37:].lower())
"""
def delete_in_s3(filename):
  s3.delete_object(Bucket=BUCKET_NAME, Key=filename)