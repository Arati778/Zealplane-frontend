import React, { useState } from "react";
import { Modal, Backdrop } from "@mui/material";
import { MdFavorite } from "react-icons/md";
import { AiOutlineQuestionCircle, AiOutlineShareAlt, AiOutlineHeart } from "react-icons/ai";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import "./ProjectModal.scss";
import {PlayIcon} from "../../pages/details/Playbtn";

const ModalComponent = ({ open, handleCloseModal, selectedItem, endpoint }) => {
    const navigate = useNavigate();
    const [showVideo, setShowVideo] = useState(false);

    const handleNavigate = (item) => {
        navigate(`/${item.media_type || endpoint}/${item.id}`);
    };

    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <div className="modal">
                {selectedItem && (
                    <div className="modalContent">
                        <button
                            onClick={handleCloseModal}
                            className="closeButton"
                        >
                            X
                        </button>
                        <div className="posterBlock">
                            {showVideo ? (
                                <ReactPlayer
                                    url="https://www.youtube.com/watch?v=XtFI7SNtVpY"
                                    controls
                                    width="460px"
                                    height="450px"
                                />
                            ) : (
                                <Img src={selectedItem.posterUrl} />
                            )}
                            <div
                                className="playbtn" onClick={() => setShowVideo(!showVideo)}
                            >
                                <PlayIcon />
                            </div>
                            <CircleRating
                                rating={selectedItem.vote_average.toFixed(1)}
                            />
                            <Genres
                                data={selectedItem.genre_ids.slice(0, 2)}
                            />
                        </div>
                        <div className="textBlock">
                            <span className="title">
                                {selectedItem.title || selectedItem.name}
                            </span>
                            <span className="date">
                                {dayjs(
                                    selectedItem.release_date ||
                                        selectedItem.first_air_date
                                ).format("MMM D, YYYY")}
                            </span>
                        </div>
                        <div className="buttonGroup">
                            <button className="likeButton">
                                <MdFavorite /> Like
                            </button>
                            <button className="enquireButton">
                                <AiOutlineQuestionCircle /> Enquire
                            </button>
                            <button className="shareButton">
                                <AiOutlineShareAlt /> Share
                            </button>
                            <button className="wishlistButton">
                                <AiOutlineHeart /> Wishlist
                            </button>
                        </div>
                        <button
                            onClick={() => handleNavigate(selectedItem)}
                            className="goToPageButton"
                        >
                            view more
                        </button>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ModalComponent;
