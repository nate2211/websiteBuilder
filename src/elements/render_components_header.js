import {
    Box,
    Typography
} from "@mui/material";
import React from "react";
import {ImageComponent} from "./image";
import {Image} from "@mui/icons-material";


export function HeaderOne({classes, style, account}){
    return(
        <Box  sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
            <Box className={classes[style.name_shape]} sx={{minWidth: "12rem", height: "3rem", backgroundColor: "lightgray", display: "flex", justifyContent: "center", alignItems: "center"}}><Typography sx={{height: "fit-content"}}>{account.firstname}</Typography></Box>
            <Box className={classes[style.name_shape]} sx={{minWidth: "12rem", height: "3rem", backgroundColor: "lightgray", display: "flex", justifyContent: "center", alignItems: "center"}}><Typography sx={{height: "fit-content"}}>{account.lastname}</Typography></Box>
        </Box>
    )
}


export function HeaderTwo({ classes, style, account, images, settings }) {


    return (
        <>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }} >
                {settings.displayName && <Box  sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Box className={classes[style.name_shape]} sx={{minWidth: "12rem", height: "3rem", backgroundColor: "lightgray", display: "flex", justifyContent: "center", alignItems: "center"}}><Typography sx={{height: "fit-content"}}>{account.firstname}</Typography></Box>
                    <Box className={classes[style.name_shape]} sx={{minWidth: "12rem", height: "3rem", backgroundColor: "lightgray", display: "flex", justifyContent: "center", alignItems: "center"}}><Typography sx={{height: "fit-content"}}>{account.lastname}</Typography></Box>
                </Box>}
                {settings.left ? <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                    <ImageComponent image={images[0].image}  sx={settings.big ? {width: "50%", height: "500px"}:{ width: "20%", height: "200px" }}/>
                    <Typography sx={settings.big ? {width: "50%", height: "500px"}:{width: "80%"}}>{account.description}</Typography>
                </Box>:<Box sx={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                    <Typography sx={settings.big ? {width: "50%", height: "500px"}:{width: "80%"}}>{account.description}</Typography>
                    <ImageComponent image={images[0].image} sx={settings.big ? {width: "50%", height: "500px"}:{ width: "20%", height: "200px" }}/>
                </Box> }
            </Box>
        </>
    );
}

export function HeaderThree({classes, style, images}){
    return(
        <Box sx={{display: "flex", alignItems: "center", flexDirection: "row", width: "100%"}} className={classes[style.image_container]}>
            <Image image={images[0].image} sx={{width: "40%", height: "400px"}}/>
            <Image image={images[1].image}  sx={{width: "60%", height: "400px"}}/>
        </Box>
    )
}

export function HeaderFour({classes, style, images}){
    return(
        <Box sx={{display: "flex", justifyContent: "center", flexDirection: "row", backgroundColor: "lightgray", width: "100%"}}>
            <ImageComponent image={images[0].image} sx={{width: "400px", height: "400px"}}/>
        </Box>
    )
}