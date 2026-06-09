import Role from "../role/role";
import Store from "../storePage/store";
import User from "../user/user";

const Home = () => {
    return (
        <div>
            <User />
            <Role />
            <Store />
            
        </div>
    );
}

export default Home;