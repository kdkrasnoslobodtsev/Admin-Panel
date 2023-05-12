import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";

const ProjectForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)"); 
  
  const [file, setFile] = useState(null);

  const changeFile = (event) => {
    setFile(curFile => event.target.files[0]);
    console.log(file)
  }

  // настроить post
  const handleFormSubmit = async (values) => {
    const obj = {
      id: 0,
      projectName: values.projectName,
      price: values.budget,
      area: values.area,
      adress: values.city,
      status: 'ON_PREPARING',
      typeProject: values.type,
      createdAt: (new Date()).toLocaleString(),
      applicationUserId: values.clientId,
    };
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData.get('file'));

    const res = await fetch('https://localhost:5001/api/ImageProject', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      },
      body: formData,
    });
    axios.post('https://localhost:5001/api/Project', obj, {
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      }
    }).then (function(response) {
      console.log(response.status);
    })
  };

  return (
    <Box m="20px">
      <Header title="CREATE PROJECT" subtitle="Create a New Project Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              mb="20px"
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Client ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.clientId}
                name="clientId"
                error={!!touched.clientId && !!errors.clientId}
                helperText={touched.clientId && errors.clientId}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Project Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.projectName}
                name="projectName"
                error={!!touched.projectName && !!errors.projectName}
                helperText={touched.projectName && errors.projectName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Budget"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.budget}
                name="budget"
                error={!!touched.budget && !!errors.budget}
                helperText={touched.budget && errors.budget}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Total Area"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.area}
                name="area"
                error={!!touched.area && !!errors.area}
                helperText={touched.area && errors.area}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.type}
                name="type"
                error={!!touched.type && !!errors.type}
                helperText={touched.type && errors.type}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name="city"
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                multiline
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.text}
                name="text"
                error={!!touched.text && !!errors.text}
                helperText={touched.text&& errors.text}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <input
              lang="en"
              id="file-loader-button"
              type="file"
              onChange={changeFile}
            />
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Register New Project
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};


const checkoutSchema = yup.object().shape({
  clientId: yup.string().required("required"),
  projectName: yup.string().required("required"),
  budget: yup.number().required("required"),
  area: yup.number().required("required"),
  type: yup.string().required("required"),
  city: yup.string().required("required"),
  text: yup.string().required("required"),
});
const initialValues = {
  clientId: "",
  projectName: "",
  budget: 0,
  area: 0,
  type: "",
  city: "",
  text: "",
};

export default ProjectForm;