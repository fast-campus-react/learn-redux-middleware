import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import PostPage from "./pages/PostPage";
import PostListContainer from "./containers/PostListContainer";
import CounterContainer from "./containers/CounterContainer";



function App() {
  return (
    < >
    <CounterContainer></CounterContainer>
       <Route path="/" component={PostListContainer} exact></Route>
       <Route path="/:id" component={PostPage} ></Route>
    </ >
  );
}

export default App;
