import {useState, useEffect} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {updateUser} from "../store/usersSlice.js";
import {FaArrowAltCircleLeft} from "react-icons/fa";

export default function EditUser() {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.users.users.find(u => u.id === parseInt(id)));

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState();
    const [suite, setSuite] = useState();
    const [phone, setPhone] = useState();
    const [website, setWebsite] = useState();
    const [company, setCompany] = useState('');

    useEffect(() => {
        if (user){
            setName(user.name);
            setUsername(user.username);
            setEmail(user.email);
            setStreet(user.address.street);
            setSuite(user.address.suite);
            setPhone(user.phone);
            setWebsite(user.website);
            setCompany(user.company.name);
        }
    }, [user]);

    const Update = (e) => {
        e.preventDefault();
        dispatch(updateUser({
            id: user.id,
            name,
            email,
            username,
            address: {
                street: street,
                suite: suite,
            },
            phone,
            website,
            company: {name: company}
        }));
        navigate("/");
    };

    if (!user) return <p>User not found</p>;

    return (
        <div className="p-10 bg-gradient-to-b from-teal-100 via-gray-200 to-blue-50 min-h-screen">
            <Link to="/" className="mb-4 flex space-x-2 "><FaArrowAltCircleLeft className="fill-black h-6 w-6"/> <p>Go Back</p>  </Link>
            <div className="flex justify-center">

                <div
                    className="rounded-xl p-4 space-y-8 bg-gradient-to-t from-teal-400/60 via-gray-100 to-white/40 backdrop-blur-xl border border-white/30 border-t-gray-50 shadow-lg">
                    <h2 className="text-center text-2xl font-medium">Update User</h2>
                    <form onSubmit={Update} id="updateform">
                        <div className="space-y-4">
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label>Name:</label>
                                    <input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="p-3 bg-[#F6F6F6] border border-gray-800 rounded-2xl w-full "
                                        required
                                    />
                                </div>
                                <div className=" w-1/2">
                                    <label>Username:</label>
                                    <input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="p-3 bg-[#F6F6F6] border border-gray-800 rounded-2xl w-full"
                                        required
                                    />
                                </div>
                            </div>
                            <label>Email:</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="p-3 bg-[#F6F6F6] border border-gray-800 rounded-2xl w-full"
                                required
                            />
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label>Street:</label>
                                    <input
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                        className="p-3 bg-[#F6F6F6] border border-gray-800 rounded-2xl w-full "
                                    />
                                </div>
                                <div className=" w-1/2">
                                    <label>Suite:</label>
                                    <input
                                        value={suite}
                                        onChange={(e) => setSuite(e.target.value)}
                                        className="p-3 bg-[#F6F6F6] border border-gray-800 rounded-2xl w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <div className="w-1/2">
                                    <label>Phone:</label>
                                    <input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="p-3 bg-[#F6F6F6] border border-gray-800 rounded-2xl w-full "
                                    />
                                </div>
                                <div className=" w-1/2">
                                    <label>Company:</label>
                                    <input
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        className="p-3 bg-[#F6F6F6] border border-gray-800 rounded-2xl w-full"
                                    />
                                </div>
                            </div>
                            <label>Website:</label>
                            <input
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                className="p-3 bg-[#F6F6F6] border border-gray-800 rounded-2xl w-full"
                            />
                        </div>
                    </form>
                    <div className="flex justify-center ">
                        <button form="updateform" className="py-2 px-4 bg-amber-500 rounded-lg text-white font-medium hover:cursor-pointer">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )


}