import React from "react";
import { MainContainer } from "./styled.component";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import BodyContent from "./BodyContent";

const Layout = () => {
  return (
    <MainContainer>
      <SideBar />
      <BodyContent />
    </MainContainer>
  );
};

export default Layout;
