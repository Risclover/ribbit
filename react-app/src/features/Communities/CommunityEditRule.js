import React, { useState } from "react";

import { Modal } from "../../context/Modal";
import EditCommunityRule from "./CommunityForms/EditCommunityRule";
import {
  BsArrowsAngleExpand,
  BsArrowsAngleContract,
  BsPencilFill,
} from "react-icons/bs";
import parse from "html-react-parser";

const URL_REGEX =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;

function Text({ content }) {
  const words = String(parse(content)).split(" ");
  return (
    <p>
      {words.map((word) => {
        return word.match(URL_REGEX) ? (
          <>
            <a href={word} rel="noreferrer" target="_blank">
              {word}
            </a>{" "}
          </>
        ) : (
          word + " "
        );
      })}
    </p>
  );
}

export default function CommunityEditRule({ idx, rule, community }) {
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
          >
            <BsPencilFill />
          </span>
          {showEditRuleModal && (
            <Modal
              onClose={() => setShowEditRuleModal(false)}
              title="Edit rule"
            >
              <EditCommunityRule
                communityId={community?.id}
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
