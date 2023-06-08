import React, { useState } from "react";
import { Modal } from "../../../../context/Modal";
import "./CommunitySelection.css";

import CreateCommunityModal from "../../../../components/Modals/CreateCommunityModal";
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
  setCommunity,
}) {
  const [showCreateCommunityModal, setShowCreateCommunityModal] =
    useState(false);

  return (
    <div className="community-selection-dropdown">
      <div className="community-selection-dropdown-topbar">
        {subscriptions.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        .filter((community) =>
          community["name"].toLowerCase().includes(search?.toLowerCase())
        ).length > 0 && <h5>Your Communities</h5>}
        {/* <button
          className="community-selection-dropdown-new-community"
          onClick={(e) => {
            e.preventDefault();
            handleOpenCreateCommunity();
          }}
        >
          Create New
        </button> */}
        {showCreateCommunityModal && (
          <Modal
            onClose={() => setShowCreateCommunityModal(false)}
            title="Create community"
          >
            <CreateCommunityModal
              setShowCreateCommunityModal={setShowCreateCommunityModal}
              showCreateCommunityModal={showCreateCommunityModal}
            />
          </Modal>
        )}
      </div>
      {search &&
        subscriptions
          .sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          )
          .filter((community) =>
            community["name"].toLowerCase().includes(search?.toLowerCase())
          )
          .map((subscription) => (
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
              setCommunity={setCommunity}
            />
          ))}
      {!search &&
        subscriptions
          .sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          )
          .map((subscription) => (
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
              setCommunity={setCommunity}
            />
          ))}
      {communityList
        .sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
        .filter((community) =>
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
              community["name"].toLowerCase().includes(search.toLowerCase())
            )
            .map((community) => (
              <CommunitySelectionDropdownCommunity
                communityList={communityList}
                search={search}
                setSearch={setSearch}
                setcommunity_id={setcommunity_id}
                subscription={community}
                community_id={community_id}
                setShowDropdown={setShowDropdown}
                setCommunity={setCommunity}
              />
            ))}
      </div>
    </div>
  );
}
