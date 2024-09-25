import React from "react";
// import { useHistory } from 'react-router-dom';
import { Nav, Button } from "react-bootstrap";
import { Link } from 'react-router-dom'
import classNames from "classnames";
import logo from "../assets/logo.png";

class Sidebar extends React.Component {
  // const history = useHistory();
  // const logoutHandler = () => {
  //   localStorage.removeItem("userInfo");
  //   history.push("/");
  // };
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChatClick = this.handleChatClick.bind(this);
  }
  state = {
    data: false
  };
  handleClick() {
    this.setState({ data: false });
    console.log(this.state.data) // Update the state from false to true when the button is clicked
  }

  handleChatClick() {
    this.setState({ data: true });
    console.log(this.state.data) // Update the state from false to true when the button is clicked
  }
  componentDidMount() {
    // This is equivalent to useEffect with an empty dependency array
    console.log('Component mounted');
    // console.log(window.location.pathname);
    if(window.location.pathname === '/chats'){
      this.setState({data: true});    
    }
    // window.location.reload();
  }

  componentDidUpdate(prevProps, prevState) {
    // This is equivalent to useEffect with dependencies
    console.log('Component updated');
    
    // Check if a data state has changed
    if (this.state.data !== prevState.data) {
      console.log('Data state has changed');      
    }
    // this.setState({data:false})
    // 
  }

  componentWillUnmount() {
    // This is equivalent to useEffect cleanup
    console.log('Component will unmount');
    
  }
  logoutHandler() {
    localStorage.removeItem("userInfo");
    window.location.href = "/";
  }
 
  render() {
    return (
      <div
        id="mySidebar"
        name="mySidebar"
        className={classNames("sidebar", "shadow", "position-relative", {
          "is-open": this.props.isOpen,
        })}
      >
        { this.state.data === true && (
          <div id="logo" className="d-flex justify-content-between" onClick={this.handleClick}>
          <Link to="/capture" className="logo d-flex align-items-center">
            <img src={logo} alt="logo" width="70px" height="60px" className='fa fa-beat'/>
            <h1 className="text-uppercase d-none d-sm-none d-md-none d-lg-inline" style={{fontSize:"1.3rem", color:"#012970"}}>travelbooth</h1>
          </Link>
        </div>
        )}
        
          <Button variant="link" className="position-absolute top-0 end-0 d-none d-sm-none d-md-none d-lg-inline" style={{marginTop:this.state.data !== true&&"75px"}} onClick={this.props.toggle}>
            <i className="fa fa-list toggle-icon"  style={{color:"#012970"}} pull="right" />
          </Button>        

        <Nav className="px-4 pt-2" style={{marginTop:this.state.data !== true&&"75px"}}>
          {/* <Link to="/capture" className="w-100" onClick={this.handleClick}> */}
          <Nav.Item className="w-100" onClick={this.handleClick}>
            <Nav.Link  href="/capture" className="w-100">
              <i className="fa fa-cloud-upload sidebar-item-icon" />
              <span className="sidebar-item-text d-none d-sm-none d-md-none d-lg-inline">Capture</span>
            </Nav.Link>
          </Nav.Item>
          {/* </Link> */}
          {/* <Link to="/posts" className="w-100" onClick={this.handleClick}> */}
          <Nav.Item className="w-100" onClick={this.handleClick}>
            <Nav.Link href="/posts" className="w-100">
              <i className="fa fa-home sidebar-item-icon" />
              <span className="sidebar-item-text d-none d-sm-none d-md-none d-lg-inline">My Posts</span>
            </Nav.Link>
          </Nav.Item>
          {/* </Link>
          <Link to ="/blog" className="w-100" onClick={this.handleClick}> */}
          <Nav.Item className="w-100" onClick={this.handleClick}>
            <Nav.Link href="/blog" className="w-100">
              <i className="fas fa-blog sidebar-item-icon"></i>
              <span className="sidebar-item-text d-none d-sm-none d-md-none d-lg-inline">Blogs</span>
            </Nav.Link>
          </Nav.Item>
          {/* </Link>
          <Link to ="/explore" className="w-100" onClick={this.handleClick}> */}
          <Nav.Item className="w-100" onClick={this.handleClick}>
            <Nav.Link href="/explore" className="w-100">
              <i className="fa fa-eye sidebar-item-icon" />
              <span className="sidebar-item-text d-none d-sm-none d-md-none d-lg-inline">Explore</span>
            </Nav.Link>
          </Nav.Item>
          {/* </Link>
          <Link to ="/chats" className="w-100" onClick={this.handleChatClick}> */}
          <Nav.Item className="w-100" onClick={this.handleClick}>
            <Nav.Link href="/chats" className="w-100">
              <i className="fa fa-comment sidebar-item-icon" />
              <span className="sidebar-item-text d-none d-sm-none d-md-none d-lg-inline">Chat</span>
            </Nav.Link>
          </Nav.Item>
          {/* </Link>
          <Link to ="/notifications" className="w-100" onClick={this.handleClick}> */}
          <Nav.Item className="w-100" onClick={this.handleClick}>
            <Nav.Link href="/notifications" className="w-100">
              <i className="fa fa-bell sidebar-item-icon" />
              <span className="sidebar-item-text d-none d-sm-none d-md-none d-lg-inline">Notifications</span>
            </Nav.Link>
          </Nav.Item>
          {/* </Link>
          <Link to ="/account" className="w-100" onClick={this.handleClick}> */}
          <Nav.Item className="w-100" onClick={this.handleClick}>
            <Nav.Link href="/account" className="w-100">
              <i className="fa fa-user sidebar-item-icon" />
              <span className="sidebar-item-text d-none d-sm-none d-md-none d-lg-inline">User Account</span>
            </Nav.Link>
          </Nav.Item>
          {/* </Link> */}
          {/* <Nav.Item>
            <Nav.Link href='/contact'>
              <i className='fa fa-envelope sidebar-item-icon' />
              <span className='sidebar-item-text'>Contact Us</span>
            </Nav.Link>
          </Nav.Item> */}
          {/* <Link to ="/aboutus" className="w-100" onClick={this.handleClick}> */}
          <Nav.Item className="w-100" onClick={this.handleClick}>
            <Nav.Link href="/aboutus" className="w-100">
              <i className="fa fa-users sidebar-item-icon" />
              <span className="sidebar-item-text d-none d-sm-none d-md-none d-lg-inline">About Us</span>
            </Nav.Link>
          </Nav.Item>
          {/* </Link> */}
          <Nav.Item onClick={this.logoutHandler} className="w-100">
            <Nav.Link className="w-100">
              <i className="fa fa-sign-out sidebar-item-icon" />
              <span className="sidebar-item-text d-none d-sm-none d-md-none d-lg-inline">Logout</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default Sidebar;
