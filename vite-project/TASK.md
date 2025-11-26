# 📱 Social Network Application - TypeScript & TanStack

## 📖 Project Description

Build a modern social network application to master TypeScript and practical skills in developing applications with React + Vite + TanStack (Router, Query).

The main focus is on:

- Strict TypeScript typing
- Working with asynchronous data
- Modular project architecture
- Real-time communication via WebSocket

---

## 🎯 Application Features

### Core Functionality

#### 1. Posts Feed (`/`)

- Display posts in an infinite scroll format
- Each post card shows:
  - Author information (name, avatar)
  - Post title
  - Short description (truncated to ~150 characters)
  - Image or YouTube video preview (if available)
  - Likes count
  - Like button (heart icon) - toggle like/unlike
  - Timestamp
- Click on a post opens a **modal** with full post details
- Loading states and error handling
- Liked posts should be visually distinct (filled heart)

#### 2. Profile Page (`/profile/:userId`)

- View any user profile (shareable link)
- Display user information:
  - Avatar
  - Name
  - Bio/description
  - Join date
  - Posts count
- Show user's posts list
- If viewing own profile - show "Edit Profile" button

#### 3. Sign In Page (`/signin`)

- Login form with validation
- Fields:
  - Email/Username
  - Password
- Form validation with Zod
- Error handling for invalid credentials
- Redirect to home page after successful login
- Link to Sign Up page

#### 4. Sign Up Page (`/signup`)

- Registration form with validation
- Fields:
  - Name
  - Email
  - Password
  - Confirm Password
- Form validation with Zod (password matching, email format, etc.)
- Error handling
- Redirect to home page or Sign In after successful registration
- Link to Sign In page

#### 5. Edit Profile Page (`/profile/edit`)

- Protected route (only for authenticated user)
- Form to edit:
  - Name
  - Bio
  - Avatar URL
- Form validation with Zod
- Save changes with loading states

#### 6. Messages Page (`/messages`) - **Extra Credit**

- Direct messaging interface with WebSocket real-time communication
- Features:
  - List of users to chat with
  - One-to-one conversation view
  - Message history (load from API: `GET /api/messages/:userId`)
  - Send/receive messages in real-time
  - Connection status indicator
  - Typing indicators (optional)
- Use vanilla WebSocket (no libraries like Socket.io)
- WebSocket connection: `ws://localhost:3000/chat`
- Authenticate WebSocket with JWT access token

---

## 🛠️ Technology Stack

### Required

- **React 19+** - UI library
- **TypeScript** - strict typing, `any` is prohibited
- **Vite** - build tool (NOT Create React App)
- **TanStack Router** - routing and navigation (file-based)
- **TanStack Query** - API calls and data caching
- **MobX** - state management for client state (auth, UI state, etc.)
- **React Hook Form** - form state management
- **Zod** - schema validation for all forms
- **Emotion** (`@emotion/styled`) or **styled-components** - CSS-in-JS styling
- **Vitest** - testing framework

---

## 🏗️ Architecture Requirements

### Project Structure

The project **must** follow a **modular (feature-based)** architecture.

### Modular Architecture Principles

1. **Feature-based organization** - organize code by features/modules (posts, profile, auth, messages, etc.)

   - Each feature should be self-contained with its own components, types, API logic, and styles
   - Group related functionality together

2. **Shared code separation** - create a separate space for:

   - Reusable UI components (buttons, inputs, modals, etc.)
   - Common utilities and helper functions
   - Shared hooks
   - Global types and constants

3. **Co-location** - keep related files close together within each feature module

4. **Clear boundaries** - features should not directly import from other features

   - Use shared modules for cross-feature functionality
   - Maintain loose coupling between features

5. **Type safety** - organize types appropriately:

   - Feature-specific types within feature modules
   - Shared types in a common location

6. **Separation of concerns**:

   - API layer (fetch functions, endpoints)
   - State management (MobX stores)
   - TanStack Query hooks (queries and mutations)
   - UI components
   - Business logic

7. **Scalability** - structure should allow easy addition of new features without refactoring existing code

---

## 📋 Technical Requirements

### TypeScript

- ✅ Strict mode enabled in `tsconfig.json`
- ✅ All components, hooks, and functions must be typed
- ✅ **No `any` types allowed** (use `unknown` if needed)
- ✅ Use generics where appropriate
- ✅ Define interfaces/types for:
  - API responses
  - Component props
  - Hook return values
  - Form data

### TanStack Query

- ✅ Use `useQuery` for data fetching
- ✅ Use `useInfiniteQuery` for infinite scroll
- ✅ Use `useMutation` for POST/PUT/DELETE operations
- ✅ Implement proper cache invalidation
- ✅ Handle loading and error states

### TanStack Router

- ✅ File-based routing
- ✅ Route parameters (e.g., `:userId`)
- ✅ Loading states for routes
- ✅ 404 Not Found page
- ✅ Protected routes for authenticated pages (Edit Profile, etc.)

### MobX

