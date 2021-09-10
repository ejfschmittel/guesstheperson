import {useState, useRef, useCallback} from "react"

const useCrop = (initialImage=null) => {
    const [img, setImg] = useState(initialImage)
    const [imgFile, setImgFile] = useState(null)
    const imgRef = useRef(null)



    const [crop, setCrop] = useState({
        unit: "%"
    });


    const cropImage = async () => {
        if( imgRef && crop.width && crop.height) {
          const croppedImage = await getCroppedImg(
            imgRef.current,
            crop,
            'newFile.jpeg'
          );
    
          console.log(imgFile)
          const previewUrl = window.URL.createObjectURL(croppedImage);
          setImg(previewUrl)
 
           const newImgFile = new File([croppedImage], imgFile.name)
           
           setImgFile(newImgFile)
        }
    }

    const getCroppedImg = (image, crop, fileName) => {

        const canvas = document.createElement('canvas');
        const pixelRatio = window.devicePixelRatio;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
    
        canvas.width = crop.width * pixelRatio * scaleX;
        canvas.height = crop.height * pixelRatio * scaleY;
    
        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';
    
 
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width * scaleX,
          crop.height * scaleY
        );
    

    
        return new Promise((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                //reject(new Error('Canvas is empty'));
                console.error('Canvas is empty');
                return;
              }
              
              resolve(blob);
            },
            'image/jpeg',
            1
          );
        });
      }

    const onImageLoad = useCallback((img) => {
        imgRef.current = img;
        imgRef.current.crossOrigin = "anonymous"
    }, []);


    return {crop,img,setImg, setCrop, onImageLoad, cropImage, imgFile,setImgFile}
}

export default useCrop