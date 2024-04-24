import React, { useState } from "react";
import classes from "./card.module.css";
import { Text, Avatar, Button, Modal, TextInput } from "@mantine/core";
import { Pagination } from "@mantine/core";

interface Friend {
  picture: {
    thumbnail: string;
  };
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  dob: {
    date: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
  };
}

interface FriendCardProps {
  friendsList: Friend[];
}

const FriendCard: React.FC<FriendCardProps> = ({ friendsList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<Friend | null>(null);
  const friendsPerPage = 1;

  const indexOfLastFriend = currentPage * friendsPerPage;
  const indexOfFirstFriend = indexOfLastFriend - friendsPerPage;
  const currentFriends = friendsList.slice(
    indexOfFirstFriend,
    indexOfLastFriend
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleCardClick = (friend: Friend) => {
    setSelectedUser(friend);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div>
      <div className={classes.cardContainer}>
        {currentFriends.map((friend, index) => (
          <div
            key={index}
            className={classes.card}
            onClick={() => handleCardClick(friend)}
          >
            <Avatar
              className={classes.avatar}
              src={friend.picture.thumbnail}
              alt="Friend Image"
            />
            <div>
              <Text className={classes.name}>
                {friend.name.first} {friend.name.last}
              </Text>
              <Text className={classes.email}>{friend.email}</Text>
              <Text className={classes.phone}>{friend.phone}</Text>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Pagination
          total={Math.ceil(friendsList.length / friendsPerPage)}
          value={currentPage}
          onChange={setCurrentPage}
          className={classes.pagination}
        />
      </div>
      {selectedUser && (
        <Modal
          title={`${selectedUser.name.first} ${selectedUser.name.last}`}
          opened={true}
          onClose={handleCloseModal}
          size="lg"
        >
          <div>
            <Avatar
              className={classes.avatar}
              src={selectedUser.picture.thumbnail}
              alt="Friend Image"
            />
            <TextInput label="Email" value={selectedUser.email}></TextInput>
            <TextInput
              label="Date of Birth"
              value={new Date(selectedUser.dob.date).toLocaleDateString()}
            ></TextInput>
            <TextInput
              label="Address"
              value={selectedUser.location.street.name}
            ></TextInput>
            <TextInput label="Phone" value={selectedUser.phone}></TextInput>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FriendCard;