- ✅ Create stores for client-side state management
- ✅ At minimum, implement:
  - Auth store (user data, login state, logout functionality)
  - UI store (modals, notifications, loading states)
- ✅ Use MobX observers in components
- ✅ Proper store organization and separation
- ✅ Follow MobX best practices (actions, computed values, reactions)

### Forms (React Hook Form + Zod)

- ✅ **All forms** must use React Hook Form
- ✅ **All forms** must have Zod schema validation
- ✅ Forms to implement:
  - Sign In form
  - Sign Up form
  - Edit Profile form
- ✅ Validation requirements:
  - Email format validation
  - Password strength requirements
  - Password confirmation matching
  - Required fields validation
  - Custom error messages
- ✅ Show validation errors to users
- ✅ Handle form submission states (loading, success, error)

### Styling

- ✅ Use `@emotion/styled` or `styled-components`
- ✅ Create reusable styled components
- ✅ Implement responsive design
- ✅ Modern, clean UI design
- ✅ Consistent theme (colors, spacing, typography)

### Testing

Write at least **6 tests total**:

1. **Unit tests (2+)** - test utility functions and stores

   - Example: `formatDate`, `truncateText`, validation helpers
   - Example: MobX store actions and computed values

2. **Component tests (2+)** - test component behavior

   - Example: `PostCard` renders correctly
   - Example: Form validation works (React Hook Form + Zod)

3. **Snapshot tests (2+)** - test component structure
   - Example: `PostModal` layout, `Avatar` variants, `SignInForm` structure

---

## 🎨 UI/UX Guidelines

### Design Principles

- Clean, modern interface
- Mobile-responsive (320px - 1920px)
- Smooth animations and transitions
- Intuitive navigation
- Clear feedback for user actions (loading, success, error)

## 🔌 API Integration

### Option 1: Mock API (DummyJSON)

Use **DummyJSON** for quick start: https://dummyjson.com/

**Endpoints:**

```typescript
// Auth
POST   /api/auth/register              // Register new user
POST   /api/auth/login                 // Login (returns access + refresh tokens)
POST   /api/auth/refresh               // Refresh access token
POST   /api/auth/logout                // Logout (invalidate refresh token)
GET    /api/auth/me                    // Get current user (protected)

// Posts
GET    /api/posts?limit=10&skip=0      // Get posts (pagination)
GET    /api/posts/:id                  // Get single post
POST   /api/posts                      // Create post (protected)
PUT    /api/posts/:id                  // Update post (protected)
DELETE /api/posts/:id                  // Delete post (protected)
POST   /api/posts/:id/like             // Like post (protected)
DELETE /api/posts/:id/like             // Unlike post (protected)

// Users
GET    /api/users/:id                  // Get user profile
GET    /api/users/:id/posts            // Get user's posts
PUT    /api/users/:id                  // Update user profile (protected)

// Messages (Extra Credit)
GET    /api/messages/:userId           // Get message history with user (protected)
```

**Authentication:**

- Backend uses **access tokens** (15min expiration) + **refresh tokens** (7 days)
- Store tokens in AuthStore (MobX)
- Include access token in Authorization header: `Bearer <token>`
- Implement token refresh logic when access token expires
- Use TanStack Query's error handling for 401 responses

**Environment Variable:**

```typescript
VITE_API_URL=http://localhost:3000
```

### WebSocket (Extra Credit)

**WebSocket Server:** `ws://localhost:3000/chat`

Create a custom hook `useWebSocket` to:

- Establish connection with JWT access token
- Send direct messages to specific users
- Receive direct messages
- Handle connection/disconnection events
- Implement reconnection logic
- Clean up on unmount

**WebSocket Message Format:**

```typescript
// Send message
{
  type: 'message:send',
  recipientId: 'user-id',
  content: 'message text'
}

// Receive message
{
  type: 'message:receive',
  id: 'message-id',
  senderId: 'user-id',
  senderName: 'User Name',
  content: 'message text',
  createdAt: '2024-01-01T00:00:00.000Z'
}
```

---

## ✅ Acceptance Criteria

### Mandatory

- [ ] Application builds and runs without errors
- [ ] All code is written in **TypeScript** with strict typing
- [ ] **No `any` types** used (except for valid edge cases with comments)
- [ ] Modular architecture implemented correctly (feature-based organization)
- [ ] TanStack Router configured with file-based routing
- [ ] TanStack Query used for all API calls
- [ ] **MobX implemented** with at least AuthStore and UIStore
- [ ] **All forms use React Hook Form + Zod validation**
- [ ] Sign In page with working form validation
- [ ] Sign Up page with working form validation (password matching, etc.)
- [ ] Authentication flow works (login, logout, protected routes, token refresh)
- [ ] **Token refresh logic** implemented (auto-refresh on 401)
- [ ] Infinite scroll implemented with `useInfiniteQuery`
- [ ] **Likes functionality** working (like/unlike posts, visual feedback)
- [ ] Modal opens on post click and displays full post content
- [ ] Profile page shows user data and their posts
- [ ] Edit profile page works with form validation
- [ ] Styled components used consistently
- [ ] Responsive design (mobile + desktop)
- [ ] At least 6 tests written (2 unit, 2 component, 2 snapshot)
- [ ] All tests pass
- [ ] Code is clean, readable, and follows best practices
- [ ] Proper error handling and loading states
- [ ] GitHub repository with structured commits
- [ ] README.md with setup instructions
- [ ] Deployed application with live link
- [ ] **WebSocket direct messaging** implemented and working
  - One-to-one messaging
  - Message history loaded from API
  - Real-time send/receive
