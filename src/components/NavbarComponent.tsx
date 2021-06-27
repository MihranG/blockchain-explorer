import { FC, useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { Container, Navbar, Nav, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { resetApp } from '../store/blockSlice';

const NavbarComponent: FC<{}> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { errorMessage } = useSelector((state: RootState) => state.block);
  const onHomeClick = () => {
    history.push('/');
  };
  const onLatestClick = () => {
    history.push('/latest');
  };

  useEffect(() => {
    if (errorMessage) {
      dispatch(resetApp());
    }
  }, [dispatch, errorMessage, history.location.pathname]);

  return (
    <>
      <Navbar bg="light" expand="md" className="navbar">
        <Container>
          <Navbar.Brand onClick={onHomeClick} className="navbar__brand">
            Block Explorer
          </Navbar.Brand>
          <Nav className="mr-auto ml-5">
            {pathname !== '/' && (
              <Nav.Link onClick={onHomeClick}>Home</Nav.Link>
            )}
            {pathname !== '/latest' && (
              <Nav.Link onClick={onLatestClick}>Latest </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      {errorMessage && (
        <Alert variant="warning" className="d-flex justify-content-around ">
          {errorMessage}
          <Link to="/">Go Home </Link>
        </Alert>
      )}
    </>
  );
};

export default NavbarComponent;
