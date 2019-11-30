from pdf2image import convert_from_path, convert_from_bytes
from PIL import Image
import tempfile
import os

def main():
    ImagePath = '/Users/A/Desktop/Code/LHDTest/Images/'

    if not os.path.exists(ImagePath):
        os.makedirs(ImagePath)
    
    with tempfile.TemporaryDirectory() as path:
        images_from_path = convert_from_path('/Users/A/Desktop/Code/LHDTest/lec29.pdf', output_folder=path)
        count = 0
        for image in images_from_path:
            print(len(image))
            image.save("{}/{}.png".format(ImagePath,count), "PNG")
    
    
if __name__ == '__main__':
    main()