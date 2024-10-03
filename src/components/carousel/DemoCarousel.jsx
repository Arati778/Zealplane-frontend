import React, { useRef, useEffect, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import "./style.scss";

// Sample project data
const projectsData = [
  {
    id: "10001",
    name: "Game Of Death Novel",
    Publisher: "Fiction Publication",
    description:
      "A thrilling mystery novel that keeps readers on the edge of their seats.",
    startDate: "2023-04-01",
    endDate: "2024-04-01",
    status: "In Progress",
    genre: "Mystery",
    ThumnailLink:
      "https://i.ibb.co/pr8kLJ8/4-adult-man-standing-near-the-haunted-tree-where-lots-of-dolls-are-hanging-during-night-dark-comic-2.png",
    teamMembers: [
      {
        id: "1",
        name: "Krishna Kumar",
        role: "Author",
        email: "krishnakumar050.kk@gmail.com",
      },
      {
        id: "2",
        name: "Shushant Panda",
        role: "Editor",
        email: "mark.twain@example.com",
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
    ThumnailLink:
      "https://comicsbyte.com/wp-content/uploads/2023/03/Psychopath-Stories-5-Fiction-Comics.jpg",
    teamMembers: [
      {
        id: "7",
        name: "Stan Lee",
        role: "Writer",
        email: "stan.lee@example.com",
      },
      {
        id: "8",
        name: "Jack Kirby",
        role: "Illustrator",
        email: "jack.kirby@example.com",
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
    ThumnailLink:
      "https://i.ibb.co/CBhPhB1/Whats-App-Image-2023-09-13-at-6-36-27-PM.jpg",
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
    name: "Nirvana",
    Publisher: "Arati Prasad",
    description:
      "I'll create a stunning WordPress eCommerce website or online store tailored to your business, transforming visitors into loyal customers. Combining design finesse with a focus on user experience, your e-commerce website using woocommerce or an online store will seamlessly blend aesthetics with functionality. ",
    startDate: "2023-04-01",
    endDate: "2024-04-01",
    status: "In Progress",
    tags: "Developer",
    genre: "FullStack Developer",
    ThumnailLink: 
      "https://umacart.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-06-at-12.47.50-PM.jpeg",
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

  {
    id: "10005",
    name: "Aghori",
    Publisher: "Swapnil Publication",
    description:
      "A mobile application designed to help users manage their health and wellness routines.",
    startDate: "2023-05-01",
    endDate: "2024-01-01",
    status: "Completed",
    genre: "Comedy",
    ThumnailLink:
      "https://www.holycow.in/wp-content/uploads/2021/10/aghori-gaurav-302x450.jpg  ",
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
    id: "10006",
    name: "Dark Web Venom",
    Publisher: "Swapnil Publication",
    description:
      "A mobile application designed to help users manage their health and wellness routines.",
    startDate: "2023-05-01",
    endDate: "2024-01-01",
    status: "Completed",
    genre: "Comedy",
    ThumnailLink:
      "https://cdn.marvel.com/u/prod/marvel/i/mg/3/03/64514730ed092/portrait_uncanny.jpg",
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
    id: "10003",
    name: "Satyug #2",
    Publisher: "Swapnil Publication",
    description:
      "A mobile application designed to help users manage their health and wellness routines.",
    startDate: "2023-05-01",
    endDate: "2024-01-01",
    status: "Completed",
    genre: "Comedy",
    ThumnailLink:
      "https://umacart.com/wp-content/uploads/2023/08/1660550943FBIMG1660550845819jpg.jpg",
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
  // Add more projects if needed
];

const DemoCarausel = ({ title }) => {
  const carouselContainer = useRef();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data from the provided array
    setData(
      projectsData.map((item) => ({
        ...item,
        thumbnailLink: item.ThumnailLink || PosterFallback,
        userName: item.name,
      }))
    );
    setLoading(false);
  }, []);

  const navigation = (dir) => {
    const container = carouselContainer.current;
    const scrollAmount =
      dir === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);

    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => navigation("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRighttNav arrow"
          onClick={() => navigation("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContainer}>
            {data?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="carouselItem"
                  onClick={() => navigate(`/home/${item.id}`)}
                >
                  <div className="posterBlock">
                    <Img src={item.thumbnailLink} />
                    <img
                      src={item.userProfilePic}
                      alt=""
                      className="avatarImage"
                      onClick={() => navigate("/profile")}
                    />
                  </div>
                  <div className="textBlock">
                    <span className="title">{item.userName}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default DemoCarausel;
