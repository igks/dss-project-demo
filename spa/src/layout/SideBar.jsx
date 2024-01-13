import {
  SideContainer,
  SideGroupTitle,
  SideLink,
  SideTitle,
} from "./styled.component";
import { menu } from "./config";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <SideContainer data-testid="side-nav-container">
      <SideTitle data-testid="side-nav-title">Navigation</SideTitle>
      {menu.map((m) => (
        <Fragment key={m.group}>
          <SideGroupTitle data-testid="side-nav-group-title">
            {m.group}
          </SideGroupTitle>
          {m.child.map((c) => (
            <SideLink
              data-testid="side-nav-link"
              key={c.label}
              onClick={() => navigateTo(c.path)}
            >
              {c.label}
            </SideLink>
          ))}
        </Fragment>
      ))}
    </SideContainer>
  );
};

export default SideBar;
