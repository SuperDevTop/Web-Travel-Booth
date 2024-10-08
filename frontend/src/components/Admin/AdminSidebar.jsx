import React from 'react'
// import { useHistory } from 'react-router-dom';
import { Nav, Button } from "react-bootstrap";
import classNames from "classnames";

class AdminSidebar extends React.Component {
  // const history = useHistory();
  // const logoutHandler = () => {
  //   localStorage.removeItem("userInfo");
  //   history.push("/");
  // };
  logoutHandler() {
    localStorage.removeItem("userInfo");
    window.location.href="/";
  }

  render(){
    return (
      <div id='AdminSidebar' name='AdminSidebar' className={classNames("sidebar", "shadow", "position-relative", "mt-6", { "is-open": this.props.isOpen })}>
        {/* <div id="logo" className="d-flex justify-content-between">
          <Link to="/admin/dashboard" className="logo d-flex align-items-center">
            <img src={logo} alt="logo" width="70px" height="60px" className='fa fa-beat'/>
            <h1 className="text-uppercase" style={{fontSize:"1.3rem", color:"#012970"}}>travelbooth</h1>
          </Link>
        </div> */}
          <Button 
          variant="link" className="position-absolute top-0 end-0 d-none d-sm-none d-md-none d-lg-inline" 
          style={{marginTop:"75px"}}
          onClick={this.props.toggle}>
            <i className="fa fa-list toggle-icon"  style={{color:"#012970"}} pull="right" />
          </Button>

        <Nav className="px-4 pt-2" style={{marginTop:"75px"}}>
          {/* <Link to='/admin/dashboard' className="w-100"> */}
          <Nav.Item className="w-100">
            <Nav.Link href="/admin/dashboard" className="w-100">
              <i className="bi bi-grid sidebar-item-icon" />
              <span className="sidebar-item-text d-none d-sm-none d-md-none d-lg-inline">Dashboard</span>
            </Nav.Link>
          </Nav.Item>
          {/* </Link> */}
          {/* <Link to='/admin/users' className="w-100"> */}
          <Nav.Item className="w-100">
            <Nav.Link href="/admin/users" className="w-100">
              <i className="fa fa-users sidebar-item-icon" />
              <span className="sidebar-item-text d-none d-sm-none d-md-none d-lg-inline">Users</span>
            </Nav.Link>
          </Nav.Item>
          {/* </Link>
          <Link to='/admin/posts' className="w-100"> */}
          <Nav.Item className="w-100">
            <Nav.Link href="/admin/posts" className="w-100">
              <i className="fa fa-cloud-upload sidebar-item-icon" />
              <span className="sidebar-item-text d-none d-sm-none d-md-none d-lg-inline">Posts</span>
            </Nav.Link>
          </Nav.Item>
          {/* </Link>
          <Link to='/admin/blog' className="w-100"> */}
          <Nav.Item className="w-100">
            <Nav.Link href='/admin/blog' className="w-100">
              <i className='fa fa-blog sidebar-item-icon' />
              <span className='sidebar-item-text d-none d-sm-none d-md-none d-lg-inline'>Blogs</span>
            </Nav.Link>
          </Nav.Item>
          {/* </Link>
          <Link to='/admin/profile' className="w-100"> */}
          <Nav.Item className="w-100">
            <Nav.Link href="/admin/profile" className="w-100">
              <i className="fa fa-user sidebar-item-icon" />
              <span className="sidebar-item-text d-none d-sm-none d-md-none d-lg-inline">Profile</span>
            </Nav.Link>
          </Nav.Item>
          {/* </Link>
          <Link to='/admin/enquiry' className="w-100"> */}
          <Nav.Item className="w-100">
            <Nav.Link href="/admin/enquiry" className="w-100">
              <i className="bi bi-question-circle sidebar-item-icon" />
              <span className="sidebar-item-text d-none d-sm-none d-md-none d-lg-inline">Enquiry</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="w-100">
            <Nav.Link href="/admin/terms" className="w-100">
              <i className="bi bi-shield sidebar-item-icon" />
              <span className="sidebar-item-text d-none d-sm-none d-md-none d-lg-inline">Terms</span>
            </Nav.Link>
          </Nav.Item>
          {/* </Link> */}
          <Nav.Item onClick={this.logoutHandler} className="w-100">
            <Nav.Link >
              <i className="fa fa-sign-out sidebar-item-icon" />
              <span className="sidebar-item-text d-none d-sm-none d-md-none d-lg-inline">Logout</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default AdminSidebar