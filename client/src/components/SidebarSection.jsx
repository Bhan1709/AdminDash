import React, { useEffect, useState } from 'react';
import {
    ChevronRightOutlined,
    AddOutlined,
    RemoveOutlined
} from '@mui/icons-material';
import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
    IconButton
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const SidebarSection = ({ content, state, setState }) => {
    const { heading, items } = content;
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

    return (<>
        {heading && (<ListItem>
            <IconButton onClick={() => setState(!state)} sx={{ m: "0 0.5rem" }}>
                {state ? (<RemoveOutlined />) : (<AddOutlined />)}
            </IconButton>
            <ListItemText>
                {heading}
            </ListItemText>
        </ListItem>
        )}
        {state && (
            items.map(({ text, icon }) => {
                const lcText = text.toLowerCase();
                return (
                    <ListItem key={text} disablePadding>
                        <ListItemButton
                            onClick={() => {
                                navigate(`/${lcText}`);
                                setActive(lcText);
                            }}
                            sx={{
                                backgroundColor: active === lcText
                                    ? theme.palette.secondary[300]
                                    : "transparent",
                                color: active === lcText
                                    ? theme.palette.primary[600]
                                    : theme.palette.secondary[100],
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    ml: "2rem",
                                    color: active === lcText
                                        ? theme.palette.primary[600]
                                        : theme.palette.secondary[200],
                                }}
                            >
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                            {active === lcText && (
                                <ChevronRightOutlined sx={{ ml: "auto" }} />
                            )}
                        </ListItemButton>
                    </ListItem>
                );
            }))
        }
    </>)
}

export default SidebarSection;