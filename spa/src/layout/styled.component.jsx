import styled from "styled-components";

export const MainContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-areas: "side body body body body body";
`;

export const SideContainer = styled.div`
  grid-area: side;
  background-color: #424b54;
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
  color: white;
`;

export const BodyContainer = styled.div`
  grid-area: body;
  background-color: #dedfe0;
  color: #232424;
`;

export const SideTitle = styled.div`
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  border-bottom: 2px solid #ddd;
  margin-bottom: 50px;
`;

export const SideGroupTitle = styled.div`
  padding: 10px 20px;
  margin-top: 30px;
  border-bottom: 1px solid #aaa;
`;

export const SideLink = styled.div`
  padding: 5px 30px;
  cursor: pointer;
  &:hover {
    z-index: 10;
    color: #348feb;
  }
`;
