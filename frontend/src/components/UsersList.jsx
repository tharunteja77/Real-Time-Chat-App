import {
    useEffect,
    useState,
} from "react";

import API from "../api/axios";

import { useAuth } from "../context/AuthContext";


function UsersList({
    selectedUser,
    setSelectedUser,
    onlineUsers,
    notifications,
}) {

    const { user } = useAuth();

    const [users, setUsers] = useState([]);


    useEffect(() => {

        const fetchUsers = async () => {

            try {

                const res = await API.get("/users");

                const filteredUsers =
                    res.data.filter(
                        (u) => u._id !== user._id
                    );

                setUsers(filteredUsers);

            } catch (error) {

                console.log(error);

            }

        };

        fetchUsers();

    }, []);


    return (
        <div className="w-[30%] backdrop-blur-xl bg-white/5 border-r border-white/10  overflow-y-auto">

            <div className="p-4 border-b">

                <h2 className="text-xl font-bold">
                    Chats
                </h2>

            </div>


            {
                users.map((u) => (

                    <div
                        key={u._id}
                        onClick={() =>
                            setSelectedUser(u)
                        }
                        className={`mx-3 my-2 p-4 rounded-2xl cursor-pointer flex justify-between items-center transition-all duration-300 backdrop-blur-lg
              
              ${selectedUser?._id === u._id
                                ? "bg-gradient-to-r from-violet-500/30 to-cyan-500/20 border border-cyan-400/20 shadow-lg"
                                : "bg-white/5 hover:bg-white/10"
                            }
            `}
                    >

                        <div>

                            <h3 className="font-semibold">
                                {u.username}
                            </h3>

                            <p className="text-sm text-gray-500">
                                {u.email}
                            </p>

                        </div>


                        <div className="flex items-center gap-3">

                            {/* UNREAD COUNT */}
                            {
                                notifications[u._id] > 0 && (

                                    <div
                                        className="
                    min-w-[22px]
                    h-[22px]
                    px-2
                    rounded-full
                    bg-red-500
                    text-white
                    text-xs
                    flex items-center justify-center
                    font-bold
                    shadow-lg
                "
                                    >
                                        {notifications[u._id]}
                                    </div>

                                )
                            }


                            {/* ONLINE STATUS */}
                            {
                                onlineUsers.includes(u._id)
                                    ? (
                                        <span className="text-green-500">
                                            ●
                                        </span>
                                    )
                                    : (
                                        <span className="text-gray-400">
                                            ●
                                        </span>
                                    )
                            }

                        </div>

                    </div>

                ))
            }

        </div>
    );
}

export default UsersList;