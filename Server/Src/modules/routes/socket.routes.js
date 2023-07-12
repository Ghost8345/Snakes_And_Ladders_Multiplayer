export const initializeSocketEvents = (socket) => {
    console.log('A user connected, user socket id = ',socket.id)
  
      socket.on("joinRoom",(roomId)=> {
          console.log("joining socket room id : " , roomId);
          socket.join(roomId)
      })
        
      // Disconnect event handler
      socket.on('disconnect', () => {
          console.log('A user disconnected');
      });
  
  }
