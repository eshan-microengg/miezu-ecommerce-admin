import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Icons from '../icons';
import { faPowerOff, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import ToastNotification, { showToast } from '../toastify';
import { useNavigate } from 'react-router';

const NavBar = (props) => {
  const navigate = useNavigate();
  const { brandName, profileName, profileOption } = props

  const data = sessionStorage.getItem('data');
  const AdminName = JSON.parse(data).full_name;

  const handleLogout = () => {
    sessionStorage.clear()
    showToast('Logged Out Successfully', 'success')
    setTimeout(() => {
      navigate("/")
    }, 1000);
  }

  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-white mb-3" style={{ boxShadow: '0px 2px 5px rgb(219, 218, 218)', padding: "20px" }}>
          <Container fluid>
            <Navbar.Brand href="/homepage"><img src={brandName} height="30px" /></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Navbar.Brand style={{ marginRight: "-1px" }}><Icons iconName={faUserCircle} /></Navbar.Brand>
                  <NavDropdown
                    title={AdminName}
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  // style={{marginRight:"100px"}}
                  >
                    <NavDropdown.Item onClick={handleLogout}><Icons iconName={faPowerOff} />{profileOption}</NavDropdown.Item>
                  </NavDropdown>
                </Nav>

              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
          <ToastNotification />
        </Navbar>
      ))}
    </>
  );
}

NavBar.propTypes = {
  brandName: PropTypes.string,
  profileName: PropTypes.string,
  profileOption: PropTypes.string
}

export default NavBar;