import {Avatar, Box, Button, Grid, Modal, TextareaAutosize, Typography} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addImage, addText} from "../slices/builder";

export function TextSelectComponent({ account, sx,variant= "rounded", type, id }) {
    // State for handling modal visibility
    const [open, setOpen] = useState(false);
    // State for storing the selected image
    const [text, setText] = useState("");
    const dispatch = useDispatch()
    // Handle opening the modal
    const handleOpen = () => setOpen(true);
    // Handle closing the modal
    const handleClose = () => setOpen(false);

    // Handle selecting an image
    const handleTextSelect = () => {
        dispatch(addText({type: type, id: id, text: text}))
        handleClose(); // Close modal after selection
    };

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
            <Avatar onClick={handleOpen}  variant={variant} sx={{ cursor: 'pointer', width: "100%", height: "100%" }}>{text === "" ? "Fill with Text": text }</Avatar>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="select-image-modal"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Enter Text
                    </Typography>
                    <TextareaAutosize
                        aria-label="text selection"
                        minRows={3}
                        placeholder="Enter your text here"
                        style={{ width: 350 }}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button onClick={handleTextSelect}>Submit</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}