# Messaging Components

Modern iOS/WhatsApp-style messaging interface components for the Property Management application.

## Components

### ConversationList
Displays a list of conversations with search functionality and action buttons.

**Props:**
- `conversations` - Array of conversation objects
- `activeConversationId` - ID of the currently active conversation
- `onSelectConversation` - Callback when a conversation is selected
- `onNewMessage` - Callback when new message button is clicked
- `onViewArchived` - Callback when archived button is clicked

**Conversation Object Structure:**
```javascript
{
  id: string,
  contact: {
    name: string,
    avatarUrl: string | null,
    avatarBg: string,
    isOnline: boolean,
    role: string,
    lastSeen: string | null
  },
  lastMessage: string,
  timestamp: string,
  unreadCount: number
}
```

**Features:**
- Header with "Messages" title
- New message button (Edit icon)
- Archived messages button (Archive icon)
- Search conversations by contact name
- Online status indicators
- Unread message badges
- Active conversation highlighting
- Smooth scrolling
- Tooltips on action buttons

---

### MessageBubble
Individual message bubble component with iOS/WhatsApp styling.

**Props:**
- `message` - Message object with content, timestamp, isRead
- `isOwn` - Boolean indicating if message is from current user
- `showAvatar` - Whether to show the avatar (for message grouping)
- `contact` - Contact information for avatar display

**Message Object Structure:**
```javascript
{
  id: string,
  content: string,
  timestamp: string,
  date: string,
  isOwn: boolean,
  isRead: boolean
}
```

**Features:**
- Different colors for sent/received messages
- Rounded bubble design with dynamic border radius
- Read receipts (single/double check marks)
- Timestamp display
- Avatar support for received messages
- Text wrapping and word break

---

### MessageInput
Message input field with send button and additional actions.

**Props:**
- `onSendMessage` - Callback function when message is sent
- `disabled` - Boolean to disable input

**Features:**
- Auto-resizing textarea (max 120px)
- Enter to send, Shift+Enter for new line
- Emoji button (placeholder)
- Attachment button (placeholder)
- Send button (disabled when empty)
- Modern rounded design
- Dark mode support

---

### ChatWindow
Main chat window component combining messages, header, and input.

**Props:**
- `contact` - Contact object with name, avatar, online status
- `messages` - Array of message objects
- `onSendMessage` - Callback for sending messages
- `onBack` - Callback for mobile back button
- `showBackButton` - Boolean to show back button (mobile)

**Features:**
- Chat header with contact info and online status
- More options menu with:
  - Archive conversation
  - Report issue
  - Delete conversation
- Auto-scroll to latest message
- Date dividers between message groups
- Message grouping (hide avatars for consecutive messages)
- Smooth scrolling
- Empty state message
- Mobile-responsive back button

---

### NewMessageModal
Modal dialog for selecting a contact to start a new conversation.

**Props:**
- `isOpen` - Boolean to control modal visibility
- `onClose` - Callback to close the modal
- `contacts` - Array of available contacts
- `onSelectContact` - Callback when a contact is selected

**Contact Object Structure:**
```javascript
{
  id: string,
  name: string,
  avatarUrl: string | null,
  avatarBg: string,
  role: string
}
```

**Features:**
- Search contacts by name
- Clean modal design with backdrop blur
- Scrollable contact list
- Avatar display
- Role badges
- Hover effects
- Empty state message
- Auto-focus on search input

---

## Usage Example

```jsx
import Messages from './pages/Messages'
import { useNavigate } from 'react-router-dom'

// Navigate to messages
const navigate = useNavigate()
navigate('/tenant/messages')  // For tenants
navigate('/landlord/messages') // For landlords
```

## Read/Unread Status Management

### How It Works

The messaging system implements intelligent read/unread status tracking:

#### **When Messages Are Marked as Read:**
1. **On Conversation Selection**: When a user clicks on a conversation, all unread messages in that conversation are automatically marked as read
2. **On Initial Load**: The initially selected conversation has its messages marked as read immediately
3. **Real-time Updates**: The system uses `useEffect` to monitor conversation changes and mark messages as read

#### **Visual Indicators:**

**Conversation List:**
- **Unread Badge**: Red circular badge showing unread message count
- **Bold Text**: Unread conversations display in bolder text (configurable)
- **Auto-Clear**: Badge disappears when conversation is opened

**Message Bubbles (Sent Messages):**
- **Single Check (✓)**: Message sent but not yet read
- **Double Check (✓✓)**: Message has been read by recipient
- **Color Change**: Gray for sent, brand color (blue) for read
- **Animation**: Smooth fade-in and color transition when status changes

#### **State Management:**

```javascript
// Marking messages as read
const markConversationAsRead = (conversationId) => {
  // Updates message isRead status
  // Clears unread count in conversation
  // Triggers API call to backend
}

// Simulated read receipts (for demo)
setTimeout(() => {
  // Marks sent message as read after 2 seconds
  // In production, this comes from WebSocket events
}, 2000)
```

#### **API Integration Points:**

```javascript
// Mark conversation as read
PUT /api/messages/:conversationId/read

// WebSocket events (future)
socket.on('message_read', (messageId) => {
  // Update specific message read status
})
```

---

## Responsive Behavior

### Desktop (md and up)
- Split-pane layout: conversation list on left (380px), chat window on right
- Both panes visible simultaneously
- Conversation list has fixed width

### Mobile (base)
- Single pane view
- Shows conversation list by default
- Tapping a conversation shows the chat window
- Back button in chat header returns to conversation list
- Full-screen chat experience

## Styling Features

### Modern iOS/WhatsApp Design
- Rounded message bubbles
- Smooth transitions and animations
- Clean, minimal interface
- Proper spacing and padding
- Custom scrollbar styling
- Badge notifications for unread messages
- Online status indicators
- Subtle shadows and hover effects

### Dark Mode Support
All components fully support dark mode with:
- Appropriate color schemes
- Proper contrast ratios
- Smooth theme transitions

## API Integration

### Required Endpoints
```javascript
// Get conversations
GET /api/messages/conversations

// Get messages for a conversation
GET /api/messages/:conversationId

// Send a message
POST /api/messages
{
  conversationId: string,
  content: string
}

// Mark messages as read
PUT /api/messages/:conversationId/read
```

### WebSocket Integration (Optional)
For real-time messaging, integrate WebSocket connection:
```javascript
// Listen for new messages
socket.on('new_message', (message) => {
  // Update messages state
})

// Listen for read receipts
socket.on('message_read', (messageId) => {
  // Update message read status
})
```

## Implemented Features

- [x] New message modal
- [x] Archive conversation option
- [x] Delete conversation option
- [x] Report issue option
- [x] Search conversations
- [x] Search contacts
- [x] Read receipts with visual feedback
- [x] Automatic read status updates when viewing messages
- [x] Unread badge updates in real-time
- [x] Single check (✓) for sent, double check (✓✓) for read
- [x] Animated read receipt transitions
- [x] Online status indicators
- [x] Message grouping
- [x] Date dividers
- [x] Mobile responsive design
- [x] Send new messages functionality
- [x] Real-time message updates

## Future Enhancements

- [ ] Archived messages view (functionality in place, needs UI)
- [ ] File/image attachments (button in place)
- [ ] Emoji picker (button in place)
- [ ] Message reactions
- [ ] Voice messages
- [ ] Message deletion/editing
- [ ] Group conversations
- [ ] Typing indicators
- [ ] Message forwarding
- [ ] Search within conversation
- [ ] Message notifications
- [ ] Push notifications
- [ ] Real-time updates via WebSocket

