import {useParams} from "react-router-dom";
import useAccountID from "../../hooks/useAccountID";
import {useSelector} from "react-redux";
import {CircularProgress, Container, Typography} from "@mui/material";
import React from "react";
import {HeaderOne, HeaderTwo} from "../../elements/render_components_header";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles((theme) => ({

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
}));



const styleSelect = {"style1": {"name_shape": "shape1", "image_container": "imageContainer1", "link_container":"linkContainer1"}, "": {}}


export function RenderLayout(){
    let { id } = useParams();
    const { account, loading, error } = useAccountID(id);
    const user = useSelector((state) => state.auth.user);

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
    return(<>
    {account.layouts.map((layout, i) => {
        return(<Container key={i}>
            <h1>{layout.page}</h1>
            {layout.layouts.map((layout, i) => {
                return(<LayoutRender layout={layout} key={i} account={account}/>)
            })}

        </Container>)
    })}

    </>)
}

function LayoutRender({layout, account}){
    const style = styleSelect[layout.style]
    return(<>
        {layout.headers.map((header, i) => {
            return(<HeaderRender header={header} account={account} key={i} style={style}/>)
        })}
    </>)
}
function HeaderRender({header, style, account}){

    return(
        <>
            {header.components.map((component, i) => {
                return(<HeaderComponentRender component={component} account={account} style={style} key={i}/>)
            })}

        </>)
}
function BodyRender({body}){

    return(
        <>
            {body.components.map((component, i) => {
                return(<BodyComponentRender component={component} key={i}/>)
            })}

        </>)
}
function HeaderComponentRender({component, style, account}){
    const images = component.images
    const texts = component.texts
    const settings = component.settings[0]
    const classes = useStyles();
    const components = [<HeaderOne classes={classes} style={style} images={images}/>, <HeaderTwo account={account} style={style} images={images} settings={settings}/> ]




    return(<>
        {components[component.component]}
    </>)
}
function BodyComponentRender(){

    return(<></>)
}