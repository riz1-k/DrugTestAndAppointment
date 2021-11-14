import { Route, Switch, useHistory } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/Home';
import UserNavigation from './components/Patient/Navigation';
import Appoinment from './components/Patient/Appoinment';
import Test from './components/Doctor/Test';

const MainRouter = () => {
  const history = useHistory();
  const [nav, setNav] = useState(
    history.location.pathname.substr(0, 6) === '/admin'
  );

  history.listen(location => {
    if (location.pathname.substr(0, 6) === '/admin') {
      setNav(true);
    } else {
      setNav(false);
    }
  });
  return (
    <div>
      <UserNavigation />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/appointment' exact component={Appoinment} />
        <Route path='/test' exact component={Test} />
      </Switch>
    </div>
  );
};

export default MainRouter;
