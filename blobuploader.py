# upload_blob_images.py
# Python program to bulk upload jpg image files as blobs to azure storage
# Uses latest python SDK() for Azure blob storage
# Requires python 3.6 or above
import os
from azure.storage.blob import BlobServiceClient, BlobClient
from azure.storage.blob import ContentSettings, ContainerClient
 
# IMPORTANT: Replace connection string with your storage account connection string
# Usually starts with DefaultEndpointsProtocol=https;...
MY_CONNECTION_STRING = ""
 
# Replace with blob container. This should be already created in azure storage.
MY_IMAGE_CONTAINER = ""
 
# Replace with the local folder which contains the image files for upload
LOCAL_IMAGE_PATH = ""
 
class AzureBlobFileUploader:
  def __init__(self):
    print("Intializing AzureBlobFileUploader")
 
    # Initialize the connection to Azure storage account
    self.blob_service_client =  BlobServiceClient.from_connection_string(MY_CONNECTION_STRING)
 
  def upload_all_images_in_folder(self):
    # Get all files with jpg extension and exclude directories
    all_file_names = [f for f in os.listdir(LOCAL_IMAGE_PATH)
                    if os.path.isfile(os.path.join(LOCAL_IMAGE_PATH, f))]
 
    # Upload each file
    for file_name in all_file_names:
      self.upload_image(file_name)
 
  def upload_image(self,file_name):
    # Create blob with same name as local file name
    blob_client = self.blob_service_client.get_blob_client(container=MY_IMAGE_CONTAINER,
                                                          blob=f"rds/{file_name}")
    # Get full path to the file
    upload_file_path = os.path.join(LOCAL_IMAGE_PATH, file_name)
 
    # Create blob on storage
    # Overwrite if it already exists!
    # image_content_setting = ContentSettings(content_type='image/jpeg')
    print(f"uploading file - {file_name}")
    with open(upload_file_path, "rb") as data:
      blob_client.upload_blob(data,overwrite=True)
 
 
# Initialize class and upload files
