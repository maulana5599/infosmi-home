import { useTranslation } from "react-i18next";
import MenuItems from "./MenuItems";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  AirplaneTicket,
  AppRegistration,
  History,
  Inbox,
  Login,
  Logout,
  Mail,
} from "@mui/icons-material";
import AuthCheck from "./utils/auth";
import { useRouter } from "next/router";

export default function Header() {
  const menus = MenuItems();
  const { t, i18n, ready } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [openDrawer, setOpen] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setTimeout(() => {
      window.location.href = "/";
    }, 300);
  };

  useEffect(() => {
    const auth = AuthCheck();
    if (auth !== undefined) {
      if (auth.is_auth) {
        setIsAuth(auth.is_auth);
      }
    }
  }, []);

  if (!ready) return "loading translations...";

  return (
    <div className="header-area" style={{ marginBottom: "50px" }}>
      <div
        className="navbar-area navbar-two"
        style={{
          zIndex: 999,
          backgroundColor: "#152955",
          boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg">
                <Link className="navbar-brand" href="/">
                  <img
                    width={100}
                    className="img-thumbnail"
                    src="http://localhost:8084/infosmi.png"
                    alt="Logo"
                  />
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarTwo"
                  aria-controls="navbarTwo"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={toggleDrawer(true)}
                >
                  <span className="toggler-icon" />
                  <span className="toggler-icon" />
                  <span className="toggler-icon" />
                </button>
                <div
                  className="collapse navbar-collapse sub-menu-bar"
                  id="navbarTwo"
                >
                  <ul className="navbar-nav m-auto"></ul>
                </div>
                <div className="navbar-btn d-none d-sm-inline-block">
                  {isAuth ? (
                    <>
                      <Link href="/transaction">
                        <Button
                          variant="outlined"
                          color="primary"
                          startIcon={<History />}
                          sx={{ color: "white" }}
                        >
                          <Typography
                            fontFamily={"monospace"}
                            color={"white"}
                            style={{ textTransform: "capitalize" }}
                            component={"p"}
                            fontWeight={"bold"}
                          >
                            Transactions
                          </Typography>
                        </Button>
                      </Link>
                      <Button
                        className="mx-2"
                        variant="outlined"
                        color="primary"
                        startIcon={<AirplaneTicket />}
                        sx={{ color: "white" }}
                      >
                        <Typography
                          fontFamily={"monospace"}
                          color={"white"}
                          style={{ textTransform: "capitalize" }}
                          component={"p"}
                          fontWeight={"bold"}
                        >
                          Ticket
                        </Typography>
                      </Button>
                      <IconButton
                        aria-label="delete"
                        id="dropdown-button"
                        aria-controls={open ? "dropdown-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      >
                        <Image
                          width={50}
                          height={50}
                          src="/profile.webp"
                          alt="image-profile"
                        />
                      </IconButton>
                      <Menu
                        id="dropdown-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "dropdown-button",
                        }}
                      >
                        <MenuItem onClick={handleClose}>
                          <Button
                            startIcon={<Logout />}
                            variant="outlined"
                            color="primary"
                            onClick={handleLogout}
                          >
                            <Typography
                              fontFamily={"monospace"}
                              textTransform={"capitalize"}
                              component={"p"}
                              fontWeight={"bold"}
                              color={"primary"}
                            >
                              Logout
                            </Typography>
                          </Button>
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <>
                      <Link href={"/login"}>
                        <Button
                          startIcon={<Login />}
                          variant="outlined"
                          color="primary"
                          sx={{ color: "white" }}
                        >
                          <Typography
                            fontFamily={"monospace"}
                            textTransform={"capitalize"}
                            color={"white"}
                            component={"p"}
                            fontWeight={"bold"}
                          >
                            Login
                          </Typography>
                        </Button>
                      </Link>

                      <Link href={"/register"}>
                        <Button
                          className="mx-3"
                          startIcon={<AppRegistration />}
                          variant="outlined"
                          color="primary"
                          sx={{ color: "white" }}
                        >
                          <Typography
                            fontFamily={"monospace"}
                            textTransform={"capitalize"}
                            color={"white"}
                            component={"p"}
                            fontWeight={"bold"}
                          >
                            Sign Up
                          </Typography>
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
        <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
          <DrawerComponent />
        </Drawer>
      </div>
      <div id="home"></div>
    </div>
  );
}

const DrawerComponent: React.FC = () => {
  const router = useRouter();

  const changePage = (page: string) => {
    router.push(`/${page}`);
  };
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              marginX: 1,
              marginY: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              width={50}
              height={50}
              src="/profile.webp"
              alt="image-profile"
              style={{ marginRight: 10 }}
            />
            <Typography
              fontWeight={"bold"}
              fontFamily={"monospace"}
              component={"p"}
            >
              Maulana Muhammad Rizky
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider />

      <List>
        <ListItem key={"menu"} disablePadding>
          <ListItemButton
            component="a"
            onClick={() => changePage("transaction")}
          >
            <ListItemIcon>
              <Mail />
            </ListItemIcon>
            <ListItemText primary={"Transactions"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};
