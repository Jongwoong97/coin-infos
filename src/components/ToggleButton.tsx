import {
  useRecoilValue,
  useRecoilValueLoadable_TRANSITION_SUPPORT_UNSTABLE,
  useSetRecoilState,
} from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

interface IButtonProps {
  rightPosition: string;
}

const Button = styled.button`
  border: none;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.tileColor};
  position: absolute;
  top: 12px;
  right: ${(props: IButtonProps) => props.rightPosition};
`;

interface IToggle {
  rightPosition: string;
}

export const ToggleButton = ({ rightPosition }: IToggle) => {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <Button onClick={toggleDarkAtom} rightPosition={rightPosition}>
      <FontAwesomeIcon icon={isDark ? faMoon : faSun} fontSize={28} />
    </Button>
  );
};
