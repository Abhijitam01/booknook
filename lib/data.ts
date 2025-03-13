export async function getUserLibrary(userId: string) {
  // In a real app, this would fetch from the database
  // For demo purposes, we'll return mock data

  return {
    books: [
      {
        id: "1",
        title: "The Midnight Library",
        author: "Matt Haig",
        coverUrl: "/placeholder.svg?height=300&width=200",
        genre: "Fiction",
        tags: ["purchased", "reading"],
      },
      {
        id: "2",
        title: "Atomic Habits",
        author: "James Clear",
        coverUrl: "/placeholder.svg?height=300&width=200",
        genre: "Self-Help",
        tags: ["purchased", "completed"],
      },
      {
        id: "3",
        title: "Project Hail Mary",
        author: "Andy Weir",
        coverUrl: "/placeholder.svg?height=300&width=200",
        genre: "Science Fiction",
        tags: ["non-purchased", "wishlist"],
      },
      {
        id: "4",
        title: "The Invisible Life of Addie LaRue",
        author: "V.E. Schwab",
        coverUrl: "/placeholder.svg?height=300&width=200",
        genre: "Fantasy",
        tags: ["purchased", "botm"],
      },
      {
        id: "5",
        title: "Educated",
        author: "Tara Westover",
        coverUrl: "/placeholder.svg?height=300&width=200",
        genre: "Non-Fiction",
        tags: ["purchased", "completed"],
      },
      {
        id: "6",
        title: "Where the Crawdads Sing",
        author: "Delia Owens",
        coverUrl: "/placeholder.svg?height=300&width=200",
        genre: "Fiction",
        tags: ["purchased", "reading"],
        customCategory: "Book Club",
      },
    ],
  }
}

export async function getUserProfile(userId: string) {
  // In a real app, this would fetch from the database
  // For demo purposes, we'll return mock data

  return {
    memberSince: "January 2023",
    readingGoal: 24,
    favoriteGenre: "Science Fiction",
    stats: {
      totalBooks: 42,
      currentlyReading: 3,
      completed: 18,
    },
    recentActivity: [
      {
        type: "added",
        message: "Added 'The Midnight Library' to your library",
        date: "2 days ago",
      },
      {
        type: "completed",
        message: "Marked 'Atomic Habits' as completed",
        date: "1 week ago",
      },
      {
        type: "added",
        message: "Added 'Project Hail Mary' to your wishlist",
        date: "2 weeks ago",
      },
    ],
  }
}

export async function getDiscussionGroups() {
  // In a real app, this would fetch from the database
  // For demo purposes, we'll return mock data

  return [
    {
      id: "1",
      title: "Project Hail Mary - Science & Ethics",
      description: "Let's discuss the scientific concepts and ethical dilemmas in Andy Weir's latest novel.",
      book: "Project Hail Mary",
      isPrivate: false,
      memberCount: 24,
      messageCount: 156,
    },
    {
      id: "2",
      title: "Atomic Habits Reading Group",
      description: "A supportive community to discuss implementing the habits and strategies from James Clear's book.",
      book: "Atomic Habits",
      isPrivate: false,
      memberCount: 42,
      messageCount: 287,
    },
    {
      id: "3",
      title: "The Midnight Library - Book Club",
      description: "Exploring the themes of regret, possibility, and the meaning of life in Matt Haig's novel.",
      book: "The Midnight Library",
      isPrivate: false,
      memberCount: 18,
      messageCount: 93,
    },
    {
      id: "4",
      title: "Addie LaRue - Character Analysis",
      description: "Deep dive into the characters and their development throughout V.E. Schwab's novel.",
      book: "The Invisible Life of Addie LaRue",
      isPrivate: true,
      memberCount: 12,
      messageCount: 67,
    },
    {
      id: "5",
      title: "Fantasy Book Lovers",
      description: "A general discussion group for fans of fantasy literature.",
      book: "Various Fantasy Books",
      isPrivate: false,
      memberCount: 56,
      messageCount: 412,
    },
    {
      id: "6",
      title: "Science Fiction Enthusiasts",
      description: "Discussing classic and contemporary sci-fi novels and their impact on society.",
      book: "Various Sci-Fi Books",
      isPrivate: false,
      memberCount: 38,
      messageCount: 245,
    },
  ]
}

