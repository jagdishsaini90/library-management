import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
} from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useNavigate } from "react-router-dom";
import SearchBox from "./searchBox";
import { useAuthContext } from "../auth/authProvider";
import LogoutComponent from "./logoutComponent";

function Header() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

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
            }}
          >
            <LibraryBooksIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                width: "60px",
                height: "60px",
              }}
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
            {user.role === "admin" && (
              <Box style={{ marginLeft: "50px" }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => navigate("/upload-book")}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Upload book
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
