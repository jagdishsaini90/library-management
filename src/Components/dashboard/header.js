import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchBox from "./searchBox";
import { useAuthContext } from "../auth/authProvider";
import LogoutComponent from "./logoutComponent";
import logo from "../../assests/logo.png";

function Header() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { role } = user;

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          style={{
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
              src={logo}
              alt="logo"
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
                fontSize: "40px",
              }}
            >
              Books
            </Typography>
            {(role === "admin" || role === "librarian") && (
              <Box style={{ marginLeft: "50px" }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() =>
                    navigate(role === "admin" ? "/upload-book" : "/issue-book")
                  }
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {role === "admin" ? "Upload book" : "Issue book"}
                </Button>
              </Box>
            )}
          </div>

          <div
            style={{
              display: "flex",
            }}
          >
            <SearchBox />
            <LogoutComponent />
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
