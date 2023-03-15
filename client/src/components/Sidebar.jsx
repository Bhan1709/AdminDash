import React, { useState } from 'react';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    Typography,
    useTheme,
    Avatar
} from '@mui/material';
import {
    SettingsOutlined,
    ChevronLeft,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
} from '@mui/icons-material';
import FlexBetween from './FlexBetween';
import SidebarSection from './SidebarSection';

const homeSection = {
    heading: null,
    items: [
        {
            text: "Dashboard",
            icon: <HomeOutlined />
        },
    ]
};

const clientSection = {
    heading: "Client Facing",
    items: [
        {
            text: "Products",
            icon: <ShoppingCartOutlined />
        },
        {
            text: "Customers",
            icon: <Groups2Outlined />
        },
        {
            text: "Transactions",
            icon: <ReceiptLongOutlined />
        },
        {
            text: "Geography",
            icon: <PublicOutlined />
        },
    ]
};

const salesSection = {
    heading: "Sales",
    items: [
        {
            text: "Overview",
            icon: <PointOfSaleOutlined />
        },
        {
            text: "Daily",
            icon: <TodayOutlined />
        },
        {
            text: "Monthly",
            icon: <CalendarMonthOutlined />
        },
        {
            text: "Breakdown",
            icon: <PieChartOutlined />
        },
    ]
};

const managementSection = {
    heading: "Management",
    items: [
        {
            text: "Admin",
            icon: <AdminPanelSettingsOutlined />
        },
        {
            text: "Performance",
            icon: <TrendingUpOutlined />
        },
    ]
};

const Sidebar = ({
    user,
    isNonMobile,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen
}) => {
    const theme = useTheme();
    const [isDashboardSection, setIsDashboardSection] = useState(true);
    const [isClientSection, setIsClientSection] = useState(false);
    const [isSalesSection, setIsSalesSection] = useState(false);
    const [isManagementSection, setIsManagementSection] = useState(false);

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer
                    open={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": {
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSixing: "border-box",
                            borderWidth: isNonMobile ? 0 : "2px",
                            width: drawerWidth,
                        },
                    }}
                >
                    <Box width="100%" paddingBottom="5rem">
                        <Box m="1.5rem 2rem 2rem 3rem">
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" gap="0.5rem">
                                    <Typography variant='h4' fontWeight="bold">
                                        AdminDash
                                    </Typography>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                        </Box>
                        <List>
                            <SidebarSection
                                content={homeSection}
                                state={isDashboardSection}
                                setState={setIsDashboardSection}
                            />
                            <SidebarSection
                                content={clientSection}
                                state={isClientSection}
                                setState={setIsClientSection}
                            />
                            <SidebarSection
                                content={salesSection}
                                state={isSalesSection}
                                setState={setIsSalesSection}
                            />
                            <SidebarSection
                                content={managementSection}
                                state={isManagementSection}
                                setState={setIsManagementSection}
                            />
                        </List>
                    </Box>
                    <Box
                        position="fixed"
                        bottom="0"
                        backgroundColor={theme.palette.background.alt}
                        width="inherit"
                    >
                        <Divider />
                        <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem" paddingBottom="1rem">
                            <Avatar
                                alt={user.name}
                                src={`${process.env.REACT_APP_BASE_URL}/assets/p5.jpeg`}
                                sx={{ width: "45px", height: "45px" }}
                            />
                            <Box textAlign="left">
                                <Typography
                                    fontWeight="bold"
                                    fontSize="0.9rem"
                                    sx={{ color: theme.palette.secondary[100] }}
                                >
                                    {user.name}
                                </Typography>
                                <Typography
                                    fontSize="0.8rem"
                                    sx={{ color: theme.palette.secondary[200] }}
                                >
                                    {user.occupation}
                                </Typography>
                            </Box>
                            <SettingsOutlined
                                sx={{
                                    color: theme.palette.secondary[300],
                                    fontSize: "25px"
                                }}
                            />
                        </FlexBetween>
                    </Box>
                </Drawer>
            )}
        </Box>
    );
}

export default Sidebar;