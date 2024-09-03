import { Link } from "react-router-dom";

const BlogComponent = ({ blog }) => {
  const month = blog.createdAt.slice(5,7);
  const blogDate = blog.createdAt.slice(8, 10);
  let blogMonth;
  switch (month) {
    case "01":
      blogMonth = "Jan";
      break;
    case "02":
      blogMonth = "Feb";
      break;
    case "03":
      blogMonth = "Mar";
      break;
    case "04":
      blogMonth = "Apr";
      break;
    case "05":
      blogMonth = "May";
      break;
    case "06":
      blogMonth = "Jun";
      break;
    case "07":
      blogMonth = "Jul";
      break;
    case "08":
      blogMonth = "Aug";
      break;
    case "09":
      blogMonth = "Sep";
      break;
    case "10":
      blogMonth = "Oct";
      break;
    case "11":
      blogMonth = "Nov";
      break;
    case "12":
      blogMonth = "Dec";
      break;                    
    default:
      break;
  }
  return (
    <div className="col-lg-4 col-md-4 mb-5" >
      <div className="position-relative mb-4">
        <img className="img-fluid rounded w-100" src={blog.image} alt="blog" />
        <div className="blog-date">
          <h4 className="font-weight-bold mb-n1">{blogDate}</h4>
          <small className="text-white text-uppercase">{blogMonth}</small>
        </div>
      </div>
      <h5 className="font-weight-medium mb-4">
        {blog.title}
      </h5>
      <Link 
      to={`/blogs/${blog._id}`}
      className="btn btn-sm btn-outline-primary py-2">Read More</Link>
    </div>
  );
};

export default BlogComponent;
