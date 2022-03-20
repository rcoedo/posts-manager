import React from "react";
import { Navigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import styled from "styled-components";
import { useAuthState } from "../../auth/useAuthState";
import { Breakpoint } from "../../../utils/breakpoint";
import { useGoToPreviousPage } from "./useGoToPreviousPage";

const LoginContainer = styled.div`
  && form {
    @media only screen and ${Breakpoint.XS} {
      width: 90%;
    }
    @media only screen and ${Breakpoint.SM} {
      width: 80%;
    }
    @media only screen and ${Breakpoint.LG} {
      width: 80%;
    }
    @media only screen and ${Breakpoint.XLG} {
      width: 60%;
    }
    margin: auto;
  }

  && form > label,
  input[type="text"] {
    width: 100%;
    display: block;
  }

  && label {
    margin: 1.5rem 0 0.25rem 0;
  }

  && input[type="submit"] {
    width: 30%;
    margin: 2rem 0;
    padding: 0.5rem;
  }

  && input[type="text"] {
    height: 2rem;
  }
`;

const SubmitButtonContainer = styled.div`
  text-align: right;
`;

const FieldError = styled.div`
  font-size: 14px;
  margin: 0.5rem 0;
  color: ${(props) => props.theme.colors.red};
`;

export const LoginPage = () => {
  const goToPreviousPage = useGoToPreviousPage();
  const {
    user,
    error,
    isLoading,
    actions: { loadUser },
  } = useAuthState();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("name is required"),
      email: yup.string().email("invalid email").required("email is required"),
    }),
    validateOnChange: false,
    onSubmit: async (values) => loadUser(values.name, values.email, goToPreviousPage),
  });

  if (user) {
    return <Navigate to="/" replace />;
  }

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <LoginContainer>
      <form onSubmit={formik.handleSubmit}>
        <label>name:</label>
        <input
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Enter your name..."
        />
        {formik.errors.name && <FieldError>{formik.errors.name}</FieldError>}
        <label>email:</label>
        <input
          name="email"
          type="text"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter your email..."
        />
        {formik.errors.email && <FieldError>{formik.errors.email}</FieldError>}
        <SubmitButtonContainer>
          <input type="submit" value="login" />
        </SubmitButtonContainer>
        {error && <div>errors happened</div>}
      </form>
    </LoginContainer>
  );
};
