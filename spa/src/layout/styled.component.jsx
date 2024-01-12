import styled from "styled-components";

export const MainContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-areas: "side body body body body body";
`;

export const SideContainer = styled.div`
  grid-area: side;
  background-color: #6a6c6e;
`;

export const NavContainer = styled.div`
  height: 60px;
  background-color: #348feb;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 20px;
  font-size: 24px;
  font-weight: bold;
`;

export const BodyContainer = styled.div`
  grid-area: body;
  background-color: #d7dce0;
`;

export const SideTitle = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  border-bottom: 2px solid #ddd;
`;
