import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/users`);
                console.log(apiUrl);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchData();
    }, [apiUrl]);

    const handleAddUser = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${apiUrl}/users`, { name, address });
            setUsers([...users, { name, address }]);
            setName('');
            setAddress('');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className="app">
            <h1>User Management</h1>
            <form onSubmit={handleAddUser} className="user-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
                <button type="submit">Add User</button>
            </form>
            <h2>Users List</h2>
            <ul className="user-list">
                {users?.map((user, index) => (
                    <li key={index}>
                        <span className="user-name">{user.name}</span>
                        <span className="user-address">{user.address}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
