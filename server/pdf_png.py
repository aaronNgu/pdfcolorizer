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
            os.system('python3 daltonize.py -d ' + './uploads/' + pdf[:-4] + '/' + str(count) +'.png ./uploads/'+ pdf[:-4] + '/' + str(count) + 'o.png')
            count = count + 1

def call_daltonize():
    os.system('python3 daltonize.py -d ./uploads/lec29/0.png ./uploads/lec29/0o.png')
    os.system('python3 daltonize.py -d ./uploads/lec29/1.png ./uploads/lec29/1o.png')

if __name__ == '__main__':
    with open('testpngpdf.txt', 'a+') as f:
        f.write("yo")
    print(sys.argv[0])
    print("\n")
    print(sys.argv[1])
    convert_pdf_to_png('./uploads', sys.argv[1], './uploads/{}'.format(sys.argv[1][:-4]))
    os.system('convert ./uploads/'+sys.argv[1][:-4] + '/*o.png ../pdfcolorizer/public/processed/' + sys.argv[1])

