
import './App.css';
import Registration from './components/registration';
import Login from './components/login';
import Profile from './components/profile';
import ProfileSearch from './components/search-profiles';
import ReceivedRequests from './components/ReceivedRequests';

function App() {
  return (
    <div className="App">         
      <Registration></Registration>
      <div>
      <Login></Login>
      <h3>@test.com Test@1234</h3>
      <Profile></Profile>    
      </div>
    <ProfileSearch></ProfileSearch>
    <ReceivedRequests />
            

    </div>
  );
}

export default App;
  