export async function getDiscussionById(id: string) {
  // In a real app, this would fetch from the database
  // For demo purposes, we'll return mock data based on the ID

  const discussions = {
    "1": {
      id: "1",
      title: "Project Hail Mary - Science & Ethics",
      description: "Let's discuss the scientific concepts and ethical dilemmas in Andy Weir's latest novel.",
      book: "Project Hail Mary",
      bookAuthor: "Andy Weir",
      bookCover: "/placeholder.svg?height=300&width=200",
      bookDescription:
        "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish.",
      isPrivate: false,
      isCreator: false,
      createdAt: "2023-06-15",
      creator: {
        id: "user1",
        name: "Jane Smith",
        image: "/placeholder.svg?height=50&width=50",
      },
      members: [
        {
          id: "user1",
          name: "Jane Smith",
          image: "/placeholder.svg?height=50&width=50",
          isCreator: true,
        },
        {
          id: "user2",
          name: "John Doe",
          image: "/placeholder.svg?height=50&width=50",
          isCreator: false,
        },
        {
          id: "user3",
          name: "Alice Johnson",
          image: "/placeholder.svg?height=50&width=50",
          isCreator: false,
        },
        {
          id: "user4",
          name: "Bob Williams",
          image: "/placeholder.svg?height=50&width=50",
          isCreator: false,
        },
        {
          id: "user5",
          name: "Carol Brown",
          image: "/placeholder.svg?height=50&width=50",
          isCreator: false,
        },
      ],
    },
    "2": {
      id: "2",
      title: "Atomic Habits Reading Group",
      description: "A supportive community to discuss implementing the habits and strategies from James Clear's book.",
      book: "Atomic Habits",
      bookAuthor: "James Clear",
      bookCover: "/placeholder.svg?height=300&width=200",
      bookDescription: "No matter your goals, Atomic Habits offers a proven framework for improving—every day.",
      isPrivate: false,
      isCreator: true,
      createdAt: "2023-05-22",
      creator: {
        id: "user2",
        name: "John Doe",
        image: "/placeholder.svg?height=50&width=50",
      },
      members: [
        {
          id: "user2",
          name: "John Doe",
          image: "/placeholder.svg?height=50&width=50",
          isCreator: true,
        },
        {
          id: "user1",
          name: "Jane Smith",
          image: "/placeholder.svg?height=50&width=50",
          isCreator: false,
        },
        {
          id: "user3",
          name: "Alice Johnson",
          image: "/placeholder.svg?height=50&width=50",
          isCreator: false,
        },
      ],
    },
  }

  return discussions[id as keyof typeof discussions] || null
}

