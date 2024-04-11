import React, { useState } from "react";
import { Modal } from "../../../../context";
import {
  CreateCommunityModal,
  CommunitySelectionDropdownCommunity,
} from "../../..";
import "./CommunitySelection.css";

export function CommunitySelectionDropdown({
  subscriptions,
  communityId,
  setCommunityId,
  setShowDropdown,
  showDropdown,
  search,
  setSearch,
  communityList,
  setCommunity,
}) {
  const [showCreateCommunityModal, setShowCreateCommunityModal] =
    useState(false);

  return (
    <div className="community-selection-dropdown">
      <div className="community-selection-dropdown-topbar">
        {subscriptions
          .sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
          )
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
            open={() => setShowCreateCommunityModal(true)}
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
              setCommunityId={setCommunityId}
              subscription={subscription}
              communityId={communityId}
              setShowDropdown={setShowDropdown}
              showDropdown={showDropdown}
              setCommunity={setCommunity}
              otherComms={false}
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
              setCommunityId={setCommunityId}
              subscription={subscription}
              communityId={communityId}
              setShowDropdown={setShowDropdown}
              showDropdown={showDropdown}
              setCommunity={setCommunity}
              otherComms={false}
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
        {search &&
          communityList
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
                setCommunityId={setCommunityId}
                subscription={subscription}
                communityId={communityId}
                setShowDropdown={setShowDropdown}
                showDropdown={showDropdown}
                setCommunity={setCommunity}
                otherComms={true}
              />
            ))}
      </div>
    </div>
  );
}
