import { FC } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';

const NavbarComponent: FC<{}> = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const onHomeClick = () => {
    history.push('/');
  };
  const onLatestClick = () => {
    history.push('/latest');
  };

  return (
    <Navbar bg="light" expand="md" className="navbar">
      <Container>
        <Navbar.Brand onClick={onHomeClick} className="navbar__brand">
          Block Explorer
        </Navbar.Brand>
        <Nav className="mr-auto ml-5">
          {pathname !== '/' && <Nav.Link onClick={onHomeClick}>Home</Nav.Link>}
          {pathname !== '/latest' && (
            <Nav.Link onClick={onLatestClick}>Latest </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
