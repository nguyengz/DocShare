import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CardMedia,
  Typography,
  CircularProgress,
  CardContent,
} from "@mui/material";
import { pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";


pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const PdfToImage = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [images, setImages] = useState([]);
  const [pdf, setPdf] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false); // add isError state

  const renderPage = useCallback(async (pdfUrl, pageNumber) => {
    setIsLoading(true);
    const _pdf = await pdfjs.getDocument(pdfUrl).promise;
    setPdf(_pdf);
    const imagesList = [];
    const canvas = document.createElement("canvas");
    canvas.className = "canv";
    const context = canvas.getContext("2d");

    const page = await _pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    setWidth(viewport.width);
    setHeight(viewport.height);
    const renderContext = { canvasContext: context, viewport };
    await page.render(renderContext).promise;
    const img = canvas.toDataURL("image/png");
    imagesList.push(img);
    setCurrentPage(pageNumber);

    setImages([...imagesList]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const pdfUrl =
      "http://localhost:8080/file/download/" +
      props.link +
      "/" +
      props.userId +
      "/" +
      props.id;
    if (pdfUrl && currentPage >= 1) {
      renderPage(pdfUrl, currentPage);
    } else {
      setIsLoading(false);
    }
  }, [currentPage, props.id, props.link, props.userId, renderPage]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setIsError(true);
      } else if (!isLoading && images.length === 0) {
        setIsError(true);
      }
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoading, images]);

  return (
    <>
      {isError ? (
        <CardContent sx={{ height: 100 }}>
          Error: Could not load images.
        </CardContent>
      ) : isLoading ? (
        <CircularProgress />
      ) : images.length >= 1 ? (
        <CardMedia
          image={images[0]}
          sx={{
            height: props.height,
            objectFit: "contain",
            backgroundPosition: "unset",
          }}
        />
      ) : (
        <CardContent sx={{ height: 200 }}>Error: No images found.</CardContent>
      )}
    </>
  );
};

export default PdfToImage;
