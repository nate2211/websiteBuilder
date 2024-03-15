import useAccountID from "../hooks/useAccountID";
import {useParams} from "react-router-dom";
import {CircularProgress, Container,List, ListItem, Typography} from "@mui/material";
import Navbar from "./Navbar";
import MusicPlayer from "./MusicPlayer";


export default function GetShop(){
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
            <Navbar account={false} search={false} header={account.firstname + " " + account.lastname} home={true} contact={true} about={true} shop={true} accountModel={account}/>
            <List>
                {account.products.map((product, i) =>{
                    console.log(product)
                    return(<ListItem key={i}><Typography>{product.name}</Typography><MusicPlayer src={"http://127.0.0.1:8000" + product.file}/> </ListItem>)
                })}
            </List>
        </Container>
    );
}

