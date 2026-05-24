import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    formatMessageTime,
    getMessageDateLabel,
} from "../utils/formatTime";

import API from "../api/axios";

import { socket } from "../socket/socket";

import { useAuth } from "../context/AuthContext";


function ChatBox({
    selectedUser,
}) {

    const { user } = useAuth();

    const [messages, setMessages] =
        useState([]);

    const [text, setText] =
        useState("");

    const [isTyping, setIsTyping] =
        useState(false);

    const messagesEndRef =
        useRef(null);


    // FETCH OLD MESSAGES
    useEffect(() => {

        if (!selectedUser) return;

        const fetchMessages = async () => {

            try {

                const res = await API.get(
                    `/messages/${user._id}/${selectedUser._id}`
                );

                setMessages(res.data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchMessages();

    }, [selectedUser]);

    // MARK MESSAGES AS SEEN
    useEffect(() => {

        if (!selectedUser) return;

        socket.emit("mark_seen", {
            senderId: selectedUser._id,
            receiverId: user._id,
        });

    }, [selectedUser, messages]);


    // RECEIVE REALTIME MESSAGE
    useEffect(() => {

        socket.on(
            "receive_message",
            (newMessage) => {

                if (
                    newMessage.senderId === selectedUser?._id ||
                    newMessage.receiverId === selectedUser?._id
                ) {

                    setMessages((prev) => [
                        ...prev,
                        newMessage,
                    ]);

                }

            }
        );

        socket.on(
            "message_delivered",
            ({ messageId }) => {

                setMessages((prev) =>
                    prev.map((msg) =>

                        msg._id === messageId
                            ? {
                                ...msg,
                                delivered: true,
                            }
                            : msg

                    )
                );

            }
        );

        socket.on(
            "messages_seen",
            ({ receiverId }) => {

                setMessages((prev) =>
                    prev.map((msg) =>

                        msg.receiverId === receiverId
                            ? {
                                ...msg,
                                seen: true,
                            }
                            : msg

                    )
                );

            }
        );

        socket.on(
            "show_typing",
            ({ senderId }) => {

                if (
                    senderId === selectedUser?._id
                ) {

                    setIsTyping(true);

                }

            }
        );


        socket.on(
            "hide_typing",
            ({ senderId }) => {

                if (
                    senderId === selectedUser?._id
                ) {

                    setIsTyping(false);

                }

            }
        );


        return () => {

            socket.off("receive_message");

            socket.off("show_typing");

            socket.off("hide_typing");

            socket.off("message_delivered");

            socket.off("messages_seen");

        };

    }, [selectedUser]);


    // AUTO SCROLL
    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);


    // SEND MESSAGE
    const sendMessage = () => {

        if (!text.trim()) return;

        socket.emit("send_message", {
            senderId: user._id,
            receiverId: selectedUser._id,
            text,
        });

        setText("");

    };

    // HANDLE ENTER KEY
    const handleKeyDown = (e) => {

        // ENTER WITHOUT SHIFT
        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {

            e.preventDefault();

            sendMessage();

        }

    };

    if (!selectedUser) {

        return (
            <div className="w-[70%] flex items-center justify-center bg-transparent">

                <h2 className="text-2xl text-gray-400">
                    Select a chat
                </h2>

            </div>
        );

    }


    return (
        <div className="w-[70%] flex flex-col bg-transparent">

            {/* CHAT HEADER */}
            <div className="p-4  bg-white/5 border-b border-white/10 backdrop-blur-xl">
                <div className="flex flex-col h-[48px] justify-center">

                    <h2 className="text-xl font-bold">
                        {selectedUser.username}
                    </h2>

                    <p
                        className={`text-sm text-green-500 h-5 transition-opacity duration-200 ${isTyping
                            ? "opacity-100"
                            : "opacity-0"
                            }`}
                    >
                        typing...
                    </p>
                </div>
            </div>


            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4">

                {
                    messages.map((msg, index) => {

                        const currentDate =
                            getMessageDateLabel(
                                msg.createdAt
                            );

                        const previousDate =
                            index > 0
                                ? getMessageDateLabel(
                                    messages[index - 1]
                                        .createdAt
                                )
                                : null;


                        const showDateSeparator =
                            currentDate !== previousDate;


                        return (

                            <div key={msg._id}>

                                {/* DATE SEPARATOR */}
                                {
                                    showDateSeparator && (

                                        <div className="flex items-center my-6">

                                            <div className="flex-1 h-px bg-white/10" />

                                            <span
                                                className="
                                        px-4
                                        text-xs
                                        text-slate-400
                                        uppercase
                                        tracking-widest
                                    "
                                            >
                                                {currentDate}
                                            </span>

                                            <div className="flex-1 h-px bg-white/10" />

                                        </div>

                                    )
                                }


                                {/* MESSAGE */}
                                <div
                                    className={`mb-4 flex
                
                ${msg.senderId === user._id
                                            ? "justify-end"
                                            : "justify-start"
                                        }
              `}
                                >

                                    <div
                                        className={`max-w-[60%] px-4 py-2 rounded-3xl shadow-xl backdrop-blur-xl border
                  
                  ${msg.senderId === user._id
                                                ? "bg-gradient-to-r from-[#25D366] to-[#128C7E] border-cyan-300/20 text-white"
                                                : "bg-white/10 border-white/10 text-slate-100"
                                            }
                `}
                                    >

                                        <p className="break-all whitespace-pre-wrap">
                                            {msg.text}
                                        </p>


                                        <div
                                            className=" flex items-center justify-end gap-1 mt- "
                                        >

                                            {/* TIME */}
                                            <span
                                                className=" text-[10px] opacity-50 tracking-wid "
                                            >

                                                {
                                                    formatMessageTime(
                                                        msg.createdAt
                                                    )
                                                }

                                            </span>


                                            {/* MESSAGE STATUS */}
                                            {
                                                msg.senderId === user._id && (

                                                    <span
                                                        className={`
                    text-[11px]

                    ${msg.seen
                                                                ? "text-cyan-300"
                                                                : "text-white/60"
                                                            }
                `}
                                                    >

                                                        {
                                                            msg.seen
                                                                ? "✓✓"
                                                                : msg.delivered
                                                                    ? "✓✓"
                                                                    : "✓"
                                                        }

                                                    </span>

                                                )
                                            }

                                        </div>

                                    </div>

                                </div>

                            </div>

                        );

                    })
                }

                <div ref={messagesEndRef} />

            </div>


            {/* INPUT */}
            <div className="p-4  bg-white/5 border-t border-white/10 flex gap-3 backdrop-blur-xl">

                <textarea
                    rows={1}
                    placeholder="Type message..."
                    value={text}
                    onChange={(e) => {

                        setText(e.target.value);

                        // RESET HEIGHT
                        e.target.style.height = "auto";

                        // MAX HEIGHT = 3 LINES
                        const maxHeight = 24 * 3 + 24;

                        e.target.style.height =
                            Math.min(
                                e.target.scrollHeight,
                                maxHeight
                            ) + "px";

                        socket.emit("typing", {
                            senderId: user._id,
                            receiverId: selectedUser._id,
                        });

                        setTimeout(() => {

                            socket.emit("stop_typing", {
                                senderId: user._id,
                                receiverId: selectedUser._id,
                            });

                        }, 1000);

                    }}


                    onKeyDown={handleKeyDown}
                    className=" flex-1 rounded-2xl px-5 py-3 bg-white/10 border border-white/10  outline-none  text-white  placeholder:text-slate-400  focus:ring-2  focus:ring-cyan-400  backdrop-blur-x  resize-none  overflow-y-aut  min-h-[52px]  max-h-[96px leading- scrollbar-hide "

                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                />

                <button
                    onClick={sendMessage}
                    className=" px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 hover:scale-105 transition-all duration-300 shadow-xl"
                >
                    Send
                </button>

            </div>

        </div>
    );
}

export default ChatBox;

