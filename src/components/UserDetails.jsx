import {useParams, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function UserDetails(){


    const {id} = useParams();
    const [user, setUser] = useState( null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try{
                const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                const data = await res.json();
                setUser(data);
            }
            catch (error){
                console.error('Error while fetching users', error);
            }
            finally {
                setLoading(false)
            }
        };

        fetchUser()
    }, [id]);

    if (loading) {
        return <p className="text-center mt-10">Loading user details...</p>;
    }



    return(
        <div className="p-10 bg-gradient-to-b from-teal-100 via-gray-200 to-blue-50 min-h-screen">
            <Link to="/" className="mb-4 flex space-x-2 "><FaArrowAltCircleLeft className="fill-black h-6 w-6"/> <p>Go Back</p>  </Link>
            <div className="flex justify-center">
                <div className="h-[70vh] rounded-xl p-4 space-y-20 bg-gradient-to-t from-teal-400/60 via-gray-100 to-white/40 backdrop-blur-xl border border-white/30 border-t-gray-50 shadow-lg">
                    <div className="font-medium text-4xl text-center">
                        <h2>User Deatils</h2>
                    </div>

                    <p className="mt-20 text-4xl font-bold">{user.name}</p>

                    <div className="space-y-4 text-lg">
                        <p>
                            <strong>Address: </strong>{user.address?.street}, {user.address?.suite}, {user.address?.city}, {user.address?.zipcode}
                        </p>
                        <p><strong>Phone: </strong>{user.phone}</p>
                        <p><strong>Website: </strong>{user.website}</p>
                    </div>
                </div>
            </div>


        </div>

    )
}