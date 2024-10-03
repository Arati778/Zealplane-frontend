// projectData.js
const projectData = [
  {
    id: "10001",
    name: "Game Of Death Novel",
    Publisher: "Fiction Publication",
    description:
      "Dive into an exhilarating mystery novel that will captivate you from the first page to the last. With twists and turns at every corner, this gripping tale keeps readers on the edge of their seats, eager to uncover the next clue. Each chapter is meticulously crafted to build suspense, making it impossible to put down. Prepare yourself for an unforgettable journey through a labyrinth of secrets and intrigue that will leave you breathless and yearning for more.",
    startDate: "2023-04-01",
    endDate: "2024-04-01",
    status: "In Progress",
    tags: "Comics",
    genre: "Mystery",
    ThumnailLinks: [
      "https://i.ibb.co/pr8kLJ8/4-adult-man-standing-near-the-haunted-tree-where-lots-of-dolls-are-hanging-during-night-dark-comic-2.png",
      "https://i.ibb.co/CHyjdC6/Whats-App-Image-2024-06-11-at-6-27-58-PM.jpg",
      "https://i.ibb.co/5Y4tS3y/Whats-App-Image-2024-06-11-at-6-28-44-PM.jpg",
    ],
    teamMembers: [
      {
        id: "1",
        name: "Krishna Kumar",
        role: "Author",
        email: "krishnakumar050.kk@gmail.com",
        profile:
          "https://images1.wionews.com/images/wion/900x1600/2023/7/26/1690359781893_SatoruGojoarrivesonthebattlefield29.webp",
      },
      {
        id: "2",
        name: "Shushant Panda",
        role: "Editor",
        email: "mark.twain@example.com",
        profile:
          "https://imgix.ranker.com/list_img_v2/2225/1002225/original/1002225-u3?fit=crop&fm=pjpg&q=80&dpr=2&w=1200&h=720",
      },
    ],
    tasks: [
      {
        id: "101",
        title: "Outline Story",
        description: "Create a detailed outline of the story.",
        status: "Completed",
        assignedTo: "Emily Bronte",
        dueDate: "2023-05-01",
      },
      {
        id: "102",
        title: "First Draft",
        description: "Write the first draft of the novel.",
        status: "In Progress",
        assignedTo: "Emily Bronte",
        dueDate: "2023-10-01",
      },
    ],
    links: {
      manuscript: "https://example.com/mystery-novel-manuscript",
    },
  },
  {
    id: "10002",
    name: "Psychopath: Santa Killer",
    Publisher: "Fiction publication",
    description:
      "An exciting comic book series featuring superheroes and villains.",
    genre: "Thriller",
    startDate: "2023-06-01",
    endDate: "2024-06-01",
    status: "In Progress",
    tags: "Comics",
    ThumnailLinks: [
      "https://comicsbyte.com/wp-content/uploads/2023/03/Psychopath-Stories-5-Fiction-Comics.jpg",
    ],
    teamMembers: [
      {
        id: "7",
        name: "Stan Lee",
        role: "Writer",
        email: "stan.lee@example.com",
        profile:
          "https://images1.wionews.com/images/wion/900x1600/2023/7/26/1690359781893_SatoruGojoarrivesonthebattlefield29.webp",
      },
      {
        id: "8",
        name: "Jack Kirby",
        role: "Illustrator",
        email: "jack.kirby@example.com",
        profile:
          "https://imgix.ranker.com/list_img_v2/2225/1002225/original/1002225-u3?fit=crop&fm=pjpg&q=80&dpr=2&w=1200&h=720",
      },
    ],
    tasks: [
      {
        id: "105",
        title: "Storyline Creation",
        description: "Develop the storyline for the comic book series.",
        status: "Completed",
        assignedTo: "Stan Lee",
        dueDate: "2023-07-01",
      },
      {
        id: "106",
        title: "Character Design",
        description: "Create the visual design of the characters.",
        status: "In Progress",
        assignedTo: "Jack Kirby",
        dueDate: "2023-09-01",
      },
    ],
    links: {
      comicSeriesPage: "https://example.com/comic-book-series",
    },
  },
  {
    id: "10003",
    name: "Chullu aur Lutera Bhoot",
    Publisher: "Swapnil Publication",
    description:
      "A mobile application designed to help users manage their health and wellness routines.",
    startDate: "2023-05-01",
    endDate: "2024-01-01",
    status: "Completed",
    genre: "Comedy",
    tags: "Comics",
    ThumnailLinks: [
      "https://i.ibb.co/CBhPhB1/Whats-App-Image-2023-09-13-at-6-36-27-PM.jpg",
      "https://i.ibb.co/NLR7cPc/Whats-App-Image-2023-09-13-at-6-36-28-PM.jpg",
      "https://i.ibb.co/0KS26bd/Whats-App-Image-2023-09-13-at-6-36-28-PM-1.jpg",
      "https://i.ibb.co/HFDnXnx/Whats-App-Image-2023-09-13-at-6-36-29-PM.jpg",
      "https://i.ibb.co/dcMy99r/Whats-App-Image-2023-09-13-at-6-36-29-PM-1.jpg",
    ],
    teamMembers: [
      {
        id: "5",
        name: "Marie Curie",
        role: "Project Manager",
        email: "marie.curie@example.com",
      },
      {
        id: "6",
        name: "Louis Pasteur",
        role: "Developer",
        email: "louis.pasteur@example.com",
      },
    ],
    tasks: [
      {
        id: "105",
        title: "Design UI/UX",
        description:
          "Create the design for the user interface and user experience.",
        status: "Completed",
        assignedTo: "Marie Curie",
        dueDate: "2023-07-01",
      },
      {
        id: "106",
        title: "Develop Core Features",
        description: "Develop the core features of the app.",
        status: "In Progress",
        assignedTo: "Louis Pasteur",
        dueDate: "2023-12-01",
      },
    ],
    links: {
      prototype: "https://example.com/health-app-prototype",
    },
  },

  {
    id: "10004",
    name: "E-Commerce Website",
    Publisher: "Arati Prasad",
    description:
      "I'll create a stunning WordPress eCommerce website or online store tailored to your business, transforming visitors into loyal customers. Combining design finesse with a focus on user experience, your e-commerce website using woocommerce or an online store will seamlessly blend aesthetics with functionality. ",
    startDate: "2023-04-01",
    endDate: "2024-04-01",
    status: "In Progress",
    tags: "Developer",
    genre: "FullStack Developer",
    ThumnailLinks: [
      "https://i.ibb.co/928K9yr/Screenshot-304.png",
      "https://i.ibb.co/RTBPdHh/Screenshot-305.png",
      "https://i.ibb.co/D4PBLtT/Screenshot-307.png",
      "https://i.ibb.co/4Rz0t8s/Screenshot-306.png",
    ],
    teamMembers: [],
    tasks: [
      {
        id: "101",
        title: "Outline Story",
        description: "Create a detailed outline of the story.",
        status: "Completed",
        assignedTo: "Emily Bronte",
        dueDate: "2023-05-01",
      },
      {
        id: "102",
        title: "First Draft",
        description: "Write the first draft of the novel.",
        status: "In Progress",
        assignedTo: "Emily Bronte",
        dueDate: "2023-10-01",
      },
    ],
    links: {
      manuscript: "https://example.com/mystery-novel-manuscript",
    },
  },

  // Add more projects if needed
];

export default projectData;
