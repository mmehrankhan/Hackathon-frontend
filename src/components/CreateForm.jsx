import React, { useState } from 'react';
import { Container, TextField, Button, Typography, IconButton } from '@mui/material';
import { Remove } from '@mui/icons-material';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CreateForm = () => {
    const [formData, setFormData] = useState({
        questions: [],
        email: '',
        password: '',
    });

    const [newQuestion, setNewQuestion] = useState({
        questionText: '',
        options: ['', ''],
        correctAnswer: '',
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

    const handleQuestionChange = (e) => {
        const { name, value } = e.target;
        setNewQuestion((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...newQuestion.options];
        updatedOptions[index] = value;
        setNewQuestion((prevState) => ({
            ...prevState,
            options: updatedOptions,
        }));
    };

    const addOption = () => {
        setNewQuestion((prevState) => ({
            ...prevState,
            options: [...prevState.options, ''],
        }));
    };

    const removeOption = (index) => {
        const updatedOptions = newQuestion.options.filter((_, i) => i !== index);
        setNewQuestion((prevState) => ({
            ...prevState,
            options: updatedOptions,
        }));
    };

    const addQuestion = () => {
        if (!newQuestion.questionText || !newQuestion.correctAnswer || newQuestion.options.length < 2) {
            toast.error('Please complete the question details and provide at least 2 options.');
            return;
        }

        setFormData((prevState) => ({
            ...prevState,
            questions: [...prevState.questions, newQuestion],
        }));

        setNewQuestion({ questionText: '', options: ['', ''], correctAnswer: '' });
        toast.success('Question added successfully!');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitted data:', formData);
        toast.success('Form submitted successfully!');
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
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: textFieldStyles.textColor,
                }}
            >
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#FFD700' }}>
                    Create Form
                </Typography>

                <form onSubmit={handleSubmit}>
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
                        sx={{
                            backgroundColor: textFieldStyles.textFieldBg,
                            borderRadius: '8px',
                            '& .MuiInputBase-input': { color: textFieldStyles.textColor },
                            '& .MuiInputLabel-root': { color: textFieldStyles.labelColor },
                        }}
                    />

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
                        sx={{
                            backgroundColor: textFieldStyles.textFieldBg,
                            borderRadius: '8px',
                            '& .MuiInputBase-input': { color: textFieldStyles.textColor },
                            '& .MuiInputLabel-root': { color: textFieldStyles.labelColor },
                        }}
                    />

                    <Typography variant="h6" gutterBottom sx={{ mt: 2, color: '#FFD700' }}>
                        Add Questions
                    </Typography>

                    <TextField
                        fullWidth
                        required
                        label="Question"
                        name="questionText"
                        value={newQuestion.questionText}
                        onChange={handleQuestionChange}
                        margin="normal"
                        variant="outlined"
                        sx={{
                            backgroundColor: textFieldStyles.textFieldBg,
                            borderRadius: '8px',
                            '& .MuiInputBase-input': { color: textFieldStyles.textColor },
                            '& .MuiInputLabel-root': { color: textFieldStyles.labelColor },
                        }}
                    />

                    {newQuestion.options.map((option, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                            <TextField
                                fullWidth
                                required
                                label={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                variant="outlined"
                                sx={{
                                    backgroundColor: textFieldStyles.textFieldBg,
                                    borderRadius: '8px',
                                    '& .MuiInputBase-input': { color: textFieldStyles.textColor },
                                    '& .MuiInputLabel-root': { color: textFieldStyles.labelColor },
                                }}
                            />
                            <IconButton onClick={() => removeOption(index)} sx={{ color: '#FFD700' }}>
                                <Remove />
                            </IconButton>
                        </div>
                    ))}

                    <Button
                        variant="outlined"
                        onClick={addOption}
                        sx={{ color: '#FFD700', borderColor: '#FFD700', mb: 2 }}
                    >
                        Add Option
                    </Button>

                    <TextField
                        fullWidth
                        required
                        label="Correct Answer"
                        name="correctAnswer"
                        value={newQuestion.correctAnswer}
                        onChange={handleQuestionChange}
                        margin="normal"
                        variant="outlined"
                        sx={{
                            backgroundColor: textFieldStyles.textFieldBg,
                            borderRadius: '8px',
                            '& .MuiInputBase-input': { color: textFieldStyles.textColor },
                            '& .MuiInputLabel-root': { color: textFieldStyles.labelColor },
                        }}
                    />

                    <Button
                        variant="contained"
                        onClick={addQuestion}
                        sx={{
                            mt: 2,
                            py: 1.2,
                            fontWeight: 'bold',
                            backgroundColor: textFieldStyles.buttonBg,
                            color: textFieldStyles.buttonTextColor,
                        }}
                    >
                        Add Question
                    </Button>

                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{
                            mt: 2,
                            py: 1.2,
                            fontWeight: 'bold',
                            backgroundColor: textFieldStyles.buttonBg,
                            color: textFieldStyles.buttonTextColor,
                        }}
                    >
                        Submit Form
                    </Button>
                </form>

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
                        to="/signup"
                    >
                        Sign up here
                    </Link>
                </Typography>
            </Container>
        </>
    );
};

export default CreateForm;