import {
    Avatar,
    Box,
    Checkbox,
    FormControlLabel,
    Modal,
    Slide,
    TextareaAutosize,
    TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {ImageSelectComponent} from "./image";
import {CheckBox} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {addSetting} from "../slices/builder";


export function SelectHeaderOne({classes, style, account}){
    return(
        <Box  sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <Box className={classes[style.name_shape]} sx={{minWidth: "12rem", height: "3rem", backgroundColor: "lightgray", display: "flex", justifyContent: "center", alignItems: "center"}}><Typography sx={{height: "fit-content"}}>{account.firstname}</Typography></Box>
            <Box className={classes[style.name_shape]} sx={{minWidth: "12rem", height: "3rem", backgroundColor: "lightgray", display: "flex", justifyContent: "center", alignItems: "center"}}><Typography sx={{height: "fit-content"}}>{account.lastname}</Typography></Box>
        </Box>
    )
}


export function SelectHeaderTwo({ classes, style, account }) {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [settings, setSettings] = useState({ displayName: false, left: false, big: false });
    const dispatch = useDispatch()
    // Adjusted handleChange function
    const handleChange = (event) => {
        const { name, checked } = event.target; // Using checked for checkbox
        setSettings(prevSettings => ({ ...prevSettings, [name]: checked }));
        dispatch(addSetting({type: "header", setting: settings}))
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const modalStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        overflow: 'auto',
        width: '30%',
    };

    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }} onClick={handleOpen}>
                {settings.displayName && <Box  sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Box className={classes[style.name_shape]} sx={{minWidth: "12rem", height: "3rem", backgroundColor: "lightgray", display: "flex", justifyContent: "center", alignItems: "center"}}><Typography sx={{height: "fit-content"}}>{account.firstname}</Typography></Box>
                    <Box className={classes[style.name_shape]} sx={{minWidth: "12rem", height: "3rem", backgroundColor: "lightgray", display: "flex", justifyContent: "center", alignItems: "center"}}><Typography sx={{height: "fit-content"}}>{account.lastname}</Typography></Box>
                </Box>}
                {settings.left ? <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                    <ImageSelectComponent account={account} sx={settings.big ? {width: "50%", height: "500px"}:{ width: "20%", height: "200px" }} type={"header"} id={1} onEnd={setImage} value={image} />
                    <Typography sx={settings.big ? {width: "50%", height: "500px"}:{width: "80%"}}>{account.description}</Typography>
                </Box>:<Box sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                    <Typography sx={settings.big ? {width: "50%", height: "500px"}:{width: "80%"}}>{account.description}</Typography>
                    <ImageSelectComponent account={account} sx={settings.big ? {width: "50%", height: "500px"}:{ width: "20%", height: "200px" }} type={"header"} id={1} onEnd={setImage} value={image} />
                </Box> }
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                keepMounted
            >
                <Slide direction="right" in={open}>
                    <Box sx={modalStyle}>
                        <Avatar src={image} variant="circular" sx={{ width: "100px", height: "100px" }}>?</Avatar>
                        <Typography sx={{ paddingLeft: "100px" }}>{account.description}</Typography>
                        {/* Updated Checkbox with FormControlLabel for better label handling */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="displayName"
                                    checked={settings.displayName}
                                    onChange={handleChange}
                                />
                            }
                            label="Display Name"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="left"
                                    checked={settings.left}
                                    onChange={handleChange}
                                />
                            }
                            label="Left"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="big"
                                    checked={settings.big}
                                    onChange={handleChange}
                                />
                            }
                            label="Big"
                        />
                    </Box>
                </Slide>
            </Modal>
        </>
    );
}

export function SelectHeaderThree({classes, style, account}){
    return(
        <Box sx={{display: "flex", alignItems: "center", flexDirection: "row", width: "100%"}} className={classes[style.image_container]}>
            <ImageSelectComponent account={account} sx={{width: "40%", height: "400px"}} type={"header"} id={1}/>
            <ImageSelectComponent account={account} sx={{width: "60%", height: "400px"}} type={"header"} id={2}/>
        </Box>
    )
}

export function SelectHeaderFour({classes, style, account}){
    return(
        <Box sx={{display: "flex", justifyContent: "center", flexDirection: "row", backgroundColor: "lightgray", width: "100%"}}>
            <ImageSelectComponent account={account} sx={{width: "400px", height: "400px"}} type={"header"} id={1}/>
        </Box>
    )
}