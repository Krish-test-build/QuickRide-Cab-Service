const { Server } = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');
let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: true,
            credentials: true,
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(`New connection: ${socket.id}`);

        
        socket.on('join', async (data) => {
            const { userId, type } = data;
            console.log('RECIEVED',data)

            if (!userId || !type) {
                console.error('Invalid data provided:', data);
                return;
            }

            if (type === 'user') {
                const user = await userModel.findById(userId);
                if (!user){
                    return;
                }
                user.socketID = socket.id;
                await user.save();
                console.log(`User socketID updated: ${socket.id}`);
                
            } else if (type === 'captain') {
                const captain = await captainModel.findById(userId);
                if (captain) {
                    await captainModel.findByIdAndUpdate(userId, { socketID: socket.id });
                    console.log(`Captain socketID updated: ${socket.id}`);
                } else {
                    console.error('Captain not found or not logged in');
                }
            } else {
                console.error('Invalid type provided:', type);
            }
        });

        socket.on('update-location-captain', async ({ userId, location }) => {
            if (!userId || !location || typeof location.lat !== 'number' || typeof location.long !== 'number') {
                console.error('Invalid location update payload:', { userId, location });
                return;
            }

            try {
                await captainModel.findByIdAndUpdate(userId, {
                    location: {
                        lat: location.lat,
                        long: location.long
                    }
                });
                console.log(`Updated captain ${userId}'s location to`, location);
            } catch (err) {
                console.error('Failed to update captain location:', err);
            }
        });

        socket.on('disconnect', async () => {
            console.log(`Socket disconnected: ${socket.id}`);
            await userModel.findOneAndUpdate({ socketID: socket.id }, { socketID: null });
            await captainModel.findOneAndUpdate({ socketID: socket.id }, { socketID: null });
        });
    });
}

function sendMessageToSocketId(socketID, messageObject) {
    if (io) {
        const socket = io.sockets.sockets.get(socketID);
        if (socket) {
            socket.emit(messageObject.event, messageObject.data);
        } else {
            console.error(`Socket with ID ${socketID} not found`);
        }
    } else {
        console.error('Socket.io not initialized');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };
