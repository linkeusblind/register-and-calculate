import Header from '../components/Header';
import CalculateItem from '../components/CalculateItem';
import UserHistory from '../components/UserHistory'


const HomePage: React.FC = () => {


    return (
        <div>
            <Header />
            <CalculateItem />
            <UserHistory />
        </div>
    );
};

export default HomePage;