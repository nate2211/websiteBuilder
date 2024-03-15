import {Alert, Box, Button, CircularProgress, Container, TextField, Typography} from "@mui/material";
import useAccountID from "../hooks/useAccountID";
import {useSelector} from "react-redux";
import { useAccountImages } from '../hooks/useAccountImages';
import {useEffect, useState} from "react"; // Adjust the import path as needed
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteAccountImage } from '../slices/accountimages';
import axios from "axios";

const ImageItem = ({ image }) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        dispatch(deleteAccountImage(image.id));
    };

    return (
        <Box sx={{
            maxWidth: "300px",
            maxHeight: "350px",
            overflow: 'hidden',
            position: 'relative'
        }}>
            <Box sx={{
                maxWidth: "300px",
                maxHeight: "300px",
                overflow: 'hidden',
                position: 'relative'
            }}>
                <img src={image.image} alt="Account" style={{
                    maxWidth: '90%',
                    maxHeight: '90%',
                    objectFit: 'contain', // This will ensure the image maintains its aspect ratio
                }} />
            </Box>
            <Button onClick={handleDelete} style={{}}>
                Delete
            </Button>
        </Box>
    );
};


export default function Account(){
    const user = useSelector((state) => state.auth.user);
    const { account, loading, error } = useAccountID(user.user_id);

    if (error){
        return(<Container>
            <Typography>Error: {error.message}</Typography>
        </Container>)
    }
    if (loading) {
        return (
            <Container>
                <CircularProgress />
            </Container>
        );
    }

    return(<Box>
        <AccountInformationComponent account={account} user={user}/>
        <AccountImagesComponent user={user}/>
    </Box>)
}



function AccountInformationComponent({account, user}){
    const [error, setError] = useState("")
    const [email, setEmail] = useState(account.email);
    const [firstName, setFirstName] = useState(account.firstname);
    const [lastName, setLastName] = useState(account.lastname);
    const [username, setUsername] = useState(account.username)
    const [description, setDescription] = useState(account.description)
    const [about, setAbout] = useState(account.about)
    // Handling change events for form fields
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };
    const handleAboutChange = (event) => {
        setAbout(event.target.value)
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    function onSubmit(e){
        e.preventDefault()
        axios.put(`http://127.0.0.1:8000/account/update/${account.id}/`,{firstname: firstName, lastname: lastName, username: username, email: email, about: about, description: description}, {
                headers: {
                    Authorization: `Bearer ${user.access}`,
                },
            }
        )
            .then((r) => console.log(r)).catch((e) => setError(e.response.data.error))
    }
    console.log(account)
    return(<Box>
        <form noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
            <TextField
                id="email"
                label="Email"
                value={email}
                onChange={handleEmailChange}
                margin="normal"
                fullWidth
            />
            <TextField
                id="username"
                label="Username"
                value={username}
                onChange={handleUsernameChange}
                margin="normal"
                fullWidth
            />
            <TextField
                id="first-name"
                label="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
                margin="normal"
                fullWidth
            />
            <TextField
                id="last-name"
                label="Last Name"
                value={lastName}
                onChange={handleLastNameChange}
                margin="normal"
                fullWidth
            />
            <TextField
                id="description"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
                inputProps={{ maxLength: 500 }}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                id="about"
                label="About"
                multiline
                rows={8}
                value={about}
                onChange={handleAboutChange}
                inputProps={{ maxLength: 2500 }}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            {error && <Alert severity="error" style={{ margin: '20px 0' }}>{error}</Alert>}
            <Button type={"submit"}>Submit</Button>
        </form>

    </Box>)
}


function AccountImagesComponent({user}) {
    const { images, isLoading, error, fetchImages, uploadImage } = useAccountImages();

    useEffect(() => {
        fetchImages(); // Fetch images when the component mounts
    }, [fetchImages]);

    const handleFileChange = async (event) => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0]; // Correctly accessing the file
            const formData = new FormData();
            for (let pair of formData.entries()) {
                console.log(pair[0]+ ', ' + pair[1]);
            }
            formData.append('image', file);
            // Ensure 'account' is a required field on the backend
            formData.append('account', user.user_id); // Assuming 'user.user_id' is valid
            await uploadImage(formData);
        }
    };

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading images: {error.message}</p>}
            <input type="file" onChange={handleFileChange} />
            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                {images.map((img) => (
                    <Box  key={img.id}>
                        <ImageItem image={img}/>{/* Adjust 'src' as needed based on your data structure */}
                        {/* Additional image details here */}
                    </Box>
                ))}
            </Box>
        </div>
    );
}
