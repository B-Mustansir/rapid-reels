# Rapid Reels 🎬

Rapid Reels is a modern social media platform focused on short-form video content, powered by AI-driven video editing and zkproof-based user data verification. It combines Edit AI for intelligent video processing with the Reclaim Protocol for secure identity verification.

## Project Links 🔗
- **Devfolio Project**: [https://devfolio.co/projects/rapid-reels-d42e](https://devfolio.co/projects/rapid-reels-d42e)
- **Live Demo**: [https://rapid-reels-omega.vercel.app](https://rapid-reels-omega.vercel.app)

## Project Showcase 📽️

[![YouTube Demo](http://i.ytimg.com/vi/rkErEfGI23U/hqdefault.jpg)](https://www.youtube.com/watch?v=rkErEfGI23U)

*Click the image above to watch the project demo video*

## Features ✨

### Core Functionality
- **AI-Powered Video Editing**: Automated music addition, effects, transitions, and subtitles
- **Digital Signatures**: User identity verification via Reclaim Protocol
- **Social Interactions**: Like, comment, and share functionality
- **Content Discovery**: Personalized feed and trending content
- **Creator Tools**: Advanced video editing capabilities and monetization options

### Technical Highlights
- Built with Next.js 14 and React 18
- Styled using Tailwind CSS and Shadcn UI
- Cloud storage via Cloudinary
- Authentication through Supabase
- Proof generation with Reclaim Protocol

## Getting Started 🚀

### Prerequisites
- Node.js 18.x or higher
- npm/yarn/pnpm
- Cloudinary account
- Supabase account
- Reclaim Protocol credentials

### Environment Setup
Create a `.env.local` file in the root directory with the variables in `.env.example`.

### Installation

```bash
# Clone the repository
git clone https://github.com/B-Mustansir/rapid-reels

# Navigate to project directory
cd rapid-reels/rapid-reels

# Install dependencies
npm install

# Start development server
npm run dev
```

### Project Structure 📁

```
src/
├── app/                # Next.js app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── components/     # Shared components
├── components/         # React components
│   ├── reels/          # Reels-related components
│   ├── auth/           # Authentication components
│   └── ui/             # UI components
├── lib/                # Utility functions
└── hooks/              # Custom React hooks
```

## Key Components 🔑

### Reels System
- `ReelsCreator`: Video upload and AI editing interface
- `ReelsViewer`: Vertical scrolling feed for watching reels
- `ReelInteractions`: Like, comment, and share functionality

### Authentication
- Supabase authentication integration
- Reclaim Protocol verification
- Trust score system

### Cloud Storage
- Cloudinary integration for media storage
- Support for both images and videos
- Automatic optimization and delivery

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Tech Stack 💻

- **Frontend**: React, Next.js, TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Authentication**: Supabase Auth, Reclaim Protocol
- **Storage**: Cloudinary
- **State Management**: React Hooks
- **UI Components**: Radix UI
- **Animations**: Framer Motion

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [Next.js](https://nextjs.org/)
- [Reclaim Protocol](https://www.reclaimprotocol.org/)
- [Cloudinary](https://cloudinary.com/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)