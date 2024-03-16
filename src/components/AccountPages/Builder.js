import React, { useState } from 'react';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Button,
    Container,
    Typography,
    CircularProgress, Box, List, ListItem, ListItemAvatar, Avatar, Link
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import useAccountID from "../../hooks/useAccountID";
import {useParams} from "react-router-dom";
import {motion} from "framer-motion";
import {ImageSelectComponent} from "../../elements/image";
import {ComponentSelectBody, ComponentSelectFooter, ComponentSelectHeader} from "../../elements/component";
import {useSelector} from "react-redux";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 200,
        marginBottom: 2, // Using spacing value directly
    },
    button: {
        marginTop: 2, // Using spacing value directly
    },

    imageContainer1: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        clipPath: 'polygon(0% 0%, 100% 25%, 100% 100%, 0% 80%)',
        background: 'linear-gradient(120deg, #f6d365, #fda085) ' ,
    },
    linkContainer1: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        clipPath: 'polygon(0% 0%, 100% 25%, 100% 100%, 0% 80%)',
        background: 'linear-gradient(120deg, #f6d365, #fda085)',
    },
    shape1: {
        clipPath: 'polygon(0% 0%, 100% 25%, 100% 100%, 0% 80%)',
        background: 'linear-gradient(120deg, #f6d365, #fda085)',
    },
    shape2: {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 80%)',
        background: 'linear-gradient(to right, #7b4397, #dc2430)',
    },
    shape3: {
        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
        background: 'linear-gradient(to left, #4b6cb7, #182848)',
    },
    customScrollbar: {
        width: '100%',
        height: '100vh',
        overflow: 'auto',
        position: 'relative',
        '&::-webkit-scrollbar': {
            width: '10px',
        },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 5px grey',
            borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'darkgrey',
            borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: '#b30000',
        },
        // Firefox
        scrollbarColor: 'darkgrey lightgray',
        scrollbarWidth: 'thin',
    },
}));



const styleSelect = {"style1": {"name_shape": "shape1", "image_container": "imageContainer1", "link_container":"linkContainer1"}, "": {}}
const ComponentBuilder = () => {
    const classes = useStyles();
    const [style, setStyle] = useState("");
    const [layout, setLayout] = useState('');
    let { id } = useParams();
    const { account, loading, error } = useAccountID(id);
    const user = useSelector((state) => state.auth.user);
    const components = useSelector((state) => state.builder.components)
    const images = useSelector((state) => state.builder.images)
    const texts = useSelector((state) => state.builder.texts)
    const settings = useSelector((state) => state.builder.settings)


    const handleStyleChange = (event) => {

        setStyle(event.target.value);
    };

    const handleLayoutChange = (event) => {
        setLayout(event.target.value);
    };

    const buildComponent = (e) => {
        // Implement logic to build component based on selected style and layout
        e.preventDefault()
        console.log("Selected Style:", style);
        console.log("Selected Layout:", layout);

        axios.post("http://127.0.0.1:8000/api/create-layout/", {"source": {title: "test", type: layout, style: style}, "header": {component: components.header, images: images.header, texts: texts.header, settings: settings.header},
            "body": {component: components.body, images: images.body, texts: texts.body, settings: settings.body}, "footer": {component: components.footer, images: images.footer, texts: texts.footer, settings: settings.footer},
        }, {headers: {
                Authorization: `Bearer ${user.access}`,
            },}).then((r) => console.log(r))
    };

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
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel>Select Styling</InputLabel>
                <Select value={style} onChange={handleStyleChange}>
                    <MenuItem value="style1">Style 1</MenuItem>
                    <MenuItem value="style2">Style 2</MenuItem>
                    <MenuItem value="style3">Style 3</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Select Layout</InputLabel>
                <Select value={layout} onChange={handleLayoutChange}>
                    <MenuItem value="layout1">Layout 1</MenuItem>
                    <MenuItem value="layout2">Layout 2</MenuItem>
                    <MenuItem value="layout3">Layout 3</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" className={classes.button} onClick={(e) => buildComponent(e)}>
                Build Component
            </Button>
            {layout === "layout1" && <Layout1 account={account} style={styleSelect[style]}/>}
        </div>
    );
};



export function Layout1({account, style}){
    const classes = useStyles();
    const components = useSelector((state) => state.builder.components)
    const images = useSelector((state) => state.builder.images)
    const texts = useSelector((state) => state.builder.texts)
    const settings = useSelector((state) => state.builder.settings)
    console.log(components)
    console.log(images)
    console.log(texts)
    console.log(settings)
    return(<Container>

        <ComponentSelectHeader style={style} account={account} classes={classes} sx={{maxHeight: "800px"}}/>
        <ComponentSelectBody style={style} account={account} classes={classes} sx={{maxHeight: "800px"}}/>
        <ComponentSelectFooter style={style} account={account} classes={classes} sx={{maxHeight: "800px"}}/>
    </Container>)
}


export default ComponentBuilder;
