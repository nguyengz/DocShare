/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";

import FileUploadIcon from "@mui/icons-material/FileUpload";

import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
  Stack,
} from "@mui/material";
import InfomationUpload from "./InfomationUpload";
import { pdfjs } from "react-pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// const WordViewer = ({ file }) => {
//   return (
//     <div>
//       <FileViewer
//         fileType="docx"
//         filePath={file}
//         onError={(e) => console.log(e)}
//       />
//     </div>
//   );
// };

function UploadFile() {
  const [selectedFile, setSelectedFile] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  async function handleFileUpload(event) {
    try {
      setIsLoading(true);
      const file = event.target.files[0];
      setSelectedFile(file);
      setIsFilePicked(true);
      const uri = URL.createObjectURL(file);
      const _pdf = await pdfjs.getDocument({ url: uri }).promise;
      setPdf(_pdf);
      setIsLoading(false);
      setFileUrl(uri);
      console.log(fileUrl);
      console.log(selectedFile.type);
    } catch (error) {
      alert(error.message);
    }
  }

  const handleUploadButtonClick = () => {
    const fileInput = document.getElementById("contained-button-file");
    fileInput.click();
  };
  // const onMouseOver = () => {
  //   document.write("Select a file to show details");
  // };
  return (
    <>
      {isFilePicked ? (
        fileUrl && (
          <InfomationUpload
            url={fileUrl}
            nameFile={selectedFile.name}
            selectedFile={selectedFile}
            pdf={pdf}
          />
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          // <iframe src={"~/assets/Quy tắc.docx"}></iframe>
        )
      ) : (
        <Box
          container
          sx={{
            width: "75%",
            minHeight: "100vh",
            margin: "40px auto ",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: 1,
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: "28px", fontWeight: "600", textAlign: "center" }}
          >
            Upload and share with over 70 million people
          </Typography>
          <Typography
            variant="h1"
            sx={{
              fontSize: "16px",
              fontWeight: "400",
              textAlign: "center",
              color: "var(--blue-gray-600)",
              margin: "10px auto",
            }}
          >
            Presentations, Documents, Infographics, and more
          </Typography>
          <Card
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#f5fcff",
              border: "1px dashed #b4bbd1",
              justifyContent: "center",
              justifyItems: "center",
              marginTop: "20px",
              padding: 2,
            }}
          >
            <Grid
              container
              spacing={1}
              display="flex"
              flexDirection="column"
              direction="column"
              justify="center"
              alignItems="center"
              alignContent="center"
              sx={{
                padding: "90px 0",
                gap: "8px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* <input type="file" name="file" /> */}

              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <Button
                  // disableElevation
                  // disabled={loading
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    color: "white",
                  }}
                  // onMouseOver={onMouseOver}
                  onClick={handleUploadButtonClick}
                >
                  <input
                    id="contained-button-file"
                    name="file"
                    type="file"
                    onChange={handleFileUpload}
                    hidden
                    // accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf,application/pdf"
                  />
                  <FileUploadIcon />
                  <Typography variant="caption">
                    Select Documents To Upload
                  </Typography>
                </Button>
                <Typography variant="caption" color="initial">
                  or Drag & Drop here
                </Typography>{" "}
              </Grid>
            </Grid>
            <Grid
              xs={8}
              container
              spacing={1}
              direction="row"
              justify="center"
              alignItems="center"
              alignContent="center"
              wrap="nowrap"
              margin="auto"
            >
              <Grid
                item
                xs={5}
                sx={{ padding: "0", gap: "8px", textAlign: "right" }}
              >
                <Typography variant="caption" color="initial">
                  or upload documents from the cloud:
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                sx={{
                  padding: "",
                  height: "25px",
                  background:
                    "url(https://public.slidesharecdn.com/images/upload-background-sprite.png)",

                  backgroundPosition: "-20px -130px",
                }}
              >
                <Link></Link>
              </Grid>
            </Grid>
          </Card>
        </Box>
      )}
    </>
  );
}

export default UploadFile;
