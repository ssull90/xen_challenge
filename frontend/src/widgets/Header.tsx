import styled from "@emotion/styled"
import { Link } from 'react-router-dom'

const HeaderBar = styled('div')`
  height: 10vh;
  width: 100%;
  background-color: #043652;
  text-align: left;
  position: relative;
`

const ZenImage = styled('img')`
  max-width: 75px;
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  margin-left: 2vw;
`

const Header = () => {
  return (
    <HeaderBar>
      <Link to="/">
        <ZenImage src="https://images.squarespace-cdn.com/content/v1/642713796645d27c511b4516/e1d7c3bc-0fe8-4842-a8cd-25236c74a8b8/XEN+WHITE+LOGO+NO+TM.png?format=1500w" alt="XEN" />
      </Link>
    </HeaderBar>
  )
}

export default Header