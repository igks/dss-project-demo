import { BodyContainer } from "./styled.component";
import NavBar from "./NavBar";
import Router from "./../routes/Router";

const BodyContent = () => {
  return (
    <BodyContainer>
      <NavBar />
      <Router />
    </BodyContainer>
  );
};

export default BodyContent;
