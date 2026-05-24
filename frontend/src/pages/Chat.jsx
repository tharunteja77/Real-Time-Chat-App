import {
    useEffect,
    useState,
    useRef,
} from "react";

import { socket } from "../socket/socket";

import { useAuth } from "../context/AuthContext";

import UsersList from "../components/UsersList";

import ChatBox from "../components/ChatBox";


function Chat() {

    const { user, logout } = useAuth();

    const [onlineUsers, setOnlineUsers] =
        useState([]);

    const [selectedUser, setSelectedUser] =
        useState(null);

    const [showMenu, setShowMenu] =
        useState(false);

    const menuRef = useRef(null);

    const [notifications, setNotifications] =
        useState({});


    // REGISTER USER
    useEffect(() => {

        if (user?._id) {

            socket.emit(
                "register_user",
                user._id
            );

        }

    }, [user]);


    // RECEIVE ONLINE USERS
    useEffect(() => {

        socket.on(
            "get_online_users",
            (users) => {

                setOnlineUsers(users);

            }
        );

        return () => {

            socket.off("get_online_users");

        };

    }, []);

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {

                setShowMenu(false);

            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    useEffect(() => {

        socket.on(
            "receive_message",
            (newMessage) => {

                // IF CHAT NOT OPEN
                if (
                    selectedUser?._id !==
                    newMessage.senderId
                ) {

                    setNotifications((prev) => ({

                        ...prev,

                        [newMessage.senderId]:
                            (prev[newMessage.senderId] || 0) + 1,

                    }));

                }

            }
        );

        return () => {

            socket.off("receive_message");

        };

    }, [selectedUser]);

    const handleSelectUser = (user) => {

        setSelectedUser(user);

        // CLEAR UNREAD COUNT
        setNotifications((prev) => ({

            ...prev,

            [user._id]: 0,

        }));

    };

    return (
        <div className="h-screen bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E293B] text-white overflow-x-hidden">

            {/* HEADER */}
            <div className="backdrop-blur-xl bg-white/10 border-b border-white/10 px-6 py-4 flex justify-between items-center">

                <h1 className="text-3xl font-bold  bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
                    ChatterBox
                </h1>

                <div className="relative">

                    {/* PROFILE BUTTON */}
                    <div
                        onClick={() =>
                            setShowMenu(!showMenu)
                        }
                        className=" w-11 h-11 rounded-full bg-gradient-to-br  from-violet-500 to-cyan-400 flex items-center justify-center font-bold text-white shadow-xl cursor-pointer hover:scale-105 transition-all duration-300 border border-white/20 select-none"
                    >
                        {
                            user?.username
                                ?.charAt(0)
                                ?.toUpperCase()
                        }
                    </div>


                    {/* DROPDOWN MENU */}
                    {
                        showMenu && (

                            <div ref={menuRef}
                                className=" absolute right-0 top-14 w-52 rounded-2xl backdrop-blur-2xl bg-white/10 border border-white/10 shadow-2xl overflow-hidden z-[-1]"
                            >

                                {/* USER INFO */}
                                <div className="p-4 border-b border-white/10">

                                    <h3 className="font-semibold text-white">
                                        {user?.username}
                                    </h3>

                                    <p className="text-sm text-slate-300 truncate">
                                        {user?.email}
                                    </p>

                                </div>


                                {/* MENU ITEMS */}

                                <button
                                    className=" w-full text-left px-4 py-3 hover:bg-white/10 transition text-slate-200"
                                >
                                    Settings
                                </button>


                                <button
                                    className="  w-full text-left px-4 py-3 hover:bg-white/10 transition text-slate-200 "
                                >
                                    Themes
                                </button>


                                <button
                                    onClick={logout}
                                    className=" w-full text-left px-4 py-3 hover:bg-red-500/20 transition text-red-300 "
                                >
                                    Logout
                                </button>

                            </div>

                        )
                    }

                </div>

            </div>


            {/* MAIN CHAT AREA */}
            <div className="flex h-[calc(100vh-72px)]">

                <UsersList
                    selectedUser={selectedUser}
                    setSelectedUser={handleSelectUser}
                    notifications={notifications}
                    onlineUsers={onlineUsers}
                />

                <ChatBox
                    selectedUser={selectedUser}
                />

            </div>


        </div>
    );
}

export default Chat;