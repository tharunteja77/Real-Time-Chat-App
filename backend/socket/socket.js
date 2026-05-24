const Message = require("../models/Message");
const mongoose = require("mongoose");

const onlineUsers = {};

const setupSocket = (io) => {

    io.on("connection", (socket) => {

        console.log("User Connected:", socket.id);


        // REGISTER USER
        socket.on("register_user", (userId) => {

            onlineUsers[userId] = socket.id;

            console.log("Online Users:", onlineUsers);

            io.emit(
                "get_online_users",
                Object.keys(onlineUsers)
            );
        });



        // SEND MESSAGE
        socket.on("send_message", async (data) => {

            try {

                const {
                    senderId,
                    receiverId,
                    text,
                } = data;


                // SAVE MESSAGE TO DATABASE
                const newMessage = await Message.create({
                    senderId,
                    receiverId,
                    text,
                    delivered: false,
                    seen: false,
                });


                // FIND RECEIVER SOCKET
                const receiverSocketId =
                    onlineUsers[receiverId];


                // SEND MESSAGE TO RECEIVER
                if (receiverSocketId) {

                    // MARK DELIVERED
                    newMessage.delivered = true;

                    await newMessage.save();

                    io.to(receiverSocketId).emit(
                        "receive_message",
                        newMessage
                    );


                    // UPDATE SENDER
                    socket.emit(
                        "message_delivered",
                        {
                            messageId: newMessage._id,
                        }
                    );

                }


                // SEND MESSAGE BACK TO SENDER
                socket.emit(
                    "receive_message",
                    newMessage
                );

            } catch (error) {

                console.log(error.message);

            }

        });



        // MESSAGE SEEN
        socket.on(
            "mark_seen",
            async ({ senderId, receiverId }) => {

                try {

                    await Message.updateMany(
                        {
                            senderId,
                            receiverId,
                            seen: false,
                        },
                        {
                            seen: true,
                        }
                    );

                    const senderSocketId =
                        onlineUsers[senderId];

                    if (senderSocketId) {

                        io.to(senderSocketId).emit(
                            "messages_seen",
                            {
                                receiverId,
                            }
                        );

                    }

                } catch (error) {

                    console.log(error);

                }

            }
        );



        // TYPING
        socket.on("typing", (data) => {

            const receiverSocketId =
                onlineUsers[data.receiverId];

            if (receiverSocketId) {

                io.to(receiverSocketId).emit(
                    "show_typing",
                    {
                        senderId: data.senderId,
                    }
                );

            }

        });



        // STOP TYPING
        socket.on("stop_typing", (data) => {

            const receiverSocketId =
                onlineUsers[data.receiverId];

            if (receiverSocketId) {

                io.to(receiverSocketId).emit(
                    "hide_typing",
                    {
                        senderId: data.senderId,
                    }
                );

            }

        });


        // DISCONNECT
        socket.on("disconnect", () => {

            console.log("User Disconnected:", socket.id);

            for (let userId in onlineUsers) {

                if (onlineUsers[userId] === socket.id) {

                    delete onlineUsers[userId];

                }

            }

            io.emit(
                "get_online_users",
                Object.keys(onlineUsers)
            );

        });

    });

};

module.exports = setupSocket;