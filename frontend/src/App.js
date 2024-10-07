import React from "react";
import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route, Switch } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import CapturePage from './components/CapturePage/CapturePage'
import MyPostsPage from './components/MyPostsPage/MyPostsPage'
import UserAccountPage from './components/UserAccountPage/UserAccountPage'
import NotificationsPage from './components/NotificationsPage/NotificationsPage'
import ExplorePage from './components/ExplorePage/ExplorePage'
import EditPostPage from "./components/MyPostsPage/EditPostPage";
import EditExplorePage from "./components/ExplorePage/EditExplorePage";
import Sidebar from "./components/Sidebar";
import AdminSidebar from "./components/Admin/AdminSidebar";
import MyPostPage from "./components/MyPostsPage/MyPostPage";
import DashboardPage from "./components/Admin/Dashboard/Dashboard";
import UsersPage from "./components/Admin/Users/Users";
import PostsPage from "./components/Admin/Posts/Posts";
import EnquiryPage from "./components/Admin/Enquiry/Enquiry";
import Footer from "./components/Footer";
import Blog from "./components/Blog/Blog";
import AboutUs from "./components/AboutUs/AboutUs";
import BlogPost from "./components/Admin/Blogs/BlogPost";
import ReadBlog from "./components/Blog/ReadBlog";
import Profile from "./components/Admin/Profile/Profile";
import Navbar from "./components/Navbar";
import NotFound from "./NotFound";
import BlogManagement from "./components/Admin/Blogs/BlogManagement";
import BlogEdit from "./components/Admin/Blogs/BlogEdit";
import PostEdit from "./components/Admin/Posts/PostEdit";
import ResetPassword from "./Pages/ResetPassword";
import EmailVerify from "./Pages/EmailVerify";
import PostView from "./components/Admin/Posts/PostView";
import BlogView from "./components/Admin/Blogs/BlogView";
import UserEdit from "./components/Admin/Users/UserEdit";
import AddPost from "./components/Admin/Posts/AddPost";
import AddUser from "./components/Admin/Users/AddUser";
import FaqPage from "./components/UserAccountPage/FaqPage";
import Terms from "./components/Terms/Terms";
import Privacy from "./components/Terms/Privacy";
// import ForgotPassword from "./components/Authentication/ForgotPassword";

// function App() {
class App extends React.Component {
  constructor(props) {
    super(props);

    // Moblie first
    this.state = {
      isOpen: false,
      isMobile: true
    };

    this.previousWidth = -1;
  }

  updateWidth() {
    const width = window.innerWidth;
    const widthLimit = 250;
    const isMobile = width <= widthLimit;
    const wasMobile = this.previousWidth <= widthLimit;

    if (isMobile !== wasMobile) {
      this.setState({
        isOpen: !isMobile
      });
    }

    this.previousWidth = width;
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth.bind(this));
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };


  render() {
    return (
      <>
      <div className="App">
        <Navbar />  
        <AdminSidebar toggle={this.toggle} isOpen={this.state.isOpen} />
        <Sidebar toggle={this.toggle} isOpen={this.state.isOpen} />
        <div className="d-flex flex-column w-100">    
        {/* <Route path='/forgotpassword' component={ForgotPassword}/>       */}
        <Switch>
          <Route path="/" component={Homepage} exact/>   
          <Route path="/chats" component={Chatpage} />      
          <Route path="/capture" component={CapturePage}/>
          <Route path="/posts" component={MyPostsPage} />
          <Route path="/blog" component={Blog} />
          <Route path='/blogs/:id' component={ReadBlog} />
          <Route path="/post/:id" component={MyPostPage} />
          <Route path="/post_edit/:id" component={EditPostPage} />
          <Route path="/explore" component={ExplorePage} />     
          <Route path="/comment/:id" component={EditExplorePage} />     
          <Route path="/notifications" component={NotificationsPage} />
          <Route path="/account" component={UserAccountPage} />
          <Route path="/faq" component={FaqPage} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path='/resetpassword/:id' component={ResetPassword} />
          <Route path='/emailverify/:id' component={EmailVerify} />
          <Route path="/terms" component={Terms} />
          <Route path="/privacy" component={Privacy} />

          <Route path="/admin/dashboard" component={DashboardPage} />      
          <Route path="/admin/users" component={UsersPage} />  
          <Route path="/admin/adduser" component={AddUser} /> 
          <Route path="/admin/user/:id/edit" component={UserEdit} />   
          <Route path="/admin/posts" component={PostsPage} />  
          <Route path="/admin/addpost" component={AddPost} />
          <Route path='/admin/post/:id/edit' component={PostEdit}/> 
          <Route path="/admin/post/:id/view" component={PostView} />
          <Route path='/admin/blog' component={BlogManagement} />  
          <Route path='/admin/blogs/:id/edit' component={BlogEdit} /> 
          <Route path='/admin/blogs/:id/view' component={BlogView} />
          <Route path='/admin/blogpost' component={BlogPost} />   
          <Route path='/admin/profile' component={Profile} />
          <Route path="/admin/enquiry" component={EnquiryPage} />  
          <Route path="/*" component={NotFound} />
        </Switch>
        <Footer />    
        </div>
      </div>
      
      </>
    );
  }
}

export default App;
