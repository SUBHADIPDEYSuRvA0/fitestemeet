import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import path from "path"
import { fileURLToPath } from "url"
import apiRoutes from "./routes/apiRoutes.js"
import { errorHandler, validateJoinRequest, rateLimiter } from "./middleware/errorHandler.js"
import { participants, roomUtils } from "./models/roomModel.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

// Middleware
app.use(express.json())
app.use(express.static("public"))
app.use(rateLimiter)

// API Routes
app.use("/api", apiRoutes)

// Serve the landing page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Join room route (renders meeting page)
app.get("/join/:email/:code", validateJoinRequest, (req, res) => {
  const { email, code } = req.params
  const upperCode = code.toUpperCase()

  // Check if room exists, if not create it automatically
  let room = roomUtils.getRoom(upperCode)
  if (!room) {
    room = roomUtils.createRoom(upperCode)
  }

  // Render the meeting page
  res.sendFile(path.join(__dirname, "public", "meeting.html"))
})

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id)

  socket.on("join-room", ({ roomCode, userEmail }) => {
    try {
      socket.join(roomCode)

      // Get or create room
      let room = roomUtils.getRoom(roomCode)
      if (!room) {
        room = roomUtils.createRoom(roomCode)
      }

      // Add participant to room
      room.addParticipant(socket.id, userEmail)

      // Notify others in the room
      socket.to(roomCode).emit("user-joined", {
        socketId: socket.id,
        userEmail,
      })

      // Send participants count update
      io.to(roomCode).emit("participants-update", {
        count: room.participants.size,
      })

      console.log(`${userEmail} joined room ${roomCode}`)
    } catch (error) {
      console.error("Error joining room:", error)
      socket.emit("error", { message: error.message })
    }
  })

  socket.on("offer", ({ offer, to }) => {
    socket.to(to).emit("offer", { offer, from: socket.id })
  })

  socket.on("answer", ({ answer, to }) => {
    socket.to(to).emit("answer", { answer, from: socket.id })
  })

  socket.on("ice-candidate", ({ candidate, to }) => {
    socket.to(to).emit("ice-candidate", { candidate, from: socket.id })
  })

  socket.on("chat-message", ({ message, senderEmail, roomCode }) => {
    const room = roomUtils.getRoom(roomCode)
    if (room) {
      const messageObj = room.addMessage(message, senderEmail)
      io.to(roomCode).emit("chat-message", messageObj)
    }
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id)

    const participant = participants.get(socket.id)
    if (participant) {
      const { roomCode, userEmail } = participant
      const room = roomUtils.getRoom(roomCode)

      if (room) {
        const remainingCount = room.removeParticipant(socket.id)

        socket.to(roomCode).emit("user-left", {
          socketId: socket.id,
          userEmail,
        })

        io.to(roomCode).emit("participants-update", {
          count: remainingCount,
        })
      }
    }
  })
})

// Error handling middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`🚀 Google Meet Clone server running on port ${PORT}`)
  console.log(`📱 Access the app at: http://localhost:${PORT}`)
  console.log(`🔗 Join meetings at: http://localhost:${PORT}/join/user@example.com/ROOM123`)
})

export default app
