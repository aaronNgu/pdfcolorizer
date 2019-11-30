from pdf2image import convert_from_path, convert_from_bytes
from PIL import Image
import tempfile
import os
import sys

def convert_pdf_to_png(path, pdf, output_folder):
    #change path to where the images should be stored 
    ImagePath = output_folder

    if not os.path.exists(ImagePath):
        os.makedirs(ImagePath)
    
    with tempfile.TemporaryDirectory() as something:
        images_from_path = convert_from_path('{}/{}'.format(path, pdf), output_folder=something)
        
        count = 0
        for image in images_from_path:
            image.save("{}/{}.png".format(ImagePath,count), "PNG")
            count =+ count + 1
    
if __name__ == '__main__':
    pass
