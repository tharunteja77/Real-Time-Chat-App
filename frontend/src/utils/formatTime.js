export const formatMessageTime = (date) => {

    const now = new Date();

    const messageDate = new Date(date);

    const diffInSeconds =
        Math.floor(
            (now - messageDate) / 1000
        );

    const diffInMinutes =
        Math.floor(diffInSeconds / 60);


    // JUST NOW
    if (diffInSeconds < 60) {

        return "Just now";

    }


    // MINUTES AGO
    if (diffInMinutes < 60) {

        return `${diffInMinutes} min ago`;

    }


    // SHOW ACTUAL TIME
    return messageDate.toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit",
        }
    );

};


export const getMessageDateLabel = (date) => {

    const today = new Date();

    const yesterday = new Date();

    yesterday.setDate(
        today.getDate() - 1
    );

    const messageDate =
        new Date(date);


    const isToday =
        messageDate.toDateString() ===
        today.toDateString();


    const isYesterday =
        messageDate.toDateString() ===
        yesterday.toDateString();


    if (isToday) {

        return "Today";

    }


    if (isYesterday) {

        return "Yesterday";

    }


    return messageDate.toLocaleDateString(
        [],
        {
            day: "numeric",
            month: "long",
            year: "numeric",
        }
    );

};