import React, { useState } from "react";
import {
  BsArrowsAngleExpand,
  BsArrowsAngleContract,
  BsPencilFill,
} from "react-icons/bs";
import parse from "html-react-parser";
import { Modal } from "@/context";
import { EditCommunityRule } from "./EditCommunityRule";

export function CommunityEditRule({ idx, rule, community }) {
  const [showEditRuleModal, setShowEditRuleModal] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="community-edit-rule" key={idx}>
      <div className="community-edit-rule-face">
        <p className="community-edit-rule-title">{`${idx + 1}. ${
          rule.title
        }`}</p>
        <div className="community-edit-rule-icons">
          <span
            className="rule-pencil"
            onClick={() => setShowEditRuleModal(true)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowEditRuleModal(true);
              }
            }}
          >
            <BsPencilFill />
          </span>
          {showEditRuleModal && (
            <Modal
              onClose={() => setShowEditRuleModal(false)}
              close={showEditRuleModal}
              title="Edit rule"
              open={showEditRuleModal}
            >
              <EditCommunityRule
                communityId={community?.id}
                showEditRuleModal={showEditRuleModal}
                setShowEditRuleModal={setShowEditRuleModal}
                rule={rule}
              />
            </Modal>
          )}
          <span className="rule-expand">
            {!expanded && (
              <BsArrowsAngleExpand onClick={() => setExpanded(true)} />
            )}
          </span>
          <span className="rule-collapse">
            {expanded && (
              <BsArrowsAngleContract onClick={() => setExpanded(false)} />
            )}
          </span>
        </div>
      </div>
      {expanded && (
        <div className="community-edit-rule-expanded">
          <div className="community-edit-rule-expanded-section">
            <span className="rule-expanded-title">Full Description</span>
            <span
              className="rule-expanded-content"
              style={{ whiteSpace: "pre-line" }}
            >
              {parse(rule.description)}
            </span>
          </div>
          <div className="community-edit-rule-expanded-section">
            <span className="rule-expanded-title">Created</span>
            <span className="rule-expanded-content">{rule.createdAt}</span>
          </div>
        </div>
      )}
    </div>
  );
}