export async function getMessages(discussionId: string) {
  // In a real app, this would fetch from the database
  // For demo purposes, we'll return mock data

  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)

  const messages = {
    "1": [
      {
        id: "msg1",
        content:
          "I just finished reading Project Hail Mary and I'm blown away by the scientific concepts. What did everyone think about the Astrophage?",
        createdAt: yesterday.toISOString(),
        user: {
          id: "user1",
          name: "Jane Smith",
          image: "/placeholder.svg?height=50&width=50",
        },
      },
      {
        id: "msg2",
        content:
          "The Astrophage concept was fascinating! I loved how Weir made it scientifically plausible while still being creative.",
        createdAt: yesterday.toISOString(),
        user: {
          id: "user3",
          name: "Alice Johnson",
          image: "/placeholder.svg?height=50&width=50",
        },
      },
      {
        id: "msg3",
        content: "What really got me was the relationship between Grace and Rocky. Such an unlikely friendship!",
        createdAt: yesterday.toISOString(),
        user: {
          id: "user4",
          name: "Bob Williams",
          image: "/placeholder.svg?height=50&width=50",
        },
      },
      {
        id: "msg4",
        content: "The way they overcame communication barriers was brilliant storytelling.",
        createdAt: now.toISOString(),
        user: {
          id: "user2",
          name: "John Doe",
          image: "/placeholder.svg?height=50&width=50",
        },
      },
      {
        id: "msg5",
        content:
          "I'm curious about the ethical implications of Grace's mission. Was it right to send him without his knowledge?",
        createdAt: now.toISOString(),
        user: {
          id: "user5",
          name: "Carol Brown",
          image: "/placeholder.svg?height=50&width=50",
        },
      },
      {
        id: "msg6",
        content:
          "That's a great point. I think the book raises interesting questions about consent vs. the greater good.",
        createdAt: now.toISOString(),
        user: {
          id: "user1",
          name: "Jane Smith",
          image: "/placeholder.svg?height=50&width=50",
        },
      },
    ],
    "2": [
      {
        id: "msg1",
        content:
          "I've been trying to implement the 2-minute rule from Atomic Habits. Has anyone else had success with this?",
        createdAt: yesterday.toISOString(),
        user: {
          id: "user2",
          name: "John Doe",
          image: "/placeholder.svg?height=50&width=50",
        },
      },
      {
        id: "msg2",
        content:
          "Yes! The 2-minute rule has been a game-changer for me. I've been able to start so many good habits by making them super small.",
        createdAt: yesterday.toISOString(),
        user: {
          id: "user3",
          name: "Alice Johnson",
          image: "/placeholder.svg?height=50&width=50",
        },
      },
      {
        id: "msg3",
        content: "I'm struggling with habit stacking. Any tips on how to effectively link habits together?",
        createdAt: now.toISOString(),
        user: {
          id: "user1",
          name: "Jane Smith",
          image: "/placeholder.svg?height=50&width=50",
        },
      },
      {
        id: "msg4",
        content:
          "I found it helpful to use existing habits as triggers. For example, after I brush my teeth (existing habit), I meditate for 2 minutes (new habit).",
        createdAt: now.toISOString(),
        user: {
          id: "user2",
          name: "John Doe",
          image: "/placeholder.svg?height=50&width=50",
        },
      },
    ],
  }

  return messages[discussionId as keyof typeof messages] || []
}

export async function getRecommendedBooks(userId: string) {
  // In a real app, this would fetch personalized recommendations
  // For demo purposes, we'll return mock data

  return [
    {
      id: "7",
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      coverUrl: "/placeholder.svg?height=300&width=200",
      genre: "Science Fiction",
    },
    {
      id: "8",
      title: "The Four Winds",
      author: "Kristin Hannah",
      coverUrl: "/placeholder.svg?height=300&width=200",
      genre: "Historical Fiction",
    },
    {
      id: "9",
      title: "The Vanishing Half",
      author: "Brit Bennett",
      coverUrl: "/placeholder.svg?height=300&width=200",
      genre: "Fiction",
    },
    {
      id: "10",
      title: "The Psychology of Money",
      author: "Morgan Housel",
      coverUrl: "/placeholder.svg?height=300&width=200",
      genre: "Finance",
    },
  ]
}

