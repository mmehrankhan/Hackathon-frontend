import React, { useState, useContext, useEffect } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { RegisterWithEmailAndPassword } from '../API/ApiFunctions';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const textFieldStyles = {
    containerBg: '#333',
    textFieldBg: '#444',
    textColor: '#fff',
    labelColor: '#aaa',
    buttonBg: '#FFD700',
    buttonTextColor: '#000',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Signing in...');

    try {
      const response = await RegisterWithEmailAndPassword(formData.email, formData.password);
      toast.success('SignedUp successfully!', { id: loadingToast })
      console.log(response);
    } catch (error) {
      toast.dismiss(loadingToast);
      if (error.message.includes('auth/wrong-password')) {
        toast.error('Incorrect password. Please try again.');
      } else if (error.message.includes('auth/user-not-found')) {
        toast.error('No user found with this email. Please sign up first.');
      } else if (error.message.includes('auth/invalid-email')) {
        toast.error('Invalid email address. Please check and try again.');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <>
      <Toaster />
      <Container
        sx={{
          backgroundColor: textFieldStyles.containerBg,
          borderRadius: 4,
          boxShadow: 5,
          minWidth: 260,
          maxWidth: 1000,
          width: '300px',
          padding: 3,
          textAlign: 'center',
          height: '350px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: textFieldStyles.textColor,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 'bold', color: '#FFD700' }}
        >
          Signup
        </Typography>
        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <TextField
              fullWidth
              required
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              autoComplete="current-password"
              sx={{
                backgroundColor: textFieldStyles.textFieldBg,
                borderRadius: '8px',
                '& .MuiInputBase-input': {
                  color: textFieldStyles.textColor,
                },
                '& .MuiInputLabel-root': {
                  color: textFieldStyles.labelColor,
                },
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <TextField
              fullWidth
              required
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              autoComplete="current-password"
              sx={{
                backgroundColor: textFieldStyles.textFieldBg,
                borderRadius: '8px',
                '& .MuiInputBase-input': {
                  color: textFieldStyles.textColor,
                },
                '& .MuiInputLabel-root': {
                  color: textFieldStyles.labelColor,
                },
              }}
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                py: 1.2,
                fontWeight: 'bold',
                backgroundColor: textFieldStyles.buttonBg,
                color: textFieldStyles.buttonTextColor,
                '&:hover': {
                  backgroundColor: textFieldStyles.hoverBg,
                },
              }}
            >
              Signup
            </Button>
          </motion.div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Typography
            variant="body2"
            sx={{ mt: 2, color: textFieldStyles.labelColor }}
          >
            Don't have an account?{' '}
            <Link
              style={{
                cursor: 'pointer',
                color: '#FFD700',
              }}
              to="/"
            >
              login
            </Link>
          </Typography>
        </motion.div>
      </Container>
    </>
  );
};

export default SignupForm;