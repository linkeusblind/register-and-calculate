import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { db } from '../config/config';
import { query, collection, onSnapshot, QuerySnapshot } from 'firebase/firestore'
import Todo from "../components/models/todo"
type TodosContextObj = {
    items: Todo[];
}

const HomePage: React.FC = () => {
    const auth = getAuth();

    const [names, setNames] = useState<Todo[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'UserNames'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let userNames: any[] = [];
            querySnapshot.forEach((name) => {
                userNames.push({ ...name.data(), id: name.id })
            });
            setNames(userNames);
        });
    })

    return (
        <div>
            <p>Home Page (Protected by Firebase!)</p>
            <button onClick={() => signOut(auth)}>Sign out</button>
        </div>
    );
};

export default HomePage;