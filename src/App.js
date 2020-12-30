import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import PostPage from "./pages/PostPage";
import PostListContainer from "./containers/PostListContainer";




function App() {
  return (
    < >
       <Route path="/" component={PostListContainer} exact></Route>
       <Route path="/:id" component={PostPage} ></Route>
    </ >
  );
}

export default App;
