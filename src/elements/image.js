import {Avatar, Box, Button, Grid, Modal, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addImage} from "../slices/builder";

export function ImageSelectComponent({ account, sx,variant= "rounded", type, id , onEnd = f => f, value}) {
    // State for handling modal visibility
    const [open, setOpen] = useState(false);
    // State for storing the selected image
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch()
    // Handle opening the modal
    const handleOpen = () => setOpen(true);
    // Handle closing the modal
    const handleClose = () => setOpen(false);

    // Handle selecting an image
    const handleImageSelect = (image, image_id) => {
        setSelectedImage(image);
        dispatch(addImage({type: type, id: id, image: image, image_id: image_id}))
        onEnd(image)
        handleClose(); // Close modal after selection
    };

    useEffect(() => {
        if(selectedImage === null && value !== null){
            setSelectedImage(value)
        }
    }, [selectedImage])
    // Modal style
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        outline: 'none', // Removes the outline for focusing
    };

    return (
        <Box sx={sx}>
            <Avatar onClick={handleOpen} src={selectedImage} variant={variant} sx={{ cursor: 'pointer', width: "100%", height: "100%" }}>?</Avatar>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="select-image-modal"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Select an Image
                    </Typography>
                    <Grid container spacing={2}>
                        {account.images.map((img, index) => (
                            <Grid item xs={4} key={index}>
                                <Button onClick={() => handleImageSelect(img.image, img.id)}>
                                    <Avatar src={img.image} variant="rounded" sx={sx ? sx: { width: 56, height: 56 }}/>
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Modal>
        </Box>
    );
}