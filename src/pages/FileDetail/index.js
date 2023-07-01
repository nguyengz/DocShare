import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pdfjsLib from 'pdfjs-dist';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import sharp from 'sharp';

const downloadPDF = async (pdfUrl) => {
  const pdfResponse = await axios.get(pdfUrl, {
    responseType: 'blob'
  });
  const pdfBlob = pdfResponse.data;
  return pdfBlob;
};

const renderPDF = async (pdfBlob) => {
  const pdfData = await pdfjsLib.getDocument({ data: pdfBlob }).promise;
  const pagePromises = [];
  for (let i = 1; i <= pdfData.numPages; i++) {
    const page = await pdfData.getPage(i);
    const viewport = page.getViewport({ scale: 1 });
    const canvas = document.createElement('canvas');
    const canvasContext = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = {
      canvasContext,
      viewport
    };
    const pagePromise = page.render(renderContext).promise;
    pagePromises.push(pagePromise);
  }
  const pageResults = await Promise.all(pagePromises);
  const images = pageResults.map((pageResult) => pageResult.canvas.toDataURL());
  return images;
};

const convertImages = async (images) => {
  const imagePromises = images.map((image) => {
    const buffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    return sharp(buffer).toFormat('png').toBuffer();
  });
  const imageBuffers = await Promise.all(imagePromises);
  const imageUrls = imageBuffers.map((imageBuffer) => `data:image/png;base64,${imageBuffer.toString('base64')}`);
  return imageUrls;
};

const pdfUrl = 'https://www.googleapis.com/drive/v3/files/1r8bab6Kqw1XZJHB9fuIjZ6MJfnWNLQby/?alt=media';

const FileDetail = ({  }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPDF = async () => {
    try {
      const pdfBlob = await downloadPDF(pdfUrl);
      const pdfImages = await renderPDF(pdfBlob);
      const convertedImages = await convertImages(pdfImages);
      setImages(convertedImages);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadPDF();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Slider>
          {images.map((imageUrl, index) => (
            <div key={index}>
              <img src={imageUrl} alt={`Page ${index + 1}`} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default FileDetail;