import React, { useState } from "react";
import { Modal } from "../../../../context/Modal";
import "./CommunitySelection.css";

import CreateCommunity from "../../../Communities/CommunityForms/CreateCommunity";
import CommunitySelectionDropdownCommunity from "./CommunitySelectionDropdownCommunity";

export default function CommunitySelectionDropdown({
  subscriptions,
  community_id,
  setcommunity_id,
  setShowDropdown,
  showDropdown,
  search,
  setSearch,
  communityList,
  setName,
  communityModalOpen,
  setCommunityModalOpen,
}) {
  const [showCreateCommunityModal, setShowCreateCommunityModal] =
    useState(false);
  const handleOpenCreateCommunity = () => {
    setCommunityModalOpen(true);
    setShowCreateCommunityModal(true);
  };
  return (
    <div className="community-selection-dropdown">
      <div className="community-selection-dropdown-topbar">
        <h5>Your Communities</h5>
        <button
          className="community-selection-dropdown-new-community"
          onClick={(e) => {
            e.preventDefault();
            handleOpenCreateCommunity();
          }}
        >
          Create New
        </button>
        {showCreateCommunityModal && (
          <Modal
            onClose={() => setShowCreateCommunityModal(false)}
            title="Create community"
          >
            <CreateCommunity
              setShowCreateCommunityModal={setShowCreateCommunityModal}
              showCreateCommunityModal={showCreateCommunityModal}
            />
          </Modal>
        )}
      </div>
      {subscriptions.map((subscription) => (
        <CommunitySelectionDropdownCommunity
          communityList={communityList}
          search={search}
          setSearch={setSearch}
          setcommunity_id={setcommunity_id}
          subscription={subscription}
          community_id={community_id}
          setShowDropdown={setShowDropdown}
          showDropdown={showDropdown}
          setName={setName}
        />
      ))}
      {communityList.filter((community) =>
        community["name"].toLowerCase().includes(search?.toLowerCase())
      ).length > 0 &&
        search?.length > 0 && (
          <div className="community-selection-dropdown-topbar">
            <h5>Other Communities</h5>
          </div>
        )}
      <div className="searched-communities">
        {search?.length > 0 &&
          communityList
            .filter((community) =>
              community["name"].toLowerCase().includes(search?.toLowerCase())
            )
            .map((community) => (
              <CommunitySelectionDropdownCommunity
                community_id={community_id}
                setSearch={setSearch}
                search={search}
                communityList={communityList}
                subscription={community}
                setcommunity_id={setcommunity_id}
                setShowDropdown={setShowDropdown}
              />
            ))}
      </div>
    </div>
  );
}
