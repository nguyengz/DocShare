import { Formik, Form, Field } from "formik";
import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { UpdateFile } from "~/slices/auth";
const FormUpdateFile = ({ row, onSave, onCancel }) => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState(row.fileName);
  const [description, setDescription] = useState(row.description);

  const handleSubmit = async (values, { setSubmitting }) => {
    const data = {
      id: row.id,
      fileName: values.fileName,
      description: values.description,
    };
    try {
      dispatch(UpdateFile(data));
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        fileName: fileName,
        description: description,
      }}
      onSubmit={handleSubmit}
      validationSchema={Yup.object().shape({
        fileName: Yup.string()
          .min(10)
          .max(255)
          .required("FileName is required"),
        description: Yup.string()
          .min(10)
          .max(255)
          .required("Description is required"),
      })}
    >
      {({ isSubmitting, handleChange, isValid, errors, touched }) => (
        <Form>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              backgroundColor: "white",
              padding: "2rem",
              boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
              width: "70%",
              maxWidth: "800px",
            }}
          >
            <Field
              id="fileName"
              name="fileName"
              label="File Name"
              as={TextField}
              variant="outlined"
              error={!!errors.fileName && touched.fileName}
              helperText={touched.fileName && errors.fileName}
              value={fileName}
              onChange={(e) => {
                handleChange(e);
                setFileName(e.target.value);
              }}
            />
            <Field
              id="description"
              name="description"
              label="Description"
              as={TextField}
              variant="outlined"
              error={!!errors.description && touched.description}
              helperText={touched.description && errors.description}
              value={description}
              onChange={(e) => {
                handleChange(e);
                setDescription(e.target.value);
              }}
            />
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!isValid || isSubmitting}
              >
                Save
              </Button>
              <Button variant="contained" onClick={onCancel}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default FormUpdateFile;
