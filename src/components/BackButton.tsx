import styled from "styled-components";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRightFromBracket,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const Back = styled.div`
  position: absolute;
  left: 15px;
  top: 48px;
  color: ${(props) => props.theme.tileColor};
`;

export const BackButton = () => {
  return (
    <Back>
      <Link to={"../"}>
        <FontAwesomeIcon icon={faChevronLeft} fontSize={28} />
      </Link>
    </Back>
  );
};
