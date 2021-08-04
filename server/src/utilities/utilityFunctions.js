import shortid from "shortid";

const generateUserId = (userIdList) => {
    let id;
    while (true) {
        id = shortid.generate();
        id = id.substr(0, 7); // start from 0, length is 7.

        if (userIdList.findIndex((value) => value.id === id) === -1) return id;
    }
};

const getRangeDate = (startDate, endDate) => {
    const tomorrow = new Date(startDate + 'T17:00:00.000Z')
    const start = new Date(tomorrow.valueOf() - 86400000)
    const end = new Date(endDate + 'T16:59:59.999Z')

    return { start, end }
}

export { generateUserId, getRangeDate };