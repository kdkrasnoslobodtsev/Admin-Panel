import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";

const NewsForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)"); 

  // настроить post
  const handleFormSubmit = (values) => {
    const obj = {
      id: 0,
      title: values.title,
      text: values.content,
      createdAt: "2023-05-07T15:50:43.572Z"
    }

    axios.post('https://localhost:5001/api/News', obj, {
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then (function(response) {
      console.log(response.status);
    })
  };

  return (
    <Box m="20px">
      <Header title="ADD NEWS" subtitle="Create News Card" />

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
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                multiline
                fullWidth
                variant="filled"
                type="text"
                label="Content"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.content}
                name="content"
                error={!!touched.content && !!errors.content}
                helperText={touched.content && errors.content}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create News Card
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};


const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  content: yup.string().required("required"),
});
const initialValues = {
  title: "",
  content: "",
};

export default NewsForm;