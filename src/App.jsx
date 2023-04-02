import './App.css';
import { Route } from 'react-router-dom';
import Navigation from './Components/Navigation';
import CurrentBlockPage from './Pages/CurrentBlockPage';
import TransactionInfo from './Pages/TransactionInfo';

function App() {
    return (
        <>
            <div>
                <Navigation />
            </div>
            <div>
                <Route exact path="/" component={CurrentBlockPage} />
                <Route path="/transaction/:transactionHash" component={TransactionInfo} />
            </div>
        </>
    );
}

export default App;
