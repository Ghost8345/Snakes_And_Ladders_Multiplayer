



export const createGame =
    async (req, res) => {
        // TODO
        let { ownerId, boardId } = req.body;
        console.log("CREATE GAME REQUEST, CREATING GAME for ", ownerId, " board:", boardId)
    }





export const joinGame =
    async (req, res) => {

        let { userId, gameId  } = req.body;
        console.log("joining game of id: ", gameId, " by: " , userId)

    }