export async function getBlogPosts() {
  // In a real app, this would fetch from the database
  // For demo purposes, we'll return mock data

  return [
    {
      id: "blog1",
      slug: "why-project-hail-mary-is-a-must-read",
      title: "Why Project Hail Mary is a Must-Read for Science Fiction Fans",
      excerpt:
        "Andy Weir's latest novel combines hard science with heart in a way that makes it impossible to put down.",
      coverImage: "/placeholder.svg?height=400&width=800",
      publishedAt: "March 10, 2023",
      categories: ["Book Reviews", "Science Fiction"],
      commentCount: 24,
      author: {
        name: "Jane Smith",
        image: "/placeholder.svg?height=50&width=50",
      },
    },
    {
      id: "blog2",
      slug: "how-atomic-habits-changed-my-reading-routine",
      title: "How Atomic Habits Changed My Reading Routine",
      excerpt: "Applying James Clear's principles to establish a consistent reading habit that lasts.",
      coverImage: "/placeholder.svg?height=400&width=800",
      publishedAt: "February 15, 2023",
      categories: ["Reading Tips", "Self-Help"],
      commentCount: 18,
      author: {
        name: "John Doe",
        image: "/placeholder.svg?height=50&width=50",
      },
    },
    {
      id: "blog3",
      slug: "exploring-themes-in-the-midnight-library",
      title: "Exploring Themes in The Midnight Library",
      excerpt: "A deep dive into the philosophical questions raised by Matt Haig's bestselling novel.",
      coverImage: "/placeholder.svg?height=400&width=800",
      publishedAt: "January 28, 2023",
      categories: ["Literary Analysis", "Fiction"],
      commentCount: 32,
      author: {
        name: "Alice Johnson",
        image: "/placeholder.svg?height=50&width=50",
      },
    },
    {
      id: "blog4",
      slug: "interview-with-ve-schwab",
      title: "Interview with V.E. Schwab: The Mind Behind Addie LaRue",
      excerpt:
        "The acclaimed author discusses her writing process, inspirations, and the creation of her immortal protagonist.",
      coverImage: "/placeholder.svg?height=400&width=800",
      publishedAt: "December 5, 2022",
      categories: ["Author Spotlights", "Fantasy"],
      commentCount: 15,
      author: {
        name: "Bob Williams",
        image: "/placeholder.svg?height=50&width=50",
      },
    },
    {
      id: "blog5",
      slug: "best-sci-fi-books-of-2023",
      title: "The Best Science Fiction Books of 2023 (So Far)",
      excerpt: "Our curated list of must-read science fiction novels published this year.",
      coverImage: "/placeholder.svg?height=400&width=800",
      publishedAt: "June 20, 2023",
      categories: ["Recommendations", "Science Fiction"],
      commentCount: 9,
      author: {
        name: "Carol Brown",
        image: "/placeholder.svg?height=50&width=50",
      },
    },
    {
      id: "blog6",
      slug: "how-to-organize-your-home-library",
      title: "How to Organize Your Home Library Like a Pro",
      excerpt:
        "Practical tips for arranging your physical book collection in a way that's both functional and aesthetically pleasing.",
      coverImage: "/placeholder.svg?height=400&width=800",
      publishedAt: "April 12, 2023",
      categories: ["Reading Tips", "Organization"],
      commentCount: 27,
      author: {
        name: "Jane Smith",
        image: "/placeholder.svg?height=50&width=50",
      },
    },
  ]
}

