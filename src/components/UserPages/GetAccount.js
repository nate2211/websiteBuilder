import useAccountID from "../../hooks/useAccountID";
import {useParams} from "react-router-dom";
import {
    Avatar, Box,
    CircularProgress,
    Container, IconButton,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    Modal,
    Typography
} from "@mui/material";
import Navbar from "../Navbar";
import {useEffect, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

export default function GetAccount(){
    let { id } = useParams();
    const { account, loading, error } = useAccountID(id);

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

    return (
        <Container>
            <Navbar account={false} search={false} header={account.firstname + " " + account.lastname} contact={true} about={true} shop={true} accountModel={account}/>
            <Typography variant="h4" gutterBottom>
                Account Details
            </Typography>
            <Typography variant="body1" gutterBottom>
                Email: {account.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
                First Name: {account.firstname}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Last Name: {account.lastname}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Username: {account.username}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Description: {account.description}
            </Typography>
            <Typography variant="h6">Images:</Typography>
            <List sx={{display: "flex", flexDirection: "row"}}>
                {account.images.map((image) => (
                    <ListItem key={image.id} sx={{width: "80px"}}>
                        <ListItemAvatar>
                            <ImageAvatarModal  imageUrl={`${image.image}`} />
                        </ListItemAvatar>
                    </ListItem>
                ))}
            </List>
            <Typography variant="h6">Links:</Typography>
            <List>
                {account.links.map((link) => (
                    <ListItem key={link.id}>
                        <Typography><Link href={link.link}>{link.link}</Link></Typography>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: 'none',
};

export function ImageAvatarModal({ imageUrl }) {
    const [open, setOpen] = useState(false);
    const [zoom, setZoom] = useState(1); // Initial zoom level is 1 (no zoom)
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setZoom(1); // Reset zoom when closing the modal
    };
    const handleZoomIn = () => setZoom(zoom * 1.1); // Increase zoom level
    const handleZoomOut = () => setZoom(zoom / 1.1); // Decrease zoom level

    return (
        <Box>
            <Avatar
                alt="Profile Picture"
                src={imageUrl}
                sx={{ width: 56, height: 56, cursor: 'pointer' }}
                onClick={handleOpen}
            />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <Box
                            component="img"
                            sx={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                transform: `scale(${zoom})`,
                                transition: 'transform 0.2s',
                            }}
                            alt="Enlarged profile picture"
                            src={imageUrl}
                        />
                    </Box>
                    <IconButton
                        aria-label="zoom in"
                        onClick={handleZoomIn}
                        sx={{
                            position: 'absolute',
                            left: 16,
                            bottom: 16,
                        }}
                    >
                        <ZoomInIcon />
                    </IconButton>
                    <IconButton
                        aria-label="zoom out"
                        onClick={handleZoomOut}
                        sx={{
                            position: 'absolute',
                            left: 76,
                            bottom: 16,
                        }}
                    >
                        <ZoomOutIcon />
                    </IconButton>
                </Box>
            </Modal>
        </Box>
    );
}

