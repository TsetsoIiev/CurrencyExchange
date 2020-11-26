import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home'
import { NavLink, Container } from 'reactstrap';
import MessageIcon from '@material-ui/icons/Message';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
    navLink: {
        padding: 0
    },
    textDark: {
        color: 'black'
    }
}));

export default function NavBarListItems() {

    const classes = useStyles();

    return (
        <div>
            <Container>
                <NavLink tag={Link} className={classes.navLink} to="/">
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText className={classes.textDark} primary="Home" />
                    </ListItem>
                </NavLink>
                <NavLink tag={Link} className={classes.navLink} to="/about-us" >
                    <ListItem button>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText className={classes.textDark} primary="About us" />
                    </ListItem>
                </NavLink>
                <NavLink tag={Link} className={classes.navLink} to="/contact-us">
                    <ListItem button>
                        <ListItemIcon>
                            <MessageIcon />
                        </ListItemIcon>
                        <ListItemText className={classes.textDark} primary="Contact us" />
                    </ListItem>
                </NavLink>
            </Container >
        </div >
    );
}
