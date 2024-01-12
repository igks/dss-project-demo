import { MainContainer } from "./styled.component";
import SideBar from "./SideBar";
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
