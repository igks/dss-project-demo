import { BodyContainer } from "./styled.component";
import NavBar from "./NavBar";
import Router from "./../routes/Router";

const BodyContent = () => {
  return (
    <BodyContainer data-testid="body-content-container">
      <NavBar />
      <Router />
    </BodyContainer>
  );
};

export default BodyContent;
