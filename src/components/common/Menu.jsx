import { Navbar, Nav, Container, Button} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Menu = ({ usuarioLogueado, setUsuarioLogueado }) => {
  const navegacion = useNavigate()
  const logout = ()=>{
    localStorage.removeItem('tokenCafeBenito');
    setUsuarioLogueado({});
    navegacion('/')
}


  return (
    <Navbar bg="danger" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Benito Santos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className='nav-item nav-link'>
              Inicio
            </NavLink>
            {usuarioLogueado.nombre ? (
              <>
                <NavLink end to="/administrar" className="nav-item nav-link">
                  Administrar
                </NavLink>
                <NavLink end to="/administrar/registro" className="nav-item nav-link">
                  registro
                </NavLink>
                <Button variant='dark' onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <NavLink end to="/login" className="nav-item nav-link">
                login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
