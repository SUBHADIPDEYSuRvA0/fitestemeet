# Enhanced Google Meet Clone

A complete Google Meet clone with WebRTC, Socket.io, multiple user videos, private chat, screen recording, and full mobile responsiveness.

## 🚀 Features

### 📹 **Video Conferencing**
- HD video calling with multiple participants
- Main video area with participant switching
- Participants sidebar showing all user videos
- Audio/video controls with mute indicators
- Screen sharing capabilities

### 💬 **Advanced Chat System**
- Group chat for all participants
- Private messaging between users
- Chat tabs to switch between modes
- Unread message notifications
- Auto-resizing input field

### ⏺️ **Screen Recording**
- One-click meeting recording
- Automatic upload to server
- WebM format with VP9/VP8 codec
- Recording indicator with animation
- File saved to `/uploads/recordings/` folder

### 📱 **Mobile Responsive**
- Adaptive layout for all screen sizes
- Touch-friendly controls
- Horizontal scrolling participants on mobile
- Responsive chat panel
- Portrait/landscape support

### 🔧 **Technical Features**
- Enhanced WebRTC with ICE restart
- Socket.IO with reconnection logic
- Multer for file uploads
- Rate limiting and error handling
- Real-time participant management

## 🛠️ Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone <repository-url>
   cd google-meet-clone
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables:**
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`

4. **Start the server:**
   \`\`\`bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   \`\`\`

5. **Access the application:**
   \`\`\`
   http://localhost:3000
   \`\`\`

## 📖 Usage

### Starting a Meeting
1. Go to `http://localhost:3000`
2. Enter your email address
3. Either:
   - Enter an existing meeting code and click "Join Meeting"
   - Click "Start New Meeting" to generate a random code

### Meeting Features
- **Video Controls**: Toggle camera and microphone
- **Screen Share**: Share your screen with participants
- **Recording**: Record the meeting (saves to uploads folder)
- **Chat**: Switch between group and private messaging
- **Participants**: Click any participant to switch them to main view

### API Endpoints
- `GET /api/stats` - System statistics
- `GET /api/rooms` - Active rooms list
- `GET /api/room/:code` - Room information
- `GET /api/join/:email/:code` - Join room validation
- `POST /api/upload-recording` - Upload recording file

## 🏗️ Project Structure

\`\`\`
google-meet-clone/
├── server.js                 # Main server file
├── package.json              # Dependencies
├── models/
│   └── roomModel.js          # Room data model
├── controllers/
│   └── roomController.js     # Room API controllers
├── routes/
│   └── apiRoutes.js          # API route definitions
├── middleware/
│   └── errorHandler.js       # Error handling middleware
├── public/
│   ├── index.html            # Landing page
│   └── meeting.html          # Meeting interface
└── uploads/
    └── recordings/           # Recorded meeting files
\`\`\`

## 🌐 Deployment

### Vercel
\`\`\`bash
vercel --prod
\`\`\`

### Docker
\`\`\`bash
docker build -t google-meet-clone .
docker run -p 3000:3000 google-meet-clone
\`\`\`

### Manual Deployment
1. Set `NODE_ENV=production`
2. Configure `PORT` environment variable
3. Ensure uploads directory exists
4. Run `npm start`

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

### File Upload Limits
- Maximum file size: 100MB
- Supported format: WebM
- Storage location: `uploads/recordings/`

## 📱 Mobile Support

The application is fully responsive and supports:
- Touch gestures for video switching
- Adaptive layouts for different screen sizes
- Mobile-optimized controls
- Responsive typography and spacing

## 🔒 Security Features

- Rate limiting (30 requests per minute)
- Input validation and sanitization
- CORS configuration
- Error handling and logging

## 🧪 Testing

\`\`\`bash
# Start development server
npm run dev

# Test with multiple users
# Open multiple browser tabs/windows
# Navigate to different meeting rooms
\`\`\`

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:
- Check the console logs for errors
- Ensure camera/microphone permissions
- Verify network connectivity
- Check browser WebRTC support

## 🔄 Updates

### Version 1.0.0
- Initial release with all core features
- Multiple user video support
- Private chat functionality
- Screen recording with upload
- Full mobile responsiveness
