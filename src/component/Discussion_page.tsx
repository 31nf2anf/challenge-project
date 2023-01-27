import console from "console";
import react, { useState } from "react";
import { confirmAlert } from "../Alert/Confirmation";

function Discussion_page() {
  const [reply, setReply] = useState(Number);
  const [discussions, setDiscussions] = useState<IDiscussion[]>([
    {
      id: 3,
      date: 120000,
      user: {
        name: "Bessie Cooper",
        avatar:
          "https://www.godaddy.com/garage/wp-content/uploads/judith-kallos-BW-NEW-150x150.jpg",
      },
      text: "I think for our second @compaign we can try to target a different audience. How does it sound for you?",
      likes: 2,
      iLikedIt: false,
      replies: [
        {
          id: 5,
          date: 7500000,
          user: {
            name: "Marvin McKinney",
            avatar:
              "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
          },
          text: "Yes, that sounds good! I can think about this tomorrow. Then do we plan to start that compaign?",
          likes: 3,
          iLikedIt: true,
        },
        {
          id: 6,
          date: 7200000,
          user: {
            name: "Bessie Cooper",
            avatar:
              "https://www.godaddy.com/garage/wp-content/uploads/judith-kallos-BW-NEW-150x150.jpg",
          },
          text: "We plan to run the compaign on Friday - as far as I know. Do you think you will get this done by Thursday @Marvin?",
          likes: 0,
          iLikedIt: false,
        },
      ],
    },
    {
      id: 2,
      date: 21600000,
      user: {
        name: "Marvin McKinney",
        avatar:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
      },
      text: "The first compaign went smoothly. Please make sure to see all attachments with the results to understand the flow.",
      likes: 2,
      iLikedIt: false,
      replies: [],
    },
    {
      id: 1,
      date: 16718,
      user: {
        name: "VIDA NASRI",
      },
      text: "We have just published the first campaign. Let's see the results in the 5 days and we will iterate on this.",
      likes: 50,
      iLikedIt: true,
      replies: [],
    },
  ]);
  const [users, setUsers] = useState<IUser[]>([
    { name: "navid nasri", avatar: "./person.jfif" },
    {
      name: "Marvin McKinney",
      avatar:
        "https://www.godaddy.com/garage/wp-content/uploads/judith-kallos-BW-NEW-150x150.jpg",
    },
    {
      name: "Bessie Cooper",
      avatar:
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
    },
    {
      name: "Savannah Nguyen",
      avatar:
        "https://www.godaddy.com/garage/wp-content/uploads/judith-kallos-BW-NEW-150x150.jpg",
    },
  ]);
  interface IUser {
    name: string;
    avatar?: string;
  }
  interface IComment {
    id: number;
    date: number; // unix timestamp in milliseconds.
    user: IUser;
    text: string;
    likes: number;
    iLikedIt: boolean;
  }
  interface IDiscussion extends IComment {
    replies: IComment[];
  }
  interface IProps {
    comments: IComment[];
  }
  function msToTime(s: number) {
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    let hrs = (s - mins) / 60;
    let day = hrs / 24;

    if (day > 1) {
      return day + " days ago";
    } else if (hrs > 0) {
      return hrs + " hours ago";
    } else if (mins > 0) {
      return mins + " minuts ago";
    } else if (secs > 0) {
      return secs + " secouns ago";
    }
  }
  const changeLike = (e: any) => {
    e.iLikedIt = !e.iLikedIt;
    if (e.iLikedIt) {
      e.likes = e.likes + 1;
    } else {
      e.likes = e.likes - 1;
    }
    setDiscussions([...discussions]);
  };
  const addDiscussion = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      discussions.push({
        id: discussions.length + 1,
        date: 1000,
        user: {
          name: "navid nasri",
          avatar: "./person.jfif",
        },
        text: e.target.value,
        likes: 0,
        iLikedIt: false,
        replies: [],
      });
      setDiscussions([...discussions]);
      e.target.value = "";
      confirmAlert(`add new comment`);
    }
  };
  const addDiscussionReply = (e: any, index: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      index.push({
        id: discussions.length + 1,
        date: 1000,
        user: {
          name: "navid nasri",
          avatar: "./person.jfif",
        },
        text: e.target.value,
        likes: 0,
        iLikedIt: false,
        replies: [],
      });
      setDiscussions([...discussions]);
      e.target.value = "";
      confirmAlert(`Reply to the comment`);
    }
  };

  return (
    <section className="discussion_page">
      <div className="head">
        <div className="new_discussion">
          <div className="left">
            <img className="new_discussion_img" src="./person.jfif" alt="" />
          </div>
          <div className="right">
            <input
              className="new_discussion_input"
              type="text"
              placeholder="start a discussion"
              onKeyDown={addDiscussion}
            />
          </div>
        </div>
      </div>
      <div className="main">
        {discussions.map((i, index) => {
          return (
            <div key={index} className="discussion">
              <div className="left">
                {i.user.avatar ? (
                  <img src={i.user.avatar} alt="" />
                ) : (
                  <span>
                    {i.user.name.split(" ").map((i) => i.slice(0, 1))}
                  </span>
                )}
              </div>
              <div className="right">
                <div className="name">
                  <h3>{i.user.name}</h3>
                  <span>{msToTime(i.date)}</span>
                </div>
                <p>
                  {i.text.split(" ").map((e) => {
                    return e.startsWith("@") ? (
                      <span className="tagName">{e}</span>
                    ) : (
                      e + " "
                    );
                  })}
                </p>

                <div className="act">
                  <button
                    onClick={() => changeLike(i)}
                    className={i.iLikedIt ? "liked" : "like"}
                  >
                    <img
                      src={i.iLikedIt ? "./like.png" : "./like2.png"}
                      alt=""
                    />
                    <span>{i.likes}</span>
                  </button>
                  {reply == i.id ? (
                    <div className="new_discussion">
                      <div className="left">
                        <img
                          className="new_discussion_img"
                          src="./person.jfif"
                          alt=""
                          style={{width:"1.9rem",height:"1.9rem",marginLeft:"8px"}}
                        />
                      </div>
                      <div className="right">
                        <input
                          className="new_discussion_input"
                          type="text"
                          placeholder="start a discussion"
                          onKeyDown={(e) => addDiscussionReply(e, i.replies)}
                          style={{
                            marginLeft: "4px",
                            width: "90%",
                            padding: "1.5px",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setReply(i.id)} className="reply">
                      reply
                    </button>
                  )}
                </div>
                {i.replies.length > 0
                  ? i.replies.map((i, index) => {
                      return (
                        <div
                          key={index}
                          className="reply_discussion discussion"
                        >
                          <div className="left">
                            <img src={i.user.avatar} alt="" />
                          </div>
                          <div className="right">
                            <div className="name">
                              <h3>{i.user.name}</h3>
                              <span>{msToTime(i.date)}</span>
                            </div>
                            <p>
                              {i.text.split(" ").map((e) => {
                                return e.startsWith("@") ? (
                                  <span className="tagName">{e}</span>
                                ) : (
                                  e + " "
                                );
                              })}
                            </p>
                            <div className="act">
                              <button
                                onClick={() => changeLike(i)}
                                className={i.iLikedIt ? "liked" : "like"}
                              >
                                <img
                                  src={
                                    i.iLikedIt ? "./like.png" : "./like2.png"
                                  }
                                  alt=""
                                />
                                <span>{i.likes}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Discussion_page;
