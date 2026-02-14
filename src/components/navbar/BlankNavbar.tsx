"use client";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { DispatchType, StoreType } from "@/reduxSystem/store";
import {
  setAdminFalse,
  setLoginFalse,
} from "@/reduxSystem/slices/mainStatesSlice";
import { getUserCart } from "@/reduxSystem/slices/cartSlice";

function BlankNavbar() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const pages = [
    {
      page: "Home",
      path: "/",
    },
    {
      page: "Shop",
      path: "/shop",
    },
  ];

  const CartBadge = styled(Badge)`
    & .${badgeClasses.badge} {
      top: -12px;
      right: -6px;
    }
  `;

  const { isAdmin } = useSelector((state: StoreType) => state.mainStatesSlice);
  const { userCart } = useSelector((state: StoreType) => state.cartSlice);
  const dispatch = useDispatch<DispatchType>();

  const router = useRouter();
  const pathName = usePathname();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  useEffect(() => {
    dispatch(getUserCart(localStorage.getItem("token")!));
  }, [dispatch]);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function hundleLogout(): void {
    localStorage.removeItem("token");
    if (localStorage.role) {
      localStorage.removeItem("role");
    }
    dispatch(setLoginFalse());
    dispatch(setAdminFalse());
    handleClose();

    router.replace("/login");
  }

  return (
    <AppBar position="fixed">
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: 2, md: 5, lg: 10 },
          background: "rgba(217, 215, 236, 1)",
          color: "black",
        }}
      >
        <Toolbar disableGutters>
          <Dialog
            open={open}
            onClose={handleClose}
            disableScrollLock
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{ color: "rgb(133, 21, 21)" }}
            >
              {"Log out"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are ypu sure you want to logout ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button
                sx={{ color: "rgb(133, 21, 21)" }}
                onClick={hundleLogout}
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>

          {/* main */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              src="/logo.png"
              alt="logo"
              width={180}
              height={20}
              priority
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "100%",
              }}
              sizes="(max-width: 360px) 120px, 180px"
            />
          </Typography>

          {/* large screen */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              mx: "auto",
              pl: 5,
            }}
          >
            {pages.map(({ page, path }) => (
              <Button
                key={page}
                onClick={() => {
                  router.push(path);
                  handleCloseNavMenu();
                }}
                sx={{
                  my: 2,
                  color: pathName == path ? "black" : "gray",
                  display: "block",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* main */}

          <Box
            sx={{
              ml: "auto",
              display: "flex",
              flexDirection: "row",
              gap: 2,
            }}
          >
            {/* small screen */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                disableScrollLock
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map(({ page, path }) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      router.push(path);
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        color: pathName == path ? "black" : "gray",
                      }}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <IconButton onClick={() => router.push("/cart")}>
              <ShoppingCartIcon fontSize="medium" />
              <CartBadge
                badgeContent={userCart.length}
                color="primary"
                overlap="circular"
              />
            </IconButton>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://tecdn.b-cdn.net/img/new/avatars/2.webp"
                />
              </IconButton>
            </Tooltip>
            <Menu
              disableScrollLock
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isAdmin && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <AdminPanelSettingsIcon sx={{ mr: 1 }} />
                  <Typography
                    onClick={() => router.push("/admin")}
                    sx={{ textAlign: "stert" }}
                  >
                    Dashboard
                  </Typography>
                </MenuItem>
              )}

              <MenuItem onClick={handleCloseUserMenu}>
                <AccountCircleIcon sx={{ mr: 1 }} />
                <Typography
                  onClick={() => router.push("/profile")}
                  sx={{ textAlign: "stert" }}
                >
                  Profile
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={handleCloseUserMenu}
                sx={{ color: "rgb(202, 55, 55)" }}
              >
                <LogoutIcon sx={{ mr: 1 }} />
                <Typography
                  component={Button}
                  onClick={handleClickOpen}
                  sx={{ textAlign: "stert", color: "rgb(202, 55, 55)" }}
                >
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default BlankNavbar;
