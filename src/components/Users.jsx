import {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {setUsers, addUser, deleteUser, sortUsers} from "../store/usersSlice.js";
import {Link} from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";

export default function Users() {
    const users = useSelector((state) => state.users.users);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newCompanyName, setNewComanyName] = useState('');
    const [sort, setSort] = useState(true);
    const usersFromRedux = useSelector(state => state.users.users);



    useEffect(() => {
        if (usersFromRedux.length === 0) {
            const fetchUsers = async () => {
                try {
                    const res = await fetch('https://jsonplaceholder.typicode.com/users');
                    const data = await res.json();
                    dispatch(setUsers(data));
                } catch (error) {
                    console.error("Error while fetching users", error)
                }
            };
            fetchUsers();
        }
    }, []);

    const AddUser = (e) => {
        e.preventDefault();

        if(!newName.trim() || !newEmail.trim()) return;
        const newUser ={
            id: Date.now(),
            name: newName,
            email: newEmail,
            username:'',
            address: {
                street: 'Kulas Light',
                suite: 'Apt. 556',
                city: 'Gwenborough',
                zipcode: '92998-3874',
                geo: {
                    lat: '-37.3159',
                    lng: '81.1496'
                },
            },
            phone: '',
            website: '',
            company: {
                name: newCompanyName,
                catchPhrase: 'Multi-layered client-server neural-net',
                bs: 'harness real-time e-markets'
            },

        };

        dispatch(addUser(newUser));

        setNewName('');
        setNewEmail('');
        setNewComanyName('');
    };

    const DeleteUser = (id) => {
        dispatch(deleteUser(id));
    };

    const handleSortUsers = () => {
        const newSort = !sort;
        setSort(newSort);
        dispatch(sortUsers(newSort ? 'asc' : 'desc'));
    };


    return (
        <div className=" py-6 mx-auto w-full max-w-72 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-[90%] px-6">
            <div className="text-center mb-10 text-2xl font-medium">
                <h2>React Internship Challenge - User Management App</h2>
            </div>
            <div className="bg-gradient-to-t from-teal-200/60 via-gray-100 to-white/40 backdrop-blur-xl border border-white/30 border-t-gray-50 shadow-lg sm:rounded-lg rounded-lg overflow-hidden">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-2 border-b border-gray-500 focus:outline-none "
                    />
                </div>
                <div className="overflow-x-auto max-h-96">
                    <table className="w-full text-sm text-left text-[#2F2F2F]">
                        <thead className="text-xs uppercase bg-[#2F2F2F] text-white sticky top-0 z-10">
                        <tr>
                            <th scope="col" className="flex items-center gap-x-2 px-4 py-3 hover:cursor-pointer" onClick={handleSortUsers}>Name {sort ? "( A-Z )" : "( Z-A )" }</th>
                            <th scope="col" className="px-4 py-3">Email</th>
                            <th scope="col" className="px-4 py-3">Company</th>
                            <th scope="col" className="px-4 py-3 text-center">Actions</th>

                        </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E0E0E0]">
                        {users.filter(user =>
                            user.name.toLowerCase().includes(search) || user.email.toLowerCase().includes(search)
                        ).map(user => (
                            <tr key={user.id}>
                                <td className="px-4 py-3 font-medium max-w-60 break-words whitespace-normal">
                                    <Link to={`/user/${user.id}`} state={{user}}>
                                        {user.name}
                                    </Link>

                                </td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3">{user.company.name}</td>
                                <td className="px-4 py-3 flex justify-center space-x-8">
                                    <Link
                                        to={`/edit/${user.id}`}
                                    >
                                        <MdOutlineModeEdit className="fill-blue-600 h-4 w-4"/>
                                    </Link>

                                    <button onClick={() => DeleteUser(user.id)} className="hover:cursor-pointer "><RiDeleteBin6Line className="fill-red-600 h-4 w-4"/></button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>


            <div className="my-6 ">
                <form onSubmit={AddUser} className="flex justify-center space-x-4" id="adduser">
                    <div className="space-y-1">
                        <h2>Name:</h2>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="p-3 bg-[#F6F6F6] border border-gray-800 rounded-2xl"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <h2>Email:</h2>
                        <input
                            type="text"
                            placeholder="email@example.com"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            className="p-3 bg-[#F6F6F6] border border-gray-800 rounded-2xl"
                            required
                        />
                    </div>
                    <div className="space-y-1">
                    <h2>Company:</h2>
                    <input
                        type="text"
                        placeholder="Example AG"
                        value={newCompanyName}
                        onChange={(e) => setNewComanyName(e.target.value)}
                        className="p-3 bg-[#F6F6F6] border border-gray-800 rounded-2xl "
                        required
                    />
                    </div>
                </form>
                <div className="flex justify-center">
                    <button type="submit" form="adduser" className="py-3 px-5 my-2 bg-[#2F2F2F] text-white rounded-2xl hover:cursor-pointer">
                        Add User
                    </button>
                </div>
            </div>

        </div>
    );
}