export async function getBlogPostBySlug(slug: string) {
  // In a real app, this would fetch from the database
  // For demo purposes, we'll return mock data based on the slug

  const posts = {
    "why-project-hail-mary-is-a-must-read": {
      id: "blog1",
      slug: "why-project-hail-mary-is-a-must-read",
      title: "Why Project Hail Mary is a Must-Read for Science Fiction Fans",
      excerpt:
        "Andy Weir's latest novel combines hard science with heart in a way that makes it impossible to put down.",
      content:
        "When I first picked up Project Hail Mary, I expected another space survival story similar to The Martian. What I got was so much more.\n\nAndy Weir has a unique talent for making complex scientific concepts accessible and exciting. In Project Hail Mary, he takes this to a new level, weaving astrophysics, biology, and chemistry into a narrative that never feels like a textbook.\n\nThe protagonist, Ryland Grace, wakes up on a spaceship with no memory of how he got there or what his mission is. As his memories gradually return, we learn that Earth is facing an extinction-level threat from a microorganism that's consuming the sun's energy. Grace's mission is humanity's last hope.\n\nWhat sets this book apart from other hard sci-fi novels is the emotional depth. Without spoiling too much, the relationship that develops between Grace and another character is one of the most touching and original in recent science fiction. It explores themes of friendship, sacrifice, and what it means to be human in a way that transcends species boundaries.\n\nThe pacing is perfect, alternating between present-day challenges on the spaceship and flashbacks that gradually reveal how Grace ended up on this desperate mission. Each revelation is perfectly timed, keeping the pages turning late into the night.\n\nWeir's trademark humor is present throughout, providing necessary relief from the high-stakes tension. Grace's voice is distinct and engaging, making him a protagonist you can't help but root for, despite his flaws.\n\nIf you enjoyed The Martian or if you're a fan of scientific problem-solving in your fiction, Project Hail Mary is an absolute must-read. Even if hard sci-fi isn't usually your genre, the emotional core of this story might just win you over.",
      coverImage: "/placeholder.svg?height=800&width=1200",
      publishedAt: "March 10, 2023",
      categories: ["Book Reviews", "Science Fiction"],
      tags: ["andy-weir", "space", "first-contact", "problem-solving"],
      likes: 156,
      author: {
        name: "Jane Smith",
        image: "/placeholder.svg?height=100&width=100",
        bio: "Science fiction enthusiast and aspiring astronaut. Reviews books when not gazing at the stars.",
        otherPosts: [
          {
            id: "blog6",
            slug: "how-to-organize-your-home-library",
            title: "How to Organize Your Home Library Like a Pro",
          },
          { id: "blog7", slug: "best-audiobook-narrators", title: "The 10 Best Audiobook Narrators of All Time" },
        ],
      },
      relatedBooks: [
        { id: "3", title: "Project Hail Mary", author: "Andy Weir", coverUrl: "/placeholder.svg?height=150&width=100" },
        { id: "11", title: "The Martian", author: "Andy Weir", coverUrl: "/placeholder.svg?height=150&width=100" },
        { id: "12", title: "Artemis", author: "Andy Weir", coverUrl: "/placeholder.svg?height=150&width=100" },
      ],
    },
    "how-atomic-habits-changed-my-reading-routine": {
      id: "blog2",
      slug: "how-atomic-habits-changed-my-reading-routine",
      title: "How Atomic Habits Changed My Reading Routine",
      excerpt: "Applying James Clear's principles to establish a consistent reading habit that lasts.",
      content:
        "For years, I struggled with maintaining a consistent reading habit. I'd go through phases: devouring books for weeks, then not touching one for months. This cycle left me feeling guilty and disconnected from one of my favorite pastimes.\n\nEnter James Clear's 'Atomic Habits.' This book didn't just change how I approach reading; it transformed how I think about habit formation in general.\n\nThe first principle I applied was making my reading habit obvious. I created a dedicated reading corner in my living room with good lighting, a comfortable chair, and a small table for my tea. My current book is always visible there, not hidden away on a shelf or in a drawer.\n\nNext, I made it attractive. I paired reading with my morning coffee ritual—something I already looked forward to. The association between these two activities created a natural pull toward my book each morning.\n\nClear's advice to make habits easy was game-changing. Instead of setting ambitious goals like 'read 50 pages daily,' I started with just 10 minutes. Some days I'd read more, but the low threshold meant I never felt overwhelmed by the commitment.\n\nFinally, I made it satisfying by tracking my progress. I use a simple habit tracker in my journal, and the visual chain of checkmarks provides immediate satisfaction and motivation to continue.\n\nThe most powerful concept from the book was the idea of identity-based habits. Instead of focusing on the outcome (reading more books), I began to think of myself as 'a reader'—someone who reads daily because that's who they are. This shift from outcome-based to identity-based thinking made consistency much easier.\n\nI also implemented the 'two-minute rule' by committing to read for just two minutes each day. Often, those two minutes would extend to twenty or thirty once I got started, but knowing I only had to do two minutes removed the psychological barrier on busy days.\n\nSix months later, I've read more books than in the previous two years combined. More importantly, reading has become an effortless part of my daily routine rather than another item on my to-do list.\n\nIf you're struggling with consistency in your reading habit (or any habit), I highly recommend applying Clear's framework. Start small, focus on systems rather than goals, and build an identity that makes reading a natural extension of who you are.",
      coverImage: "/placeholder.svg?height=800&width=1200",
      publishedAt: "February 15, 2023",
      categories: ["Reading Tips", "Self-Help"],
      tags: ["habits", "productivity", "reading-tips", "self-improvement"],
      likes: 203,
      author: {
        name: "John Doe",
        image: "/placeholder.svg?height=100&width=100",
        bio: "Productivity enthusiast and avid reader. Sharing tips on building better reading habits and getting more from books.",
        otherPosts: [
          {
            id: "blog8",
            slug: "digital-vs-physical-books",
            title: "Digital vs. Physical Books: Finding Your Perfect Reading Medium",
          },
          { id: "blog9", slug: "speed-reading-techniques", title: "Speed Reading Techniques That Actually Work" },
        ],
      },
      relatedBooks: [
        { id: "2", title: "Atomic Habits", author: "James Clear", coverUrl: "/placeholder.svg?height=150&width=100" },
        { id: "13", title: "Deep Work", author: "Cal Newport", coverUrl: "/placeholder.svg?height=150&width=100" },
        {
          id: "14",
          title: "The Power of Habit",
          author: "Charles Duhigg",
          coverUrl: "/placeholder.svg?height=150&width=100",
        },
      ],
    },
  }

  return posts[slug as keyof typeof posts] || null
}