- [ ] Custom hooks created (`useWebSocket`, `useInfiniteScroll`)

### Extra Credit

- [ ] Optimistic updates with TanStack Query (for likes, posts)
- [ ] Advanced TypeScript features (generics, discriminated unions, type guards)
- [ ] Typing indicators in chat
- [ ] Online/offline status indicators
- [ ] E2E tests with Playwright or Cypress
- [ ] CI/CD pipeline (GitHub Actions)

---

## 📚 Learning Resources

### TypeScript

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
  - Everyday Types
  - Narrowing
  - More on Functions
  - Object Types
  - Generics
  - Keyof Type Operator
  - Typeof Type Operator
  - Indexed Access Types
  - Mapped Types
- [TypeScript Roadmap](https://roadmap.sh/typescript)

### TanStack

- [TanStack Router Docs](https://tanstack.com/router/latest)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [TanStack Query - Infinite Queries](https://tanstack.com/query/latest/docs/react/guides/infinite-queries)

### State Management & Forms

- [MobX Documentation](https://mobx.js.org/)
- [MobX with React](https://mobx.js.org/react-integration.html)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [React Hook Form + Zod Integration](https://react-hook-form.com/get-started#SchemaValidation)

### Tools

- [Vite Documentation](https://vitejs.dev/)
- [Vitest Testing Framework](https://vitest.dev/)
- [Emotion Documentation](https://emotion.sh/docs/introduction)
- [styled-components Documentation](https://styled-components.com/)

### API

- [DummyJSON](https://dummyjson.com/)
- [WebSocket Echo Server](https://ws.ifelse.io)

---

## 📤 Submission Format

### GitHub Repository

Your repository must include:

1. **Source code** with proper structure
2. **README.md** containing:
   - Project description
   - Features list
   - Technology stack
   - Installation instructions
   - Running the app locally
   - Running tests
   - Build instructions
   - Deployment link
   - Screenshots (optional but recommended)
3. **Structured git commits** with meaningful messages
4. **Tests** in appropriate directories
5. **`.env.example`** file with required environment variables

### Deployment

Deploy your application to one of:

- [Vercel](https://vercel.com/) (recommended for Vite)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

**Include the deployment link in your README.**

---

## 🎯 Evaluation Criteria

### Code Quality (30%)

- TypeScript strict typing (no `any`)
- Clean, readable code
- Proper naming conventions
- No code duplication
- Best practices followed

### Architecture (20%)

- Modular feature-based structure
- Proper separation of concerns
- Reusable components
- Scalable design
- Clear boundaries between features

### State Management (15%)

- MobX stores properly implemented
- Auth state management working
- Store organization and structure
- Proper use of observers, actions, and computed values

### Forms & Validation (10%)

- All forms use React Hook Form
- Zod schemas properly defined
- Validation working correctly
- Good error handling and UX

### Functionality (15%)

- All core features work
- Proper error handling
- Good UX/UI
- Responsive design

### Testing (5%)

- All tests pass
- Good test coverage
- Meaningful test cases

### Documentation (5%)

- Clear README
- Code comments where needed
- Setup instructions

---

## 💡 Tips for Success

1. **Start with routing** - set up TanStack Router first with basic routes
2. **Set up MobX stores early** - create AuthStore and UIStore at the beginning
3. **Create Zod schemas first** - define your validation schemas before building forms
4. **Set up API layer** - create typed API functions and Query hooks
5. **Build shared UI components** - Button, Input, Modal, etc. before feature components
6. **Master React Hook Form** - understand the basics before implementing complex forms
7. **Implement features one by one** - start with auth, then posts, then profile
8. **Test as you go** - don't leave testing for the end
9. **Use TypeScript strictly** - embrace type safety from the start, type everything
10. **Commit often** - small, focused commits with clear messages
11. **Deploy early** - deploy as soon as you have something working

---

## ⏰ Estimated Timeline

- **Day 1-2:** Project setup, routing, MobX stores, and shared components
- **Day 3:** Authentication (Sign In/Sign Up with React Hook Form + Zod)
- **Day 4-5:** Posts feed with infinite scroll
- **Day 6-7:** Profile pages and edit functionality
- **Day 8:** Testing and bug fixes
- **Day 9:** Documentation and deployment
- **Extra:** WebSocket chat (1-2 days)

**Total: ~9-11 days** of focused work

## ❓ Questions?

If you have questions about:

- Requirements clarification
- Technical decisions
- API usage
- Best practices

Please reach out to your mentor.

**Good luck and happy coding!** 🚀
