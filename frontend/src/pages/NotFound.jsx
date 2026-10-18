import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="fullpage-center not-found">
    <h1>Page not found</h1>
    <p>The page you are looking for doesn't exist.</p>
    <Link className="btn btn-primary" to="/">
      Go to dashboard
    </Link>
  </div>
);

export default NotFound;
