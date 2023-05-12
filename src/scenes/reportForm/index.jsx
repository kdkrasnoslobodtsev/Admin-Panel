import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";

const ReportForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)"); 

  // настроить post
  const handleFormSubmit = (values) => {
    const obj = {
      id: 0,
      title: values.title,
      reportText: values.text,
      projectsId: values.projectId
    }

    axios.post('https://localhost:5001/api/Reports', obj, {
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      }
    }).then (function(response) {
      console.log(response);
    })
  };

  return (
    <Box m="20px">
      <Header title="PRINT A REPORT" subtitle="Making a Report About a Project" />

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
                label="Project ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.projectId}
                name="projectId"
                error={!!touched.projectId && !!errors.projectId}
                helperText={touched.projectId && errors.projectId}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Report Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
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
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Send Report
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  projectId: yup.number().required("required"),
  title: yup.string().required("required"),
  text: yup.string().required("required"),
});
const initialValues = {
  projectId: 0,
  title: "",
  text: "",
};

export default ReportForm;