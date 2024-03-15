import {Box, Link, List, ListItem, Modal, Typography} from "@mui/material";
import React, {useState} from "react";
import {ImageSelectComponent} from "./image";
import AddIcon from "@mui/icons-material/Add";
import {addComponent} from "../slices/builder";
import {useDispatch} from "react-redux";
import {TextSelectComponent} from "./text";
import {SelectHeaderFour, SelectHeaderOne, SelectHeaderThree, SelectHeaderTwo} from "./builder_components_header";


export const ComponentSelectHeader = ({sx, style, account, classes}) => {
    const [open, setOpen] = useState(false)
    const [component, setComponent] = useState(null)
    const dispatch = useDispatch()
    const HeaderComponents = [<SelectHeaderOne style={style} classes={classes} account={account}/>,
        <SelectHeaderTwo style={style} classes={classes} account={account}/>,
        <SelectHeaderThree style={style} classes={classes} account={account}/> ,
        <SelectHeaderFour style={style} classes={classes} account={account}/> ]
    // Handle opening the modal
    const handleOpen = () => setOpen(true);
    // Handle closing the modal
    const handleClose = () => setOpen(false);
    const handleComponent = (component, i) => {
        setOpen(false)
        setComponent(component)
        dispatch(addComponent({"type": "header", component: i}))
    }
    return (
        <Box sx={sx}>
            {component === null ? (
                <Box
                    sx={{
                        width: "100%",
                        height: "5rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "2px dashed gray",
                        cursor: "pointer",
                        '&:hover': {
                            backgroundColor: "lightgray", // Change as needed
                            borderColor: "darkgray", // Change as needed
                        },
                    }}
                    onClick={handleOpen}
                >
                    <AddIcon fontSize="large" /> {/* Use "+" or <AddIcon /> for the symbol */}
                </Box>
            ) : (
                <>{component}<p onClick={handleOpen}>X</p></>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="select-image-modal"
                aria-describedby="modal-modal-description"
            >
                <List sx={{ outline: "none", maxHeight: "90vh", overflowY: "auto", backgroundColor: "white", margin: "auto", width: "fit-content", padding: "20px", borderRadius: "10px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    {HeaderComponents.map((component, i) => (
                        <ListItem key={i} button onClick={() => handleComponent(component, i)}>
                            {component}
                        </ListItem>
                    ))}
                </List>
            </Modal>
        </Box>
    );
}


export const ComponentSelectBody = ({sx, style, account, classes}) => {
    const [open, setOpen] = useState(false)
    const [component, setComponent] = useState(null)
    const dispatch = useDispatch()
    const BodyComponents = [<List>
        <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
            <Box sx={{display: "flex", alignItems: "center", flexDirection: "row"}}>
                <ImageSelectComponent account={account} sx={{width: "200px", height: "200px"}} type={"body"} id={1}/>
                <ImageSelectComponent account={account} sx={{width: "400px", height: "200px"}} type={"body"} id={2}/>
            </Box>
            <Box sx={{display: "flex", alignItems: "center", flexDirection: "row"}}>
                <ImageSelectComponent account={account} sx={{width: "400px", height: "200px"}} type={"body"} id={3}/>
                <ImageSelectComponent account={account} sx={{width: "200px", height: "200px"}} type={"body"} id={4}/>
            </Box>
        </Box>
    </List>,
        <List>
            <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                <ImageSelectComponent account={account} sx={{width: "400px", height: "400px"}} type={"body"} id={1}/>
                <TextSelectComponent account={account} sx={{width: "400px", height: "200px"}} type={"body"} id={1}/>
            </Box>
        </List>
    ]
    // Handle opening the modal
    const handleOpen = () => setOpen(true);
    // Handle closing the modal
    const handleClose = () => setOpen(false);
    const handleComponent = (component, i) => {
        setOpen(false)
        setComponent(component)
        dispatch(addComponent({"type": "body",component: i}))
    }
    return (
        <Box sx={sx}>
            {component === null ? (
                <Box
                    sx={{
                        width: "100%",
                        height: "5rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "2px dashed gray",
                        cursor: "pointer",
                        '&:hover': {
                            backgroundColor: "lightgray", // Change as needed
                            borderColor: "darkgray", // Change as needed
                        },
                    }}
                    onClick={handleOpen}
                >
                    <AddIcon fontSize="large" /> {/* Use "+" or <AddIcon /> for the symbol */}
                </Box>
            ) : (
                <>{component}<p onClick={handleOpen}>X</p></>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="select-image-modal"
                aria-describedby="modal-modal-description"
            >
                <List sx={{ outline: "none", maxHeight: "90vh", overflowY: "auto", backgroundColor: "white", margin: "auto", width: "fit-content", padding: "20px", borderRadius: "10px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    {BodyComponents.map((component, i) => (
                        <ListItem key={i} button onClick={() => handleComponent(component , i)}>
                            {component}
                        </ListItem>
                    ))}
                </List>
            </Modal>
        </Box>
    );
}

export const ComponentSelectFooter = ({sx, style, account, classes}) => {
    const [open, setOpen] = useState(false)
    const [component, setComponent] = useState(null)
    const dispatch = useDispatch()
    const FooterComponents = [<Box>
        <List className={classes[style.link_container]}>
            {account.links.map((link) => (
                <ListItem key={link.id}>
                    <Typography><Link href={link.link}>{link.link}</Link></Typography>
                </ListItem>
            ))}
        </List>
        <Box sx={{backgroundColor: "gainsboro", display: "flex", flexDirection: "column", alignItems: "left"}}>
            <h1>Contact Info</h1>
            <Typography sx={{height: "fit-content"}}>{account.email}</Typography>
        </Box>
    </Box>]
    // Handle opening the modal
    const handleOpen = () => setOpen(true);
    // Handle closing the modal
    const handleClose = () => setOpen(false);
    const handleComponent = (component, i) => {
        setOpen(false)
        setComponent(component)
        dispatch(addComponent({"type": "footer",component: i}))
    }
    return (
        <Box sx={sx}>
            {component === null ? (
                <Box
                    sx={{
                        width: "100%",
                        height: "5rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "2px dashed gray",
                        cursor: "pointer",
                        '&:hover': {
                            backgroundColor: "lightgray", // Change as needed
                            borderColor: "darkgray", // Change as needed
                        },
                    }}
                    onClick={handleOpen}
                >
                    <AddIcon fontSize="large" /> {/* Use "+" or <AddIcon /> for the symbol */}
                </Box>
            ) : (
                <>{component}<p onClick={handleOpen}>X</p></>
            )}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="select-image-modal"
                aria-describedby="modal-modal-description"
            >
                <List sx={{ outline: "none", maxHeight: "90vh", overflowY: "auto", backgroundColor: "white", margin: "auto", width: "fit-content", padding: "20px", borderRadius: "10px", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    {FooterComponents.map((component, i) => (
                        <ListItem key={i} button onClick={() => handleComponent(component , i)}>
                            {component}
                        </ListItem>
                    ))}
                </List>
            </Modal>
        </Box>
    );
}