export async function getBlogComments(postId: string) {
  // In a real app, this would fetch from the database
  // For demo purposes, we'll return mock data

  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  const lastWeek = new Date(now)
  lastWeek.setDate(lastWeek.getDate() - 7)

  const comments = {
    blog1: [
      {
        id: "comment1",
        content:
          "I completely agree with your review! The relationship between Grace and Rocky was one of the most touching things I've read in sci-fi. It really elevated the book beyond just a survival story.",
        createdAt: yesterday.toLocaleDateString(),
        user: {
          id: "user3",
          name: "Alice Johnson",
          image: "/placeholder.svg?height=50&width=50",
        },
      },
      {
        id: "comment2",
        content:
          "The science in this book blew me away. Weir has such a talent for making complex concepts accessible without dumbing them down. I learned so much while being thoroughly entertained!",
        createdAt: lastWeek.toLocaleDateString(),
        user: {
          id: "user4",
          name: "Bob Williams",
          image: "/placeholder.svg?height=50&width=50",
        },
      },
      {
        id: "comment3",
        content: "Have you read Weir's other books? How do you think this one compares to The Martian?",
        createdAt: lastWeek.toLocaleDateString(),
        user: {
          id: "user5",
          name: "Carol Brown",
          image: "/placeholder.svg?height=50&width=50",
        },
      },
    ],
    blog2: [
      {
        id: "comment1",
        content:
          "I've been trying to implement the 2-minute rule from Atomic Habits for my reading as well! It's amazing how often those 2 minutes turn into an hour once I get started.",
        createdAt: yesterday.toLocaleDateString(),
        user: {
          id: "user1",
          name: "Jane Smith",
          image: "/placeholder.svg?height=50&width=50",
        },
      },
      {
        id: "comment2",
        content:
          "Great article! I'm curious - did you find any specific tracking method that worked best for you? I've tried apps but find myself going back to a simple paper tracker.",
        createdAt: lastWeek.toLocaleDateString(),
        user: {
          id: "user3",
          name: "Alice Johnson",
          image: "/placeholder.svg?height=50&width=50",
        },
      },
    ],
  }

  return comments[postId as keyof typeof comments] || []
}

