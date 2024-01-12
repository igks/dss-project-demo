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
    <SideContainer>
      <SideTitle>Navigation</SideTitle>
      {menu.map((m) => (
        <Fragment key={m.group}>
          <SideGroupTitle>{m.group}</SideGroupTitle>
          {m.child.map((c) => (
            <SideLink key={c.label} onClick={() => navigateTo(c.path)}>
              {c.label}
            </SideLink>
          ))}
        </Fragment>
      ))}
    </SideContainer>
  );
};

export default SideBar;
